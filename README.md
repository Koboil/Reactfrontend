This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Environment variables

We use environment variables to set some values depending on the environment the project is running on. You must have a
local environment file to be able to run the project. To do so, execute `cp .env.example .env.local` and then set the
environment variables in `.env.local` accordingly. If you are in a development environment, remove the line for
the `NEXT_APP_SENTRY_DSN` environment variable.

## Getting Started

### Install dotenv-cli:

We use [dotenv cli](https://github.com/entropitor/dotenv-cli). Install it globally.

```bash
npm install -g dotenv-cli
```

### Quick Installation

For Linux and macOS users, `make` commands are available to simplify installation and setup:

- **Complete Installation**: Run the following command to install all dependencies:
    ```bash
    make first-install
    ```

  This command will set everything up. Open your web browser and navigate to **http://localhost:3000**.

### Manual Installation

Install dependencies:

```bash
pnpm install
```

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dependencies

Note that some dependencies are not in the dev section even if they should be (obfuscator, bundle analyzer, …). This is
because Next.js loads `next.config.js` even in production mode, where those modules are referenced. Next.js team seems
happy with it even though it makes little sense (see <https://github.com/vercel/next.js/issues/6906>).

## Fix vulnerabilities

```bash
pnpm audit --fix
pnpm install
```

## Production

Run `pnpm build` to extract and compile messages before building the app

Sentry DSN must be provided in the environment file. For convenience, it is included in the default .env file.

## Test

### Analyse production build

You can analyze the bundle by running `ANALYZE=true pnpm build`. This will run Webpack Bundle Analyzer and Statoscope.
The bundle sizes shown are computed **before** obfuscation, therefore they will be smaller than the accurate bundle
sizes. However, that's good enough to check for possible optimizations.

To analyze the deployed bundle, you can use `bundle-wizard`:

```bash
pnpm add -D bundle-wizard
```

And then run:

```bash
./node_modules/.bin/bundle-wizard "https://dev-url"
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
