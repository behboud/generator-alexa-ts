"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const lodash_1 = require("lodash");
const shelljs_1 = require("shelljs");
class AlexaGenerator extends Generator {
    prompting() {
        this.log(yosay("Welcome to the amazing " + chalk.red("Alexa Skill") + " generator!"));
        return this.prompt([
            {
                default: this.appname,
                message: "Your skill name",
                name: "name",
                type: "input"
            },
            {
                default: "skill-id",
                message: "Your skill id",
                name: "skillid",
                type: "input"
            }
        ]).then((answers) => {
            this.props = answers;
        });
    }
    writing() {
        const data = {
            className: lodash_1.capitalize(lodash_1.camelCase(this.props.name)),
            fileName: lodash_1.kebabCase(this.props.name),
            name: this.props.name,
            skillid: this.props.skillid
        };
        this.fs.copy(this.templatePath("_tsconfig.json"), this.destinationPath("tsconfig.json"));
        this.fs.copy(this.templatePath("_webpack.config.js"), this.destinationPath("webpack.config.js"));
        this.fs.copy(this.templatePath("_gitignore"), this.destinationPath(".gitignore"));
        this.fs.copyTpl(this.templatePath("_serverless.yml"), this.destinationPath("serverless.yml"), data);
        this.fs.copyTpl(this.templatePath("_package.json"), this.destinationPath("package.json"), data);
        this.fs.copyTpl(this.templatePath("README.md"), this.destinationPath("README.md"), data);
        // Create in generated 'src' dir
        this.fs.copy(this.templatePath("src/index.ts"), this.destinationPath("src/index.ts"), data);
        this.fs.copy(this.templatePath("src/common.ts"), this.destinationPath("src/common.ts"), data);
        this.fs.copy(this.templatePath("src/languagestring.ts"), this.destinationPath("src/languagestring.ts"), data);
        this.fs.copy(this.templatePath("src/launch.ts"), this.destinationPath("src/launch.ts"), data);
        this.fs.copyTpl(this.templatePath("src/unhandled.ts"), this.destinationPath("src/unhandled.ts"), data);
        this.fs.copy(this.templatePath(".vscode/launch.json"), this.destinationPath(".vscode/launch.json"));
        this.fs.copy(this.templatePath("src/awesomeIntents.ts"), this.destinationPath("src/awesomeIntents.ts"));
        this.fs.copy(this.templatePath("src/sessionended.ts"), this.destinationPath("src/sessionended.ts"));
    }
    install() {
        if (shelljs_1.which("yarn")) {
            this.yarnInstall();
        }
        else {
            this.npmInstall(null, { skipInstall: this.options["skip-install"] });
        }
    }
}
module.exports = AlexaGenerator;
