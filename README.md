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
$ # template name:
$ # branch(master):
$ # git:

# or
$ just add -n <template name> -b <branch name> -g <git URL>
```

Example:

```sh
$ just add -n npm -b master -g https://github.com/dabanlee/npmkit.git
```

Template added:

```json
{
    "npm": {
        "branch": "master",
        "git": "https://github.com/dabanlee/npmkit.git"
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

  VERSION: 2.0.0

  USAGE:
    $ just init       Initialize a new project
    $ just add        Add template
    $ just list       List the templates file
    $ just remove     Remove template

  OPTIONS:
    -h, --help        Show usage message
    -v, --version     Show the current version number
```

## License

Licensed under the [MIT License](https://github.com/dabanlee/just-cli/blob/master/LICENSE)