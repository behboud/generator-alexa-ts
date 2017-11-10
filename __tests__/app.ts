import { join } from "path";
import * as assert from "yeoman-assert";
import { run } from "yeoman-test";

describe("generator-alexa-ts:app", () => {
  beforeAll(() => {
    return new Promise((resolve, reject) => {
      run(join(__dirname, "..", "src", "app"))
        .withOptions({ skipInstall: true })
        .withPrompts({ name: "test" })
        .on("error", error => {
          reject(error);
        })
        .on("end", () => resolve())
        .then(() => {
          console.log("done");
        })
        .catch(error => {
          console.error(error);
        });
    });
  });

  test("Generator", () => {
    assert.file([
      "webpack.config.js",
      "src/index.ts",
      "src/common.ts",
      "src/unhandled.ts",
      "src/launch.ts",
      "src/languagestring.ts",
      ".vscode/launch.json",
      "serverless.yml",
      "tsconfig.json",
      ".gitignore",
      "package.json",
      "README.md"
    ]);
  });
});
