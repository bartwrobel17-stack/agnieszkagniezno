export type TimeRange = { start: number; end: number };

/** Returns true when two half-open intervals overlap. Times are epoch milliseconds. */
export function rangesOverlap(a: TimeRange, b: TimeRange): boolean {
  return a.start < b.end && b.start < a.end;
}

/** Builds local-time labels for a working window, respecting service and buffer duration. */
export function buildTimeSlots(input: {
  startMinutes: number;
  endMinutes: number;
  durationMinutes: number;
  bufferMinutes?: number;
  stepMinutes?: number;
  busy?: Array<{ startMinutes: number; endMinutes: number }>;
}): string[] {
  const { startMinutes, endMinutes, durationMinutes } = input;
  const buffer = input.bufferMinutes ?? 0;
  const step = input.stepMinutes ?? 15;
  if (![startMinutes, endMinutes, durationMinutes, buffer, step].every(Number.isFinite)) return [];
  if (startMinutes < 0 || endMinutes > 1440 || endMinutes <= startMinutes || durationMinutes <= 0 || buffer < 0 || step <= 0) return [];
  const result: string[] = [];
  for (let start = startMinutes; start + durationMinutes + buffer <= endMinutes; start += step) {
    const end = start + durationMinutes + buffer;
    const overlaps = (input.busy ?? []).some((slot) => start < slot.endMinutes && slot.startMinutes < end);
    if (!overlaps) result.push(`${String(Math.floor(start / 60)).padStart(2, "0")}:${String(start % 60).padStart(2, "0")}`);
  }
  return result;
}
