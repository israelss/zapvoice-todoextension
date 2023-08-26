export type Item = {
  id: string;
  content: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateItemRequestPayload = Pick<Item, "content">;
export type ItemIdPayload = Pick<Item, "id">;

export type AuthRequestPayload = {
  email: string;
  password: string;
};
export type AuthResponseData = {
  email: string;
  access_token: string;
};

export type GetItemsResponseData = Item[];

export type ExtensionMessage =
  | {
      type: "COMPLETE_ITEM_REQUEST" | "REMOVE_ITEM_REQUEST";
      payload: ItemIdPayload;
    }
  | {
      type: "CREATE_ITEM_REQUEST";
      payload: CreateItemRequestPayload;
    }
  | {
      type: "GET_ITEMS_REQUEST";
      payload: null;
    }
  | {
      type: "LOGIN_REQUEST" | "REGISTER_REQUEST";
      payload: AuthRequestPayload;
    }
  | {
      type:
        | "COMPLETE_ITEM_RESPONSE"
        | "CREATE_ITEM_RESPONSE"
        | "REMOVE_ITEM_RESPONSE";
      payload: boolean;
    }
  | {
      type: "GET_ITEMS_RESPONSE";
      payload: GetItemsResponseData;
    };
