import { Item } from "@/interfaces";
import { rest } from "msw";
import { unauthorizedResponse } from "./shared";

const newItem = (id: string, content: string): Item => ({
  id,
  content,
  completed: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

const createItemHandler = rest.post(
  `${import.meta.env.VITE_API_BASE_URL}/items`,
  async (req, res, ctx) => {
    const accessToken = req.headers.get("Authorization");
    if (!accessToken || accessToken === "Bearer undefined") {
      return unauthorizedResponse(res, ctx);
    }

    const body = await req.json();
    const content = body.content;

    if (content === "") {
      return res(
        ctx.status(400),
        ctx.json({
          message: ["Content must be a string"],
          ok: false,
        }),
      );
    }

    const email = JSON.parse(accessToken.split(" ")[1]).email;
    const newId = String(items[email].length + 1);
    items[email].push(newItem(newId, content));

    return res(ctx.status(201), ctx.json(true));
  },
);

const getAllItemsHandler = rest.get(
  `${import.meta.env.VITE_API_BASE_URL}/items`,
  (req, res, ctx) => {
    const accessToken = req.headers.get("Authorization");
    if (!accessToken || accessToken === "Bearer undefined") {
      return unauthorizedResponse(res, ctx);
    }

    const email = JSON.parse(accessToken.split(" ")[1]).email;

    return res(ctx.status(200), ctx.json(users[email].items));
  },
);

const removeItemHandler = rest.delete(
  `${import.meta.env.VITE_API_BASE_URL}/items/:id`,
  async (req, res, ctx) => {
    const accessToken = req.headers.get("Authorization");
    if (!accessToken || accessToken === "Bearer undefined") {
      return unauthorizedResponse(res, ctx);
    }

    const id = req.params.id;
    const email = JSON.parse(accessToken.split(" ")[1]).email;

    const itemIndex = items[email].findIndex((item) => item.id === id);
    items[email].splice(itemIndex, 1);

    return res(ctx.status(200), ctx.json(true));
  },
);

const markAsCompleteHandler = rest.patch(
  `${import.meta.env.VITE_API_BASE_URL}/items/:id/complete`,
  async (req, res, ctx) => {
    const accessToken = req.headers.get("Authorization");
    if (!accessToken || accessToken === "Bearer undefined") {
      return unauthorizedResponse(res, ctx);
    }

    const id = req.params.id;
    const email = JSON.parse(accessToken.split(" ")[1]).email;

    const itemIndex = items[email].findIndex((item) => item.id === id);
    const oldItem = items[email][itemIndex];
    const newItem = {
      ...oldItem,
      completed: true,
    };
    items[email].splice(itemIndex, 1, newItem);

    return res(ctx.status(200), ctx.json(true));
  },
);

export const itemsHandlers = [
  getAllItemsHandler,
  createItemHandler,
  markAsCompleteHandler,
  removeItemHandler,
];
