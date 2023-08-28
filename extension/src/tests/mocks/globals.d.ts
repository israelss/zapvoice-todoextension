import { itemsMock, usersMock } from ".";

declare global {
  const items: typeof itemsMock;
  const users: typeof usersMock;
}
