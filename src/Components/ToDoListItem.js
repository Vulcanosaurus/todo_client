import React from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const UPDATE_TODO = gql`
  mutation UpdateTodoStatusById($id: ID!, $isDone: Boolean!) {
    updateTodoStatusById(id: $id, isDone: $isDone) {
      id
      isDone
    }
  }
`;

export default function ToDoListItem(props) {
  const [update_todo] = useMutation(UPDATE_TODO);
  return (
    <tr
      style={{ textAlign: "center", margin: "auto" }}
      className="to_do_list_item"
    >
      <td>
        <Link to={props.id}>{props.title}</Link>
      </td>
      <td> {props.type}</td>
      <td> {props.createdAt}</td>
      <td>
        <input
          type="checkbox"
          name="isDone"
          id="isDone"
          checked={props.isDone}
          onChange={(e) => {
            update_todo({
              variables: { id: props.id, isDone: e.target.checked },
            });
          }}
        />
      </td>
    </tr>
  );
}
