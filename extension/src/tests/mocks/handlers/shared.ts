import { DefaultBodyType, ResponseComposition, RestContext } from "msw";

export const unauthorizedResponse = (
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) =>
  res(
    ctx.status(401),
    ctx.json({
      error: "Unauthorized",
      message: "Email e/ou senha inválidos",
      statusCode: 401,
    }),
  );
