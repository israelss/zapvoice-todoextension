export type Item = {
  id: string;
  content: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateItemRequest = Pick<Item, "content">;
export type MarkAsCompleteItemRequest = Pick<Item, "id">;

export type AuthRequestData = {
  email: string;
  password: string;
};
export type AuthResponse = {
  email: string;
  access_token: string;
};

export type GetItemsResponse = Item[];

export type ExtensionMessage =
  | {
      type: "COMPLETE_ITEM_REQUEST";
      payload: MarkAsCompleteItemRequest;
    }
  | {
      type: "CREATE_ITEM_REQUEST";
      payload: CreateItemRequest;
    }
  | {
      type: "GET_ITEMS_REQUEST";
      payload: null;
    }
  | {
      type: "LOGIN_REQUEST" | "REGISTER_REQUEST";
      payload: AuthRequestData;
    }
  | {
      type: "COMPLETE_ITEM_RESPONSE" | "CREATE_ITEM_RESPONSE";
      payload: boolean;
    }
  | {
      type: "GET_ITEMS_RESPONSE";
      payload: GetItemsResponse;
    };
