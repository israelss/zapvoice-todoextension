import { beforeEach, vi } from "vitest";

beforeEach(() => {
  const envStubs = {
    VITE_API_BASE_URL: "http://localhost:3000",
    VITE_AUTH_ERROR_KEY: "authError",
    VITE_EMAIL_KEY: "email",
    VITE_ITEMS_ERROR_KEY: "itemsError",
    VITE_TOKEN_KEY: "access_token",
  };

  const chromeMock: {
    _storage: Record<string, unknown>;
    action: Record<string, unknown>;
    runtime: Record<string, unknown>;
    storage: Record<string, unknown>;
  } = {
    _storage: {},
    action: {
      setBadgeBackgroundColor: vi.fn(async (details: unknown) =>
        console.log(details),
      ),
      setBadgeText: vi.fn(async (details: unknown) => console.log(details)),
      setBadgeTextColor: vi.fn(async (details: unknown) =>
        console.log(details),
      ),
    },
    runtime: {
      sendMessage: vi.fn(async (message: unknown) => console.log(message)),
      onMessage: {
        addListener: vi.fn(
          () =>
            (changes: {
              [key: string]: { newValue: unknown; oldValue: unknown };
            }) =>
              console.log(changes),
        ),
        removeListener: vi.fn(
          () =>
            (changes: {
              [key: string]: { newValue: unknown; oldValue: unknown };
            }) =>
              console.log(changes),
        ),
      },
      onInstalled: {
        addListener: vi.fn(
          () =>
            (changes: {
              [key: string]: { newValue: unknown; oldValue: unknown };
            }) =>
              console.log(changes),
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
              (changes: {
                [key: string]: { newValue: unknown; oldValue: unknown };
              }) =>
                console.log(changes),
          ),
          removeListener: vi.fn(
            () =>
              (changes: {
                [key: string]: { newValue: unknown; oldValue: unknown };
              }) =>
                console.log(changes),
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

  vi.stubGlobal("chrome", chromeMock);

  for (const [envName, envValue] of Object.entries(envStubs)) {
    vi.stubEnv(envName, envValue);
  }
});
