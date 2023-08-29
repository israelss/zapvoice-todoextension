import { Api } from "@/api/Api";
import {
  ApiErrorMessage,
  ApiSuccessData,
  CreateItemRequestPayload,
  Item,
  ItemIdPayload,
} from "@/interfaces";
import { errorKey, runtime, storage } from "@/lib/utils";

export const getItems = async () => {
  await storage.remove(errorKey);
  const data = await Api.items.getAll();
  processData(data);
};

export const createItem = async (payload: CreateItemRequestPayload) => {
  await storage.remove(errorKey);
  const data = await Api.items.create(payload);
  data.ok
    ? getItems()
    : storage.setError(
        "Não foi possível criar a tarefa. Tente novamente mais tarde",
      );
};

export const completeItem = async (payload: ItemIdPayload) => {
  await storage.remove(errorKey);
  const data = await Api.items.markAsComplete(payload);
  data.ok
    ? getItems()
    : storage.setError(
        "Não foi possível marcar a tarefa como completa. Tente novamente mais tarde",
      );
};

export const removeItem = async (payload: ItemIdPayload) => {
  await storage.remove(errorKey);
  const data = await Api.items.remove(payload);
  data.ok
    ? getItems()
    : storage.setError(
        "Não foi possível remover a tarefa. Tente novamente mais tarde",
      );
};

async function processData(data: ApiSuccessData<Item[]> | ApiErrorMessage) {
  if (data.ok) {
    runtime.sendMessage({
      type: "GET_ITEMS_RESPONSE",
      payload: data,
    });
  } else {
    storage.setError(
      "Não foi possível carregar as tarefas. Tente novamente mais tarde",
    );
  }
}
