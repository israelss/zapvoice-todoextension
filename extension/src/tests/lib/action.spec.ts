import { setBadge } from "@/lib/utils";
import { describe, expect, test } from "vitest";

describe("chrome action abstractions", () => {
  describe("setBadge", () => {
    test("should set badge text to '' if count is null", async () => {
      await setBadge(null);
      expect(chrome.action.setBadgeText).toHaveBeenCalledWith({
        text: "",
      });
    });

    describe("should set badge text to count (as string) and set colors correctly", () => {
      test("when count is 0", async () => {
        await setBadge(0);
        expect(chrome.action.setBadgeText).toHaveBeenCalledWith({
          text: "0",
        });
        expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({
          color: [255, 255, 255, 255],
        });
        expect(chrome.action.setBadgeTextColor).toHaveBeenCalledWith({
          color: [0, 0, 0, 255],
        });
      });

      test("when count is >= 1 && < 4", async () => {
        for (let count = 1; count < 4; count++) {
          await setBadge(count);
          expect(chrome.action.setBadgeText).toHaveBeenCalledWith({
            text: String(count),
          });
          expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({
            color: [165, 243, 252, 255],
          });
          expect(chrome.action.setBadgeTextColor).toHaveBeenCalledWith({
            color: [8, 145, 178, 255],
          });
        }
      });

      test("when count is >= 4 && < 7", async () => {
        for (let count = 4; count < 7; count++) {
          await setBadge(count);
          expect(chrome.action.setBadgeText).toHaveBeenCalledWith({
            text: String(count),
          });
          expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({
            color: [16, 185, 129, 255],
          });
          expect(chrome.action.setBadgeTextColor).toHaveBeenCalledWith({
            color: [209, 250, 229, 255],
          });
        }
      });

      test("when count is >= 7", async () => {
        for (let count = 7; count < 11; count++) {
          await setBadge(count);
          expect(chrome.action.setBadgeText).toHaveBeenCalledWith({
            text: String(count),
          });
          expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith({
            color: [239, 68, 68, 255],
          });
          expect(chrome.action.setBadgeTextColor).toHaveBeenCalledWith({
            color: [248, 250, 252, 255],
          });
        }
      });
    });
  });
});
