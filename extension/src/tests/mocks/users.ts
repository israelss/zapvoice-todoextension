import { Item } from "@/interfaces";
import { itemsMock } from ".";

export const usersMock: Record<
  string,
  { id: string; password: string; items: Item[] }
> = {
  "user1@email.com": {
    id: "1",
    password: "12#$abCD",
    items: itemsMock["user1@email.com"],
  },
  "user2@email.com": {
    id: "2",
    password: "12#$abCD",
    items: itemsMock["user2@email.com"],
  },
};
