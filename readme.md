# HTTP File Generator

HTTP File Generator is a command-line tool that generates `.http` files from OpenAPI specifications. This tool helps you quickly create HTTP request files for testing and documentation purposes.

These files have become [de facto standard](https://github.com/JetBrains/http-request-in-editor-spec/blob/master/spec.md) adopted by several IDE's and extensions, a

Using .http files allows you to quickly invoke your API endpoints because you don't have to leave your IDE to use a separate tool, they are also part of your source code and shared with the rest of the team

Supported by

- [httpYac](https://marketplace.visualstudio.com/items?itemName=anweber.vscode-httpyac)
- [REST Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [Visual Studio 2022](https://learn.microsoft.com/en-us/aspnet/core/test/http-files?view=aspnetcore-9.0)
- [Jetbrains](https://www.jetbrains.com/help/pycharm/http-client-in-product-code-editor.html)

## 🤔 Features

- Parses OpenAPI 3.0 and 3.1 specifications in JSON or YAML format
- Generates `.http` files with HTTP requests for each operation & path defined in the spec
- Supports custom base URLs for API endpoints
- Validates OpenAPI specifications before generation

## 💾 Installation

To install the tool, clone the repository and run the following command:

```bash
npm install
npm build
```

## 🛠️ Usage

To generate an .http file from an OpenAPI specification, use the following command:

```bash
npm run generate
```

Options
-f, --file <file>: Input OpenAPI file (YAML or JSON) (required)
-e, --endpoint <url>: Base URL for the API endpoint (optional)
-o, --output <file>: Output .http file, defaults to input file with a .http extension (optional)
-i, --ignore: Ignore validation errors and generate the .http file anyway (optional)

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.
