import create from "zustand";
import { IMovieResult } from "@/src/types";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

interface Nomination extends IMovieResult {
  timestamp: number;
}

type State = {
  isAuthenticated: boolean | undefined;
  auth: firebase.auth.Auth;
  analytics: firebase.analytics.Analytics | undefined;
  firestore: firebase.firestore.Firestore;
  nominations: { [imdbID: string]: Nomination };
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  initAnalytics: () => Promise<void>;
  addNomination: (nomination: IMovieResult) => void;
  removeNomination: (nomination: IMovieResult) => void;
  clearNominations: () => void;
};

const useStore = create<State>((set, get) => ({
  isAuthenticated: undefined,
  auth: firebase.auth(),
  analytics: undefined,
  firestore: firebase.firestore(),
  nominations: {},
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  initAnalytics: async () => {
    if (!get().analytics) {
      let isSupported: boolean;

      try {
        isSupported = await firebase.analytics.isSupported();
      } catch (error) {
        isSupported = false;
      }

      if (firebaseConfig.measurementId && isSupported) {
        set({ analytics: firebase.analytics() });
      }
    }
  },
  addNomination: (nomination) => {
    if (Object.keys(get().nominations).length < 5) {
      set({
        nominations: {
          ...get().nominations,
          [nomination.imdbID]: { ...nomination, timestamp: Date.now() },
        },
      });
    }
  },
  removeNomination: (nomination) => {
    const { nominations } = get();
    delete nominations[nomination.imdbID];
    set({ nominations: { ...nominations } });
  },
  clearNominations: () => set({ nominations: {} }),
}));

export default useStore;
