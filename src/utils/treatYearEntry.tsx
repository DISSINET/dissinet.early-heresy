export default function treatYearEntry(yearEntry: string) {
  return parseInt(yearEntry.replace(/~/gi, ""));
}
