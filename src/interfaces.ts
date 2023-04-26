export interface IPosTwitch {
  twitchPosX: number;
  twitchPosY: number;
  setTwitchPos: (x: number, y: number) => void;
  setTwitchPosDefault: () => void;
}

export interface IPosNote {
  notePosX: number;
  notePosY: number;
  setNotePos: (x: number, y: number) => void;
  setNotePosDefault: () => void;
}
export interface IPosInput {
  inputPosX: number;
  inputPosY: number;
  setInputPos: (x: number, y: number) => void;
  setInputPosDefault: () => void;
}
export interface IPosSpotify {
  spotifyPosX: number;
  spotifyPosY: number;
  setSpotifyPos: (x: number, y: number) => void;
  setSpotifyPosDefault: () => void;
}
