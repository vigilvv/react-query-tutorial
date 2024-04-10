import styled from "styled-components";
import { TodoShow } from "./components/TodoShow";
import { TodoCreate } from "./components/TodoCreate";
import { Projects } from "./components/Projects";
import { Products } from "./components/Products";

const Text = styled.h1`
  font-size: 1.5rem;
  color: darkblue;
`;

function App() {
  return (
    <>
      <Text>React Query Tutorial</Text>
      {/* <TodoShow />
      <TodoCreate /> */}
      {/* <Projects /> */}
      <Products />
    </>
  );
}

export default App;
