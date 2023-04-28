import { Forward, Move } from "lucide-react";
import { useState } from "react";
import Draggable from "react-draggable";
import { usePosSpotify } from "~/store";

export const Spotify = () => {
  const [text, setText] = useState("");
  const [playlist, setPlaylist] = useState(
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn"
  );
  const { spotifyPosX, spotifyPosY, setSpotifyPos } = usePosSpotify();
  function changePosition(data: any) {
    setSpotifyPos(data.x, data.y);
  }

  function changePlaylist() {
    if (!text.includes("https://open.spotify.com/playlist/")) {
      alert("Invalid spotify URL");
      return;
    }
    const splitOn = (slicable: string, ...indices: number[]) =>
      [0, ...indices].map((n, i, m) => slicable.slice(n, m[i + 1]));
    const stitchUrl = splitOn(text, 24)[0] + "/embed" + splitOn(text, 24)[1];
    setPlaylist(stitchUrl);
    setText("");
  }

  function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      changePlaylist();
    }
  }
  return (
    <>
      <Draggable
        handle="strong"
        defaultPosition={{ x: spotifyPosX, y: spotifyPosY }}
        onStop={(_, data) => {
          changePosition(data);
        }}
      >
        <div className="flex flex-col gap-2">
          <iframe
            src={`${playlist}?utm_source=generator`}
            height="100%"
            width="100%"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>{" "}
          <div className="flex items-center justify-between gap-4">
            <input
              className="cancelDrag w-full rounded-lg border border-gray-300 p-1 placeholder-gray-600 dark:border-gray-500 dark:bg-gray-700/[.96] dark:placeholder-gray-300"
              type="text"
              placeholder="Paste Spotify URL here"
              onChange={(e) => {
                setText(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <button onClick={changePlaylist}>
              <Forward />
            </button>
            <strong className="cursor-pointer">
              <Move />
            </strong>
          </div>
        </div>
      </Draggable>
    </>
  );
};
