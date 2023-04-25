import { api } from "~/utils/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { LoadingSpinner } from "./spinner";

export const CreateNote = () => {
  const [input, setInput] = useState<string>("");
  const ctx = api.useContext();
  const { mutate, isLoading: isAdding } = api.notes.create.useMutation({
    onSuccess: () => {
      // set the text area empty
      setInput("");
      // Refresh to display the new note
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
  return (
    <>
      <div className="draggable-input flex flex-col gap-4">
        <textarea
          placeholder="Type your note"
          rows={10}
          cols={50}
          className="rounded-md border-2 border-amber-300 bg-amber-200 p-2 text-black outline-none drop-shadow-2xl placeholder:text-slate-600 md:max-w-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (input !== "") {
                mutate({ content: input });
              }
            }
          }}
          disabled={isAdding}
        />
        {input !== "" && !isAdding && (
          <button
            className="w-fit self-end rounded-lg border-2 border-red-300 p-2 transition delay-150 duration-100 ease-in hover:bg-orange-300 dark:hover:bg-orange-300"
            onClick={() => mutate({ content: input })}
            disabled={isAdding}
          >
            Add
          </button>
        )}
        {isAdding && (
          <div>
            <LoadingSpinner size={20} />
          </div>
        )}
      </div>
    </>
  );
};
