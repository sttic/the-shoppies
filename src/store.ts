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
  clearNominations: () => void;
};

const setOnlineNominations = (nominations: NominationMap) => {
  const { currentUser } = firebase.auth();

  if (currentUser) {
    firebase
      .firestore()
      .collection("nominations")
      .doc(currentUser.uid)
      .set(nominations);
  }
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
    const { nominations } = get();
    if (Object.keys(nominations).length < 5) {
      setOnlineNominations({
        ...nominations,
        [nomination.imdbID]: { ...nomination, timestamp: Date.now() },
      });
    }
  },
  removeNomination: (nomination) => {
    const { nominations } = get();
    delete nominations[nomination.imdbID];
    setOnlineNominations(nominations);
  },
  clearNominations: () => setOnlineNominations({}),
  setLocalNominations: (nominations: NominationMap) => {
    const nominationsList = Object.values(nominations)
      .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
      .slice(0, 5);
    const newNominations = nominationsList.reduce(
      (prev, curr) => ({ ...prev, [curr.imdbID]: curr }),
      {}
    );
    set({ nominations: newNominations });
  },
}));

export default useStore;
