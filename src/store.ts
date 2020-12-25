import create from "zustand";
import { IMovieResult, NominationMap } from "@/src/types";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import firebaseConfig from "@/src/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

type State = {
  isAuthenticated: boolean | undefined;
  auth: firebase.auth.Auth;
  analytics: firebase.analytics.Analytics | undefined;
  firestore: firebase.firestore.Firestore;
  nominations: NominationMap;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  initAnalytics: () => Promise<void>;
  addNomination: (nomination: IMovieResult) => void;
  removeNomination: (nomination: IMovieResult) => void;
  setLocalNominations: (nominations: NominationMap) => void;
  setNominations: (nominations: NominationMap) => void;
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
    const { nominations, setNominations } = get();
    if (Object.keys(nominations).length < 5) {
      setNominations({
        ...nominations,
        [nomination.imdbID]: { ...nomination, timestamp: Date.now() },
      });
    }
  },
  removeNomination: (nomination) => {
    const { nominations, setNominations } = get();
    delete nominations[nomination.imdbID];
    setNominations(nominations);
  },
  setLocalNominations: (nominations: NominationMap) =>
    set({ nominations: { ...nominations } }),
  setNominations: (nominations: NominationMap) => {
    const { auth, firestore } = get();

    firestore
      .collection("nominations")
      .doc(auth.currentUser?.uid)
      .set(nominations)
      .then(() => set({ nominations: { ...nominations } }));
  },
  clearNominations: () => get().setNominations({}),
}));

export default useStore;
