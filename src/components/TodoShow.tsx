import styled from "styled-components";
import { useTodos, useTodosIds } from "../services/queries";
import { useDeleteTodo, useUpdateTodo } from "../services/mutations";

const List = styled.div`
  display: flex;
  gap: 32px;
  margin-left: 16px;
  flex-wrap: wrap;

  margin-bottom: 3rem;
`;

const ListItem = styled.span`
  border: 1px solid green;
  padding: 4px 8px;
  font-size: 1rem;
  color: deeppink;

  cursor: pointer;

  &:hover {
    /* color: pink; */
    border: 1px solid darkgreen;
    font-weight: 900;
  }
`;

export const TodoShow = () => {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  const updateTodoMutation = useUpdateTodo();

  const deleteTodoMutation = useDeleteTodo();

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true });
    }
  };

  const handleDelete = (id: number | undefined) => {
    if (id) {
      deleteTodoMutation.mutate(id);
    }
  };

  // ======> Async delete
  // const handleDeleteAsync = async (id: number | undefined) => {
  //   if (id) {
  //     await deleteTodoMutation.mutateAsync(id);
  //     // do something else here after the data is deleted
  //   }
  // };

  // const isFetching = useIsFetching(); returns a number between 0 and the number of queries that are currently fetching - this is global - across the entire app

  // const {data, isPending, isError} = useTodosIds(); can also be used like this; then we can directly use isPending instead of todosIdsQuery.isPending

  if (todosIdsQuery.isPending) {
    return <span>loading...</span>;
  }

  if (todosIdsQuery.isError) {
    return <span>there is an error!</span>;
  }

  // or can also use
  // if (todosIdsQuery.status === "pending" | "error" | "success")

  // This gives the query function status (the one that talks to the backend) -  todosIdsQuery.fetchStatus gives the query status = "idle" / "fetching"
  // This gives the data status - todosIdsQuery.status = "success" / "error" / "pending"

  return (
    <>
      <List>
        {/* use data?. if isPending and isError is not handled above */}
        {todosIdsQuery.data.map((id) => (
          <ListItem key={id}>{id}</ListItem>
        ))}
      </List>

      {todosQueries.map(({ data }, index) => (
        <li key={data?.id ?? index + 100}>
          {" "}
          {/* If there is no id then index+100 is assigned to key; +100 to avoid conflict with id if it exits*/}
          {data?.title} - {data?.description}
          <button
            onClick={() => handleMarkAsDoneSubmit(data)}
            disabled={data?.checked}
          >
            {data?.checked ? "Done" : "Mark as done"}
          </button>
          <button onClick={() => handleDelete(data?.id)}>
            Delete {data?.id}
          </button>
        </li>
      ))}
    </>
  );
};
