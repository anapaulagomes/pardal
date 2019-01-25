# Pardal

An acessible and customizable Twitter client

## Running

```bash
npm start
```

## Packing

You  must install [electron-packager](https://github.com/electron-userland/electron-packager)
to generate pardal multiplatform versions.

If you're not developing on Windows, generating an Electron app
to Windows requires Wine to be installed.

```
electron-packager pardal-web pardal --platform=darwin,win32,linux
```
