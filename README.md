YT-Code Genix: React Query Tutorial V5 - Full Tanstack Query Tutorial for Beginners -- https://www.youtube.com/watch?v=3e-higRXoaM

# Installation

pnpm i @tanstack/react-query @tanstack/react-query-devtools

pnpm i axios react-hook-form

pnpm i @tanstack/eslint-plugin-query --D

#### eslintrc.cjs

- In the extends section: `plugin:@tanstack/eslint-plugin-query/recommended`
- In the plugins section: `"@tanstack/query"`

#### backend server

- Start the backend server "prototype-backend-sever"

---

# Use a query to fetch data

- Create "services/api.ts" to talk to backend - get all to do ids
- Create "types/types.d.ts"
- Create "services/queries.ts" - create a todo query function
- Create "services/components/TodoShow.tsx"
- Wrap the "App" in main.tsx inside the query client provider
- Use the query function in the component - TodoShow.tsx

---



# Parallel queries

- Fetch each todo one-by-one
- Create services/api.ts getTodo function
- Create services/queries.ts useTodos function - multiple parallel queries



---

# Mutations

- You use query to get data from the server
- You use mutations to change the state of the server
- Create services/api.ts createTodo function
- Create services/mutations.ts useCreateTodo function


- Add createTodo mutation to TodoCreate.tsx
- Create form submit handler
- Create a form using react-hook-form
  - We have to update the page to see the new list item added
  - The onSettled funciton of the mutation is a good place to either invalidate or refetch a query
- Update the onSettled function of the mutation to invalidate the query
- Prevent submiting a new todo when the previous mutation is in progress. Also change the submit button text when creating.


### Update todo

- When you create a todo you add a new item to our previous fetch todos list.
- When updating you just update that single todo


- Create api.ts updateTodo function
- Create mutations.ts useUpdateTodo function


- Add useUpdateTodo mutation in the TodoShow.tsx
  - Add a button which shows "Done" or "Mark as done" based on the status of the "checked" field.
  - Update todo status in server when this button is clicked


### Delete todo

- Create api.ts deleteTodo function
- Create mutation.ts useDeleteTodo
- Add a delete button to TodoShow.tsx and add the delete mutation
- First write sync mutate, the write async mutate.


# Pagination

- Create a new component - Projects.tsx
- get projects and display with pagination - backend courtesy json-server


# Infinite scrolling

- Create a products component with api and query
  - Use infiniteQuery

### Getting queries conditionally or getting queries based on previous queries

- Get the complete todo based on the proudct id clicked
- Optimse fetching with placeholderData
