import { Api } from "@/api/Api";
import { beforeEach, describe, expect, test } from "vitest";

const checkItemsLengthChange = async (expected: number) => {
  let allItemsLength: number;
  const data = await Api.items.getAll();
  data.ok && (allItemsLength = data.data.length);
  expect(allItemsLength!).toBe(expected);
};

const checkCompletedItemsLengthChange = async (expected: number) => {
  let completedItemsLength: number;
  const data = await Api.items.getAll();
  if (data.ok) {
    completedItemsLength = data.data.filter((item) => item.completed).length;
  }
  expect(completedItemsLength!).toBe(expected);
};

describe("Api", () => {
  describe("items", () => {
    describe("when not logged in should always return unauthorized error", () => {
      test("create", async () => {
        const data = await Api.items.create({ content: "test" });
        expect(data).toStrictEqual({
          message: "Email e/ou senha inválidos",
          ok: false,
        });
      });
      test("getAll", async () => {
        const data = await Api.items.getAll();
        expect(data).toStrictEqual({
          message: "Email e/ou senha inválidos",
          ok: false,
        });
      });
      test("remove", async () => {
        const data = await Api.items.remove({ id: "1" });
        expect(data).toStrictEqual({
          message: "Email e/ou senha inválidos",
          ok: false,
        });
      });
      test("markAsComplete", async () => {
        const data = await Api.items.markAsComplete({ id: "1" });
        expect(data).toStrictEqual({
          message: "Email e/ou senha inválidos",
          ok: false,
        });
      });
    });
    describe("when logged in", () => {
      let allItemsLength: number;
      let completedItemsLength: number;

      beforeEach(async () => {
        chrome.storage.sync.set({
          [import.meta.env.VITE_TOKEN_KEY]: JSON.stringify({
            email: "user1@email.com",
          }),
        });
        allItemsLength = 0;
        const data = await Api.items.getAll();
        if (data.ok) {
          allItemsLength = data.data.length;
          completedItemsLength = data.data.filter(
            (item) => item.completed,
          ).length;
        }
      });
      describe("create", () => {
        test("should return true with correct input", async () => {
          const data = await Api.items.create({ content: "test" });
          expect(data).toStrictEqual({ data: true, ok: true });
          await checkItemsLengthChange(allItemsLength + 1);
        });

        test("should return an error message with incorrect input", async () => {
          const data = await Api.items.create({ content: "" });

          expect(data).toStrictEqual({
            message: ["Content must be a string"],
            ok: false,
          });
          await checkItemsLengthChange(allItemsLength);
        });
      });

      describe("getAll", () => {
        test("should return all items associated with user with correct input", async () => {
          const data = await Api.items.getAll();

          expect(data).toStrictEqual({
            data: items["user1@email.com"],
            ok: true,
          });
        });
      });

      describe("remove", () => {
        test("should remove items associated with user with correct input", async () => {
          const data = await Api.items.remove({ id: "4" });

          expect(data).toStrictEqual({ data: true, ok: true });
          await checkItemsLengthChange(allItemsLength - 1);
        });
      });

      describe("markAsComplete", () => {
        test("should remove items associated with user with correct input", async () => {
          const data = await Api.items.markAsComplete({ id: "1" });

          expect(data).toStrictEqual({ data: true, ok: true });
          await checkCompletedItemsLengthChange(completedItemsLength + 1);
        });
      });
    });
  });
});
