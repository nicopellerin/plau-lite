import Store from "electron-store";

export const store = new Store();

export const storeGet = (key: string) => store.get(key) as string | undefined;
export const storeSet = (key: string, value: string) => store.set(key, value);
export const storeDelete = (key: string) => store.delete(key);
