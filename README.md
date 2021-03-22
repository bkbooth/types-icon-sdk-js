# @types/icon-sdk-js

TypeScript definitions for [icon-sdk-js](https://github.com/icon-project/icon-sdk-js).

**Note:** These definitions will eventually be submitted to [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), but we'll keep them local/linked only for now until they're more complete. Instructions for linking below.

## Usage

You need to clone this repo, install dependencies, then register it for yarn/npm linking. Finally you need to link it into your TypeScript project(s) which depend on [icon-sdk-js](https://github.com/icon-project/icon-sdk-js).

Commands provided here for `yarn`, but you can use `npm` instead if you prefer.

If you fork this repo, make sure you clone your forked URL.

```bash
# Clone and link the repo locally:
git clone https://github.com/bkbooth/types-icon-sdk-js.git
cd types-icon-sdk-js
yarn install
yarn link
# > success Registered "@types/icon-sdk-js".

# In your TypeScript project(s) which depend on icon-sdk-js:
yarn link @types/icon-sdk-js
```
