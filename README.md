# PXREM CLI - NodeJS Version

## What's this?

This is a small CLI designed to convert pixel values in web development-related files to rem values. The default root font size used for calculations is 16, but you can specify another size using the parameters listed below.

## How to use?

1. Make sure to have [Node.js installed on your machine](https://nodejs.org/).
2. Install dependencies

```
npm install
```

3. When running this CLI, make sure your current directory is pxrem-node/bin. You have to add the input file using the '-p' argument.
   NOTE : Relative and absolute paths are both accepted.

```
node pxrem ../your/path/your-file.jsx
```

## Why?

Recently, I had to convert a bunch of files from using pixel values to rem ones for responsivness purposes. I created this small project for fun over a couple of hours. I primarily work as a front-end developer using React. Exploring this CLI was a nostalgic journey into the realm of object-oriented programming (OOP), although I could have built it using a procedural approach. Like many developers, I sometimes tend to over-engineer things.

## What's next?

As I write this, I'm in the process of learning Go just for fun. It's entirely possible that I might create an equivalent version using Go. Additionally, for a better user experience (UX), I might consider developing a GUI version.

I'm also considering expanding the range of conversion options, which would further justify the abstraction layers built for this project.

## Contributions

You're welcome to submit pull requests!

## Alternatives

Note that you can achieve the same functionality directly within VSCode.
For more information, refer to [this link](https://stackoverflow.com/a/72591161).
