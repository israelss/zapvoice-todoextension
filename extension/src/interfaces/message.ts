import { ApiErrorMessage } from "./api";
import { AuthRequestPayload } from "./auth";
import {
  CreateItemRequestPayload,
  GetItemsResponseData,
  ItemIdPayload,
} from "./items";

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
      type: "CLEAR_ITEMS_REQUEST" | "GET_ITEMS_REQUEST";
      payload: null;
    }
  | {
      type: "LOGIN_REQUEST" | "REGISTER_REQUEST";
      payload: AuthRequestPayload;
    }
  | {
      type: "API_ITEM_ERROR";
      payload: ApiErrorMessage;
    }
  | {
      type: "GET_ITEMS_RESPONSE";
      payload: GetItemsResponseData | ApiErrorMessage;
    };
