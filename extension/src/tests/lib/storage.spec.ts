import { storage } from "@/lib/storage";
import { describe, expect, test, vi } from "vitest";

describe("chrome storage abstractions", () => {
  describe("getToken", () => {
    test("should return a token if found at storage", async () => {
      await chrome.storage.sync.set({
        [import.meta.env.VITE_TOKEN_KEY]: "testToken",
      });
      expect(storage.getToken()).resolves.toBe("testToken");
    });

    test("should return undefined if token not found at storage", async () => {
      expect(storage.getToken()).resolves.toBeUndefined();
    });
  });

  describe("getEmail", () => {
    test("should return an email if found at storage", async () => {
      await chrome.storage.sync.set({
        [import.meta.env.VITE_EMAIL_KEY]: "test@email.com",
      });
      expect(storage.getEmail()).resolves.toBe("test@email.com");
    });

    test("should return undefined if email not found at storage", async () => {
      expect(storage.getEmail()).resolves.toBeUndefined();
    });
  });

  describe("remove", () => {
    test("should remove an item from storage", async () => {
      await chrome.storage.sync.set({
        [import.meta.env.VITE_ERROR_KEY]: "testError",
      });
      expect(
        chrome.storage.sync.get(import.meta.env.VITE_ERROR_KEY),
      ).resolves.toStrictEqual({
        [import.meta.env.VITE_ERROR_KEY]: "testError",
      });
      await storage.remove(import.meta.env.VITE_ERROR_KEY);
      expect(
        chrome.storage.sync.get(import.meta.env.VITE_ERROR_KEY),
      ).resolves.toStrictEqual({
        [import.meta.env.VITE_ERROR_KEY]: undefined,
      });
    });
  });

  describe("clear", () => {
    test("should clear storage", async () => {
      await chrome.storage.sync.set({
        [import.meta.env.VITE_ERROR_KEY]: "testError",
        [import.meta.env.VITE_TOKEN_KEY]: "testToken",
        [import.meta.env.VITE_EMAIL_KEY]: "test@email.com",
      });
      expect(
        chrome.storage.sync.get(import.meta.env.VITE_ERROR_KEY),
      ).resolves.toStrictEqual({
        [import.meta.env.VITE_ERROR_KEY]: "testError",
      });
      expect(storage.getToken()).resolves.toBe("testToken");
      expect(storage.getEmail()).resolves.toBe("test@email.com");

      await storage.clear();
      expect(
        chrome.storage.sync.get(import.meta.env.VITE_ERROR_KEY),
      ).resolves.toStrictEqual({
        [import.meta.env.VITE_ERROR_KEY]: undefined,
      });
      expect(storage.getToken()).resolves.toBeUndefined();
      expect(storage.getEmail()).resolves.toBeUndefined();
    });
  });

  describe("onChanged", () => {
    const callback = vi.fn();
    test("addListener should call chrome API with same callback", async () => {
      await storage.onChanged.addListener(callback);
      expect(chrome.storage.sync.onChanged.addListener).toHaveBeenCalledWith(
        callback,
      );
    });

    test("removeListener should call chrome API with same callback", async () => {
      await storage.onChanged.removeListener(callback);
      expect(chrome.storage.sync.onChanged.removeListener).toHaveBeenCalledWith(
        callback,
      );
    });
  });
});
