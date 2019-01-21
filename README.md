# just-cli

Just a simple CLI.

## Installation

```sh
$ yarn global add just-cli
```

## Get Started

### Add template

```sh
$ just add
$ template name:
$ branch(master):
$ git:
# or
$ just add -n <template name> -b <branch name> -g <git URL>
```

Example:

```sh
$ just add -n vue-pages -b master -g https://github.com/JustClear/vue-pages.git
```

Template added:

```json
{
    "vue-pages": {
        "branch": "master",
        "git": "https://github.com/JustClear/vue-pages.git"
    }
}
```

Then:

```sh
$ just init <template-name> <project-name>
$ cd <project-name>
$ yarn
$ yarn start
```

## Usage

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