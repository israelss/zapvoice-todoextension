import { ExtensionMessage } from "@/interfaces";
import { runtime } from "@/lib/utils";
import { describe, expect, test, vi } from "vitest";

describe("chrome runtime abstractions", () => {
  describe("sendMessage", () => {
    const payload: ExtensionMessage = {
      type: "GET_ITEMS_REQUEST",
      payload: null,
    };
    test("should call chrome API with same payload", async () => {
      await runtime.sendMessage(payload);
      expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(payload);
    });
  });

  describe("onMessage", () => {
    const callback = vi.fn();
    test("addListener should call chrome API with same callback", async () => {
      await runtime.onMessage.addListener(callback);
      expect(chrome.runtime.onMessage.addListener).toHaveBeenCalledWith(
        callback,
      );
    });

    test("removeListener should call chrome API with same callback", async () => {
      await runtime.onMessage.removeListener(callback);
      expect(chrome.runtime.onMessage.removeListener).toHaveBeenCalledWith(
        callback,
      );
    });
  });

  describe("onInstalled", () => {
    const callback = vi.fn();
    test("addListener should call chrome API with same callback", async () => {
      await runtime.onInstalled.addListener(callback);
      expect(chrome.runtime.onInstalled.addListener).toHaveBeenCalledWith(
        callback,
      );
    });
  });
});
