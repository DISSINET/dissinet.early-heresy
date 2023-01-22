export default function treatLocationsEntry(locationsEntry: string) {
  if (locationsEntry) {
    return locationsEntry
      .replace(/#/gi, "")
      .replace(/\[/gi, "")
      .replace(/\]/gi, "")
      .replace(/\n/gi, " ");
  } else {
    return "";
  }
}
