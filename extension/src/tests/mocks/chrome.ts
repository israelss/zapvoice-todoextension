/* eslint-disable @typescript-eslint/no-unused-vars */
import { vi } from "vitest";

type ChromeMock = {
  _storage: Record<string, unknown>;
  action: Record<string, unknown>;
  runtime: Record<string, unknown>;
  storage: Record<string, unknown>;
};

export const mockChrome = () => {
  const chromeMock: ChromeMock = {
    _storage: {},
    action: {
      setBadgeBackgroundColor: vi.fn(async (_details: unknown) => {}),
      setBadgeText: vi.fn(async (_details: unknown) => {}),
      setBadgeTextColor: vi.fn(async (_details: unknown) => {}),
    },
    runtime: {
      sendMessage: vi.fn(async (_message: unknown) => {}),
      onMessage: {
        addListener: vi.fn(
          () =>
            (_changes: {
              [key: string]: { newValue: unknown; oldValue: unknown };
            }) => {},
        ),
        removeListener: vi.fn(
          () =>
            (_changes: {
              [key: string]: { newValue: unknown; oldValue: unknown };
            }) => {},
        ),
      },
      onInstalled: {
        addListener: vi.fn(
          () =>
            (_changes: {
              [key: string]: { newValue: unknown; oldValue: unknown };
            }) => {},
        ),
      },
    },
    storage: {
      sync: {
        clear: vi.fn(async () => {
          chromeMock._storage = {};
        }),
        get: vi.fn(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async (keys?: string | string[] | { [key: string]: any } | null) => {
            if (keys === null || keys === undefined) {
              return Promise.resolve(chromeMock._storage);
            }
            if (Array.isArray(keys)) {
              const result: Record<string, unknown> = {};
              for (const [key, value] of Object.entries(chromeMock._storage)) {
                if (keys.includes(key)) {
                  result[key] = value;
                }
              }
              return Promise.resolve(result);
            }
            if (typeof keys === "string") {
              return Promise.resolve({ [keys]: chromeMock._storage[keys] });
            }
            const result: Record<string, unknown> = {};
            for (const [key, value] of Object.entries(keys)) {
              if (Object.keys(chromeMock._storage).includes(key)) {
                result[key] = chromeMock._storage[key];
              } else {
                result[key] = value;
              }
            }
            return Promise.resolve(result);
          },
        ),
        onChanged: {
          addListener: vi.fn(
            () =>
              (_changes: {
                [key: string]: { newValue: unknown; oldValue: unknown };
              }) => {},
          ),
          removeListener: vi.fn(
            () =>
              (_changes: {
                [key: string]: { newValue: unknown; oldValue: unknown };
              }) => {},
          ),
        },
        remove: vi.fn(async (keys: string | string[]) => {
          if (Array.isArray(keys)) {
            for (const key of keys) {
              delete chromeMock._storage[key];
            }
            return;
          }
          delete chromeMock._storage[keys];
        }),
        set: vi.fn(async (values: Record<string, unknown>) => {
          for (const [key, value] of Object.entries(values)) {
            chromeMock._storage[key] = value;
          }
        }),
      },
    },
  };

  return chromeMock;
};
