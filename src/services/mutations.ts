import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, updateTodo } from "./api";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onMutate: () => {
      console.log("mutate"); // This function will run before the createTodo function above
    },
    onError: () => {
      console.log("error"); // If mutation gets an error this function will run
    },
    onSuccess: () => {
      console.log("success"); // If mutation is success this function will run
    },

    // data - the thing that the mutation function returns
    // error - when mutation fails
    // variables - input to the mutation function -- input in the unsettled function
    // onSettled: async (data, error, variables) => {
    onSettled: async (_, error) => {
      console.log("settled"); // This function will always run at the end of the mutation, irrespective of if there is an error or success

      if (error) {
        console.log(error);
      } else {
        // mutation is in success state
        await queryClient.invalidateQueries({ queryKey: ["todos"] }); // when we invalidate the "todos" key, it will refetch again in the background. When it's ready it will replace the old list seamlessly.

        // It is using stale while revalidating cache strategy - which means user will see the stale data until the new data is fetched in the background and the old cache is replaced with the new data.

        // User will not see any gap between the transitions
      }
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),
    onSettled: async (data, error, variables) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
        await queryClient.invalidateQueries({
          queryKey: ["todo", { id: variables.id }],
        }); // We are also invalidating this individual query
      }
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      //   console.log("Deleted successfully");
    },
    onSettled: async (_, error) => {
      // variables is unused here
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
};
