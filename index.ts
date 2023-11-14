import fs from "fs";

type Tab = {
  url: string;
  title: string;
  hostname: string;
};

type Window = {
  title: string;
  tabs: Tab[];
};

function readJsonFile(filePath: string): Window[] {
  const rawData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(rawData);
}

function combineAndSortWindows(windows: Window[]) {
  const combinedTabs = windows.flatMap((window) => window.tabs);
  const uniqueTabs = Array.from(
    new Map(combinedTabs.map((tab) => [tab.url, tab])).values()
  );
  uniqueTabs.sort((a, b) => a.url.localeCompare(b.url));

  return [{ title: "Combined Window", tabs: uniqueTabs }];
}

function writeJsonFile(filePath: string, data: Window[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/**
 * given an array of keyword, if the tab title or url contains any of the keyword, remove the tab.
 * the keyword is case insensitive
 *
 * @return Window[]
 */
function removeTabs(windows: Window[], keywords: string[]): Window[] {
  // Convert keywords to lower case for case-insensitive comparison
  const lowerCaseKeywords = keywords.map((keyword) => keyword.toLowerCase());

  return windows.map((window) => {
    // Filter out tabs that contain any of the keywords in their title or URL
    const filteredTabs = window.tabs.filter((tab) => {
      return !lowerCaseKeywords.some(
        (keyword) =>
          tab.title.toLowerCase().includes(keyword) ||
          tab.url.toLowerCase().includes(keyword)
      );
    });

    return {
      ...window,
      tabs: filteredTabs,
    };
  });
}

// Usage
const windows = readJsonFile("input.json");
const combinedWindow = combineAndSortWindows(windows);
const windowAfterRemoveTabs = removeTabs(combinedWindow, [
  "Yomaru",
  "www.google.com/search",
]);
writeJsonFile("output.json", windowAfterRemoveTabs);

// Calculate total number of tabs before and after removing tabs
const totalTabsBefore = windows.reduce(
  (total, window) => total + window.tabs.length,
  0
);
const totalTabsAfter = windowAfterRemoveTabs[0].tabs.length;

console.log("Total number of tabs before: " + totalTabsBefore);
console.log("Total number of tabs after: " + totalTabsAfter, "🎉");
