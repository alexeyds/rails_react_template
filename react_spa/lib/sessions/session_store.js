import { storeObject, retrieveObject, remove } from "utils/local_storage";
import create from 'zustand';

export const SESSION_STORAGE_KEY = '_l_pay_session';

export let useSessionStore = create(set => ({
  session: retrieveObject(SESSION_STORAGE_KEY),
  setSession: (session) => set({ session: storeObject(SESSION_STORAGE_KEY, session) }),
  clearSession: () => set({ session: remove(SESSION_STORAGE_KEY) })
}));

export function useSession() {
  return useSessionStore(s => s.session);
}
