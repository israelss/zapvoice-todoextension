import { authHandlers } from "./auth";
import { itemsHandlers } from "./items";

export const handlers = [...authHandlers, ...itemsHandlers];
