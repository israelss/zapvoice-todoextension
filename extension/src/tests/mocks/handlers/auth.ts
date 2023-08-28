import { Item } from "@/interfaces";
import { rest } from "msw";
import { unauthorizedResponse } from "./shared";

const passwordRegex =
  /(?=[A-Za-z0-9-#!$@£%^&*()_+|~=`{}[\]:";'<>?,./ ]+$)^(?=.*[a-z])(?=.*[0-9])(?=.*[-#!$@£%^&*()_+|~=`{}[\]:";'<>?,./ ])(?=.{8,}).*$/;

const newUser = (
  id: string,
  email: string,
  password: string,
): { id: string; password: string; items: Item[] } => ({
  id,
  password,
  items: items[email],
});

const loginHandler = rest.post(
  `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
  async (req, res, ctx) => {
    const body = await req.json();
    const email = body.email;
    const password = body.password;
    if (
      Object.keys(users).includes(email) &&
      users[email].password === password
    ) {
      return res(
        ctx.status(200),
        ctx.json({
          email,
          access_token: JSON.stringify({
            email,
          }),
        }),
      );
    }

    return unauthorizedResponse(res, ctx);
  },
);

const registerHandler = rest.post(
  `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
  async (req, res, ctx) => {
    const body = await req.json();
    const email = body.email;
    if (Object.keys(users).includes(email)) {
      return res(
        ctx.status(400),
        ctx.json({
          statusCode: 400,
          message: "Usuário já cadastrado",
        }),
      );
    }
    const password = body.password;
    if (!passwordRegex.test(password)) {
      return res(
        ctx.status(400),
        ctx.json({
          message: [
            "A senha precisa ter no mínimo 8 dígitos com pelo menos 1 número e 1 símbolo",
          ],
          error: "Bad Request",
          statusCode: 400,
        }),
      );
    }

    const newId = String(Object.keys(users).length + 1);
    users[email] = newUser(newId, email, password);
    items[email] = [];

    return res(
      ctx.status(201),
      ctx.json({
        email,
        access_token: JSON.stringify({
          email,
        }),
      }),
    );
  },
);

export const authHandlers = [loginHandler, registerHandler];
