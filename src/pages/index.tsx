import { type NextPage } from "next";
import Header from "./components/header";
import { LoadingSpinner } from "./components/spinner";
import { CreateNote } from "./components/CreateNote";
import { Move, Forward } from "lucide-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import Draggable from "react-draggable";

import { api } from "~/utils/api";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Twitch } from "./components/Twitch/Twitch";
import { usePosNote } from "~/store";

const Home: NextPage = () => {
  const { data: notes, isLoading } = api.notes.getAll.useQuery();
  const { data: user } = useSession();
  const { notePosX, notePosY, setNotePos } = usePosNote();
  // const [lastPositions, setLastPositions] = useState({});
  const ctx = api.useContext();
  // Delete a note
  const { mutate } = api.notes.delete.useMutation({
    onSuccess: () => {
      // Refresh to display the new note
      void ctx.notes.getAll.invalidate();
    },
  });
  function changePosition(data: any) {
    setNotePos(data.x, data.y);
  }

  // TODO: Save positions of notes (couldn't do it yet)
  // const eventLogger = (e: any, data: any) => {
  //   localStorage.setItem("lastX", data.x);
  //   localStorage.setItem("lastY", data.y);
  //   const x: any = localStorage.getItem("lastX");
  //   const y: any = localStorage.getItem("lastY");
  //   console.log("x", x);
  //   setLastPositions({ x, y });
  //   console.log(lastPositions);
  // };

  // Show loading spinner if data didn't load yet
  if (isLoading) return <LoadingSpinner size={60} />;
  if (!notes) return <div>Something went wrong.</div>;

  return (
    <>
      <Header />

      {user ? (
        <main className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
          <CreateNote />
          <Twitch />
          <div className="container flex  items-center justify-center gap-12 px-4 py-16 ">
            {/* TODO: 
            - Limit dragging area
            - Solve Google Auth problem
            */}
            {notes?.map((note) => (
              <Draggable
                handle="strong"
                defaultPosition={{ x: notePosX, y: notePosY }}
                onStop={(_, data) => changePosition(data)}
              >
                <div
                  key={note.id}
                  className="grid grid-cols-2 grid-rows-2 justify-evenly gap-2 rounded-md bg-orange-300 p-2 text-black drop-shadow-2xl md:h-64 md:w-96"
                >
                  <div className="col-start-1 col-end-4 row-start-1 row-end-3 ">
                    <p>{note.content}</p>
                  </div>
                  <div className="col-start-4 col-end-5 self-start justify-self-end ">
                    <button
                      onClick={() => {
                        mutate({ id: note.id });
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div className="col-start-1 col-end-2 row-start-3 row-end-4 self-start justify-self-start rounded-md border-2 border-black p-2 ">
                    <Link href={`/note/${note.id}`}>
                      <button>Update</button>
                    </Link>
                  </div>
                  <div className="col-start-3 col-end-4 row-start-3 row-end-4 self-end justify-self-end text-xs">
                    <p>{dayjs(note.createdAt).fromNow()}</p>
                  </div>
                  <div className="col-start-4 col-end-5 row-start-3 row-end-4 flex w-16 cursor-pointer justify-end self-end justify-self-end ">
                    <strong>
                      <Move />
                    </strong>
                  </div>
                </div>
              </Draggable>
            ))}
          </div>
        </main>
      ) : (
        <div className="flex items-center justify-center">
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => void signIn()}
          >
            Sign in
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
