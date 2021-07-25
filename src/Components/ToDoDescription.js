import React from "react";
import { useParams } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";

const GET_TODO_BY_ID = gql`
  query GetTodoById($id: ID!) {
    getTodoById(id: $id) {
      id
      title
      text
      type
      createdAt
      isDone
    }
  }
`;

export default function ToDoDescription() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_TODO_BY_ID, {
    variables: { id: id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error</p>;
  }
  let date = new Date(data.getTodoById?.createdAt);
  return (
    <div className="to_do_list_item">
      <p>Title: {data.getTodoById?.title}</p>
      <p>Description: {data.getTodoById?.text}</p>
      <p>Type: {data.getTodoById?.type}</p>
      <p>Created at: {date.toUTCString()}</p>
      <p>Is done: {Boolean(data.getTodoById?.isDone).toString()}</p>
    </div>
  );
}
