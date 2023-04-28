import { type NextPage } from "next";
import LoadingSpinner from "../components/spinner";
import { useRouter } from "next/router";
import { Move } from "lucide-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import Draggable from "react-draggable";

import { api } from "~/utils/api";
// import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Header from "../components/header";
import { usePosInput } from "~/store";

const SinglePostPage: NextPage = () => {
  // Get note id from URL
  const router = useRouter();
  const query = router.query;
  const id = query.id as string;

  const { data: note, isLoading } = api.notes.findUnique.useQuery({
    noteId: id,
  });
  const { inputPosX, inputPosY, setInputPos } = usePosInput();
  function changePosition(data: any) {
    setInputPos(data.x, data.y);
  }

  // update note
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

  // get user info
  const { data: user } = useSession();
  console.log(user);

  // Show loading spinner if data didn't load yet
  if (isLoading) return <LoadingSpinner size={60} />;
  if (!note) return <div>Something went wrong.</div>;

  return (
    <>
      <Head>
        <title>Note</title>
      </Head>
      <Header />
      {user ? (
        <Draggable
          handle="strong"
          defaultPosition={{ x: inputPosX, y: inputPosY }}
          onStop={(_, data) => {
            changePosition(data);
          }}
        >
          <div className="grid max-w-xl grid-cols-2 grid-rows-2 gap-2">
            <textarea
              placeholder="Type your note"
              rows={10}
              cols={50}
              value={updatedNote}
              className="col-span-3 col-start-1 rounded-md border-2 border-amber-300 bg-amber-200 p-2 text-black outline-none drop-shadow-2xl placeholder:text-slate-600 md:max-w-xl"
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
            <strong className="col-start-2 col-end-3 row-start-2 row-end-3 flex w-16 cursor-pointer justify-end self-start justify-self-end ">
              <Move />
            </strong>
            <button
              className="h-16 w-20 self-start justify-self-start rounded-lg border-2 border-red-300 p-2 transition delay-150 duration-100 ease-in hover:bg-orange-300 dark:hover:bg-orange-300"
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
        </Draggable>
      ) : (
        <p>Please sign in</p>
      )}
    </>
  );
};

export default SinglePostPage;
