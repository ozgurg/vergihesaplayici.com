const exec = require("child_process").exec;
const packageJson = require("./package.json");

const dependencies = Object.keys(packageJson.dependencies);
const devDependencies = Object.keys(packageJson.devDependencies);

(async () => {
    await exec(`npm i ${dependencies.join(" ")} --save`);
    await exec(`npm i ${devDependencies.join(" ")} --save-dev`);
})();
