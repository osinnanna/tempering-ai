# tempering-ai

`tempering-ai` is a command-line interface (CLI) application designed to serve as an interactive AI companion. Built with TypeScript and Bun, it leverages advanced AI models to provide conversational capabilities and assist users through interactive prompts directly in their terminal.

## Features

*   **Quick Context Aware Prompt**: Generate your own prompts directly from your command line.
*   **Cross-Platform**: Binaries available for Linux, macOS, and Windows in the [GitHub Releases](https://github.com/osinnanna/tempering-ai/releases).
*   **Easy Installation**: Installable as a global NPM package.
*   **Fast and Efficient**: Built with Bun for a speedy development and runtime experience.

## Installation

There are two ways to use or build `tempering-ai`:

### 1. Using NPM (Recommended, Cross-Platform JS CLI)

Install globally with:

```bash
npm install -g tempering-ai
```

This will make the `tempering-ai` command available in your terminal on any OS with Node.js.

#### Build from source (JS CLI):

```bash
bun run build
# Output: dist/tempering-ai.js (cross-platform, Node.js required)
```


### 2. Native Binary (Current OS)

To build a native executable for your current operating system:

```bash
bun run build:native
# Output: dist/tempering-ai (native binary for your OS)
```

Or download prebuilt binaries for Linux, macOS, or Windows from the [GitHub Releases](https://github.com/osinnanna/tempering-ai/releases) page.

## Usage

After installation, you can run the `tempering-ai` application by simply typing:

```bash
tempering-ai
```

Follow the on-screen prompts to interact with your AI companion.

## Development

For developers interested in contributing or modifying `tempering-ai`:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/osinnanna/tempering-ai.git
    cd tempering-ai
    ```
2.  **Install dependencies using Bun:**
    ```bash
    bun install
    ```
3.  **Build the application:**
    ```bash
    bun run build
    ```
4.  **Run the application:**
    ```bash
    ./dist/tempering-ai
    ```

## License

This project is licensed under the MIT License.
