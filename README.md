# CSS ClassShuffler

ClassShuffler is a tool designed to randomize the class names in your HTML files, obfuscating the original class names to enhance security and prevent reverse engineering. It also optimizes the HTML by minifying it and handling inline styles.

## Features

- Randomizes class names in HTML files.
- Updates CSS styles to match new class names.
- Converts `<p><b>...</b></p>` to `<p class="font_bold">...</p>` and creates the corresponding CSS class.
- Minifies the HTML output.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/iip-jaelani16/CSS-Class-Shuffler.git
   cd CSS-Class-Shuffler
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage

1. Place your index.html file in the project directory.
2. Run the script:
   ```bash
   node index.js
   ```
3. The processed HTML will be saved in the results directory as index.html.

## Example

Given an index.html file with the following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Example</title>
    <style>
      .example {
        color: red;
      }
    </style>
  </head>
  <body>
    <p class="example"><b>Hello World!</b></p>
  </body>
</html>
```

After running the script, the content of results/index.html might look like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Example</title>
    <style>
      .randomString-example {
        color: red;
      }
      .randomString {
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <p class="randomString-example randomString">Hello World!</p>
  </body>
</html>
```

# Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.
