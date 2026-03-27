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

    for (const file of files) {
        const filePath = path.join(folder, file);
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
    return dirs.some(folder => {
        // Simple regex conversion for globs: `**` -> `.*`
        const regexStr = `^${folder.replaceAll("/", String.raw`\/`).replaceAll("**", ".*")}\\/.*\\.vue$`;
        return new RegExp(regexStr).test(normalizedFile);
    });
};

// Export the resolver so it can be easily used inside autoImportVueComponentsPlugin without boilerplate
// oxlint-disable-next-line typescript/explicit-module-boundary-types
export const lazyVueComponentsResolver = () => {
    return (name: string) => {
        if (name.startsWith("Lazy")) {
            return {
                name: name,
                from: "virtual:lazy-vue-components"
            };
        }
        return null;
    };
};

// oxlint-disable-next-line import/no-default-export
export default function lazyVueComponentsPlugin(options: LazyVueComponentsOptions): Plugin {
    const virtualModuleId = "virtual:lazy-vue-components";
    const resolvedVirtualModuleId = `\0${virtualModuleId}`;

    return {
        name: "lazy-vue-components",
        resolveId(id: string) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId;
            }
            return null;
        },
        load(id: string) {
            if (id === resolvedVirtualModuleId) {
                const allFiles = getAllVueFiles("src");
                const files = allFiles.filter(file => isTargetVueFile(file, options.dirs));

                let code = `import { defineAsyncComponent } from 'vue';\n`;

                const globPatterns = options.dirs.map(dir => `    "/${dir}/**/*.vue"`).join(",\n");
                code += `const components = import.meta.glob([\n${globPatterns}\n]);\n`;

                for (const file of files) {
                    const basename = path.basename(file, ".vue");
                    // Transform kebab-case or camelCase to PascalCase robustly
                    const pascal = basename.replaceAll(/(^\w|-\w)/g, (c) => c.replace("-", "").toUpperCase());

                    code += `export const Lazy${pascal} = defineAsyncComponent(components["/${file}"]);\n`;
                }

                return code;
            }
            return null;
        },
        configureServer(server) {
            // Watch for file additions and deletions to invalidate the virtual module dynamically during dev mode
            server.watcher.on("add", (file) => {
                if (isTargetVueFile(file, options.dirs)) {
                    const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
                    if (mod) {
                        server.moduleGraph.invalidateModule(mod);
                    }
                }
            });
            server.watcher.on("unlink", (file) => {
                if (isTargetVueFile(file, options.dirs)) {
                    const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
                    if (mod) {
                        server.moduleGraph.invalidateModule(mod);
                    }
                }
            });
        }
    };
}
