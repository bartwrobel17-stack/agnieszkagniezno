import { describe, expect, it } from "vitest";
import { buildTimeSlots, rangesOverlap } from "../lib/booking";

describe("rangesOverlap", () => {
  it("detects partial and complete overlaps", () => {
    expect(rangesOverlap({ start: 10, end: 20 }, { start: 15, end: 25 })).toBe(true);
    expect(rangesOverlap({ start: 10, end: 20 }, { start: 11, end: 19 })).toBe(true);
  });
  it("treats adjacent intervals as non-overlapping", () => {
    expect(rangesOverlap({ start: 10, end: 20 }, { start: 20, end: 30 })).toBe(false);
  });
});

describe("buildTimeSlots", () => {
  it("creates only slots that fit the working window", () => {
    expect(buildTimeSlots({ startMinutes: 9 * 60, endMinutes: 10 * 60, durationMinutes: 30, stepMinutes: 30 })).toEqual(["09:00", "09:30"]);
  });
  it("excludes slots overlapping existing appointments and buffers", () => {
    expect(buildTimeSlots({ startMinutes: 9 * 60, endMinutes: 11 * 60, durationMinutes: 30, bufferMinutes: 15, stepMinutes: 30, busy: [{ startMinutes: 9 * 60 + 45, endMinutes: 10 * 60 + 15 }] })).toEqual(["09:00", "10:30"]);
  });
  it("returns no slots for invalid input", () => {
    expect(buildTimeSlots({ startMinutes: 600, endMinutes: 500, durationMinutes: 30 })).toEqual([]);
    expect(buildTimeSlots({ startMinutes: 0, endMinutes: 60, durationMinutes: 30, stepMinutes: 0 })).toEqual([]);
  });
});
