// import styled from "styled-components";
import { useCreateTodo } from "../services/mutations";
import { SubmitHandler, useForm } from "react-hook-form";

export const TodoCreate = () => {
  const createTodoMutation = useCreateTodo();

  // Form submit handler
  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

  const { register, handleSubmit } = useForm<Todo>();

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New todo:</h4>
        <input placeholder="Title" {...register("title")} />
        <br />
        <input placeholder="Description" {...register("description")} />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Creating..." : "Create todo"}
        />
      </form>
    </>
  );
};
