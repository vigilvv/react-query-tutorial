import axios from "axios";

const BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({ baseURL: BASE_URL });

//========= Todos

export const getTodoIds = async () => {
  return (await axiosInstance.get<Todo[]>("todos")).data.map((item) => item.id);
};

export const getTodo = async (id: number) => {
  return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
};

export const createTodo = async (data: Todo) => {
  await axiosInstance.post<Todo>("todos", data);
};

export const updateTodo = async (data: Todo) => {
  await axiosInstance.put<Todo>(`todos/${data.id}`, data);
};

export const deleteTodo = async (id: number) => {
  await axiosInstance.delete(`todos/${id}`);
};

//========= Projects

export const getProjects = async (page: number = 1) => {
  // If no number is given default to page 1
  return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_limit=3`)) // In each page we get only 3 projects; _page and _limit is json-server related
    .data;
};

//========= Products

export const getProducts = async ({ pageParam }: { pageParam: number }) => {
  return (
    await axiosInstance.get<Product[]>(
      `products?_page=${pageParam + 1}&_limit=3`
    )
  ).data;
};

export const getProduct = async (id: number) => {
  return (await axiosInstance.get<Product>(`products/${id}`)).data;
};
