import { Api } from "@/api/Api";
import { AuthRequestPayload } from "@/interfaces";
import { describe, expect, test } from "vitest";

describe("Api", () => {
  describe("auth", () => {
    describe("login", () => {
      test("should return email and token with correct input", async () => {
        const payload: AuthRequestPayload = {
          email: "user1@email.com",
          password: "12#$abCD",
        };
        const apiDataResponse = {
          email: payload.email,
          access_token: JSON.stringify({
            email: payload.email,
          }),
        };
        const data = await Api.auth.login(payload);

        expect(data).toStrictEqual({ data: apiDataResponse, ok: true });
      });

      test("should return an error message with incorrect input", async () => {
        const payloadWrongPassword: AuthRequestPayload = {
          email: "user1@email.com",
          password: "12#$abCD1",
        };

        const data = await Api.auth.login(payloadWrongPassword);

        expect(data).toStrictEqual({
          message: "Email e/ou senha inválidos",
          ok: false,
        });

        const payloadWrongUser: AuthRequestPayload = {
          email: "user3@email.com",
          password: "12#$abCD",
        };

        const data2 = await Api.auth.login(payloadWrongUser);

        expect(data2).toStrictEqual({
          message: "Email e/ou senha inválidos",
          ok: false,
        });
      });
    });

    describe("register", () => {
      test("should return email and token with correct input", async () => {
        const payload: AuthRequestPayload = {
          email: "test@email.com",
          password: "12#$abCD",
        };

        const data = await Api.auth.register(payload);

        expect(data).toStrictEqual({
          data: {
            email: payload.email,
            access_token: JSON.stringify({
              email: payload.email,
            }),
          },
          ok: true,
        });
      });

      describe("should return an error message with incorrect input", () => {
        test("- weak password", async () => {
          const payload: AuthRequestPayload = {
            email: "test2@email.com",
            password: "12345678",
          };

          const data = await Api.auth.register(payload);

          expect(data).toStrictEqual({
            message: [
              "A senha precisa ter no mínimo 8 dígitos com pelo menos 1 número e 1 símbolo",
            ],
            ok: false,
          });
        });

        test("- existing user", async () => {
          const payload: AuthRequestPayload = {
            email: "test@email.com",
            password: "12#$abCD",
          };

          const data = await Api.auth.register(payload);

          expect(data).toStrictEqual({
            message: "Usuário já cadastrado",
            ok: false,
          });
        });
      });
    });
  });
});
