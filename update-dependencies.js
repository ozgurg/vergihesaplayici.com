const exec = require("child_process").exec;
const packageJson = require("./package.json");

if (packageJson.dependencies !== undefined) {
    const dependencies = Object.keys(packageJson.dependencies);

    (async () => {
        await exec(`npm i ${dependencies.join(" ")} --save`);
    })();
}

if (packageJson.devDependencies !== undefined) {
    const devDependencies = Object.keys(packageJson.devDependencies);

    (async () => {
        await exec(`npm i ${devDependencies.join(" ")} --save-dev`);
    })();
}
