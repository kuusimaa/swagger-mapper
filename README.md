<h3 align="center">Swagger Mapper</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kuusimaa/swagger-mapper/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kuusimaa/swagger-mapper/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Map Swagger json to Postman collection
    <br> 
</p>

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Built Using](#built_using)
- [Contributing](#contributing)
- [Authors](#authors)


## About <a name = "about"></a>

Swagger Mapper is a command-line tool that maps Swagger JSON files to Postman collections.

### Installation

To install Swagger Mapper, first clone the repository:

```
git clone https://github.com/kuusimaa/swagger-mapper.git
```

Then, navigate to the project directory, install the dependencies and build:

```
cd swagger-mapper
npm install
npm run compile
``````

## Usage <a name="usage"></a>

To use Swagger Mapper, run the following command:
```
swaggerMapper <urls> <outputDir>
```

Replace <urls> with the URL(s) of the Swagger JSON file(s), separated by commas, and <outputDir> with the directory where the Postman collection will be saved.

For example:
```
swaggerMapper https://localhost:3000/swagger.json ./collections
```

This will map the Swagger JSON file at the specified URL to a Postman collection and save it in the collections directory.

## Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/)

## Authors <a name = "authors"></a>

- [@kuusimaa](https://github.com/kuusimaa) - Idea & Initial work

## Contributing <a name = "contributing"></a>

If you'd like to contribute to Swagger Mapper, please fork the repository and create a new branch for your changes. Then, submit a pull request with your changes

## License
This project is licensed under the MIT License.