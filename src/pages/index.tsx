import { type NextPage } from "next";
import interact from "interactjs";
import Header from "./components/header";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Something went wrong.</div>;

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
      <main className="flex w-full flex-col items-center justify-center gap-4">
        <CreateNote />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {/* TODO: Limit dragging area*/}
          {data?.map((note) => (
            <div
              key={note.id}
              className="draggable-note flex h-40 w-40 items-center justify-center rounded-md bg-indigo-500"
            >
              {note.content}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

const CreateNote = () => {
  return (
    <textarea
      placeholder="Type your note"
      rows={10}
      cols={50}
      className="draggable-input rounded-md border-2 border-amber-300 bg-amber-200 p-2 text-black outline-none placeholder:text-slate-600 md:max-w-md"
    />
  );
};

export default Home;
