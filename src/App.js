import React from "react";
import { Route } from "react-router-dom";

import ToDoList from "./Components/ToDoList";
import ToDoDescription from "./Components/ToDoDescription";

function App() {
  return (
    <div>
      <ToDoList />
      <Route path="/:id">
        <ToDoDescription />
      </Route>
    </div>
  );
}

export default App;
