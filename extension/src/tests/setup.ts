import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import { envStubs, itemsMock, mockChrome, server, usersMock } from "./mocks";

afterAll(() => server.close());

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => server.resetHandlers());

beforeEach(() => {
  vi.stubGlobal("items", itemsMock);
  vi.stubGlobal("users", usersMock);
  vi.stubGlobal("chrome", mockChrome());

  for (const [envName, envValue] of Object.entries(envStubs)) {
    vi.stubEnv(envName, envValue);
  }
});
