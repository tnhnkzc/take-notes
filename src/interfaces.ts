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
