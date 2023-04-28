import { Move, Forward } from "lucide-react";

import Draggable from "react-draggable";

import { useState } from "react";
import { usePosTwitch } from "~/store";

const Twitch = () => {
  const [streamerName, setStreamerName] = useState<string>("");
  const [inputText, setInputText] = useState("");
  const { twitchPosX, twitchPosY, setTwitchPos } = usePosTwitch();
  function changePosition(data: any) {
    setTwitchPos(data.x, data.y);
  }
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleStreamerChange(e.target.value);
    }
  };
  const handleStreamerChange = (streamName: string) => {
    setStreamerName(streamName);
  };
  return (
    <Draggable
      handle="strong"
      defaultPosition={{ x: twitchPosX, y: twitchPosY }}
      onStop={(_, data) => changePosition(data)}
    >
      <div className="relative flex aspect-video flex-col gap-2 md:h-80 md:w-96">
        <h3>Twitch</h3>
        <iframe
          className="left-0 h-full w-full"
          src={
            "https://player.twitch.tv/?channel=" +
            streamerName +
            "&parent=localhost"
          }
          allowFullScreen
        ></iframe>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="rounded-md border-2 border-orange-300 p-2"
              placeholder="Search streamer"
              onChange={(e) => {
                setInputText(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <Forward
              className="cursor-pointer"
              onClick={() => {
                handleStreamerChange(inputText);
              }}
            />
          </div>
          <strong className="cursor-pointer">
            <Move />
          </strong>
        </div>
      </div>
    </Draggable>
  );
};
export default Twitch;
