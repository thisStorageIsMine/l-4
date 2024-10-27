import { useMutation } from "react-query";
import { supabase } from "../supabase";
import { queryClient } from "../App";

const useAddComment = (userId: number) => {
  const {
    mutate: sendComment,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async (text: string) => {
      const { data, error } = await supabase
        .from("comments")
        .insert([{ author_id: userId, text }])
        .select();

      if (error || !data) {
        throw new Error("Не получилось отправить комментарий");
      }

      return data;
    },
    onSettled: async () =>
      await queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });

  return { sendComment, isError, isLoading };
};

export { useAddComment };
