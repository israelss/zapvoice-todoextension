import { Item } from "@/interfaces";

export const itemsMock: Record<string, Item[]> = {
  "user1@email.com": [
    {
      id: "1",
      content: "test 1",
      completed: false,
      created_at: "2023-08-26T00:00:00.000Z",
      updated_at: "2023-08-26T00:00:00.000Z",
    },
    {
      id: "2",
      content: "test 2",
      completed: false,
      created_at: "2023-08-26T00:00:00.000Z",
      updated_at: "2023-08-26T00:00:00.000Z",
    },
    {
      id: "3",
      content: "test 3",
      completed: true,
      created_at: "2023-08-26T00:00:00.000Z",
      updated_at: "2023-08-27T00:00:00.000Z",
    },
  ],
  "user2@email.com": [],
};
