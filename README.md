# tab-manager-extend

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## How to use?

I use this with [cluster tab manager](https://chrome.google.com/webstore/detail/cluster-window-tab-manage/aadahadfdmiibmdhfmpbeeebejmjnkef).

1. You export all the saved windows into a file called `input.json`.
2. Then run this script by running `bun index.ts`. You will get an `output.json`.
3. Import it back. 🎉

you can run `bun get-urls.ts` to get all the urls in a text file.

## Features

1. remove duplicate tab
2. combine in one window
3. remove tabs base on unwanted keywords
