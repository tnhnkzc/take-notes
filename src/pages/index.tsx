import { type NextPage } from "next";
import interact from "interactjs";
import Header from "./components/header";
import { LoadingSpinner } from "./components/spinner";
import { CreateNote } from "./components/CreateNote";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { api } from "~/utils/api";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: notes, isLoading } = api.notes.getAll.useQuery();
  const { data: user } = useSession();
  const ctx = api.useContext();
  // Delete a note
  const { mutate } = api.notes.delete.useMutation({
    onSuccess: () => {
      // Refresh to display the new note
      void ctx.notes.getAll.invalidate();
    },
  });
  // Show loading spinner if data didn't load yet
  if (isLoading) return <LoadingSpinner size={60} />;
  if (!notes) return <div>Something went wrong.</div>;

  // Draggable notes
  const position = { x: 0, y: 0 };

  interact(".draggable-note").draggable({
    listeners: {
      start(event) {
        console.log(event.type, event.target);
      },
      move(event) {
        position.x += event.dx;
        position.y += event.dy;

        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
    },
  });
  // Draggable input

  interact(".draggable-input").draggable({
    listeners: {
      start(event) {
        console.log(event.type, event.target);
      },
      move(event) {
        position.x += event.dx;
        position.y += event.dy;

        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
    },
  });
  return (
    <>
      <Header />
      {user ? (
        <main className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
          <CreateNote />
          <div className="container flex  items-center justify-center gap-12 px-4 py-16 ">
            {/* TODO: 
            - Limit dragging area
            - Solve Google Auth problem
            */}
            {notes?.map((note) => (
              <div
                key={note.id}
                className="draggable-note grid h-fit w-fit grid-flow-col grid-rows-3 justify-evenly rounded-md bg-orange-300 p-2 text-black drop-shadow-2xl"
              >
                <p className="row-start-1 row-end-4">{note.content}</p>
                <button
                  className="col-start-3 col-end-4 self-start justify-self-end "
                  onClick={() => {
                    mutate({ id: note.id });
                  }}
                >
                  X
                </button>
                <p className="col-span-2 row-start-3 row-end-4 self-end justify-self-end text-xs">
                  {dayjs(note.createdAt).fromNow()}
                </p>
              </div>
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
