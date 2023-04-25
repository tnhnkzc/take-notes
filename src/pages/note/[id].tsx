import { type NextPage } from "next";
import interact from "interactjs";
import { LoadingSpinner } from "../components/spinner";
import { useRouter } from "next/router";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { api } from "~/utils/api";
// import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";

const SinglePostPage: NextPage = () => {
  // Get note id from URL
  const router = useRouter();
  const query = router.query;
  const id = query.id as string;

  const { data: note, isLoading } = api.notes.findUnique.useQuery({
    noteId: id,
  });

  const [updatedNote, setUpdatedNote] = useState<string>(note?.content!);
  const ctx = api.useContext();
  const { mutate, isLoading: isAdding } = api.notes.update.useMutation({
    onSuccess: () => {
      // set the text area empty
      setUpdatedNote("");
      router.push("/");
      void ctx.notes.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to add a note. Please try again later.");
      }
    },
  });
  // const { data: user } = useSession();
  // const ctx = api.useContext();
  // Delete a note
  // const { mutate } = api.notes.delete.useMutation({
  //   onSuccess: () => {
  //     // Refresh to display the new note
  //     void ctx.notes.getAll.invalidate();
  //   },
  // });

  // Show loading spinner if data didn't load yet
  if (isLoading) return <LoadingSpinner size={60} />;
  if (!note) return <div>Something went wrong.</div>;

  // Draggable notes
  const position = { x: 0, y: 0 };

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
      <Head>
        <title>Note</title>
      </Head>
      <div className="draggable-input flex max-w-xl flex-col gap-4">
        <textarea
          placeholder="Type your note"
          rows={10}
          cols={50}
          value={updatedNote}
          className="rounded-md border-2 border-amber-300 bg-amber-200 p-2 text-black outline-none drop-shadow-2xl placeholder:text-slate-600 md:max-w-xl"
          onChange={(e) => setUpdatedNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (updatedNote !== "") {
                mutate({ content: updatedNote, id: id });
              }
            }
          }}
          disabled={isAdding}
        />
        <button
          className="w-fit rounded-lg border-2 border-red-300 p-2 transition delay-150 duration-100 ease-in hover:bg-orange-300 dark:hover:bg-orange-300"
          onClick={() => mutate({ content: updatedNote, id: id })}
          disabled={isAdding}
        >
          Update
        </button>
        {isAdding && (
          <div>
            <LoadingSpinner size={20} />
          </div>
        )}
      </div>
    </>
  );
};

export default SinglePostPage;
