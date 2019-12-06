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

const CF_STORE_PREFIX = "CF_NODE:";

interface ICFStorePair {
  path: string;
  value: any;
}

export const cfStore = {
  get: async (path: string): Promise<any> => {
    const raw = store.getItem(`${CF_STORE_PREFIX}${path}`);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return raw;
      }
    }
    // Handle partial matches so the following line works -.-
    // https://github.com/counterfactual/monorepo/blob/master/packages/node/src/store.ts#L54
    if (
      path.endsWith("channel") ||
      path.endsWith("appInstanceIdToProposedAppInstance")
    ) {
      const partialMatches = {};
      for (const k of Object.keys(localStorage)) {
        if (k.includes(`${path}/`)) {
          try {
            partialMatches[
              k.replace(CF_STORE_PREFIX, "").replace(`${path}/`, "")
            ] = JSON.parse(store.getItem(k) || "");
          } catch {
            partialMatches[
              k.replace(CF_STORE_PREFIX, "").replace(`${path}/`, "")
            ] = store.getItem(k);
          }
        }
      }
      return partialMatches;
    }
    return raw;
  },
  set: async (pairs: ICFStorePair[]): Promise<void> => {
    for (const pair of pairs) {
      store.setItem(
        `${CF_STORE_PREFIX}${pair.path}`,
        typeof pair.value === "string" ? pair.value : JSON.stringify(pair.value)
      );
    }
  },
  reset: async (): Promise<void> => {
    Object.entries(localStorage).forEach(([key, value]) => {
      if (key.includes(CF_STORE_PREFIX)) {
        store.removeItem(key);
      }
    });
    store.removeItem(`${CF_STORE_PREFIX}:EXTENDED_PRIVATE_KEY`);
  },
  restore: (): Promise<ICFStorePair[]> => Promise.resolve([])
};
