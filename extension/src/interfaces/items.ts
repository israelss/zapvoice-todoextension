import { ApiSuccessData } from "./api";

export type Item = {
  id: string;
  content: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateItemRequestPayload = Pick<Item, "content">;
export type ItemIdPayload = Pick<Item, "id">;
export type GetItemsResponseData = ApiSuccessData<Item[]>;
