export default function treatLocationsEntry(locationsEntry: string) {
  return locationsEntry
    .replace(/#/gi, "")
    .replace(/\[/gi, "")
    .replace(/\]/gi, "")
    .replace(/\n/gi, " ");
}
