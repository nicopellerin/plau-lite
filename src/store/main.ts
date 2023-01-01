export const storeGet = (key: string) =>
  localStorage.getItem(key) as string | undefined;
export const storeSet = (key: string, value: string) =>
  localStorage.setItem(key, value);
export const storeDelete = (key: string) => localStorage.removeItem(key);
