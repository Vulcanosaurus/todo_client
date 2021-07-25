import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ToDoDescription from "./Components/ToDoDescription";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/:id" component={ToDoDescription} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
