import fs, { write } from "fs";
import { Window } from ".";

function readJsonFile(filePath: string): Window[] {
  const rawData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(rawData);
}

// transform the window[0].tab to a string array
function getUrls(windows: Window[]): string[] {
  return windows[0].tabs.map((tab) => tab.url);
}

// write each url into a line to a file urls.txt
function writeUrls(filePath: string, urls: string[]): void {
  fs.writeFileSync(filePath, urls.join("\n"));
}

writeUrls("urls.txt", getUrls(readJsonFile("output.json")));
