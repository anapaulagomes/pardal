# Pardal

<p align="center">
    <img width="400" height="auto" src="logo.svg"/>
</p>

An acessible and customizable Twitter client.

[![Build Status](https://dev.azure.com/apgomes88/Pardal/_apis/build/status/anapaulagomes.pardal?branchName=master)](https://dev.azure.com/apgomes88/Pardal/_build/latest?definitionId=2&branchName=master)

## Configuring

First things first: you must install all dependencies.

```bash
npm install
```

```bash
npm start
```

## Testing

```bash
npm run test:unit
npm run test:integration
```

## Packaging

This command will generate a Pardal executable for Linux, MacOS and Windows.

```bash
npm build
```

If you're developing on Linux or MacOS, you will need to install Wine
to generate versions for Windows.
