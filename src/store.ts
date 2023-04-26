import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IPosInput, IPosNote, IPosSpotify, IPosTwitch } from "./interfaces";

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
export const usePosInput = create<IPosInput>(
  persist(
    (set, _) => ({
      inputPosX: 0,
      inputPosY: 0,
      setInputPos: (x, y) => set({ inputPosX: x, inputPosY: y }),
      setInputPosDefault: () => set(() => ({ inputPosX: 1208, inputPosY: 0 })),
    }),
    { name: "set_input_position" }
  )
);
export const usePosSpotify = create<IPosSpotify>(
  persist(
    (set, _) => ({
      spotfiyPosX: 0,
      spotfiyPosY: 0,
      setSpotifyPos: (x, y) => set({ spotifyPosX: x, spotifyPosY: y }),
      setSpotifyPosDefault: () =>
        set(() => ({ spotifyPosX: 1208, spotifyPosY: 0 })),
    }),
    { name: "set_spotify_position" }
  )
);
