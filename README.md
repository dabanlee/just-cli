# just-cli

Just a simple CLI.

### Installation

```sh
$ npm install -g just-cli
```

### Get Started

```sh
$ just init <template-name> <project-name>
```

Example:

```sh
$ just init vue hello
```

The above command pulls the template from [JustClear/just-vue](https://github.com/JustClear/just-vue)(specify in configuration file), prompts for some information, and generates the project at `./hello/`.

### Usage

```sh
Usage: just <command>

  Commands:

    init|i     Initialize a new project
    list|l     List the configuration file
    add|a      Add template
    remove|r   Remove template

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## License

Licensed under the [MIT License](https://github.com/JustClear/just-cli/blob/master/LICENSE)