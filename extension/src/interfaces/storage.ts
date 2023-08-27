export type StorageChanges = { [key: string]: chrome.storage.StorageChange };
export type StorageChangesCallback = (changes: StorageChanges) => void;
