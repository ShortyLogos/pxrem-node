# PXREM CLI - NodeJS Version

## What's this?

This is a small CLI designed to convert pixel values in web development-related files to rem values or rem to px. It can theoratically be used to convert a lot of different values with a lot of different labels as the as `c` / `--conversion` argument is quite powerful. The requirement though is that the conversion should only necessitates a division or a multiplication. Custom conversion algorithms aren't possible as of v1.0. It is planned to offer it in the future.

The default ratio used for calculations is 16, as it is the default root font size in browers. Of course, can specify another size using the CLI params.

## Why?

Recently, I had to convert a bunch of files from using pixel values to rem ones for responsivness purposes. I created this small project for fun over a couple of hours. I primarily work as a front-end developer using React. Exploring this CLI was a nostalgic journey into the realm of object-oriented programming (OOP), although I could have built it using a procedural approach. Like many developers, I sometimes tend to over-engineer things.

## How to use?

1. Make sure to have [Node.js installed on your machine](https://nodejs.org/).
2. Install dependencies

```
npm install
```

3. When running this CLI, When running this CLI, ensure that your current working directory is set to _pxrem-node/bin_. You have to add the input file using the `-p` argument.

```
node pxrem -p ../your/path/your-file.jsx
```

_NOTE : Relative and absolute paths are both accepted._

## All Commands

You can always call `node pxrem --help` to have a list of possible commands.

```
-p / --paths: Specify up to two paths. The first path (mandatory) refers to the input file, while the second path (optional) is for the output of the modified copy. If no secondary path is specified, and overwrite mode is turned off (default), the CLI will generate a file in the same location as the input file. The generated file will have the target label ("_rem" by default) suffix before the extension name.
-c / --conversion: Arrays of values used for conversion purposes. The order is important and goes like this : `[sourceLabel: string, targetLabel: string, ratio: int, operation: string, hasFloating: boolean]` The default value is used to convert px -> rem. Therefore it is ["px", "rem", 16, "divide", false]
--rem-to-px: shortcut operation to convert rem -> px without specifiying a conversion array. It supersedes the --conversion argument.
-o / --overwrite : Enables overwriting the input file instead of generating a modified copy.
-r / --ratio : Used for calculations purposes. Default is 16.
-d / --debug : Display supplementary informations during execution.
```

3. When running this CLI, make sure your current directory is _pxrem-node/bin_. You have to add the input file using the `-p` argument.

```
node pxrem -p ../your/path/your-file.jsx
```

_NOTE : Relative and absolute paths are both accepted._

## What's next?

As I write this, I'm in the process of learning Go just for fun. It's entirely possible that I might create an equivalent version using Go. Additionally, for a better user experience (UX), I might consider developing a GUI version.

I'm also considering expanding the range of conversion options, which would further justify the abstraction layers built for this project.

## Contributions

You're welcome to submit pull requests!

## Alternatives

Note that you can achieve the same functionality directly within VSCode.
For more information, refer to [this link](https://stackoverflow.com/a/72591161).
