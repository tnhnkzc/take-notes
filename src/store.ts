import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IPosNote, IPosTwitch } from "./interfaces";

export const usePosTwitch = create<IPosTwitch>(
  persist(
    (set, _) => ({
      twitchPosX: 0,
      twitchPosY: 0,
      setTwitchPos: (x, y) => set({ twitchPosX: x, twitchPosY: y }),
      setTwitchPosDefault: () =>
        set(() => ({ twitchPosX: 1208, twitchPosY: 0 })),
    }),
    { name: "set_twitch_position" }
  )
);

export const usePosNote = create<IPosNote>(
  persist(
    (set, _) => ({
      notePosX: 0,
      notePosY: 0,
      setNotePos: (x, y) => set({ notePosX: x, notePosY: y }),
      setNotePosDefault: () => set(() => ({ notePosX: 1208, notePosY: 0 })),
    }),
    { name: "set_note_position" }
  )
);
