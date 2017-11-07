"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const lodash_1 = require("lodash");
const shelljs_1 = require("shelljs");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const os_1 = require("os");
const lib_1 = require("./lib");
const CREATE_NEW_PROFILE = {
    name: "Create a new profile",
    profile: "",
    token: "",
    vendorId: ""
};
class AlexaGenerator extends Generator {
    prompting() {
        this.log(yosay("Welcome to the amazing " + chalk.red("Alexa Skill") + " generator!"));
        return new Promise((resolve, reject) => {
            return this.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Your skill name",
                    default: this.appname
                },
                {
                    type: "confirm",
                    name: "createNewSkill",
                    message: "Do you want me to create a new skill on the developer console account?",
                    default: false
                },
                {
                    type: "input",
                    name: "skillid",
                    message: "Your skill id",
                    default: "skill-id",
                    when: function (answers) {
                        return !answers.createNewSkill;
                    }
                }
            ]).then(answers => {
                if (answers.createNewSkill) {
                    fs_extra_1.readJSON(path_1.join(os_1.homedir(), ".ask", "cli_config"))
                        .then(cliConfig => {
                        const profileChoices = Object.keys(cliConfig.profiles)
                            .map(profile => {
                            return {
                                name: `Profile: ${profile}, AWS-Profile: ${cliConfig
                                    .profiles[profile].aws_profile}, VendorId:${cliConfig
                                    .profiles[profile].vendor_id}`,
                                profile: profile,
                                token: cliConfig.profiles[profile].token,
                                vendorId: cliConfig.profiles[profile].vendor_id
                            };
                        })
                            .concat(CREATE_NEW_PROFILE);
                        return this.prompt([
                            {
                                type: "list",
                                name: "profile",
                                message: "Choose a profile to be used for skill creation",
                                choices: profileChoices
                            }
                        ])
                            .then(profileChoice => {
                            if (profileChoice.name === CREATE_NEW_PROFILE) {
                                //TODO: change to RxJS as this is getting more complex
                                this.spawnCommandSync("ask", ["init"]);
                            }
                            lib_1.createNewSkill({
                                token: profileChoice.token.access_token,
                                vendorId: profileChoice.vendorId,
                                skillName: answers.name
                            });
                        })
                            .catch(err => {
                            console.error(err);
                        });
                    })
                        .catch(err => {
                        // no ask cli run so far
                        if (shelljs_1.which("ask")) {
                            this.spawnCommandSync("ask", ["init"]);
                            resolve(answers);
                        }
                        else {
                            if (shelljs_1.which("yarn")) {
                                this.spawnCommandSync("yarn", ["global", "add", "ask-cli"]);
                            }
                            else {
                                this.spawnCommandSync("npm", ["-g", "install", "ask-cli"]);
                            }
                            this.spawnCommandSync("ask", ["init"]);
                            resolve(answers);
                        }
                    });
                }
                else {
                    resolve(answers);
                }
            });
        }).then((answers) => {
            this.log("app name", answers.name);
            this.log("skill id", answers.skillid);
            this.props = answers;
        });
    }
    writing() {
        const data = {
            name: this.props.name,
            skillid: this.props.skillid,
            fileName: lodash_1.kebabCase(this.props.name),
            className: lodash_1.capitalize(lodash_1.camelCase(this.props.name))
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
