import { useState } from "react";
import { useProjects } from "../services/queries";

export const Projects = () => {
  const [page, setPage] = useState(1);
  //   const getProjectsQuery = useProjects(page);
  const { data, isPending, error, isError, isFetching, isPlaceholderData } =
    useProjects(page);

  //   if (getProjectsQuery.isPending || getProjectsQuery.isError) {
  //     console.log("Processing...");
  //     return;
  //   }

  return (
    <div>
      {isPending ? (
        <div>loading</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current page: {page}</span>
      <button onClick={() => setPage((old) => Math.max(old - 1, 0))}>
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          if (!isPlaceholderData) setPage((old) => old + 1);
        }}
        disabled={isPlaceholderData}
      >
        Next Page
      </button>
      {isFetching && <span>Loading...</span>}
    </div>
  );
};
