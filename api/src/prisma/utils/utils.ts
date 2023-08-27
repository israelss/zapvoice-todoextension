export function excludeField<T, Key extends keyof T>(
  model: T,
  keys: Key[],
): Omit<T, Key> {
  return Object.fromEntries(
    Object.entries(model).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<T, Key>;
}
