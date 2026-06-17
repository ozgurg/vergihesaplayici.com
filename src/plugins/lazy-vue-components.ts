import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";

export type LazyVueComponentsOptions = {
    dirs: string[];
}

const getAllVueFiles = (folder: string, fileList: string[] = []): string[] => {
    const fullFolderPath = path.resolve(process.cwd(), folder);
    if (!fs.existsSync(fullFolderPath)) {
        return fileList;
    }

    const files = fs.readdirSync(fullFolderPath);

    for (const _file of files) {
        const filePath = path.join(folder, _file);
        const absolutePath = path.resolve(process.cwd(), filePath);

        if (fs.statSync(absolutePath).isDirectory()) {
            getAllVueFiles(filePath, fileList);
        } else if (filePath.endsWith(".vue")) {
            fileList.push(filePath.replaceAll("\\", "/"));
        }
    }

    return fileList;
};

const isTargetVueFile = (file: string, dirs: string[]): boolean => {
    if (!file.endsWith(".vue")) {
        return false;
    }

    const normalizedFile = file.replaceAll("\\", "/");
    return dirs.some(_folder => {
        // Simple regex conversion for globs: `**` -> `.*`
        const regexString = `^${_folder.replaceAll("/", String.raw`\/`).replaceAll("**", ".*")}\\/.*\\.vue$`;
        return new RegExp(regexString, "u").test(normalizedFile);
    });
};

// Export the resolver so it can be easily used inside `autoImportVueComponentsPlugin` without boilerplate
export const lazyVueComponentsResolver = (): (name: string) => { name: string; from: string } | null => {
    return (name: string) => {
        return name.startsWith("Lazy") ?
            {
                name,
                from: "virtual:lazy-vue-components"
            } :
            null;
    };
};

// oxlint-disable-next-line import/no-default-export
export default function lazyVueComponentsPlugin(options: LazyVueComponentsOptions): Plugin {
    const virtualModuleId = "virtual:lazy-vue-components";
    const resolvedVirtualModuleId = `\0${virtualModuleId}`;

    return {
        name: "lazy-vue-components",
        resolveId(id: string) {
            return id === virtualModuleId ?
                resolvedVirtualModuleId :
                null;
        },
        load(id: string) {
            if (id !== resolvedVirtualModuleId) {
                return null;
            }

            const allFiles = getAllVueFiles("src");
            const files = allFiles.filter(_file => isTargetVueFile(_file, options.dirs));
            const globPatterns = options.dirs.map(_dir => `"/${_dir}/**/*.vue"`).join(",\n");

            //language=JS
            let code = `
                // noinspection ES6UnusedImports
                import { defineAsyncComponent } from "vue";

                // noinspection JSUnusedLocalSymbols
                const components = import.meta.glob([${globPatterns}]);
            `;

            for (const _file of files) {
                const basename = path.basename(_file, ".vue");
                const pascalCaseComponentName = basename
                    .replaceAll(/(^\w|-\w)/gu, _component => _component.replace("-", "")
                        .toUpperCase());

                //language=JS
                code += `
                    export const Lazy${pascalCaseComponentName} = defineAsyncComponent(components["/${_file}"]);
                `;
            }

            return code;
        },
        configureServer(server) {
            server.watcher.on("add", _file => {
                if (isTargetVueFile(_file, options.dirs)) {
                    const module = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
                    if (module) {
                        server.moduleGraph.invalidateModule(module);
                    }
                }
            });
            server.watcher.on("unlink", _file => {
                if (isTargetVueFile(_file, options.dirs)) {
                    const module = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
                    if (module) {
                        server.moduleGraph.invalidateModule(module);
                    }
                }
            });
        }
    };
}
