import { type NextPage } from "next";
import interact from "interactjs";
import { LoadingSpinner } from "../components/spinner";
import { CreateNote } from "../components/CreateNote";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { api } from "~/utils/api";
import { signIn, useSession } from "next-auth/react";

const SinglePostPage: NextPage = () => {
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
      <p>Hello from single note</p>
    </>
  );
};

export default SinglePostPage;
