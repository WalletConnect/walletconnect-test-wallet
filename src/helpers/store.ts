export let store: Storage;

if (
  typeof window !== "undefined" &&
  typeof window.localStorage !== "undefined"
) {
  store = window.localStorage;
}

export const setLocal = (key: string, data: any) => {
  const jsonData = JSON.stringify(data);
  if (store) {
    store.setItem(key, jsonData);
  }
};

export const getLocal = (key: string) => {
  let data = null;
  let raw = null;
  if (store) {
    raw = store.getItem(key);
  }
  if (raw && typeof raw === "string") {
    try {
      data = JSON.parse(raw);
    } catch (error) {
      return null;
    }
  }
  return data;
};

export const removeLocal = (key: string) => {
  if (store) {
    store.removeItem(key);
  }
};

export const updateLocal = (key: string, data: any) => {
  const localData = getLocal(key) || {};
  const mergedData = { ...localData, ...data };
  setLocal(key, mergedData);
};

export const connextStore = {
  get: async (key: string) => {
    const raw = store.getItem(`CF_NODE:${key}`);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return raw;
      }
    }
    if (
      key.endsWith("channel") ||
      key.endsWith("appInstanceIdToProposedAppInstance")
    ) {
      const partialMatches = {};
      for (const k of Object.keys(localStorage)) {
        if (k.includes(`${key}/`)) {
          try {
            partialMatches[
              k.replace("CF_NODE:", "").replace(`${key}/`, "")
            ] = JSON.parse(store.getItem(k) || "");
          } catch {
            partialMatches[
              k.replace("CF_NODE:", "").replace(`${key}/`, "")
            ] = store.getItem(k);
          }
        }
      }
      return partialMatches;
    }
    return raw;
  },
  set: async (pairs: any, allowDelete: any) => {
    for (const pair of pairs) {
      store.setItem(
        `CF_NODE:${pair.key}`,
        typeof pair.value === "string" ? pair.value : JSON.stringify(pair.value)
      );
    }
  }
};
