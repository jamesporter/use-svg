import * as fs from "fs"
import * as path from "path"
import * as rimraf from "rimraf"

rimraf.sync("package")
fs.mkdirSync("package")

const mainPackage = JSON.parse(fs.readFileSync("./package.json").toString())
const version = mainPackage.version

const packageTemplate = {
  name: mainPackage.name,
  author: "James Porter <james@amimetic.co.uk>",
  version,
  main: "./cjs/index.js",
  module: "./esm/index.js",
  license: "MIT",
  dependencies: {},
  types: "./esm/index.d.ts",
}

fs.writeFileSync(
  path.join("package", "package.json"),
  JSON.stringify(packageTemplate, null, 2)
)

fs.copyFileSync("README.md", path.join("package", "README.md"))
