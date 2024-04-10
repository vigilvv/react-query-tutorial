import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getProduct,
  getProducts,
  getProjects,
  getTodo,
  getTodoIds,
} from "./api";

//======================= Todos

export const useTodosIds = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodoIds,
    // refetchOnWindowFocus: false,
  });
};

// If you do not know ho wany queries there are, then use useQueries
export const useTodos = (ids: (number | undefined)[] | undefined) => {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      // if the ids are defined map over them if not map over the empty array
      return {
        queryKey: ["todo", { id }],
        queryFn: () => getTodo(id!), // we know that this id value is always defined here, hence the ! mark
      };
    }),
  });
};

//======================= Projects

export const useProjects = (page: number) => {
  return useQuery({
    queryKey: ["projects", { page }], // page number will change so we put page here
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData, // Without this when user moves from 1st page to 2nd the UI will flicker; With this technique while the next page data is loading it will keep the previous page data until new data is loaded and it will seamlessly get replaced
  });
};

//======================= Products

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined; // Means that there are no other pages here
      }
      return lastPageParam + 1; // Otherwise return this
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
};

export const useProduct = (id: number | null) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProduct(id!), // Using ! because we know that the query is enabled only when id is a number, so we are telling TS that id is not null
    enabled: !!id, // This query in enabled on when the id is a number (!! -> converts number to boolean, same as Boolean(id))

    //=== A trick to improve the performance of your application by reductin unnecessary delay between loading requests
    // We can show some part of "products" that was feteched while this query is executing
    placeholderData: () => {
      const cachedProducts = (
        queryClient.getQueryData(["products"]) as {
          pages: Product[] | undefined;
        }
      )?.pages?.flat(2);

      if (cachedProducts) {
        return cachedProducts.find((item) => item.id === id);
      }
    },
  });
};
