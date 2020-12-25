import create from "zustand";
import { IMovieResult } from "@/src/types";

interface Nomination extends IMovieResult {
  timestamp: number;
}

type State = {
  nominations: { [imdbID: string]: Nomination };
  addNomination: (nomination: IMovieResult) => void;
  removeNomination: (nomination: IMovieResult) => void;
  clearNominations: () => void;
};

const useStore = create<State>((set, get) => ({
  nominations: {},
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
