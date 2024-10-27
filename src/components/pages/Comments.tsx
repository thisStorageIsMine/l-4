import { useQuery } from "react-query";
import { supabase } from "../../supabase";
import { Database, Tables } from "../../supabase/types";
import { useAddComment, useTitle } from "../../hooks";
import { useUser } from "../../store";
import { Navigate } from "react-router-dom";
import { FormEventHandler, useEffect, useState } from "react";
import { useErrorNotification } from "../ui/Notifications/hooks";

const Comments = () => {
  useTitle("Коментаричноя");
  const userId = useUser((state) => state.user?.id);
  const [comment, setComment] = useState("");

  const createErrorNotification = useErrorNotification();

  const { sendComment, isError: isErrorSendComment } = useAddComment(
    userId || 1,
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: "comments",
    queryFn: async () => {
      const { data, error } = await supabase.from("comments").select(`
          *,
          users ( * )
          `);

      if (error) {
        throw new Error("Bebra");
      }

      return data;
    },
    keepPreviousData: true,
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (isErrorSendComment) {
      createErrorNotification("Ошибка", "Не получилось отправить комментарий");
    }
  }, [isErrorSendComment, createErrorNotification]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    sendComment(comment);
  };

  if (!userId) {
    return <Navigate to="/login" state={{ origin: "/comments" }} />;
  }

  if (isLoading) {
    return <p>Загрузка</p>;
  }

  if (!data || isError) {
    return <p>Ошибка при попытке скачать сообщения</p>;
  }

  return (
    <div className="w-screen min-h-screen grid grid-cols-1 justify-start p-10">
      <section className="">
        <h1>Комментарии</h1>
        <hr />
        <div className="mt-5 flex flex-col-reverse gap-3">
          {data.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      </section>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Введите комментарий"
          value={comment}
          onChange={(e) => setComment(e.target.value.trim())}
        ></textarea>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export { Comments };

export interface ICommentProps {
  comment: Database["public"]["Tables"]["comments"]["Row"] & {
    users: Tables<"users"> | null;
  };
}
const Comment = ({ comment }: ICommentProps) => {
  return (
    <div className="bg-slate-700 px-8 py-6 text-base rounded-md relative flex flex-col  min-w-[250px] max-w-[420px]">
      <h3 className=" text-xl"> {comment.users?.login} </h3>
      <hr />

      <p className="text-slate-300 absolute right-2 bottom-2 text-sm">
        {new Date(comment.created_at).toLocaleDateString()}
      </p>
      <p className="text-base mt-4">{comment.text}</p>
    </div>
  );
};
