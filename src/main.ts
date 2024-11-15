import { validate } from "@scalar/openapi-parser"
import { program } from "commander"
import fs from "fs"
import path from "path"

program.requiredOption("-f, --file <file>", "Input OpenAPI file, YAML or JSON")
program.option("-e, --endpoint <url>", "Base URL for the API endpoint")
program.option("-o, --output <file>", "Output .http file, defaults to input file with a .http extension")
program.option("-i, --ignore", "Ignore validation errors and generate the .http file anyway")

const options = program.parse().opts()

const filePath = options.file

if (!fs.existsSync(filePath)) {
  console.error("File does not exist")
  process.exit(1)
}
const file = fs.readFileSync(filePath, "utf8")

// Parse & validate the OpenAPI file
const { valid, errors, specification } = await validate(file, {
  throwOnError: false,
})

if (!valid && !options.ignore) {
  console.error("OpenAPI file is not valid")
  if (errors != undefined) {
    for (const error of errors) {
      console.error(error.message)
    }
  }
  process.exit(1)
}

let endpoint = ""
if (specification.servers && specification.servers.length > 0) {
  endpoint = specification.servers[0].url
}

if (options.endpoint) {
  endpoint = options.endpoint
}

if (!endpoint) {
  console.error("No servers in OpenAPI spec, please provide an endpoint with --endpoint")
  process.exit(1)
}

let description = specification.info.description ? specification.info.description : specification.info.title
let serverDesc = specification.servers[0].description ? specification.servers[0].description : "API Endpoint"

description = description.replaceAll("\n", "\n# ")
serverDesc = serverDesc.replaceAll("\n", "\n# ")

// Output .http file
let httpFile = `#\n# ${description}\n#\n\n`
httpFile += `# ${serverDesc}\n@endpoint = ${endpoint}\n\n`

// Loop through paths in the OpenAPI file
for (const path in specification.paths) {
  const pathObj = specification.paths[path]

  for (const method of Object.keys(pathObj)) {
    const op = pathObj[method]
    const methodCaps = method.toUpperCase()

    let comment = op.description ? `${op.description}` : op.operationId
    if (!comment) {
      comment = `${methodCaps} ${path}`
    }

    httpFile += `### ${comment}\n${methodCaps} {{endpoint}}${path}\n\n\n`
  }
}

if (!options.output) {
  const nameNoExt = path.basename(filePath).split(".")[0]
  options.output = `${nameNoExt}.http`
}

fs.writeFileSync(options.output, httpFile)
