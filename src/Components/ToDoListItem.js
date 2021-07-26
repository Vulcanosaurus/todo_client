import React from "react";
import { Link } from "react-router-dom";
import { css, cx } from "@emotion/css";

import { gql, useMutation } from "@apollo/client";

const UPDATE_TODO = gql`
  mutation UpdateTodoStatusById($id: ID!, $isDone: Boolean!) {
    updateTodoStatusById(id: $id, isDone: $isDone) {
      id
      isDone
    }
  }
`;

const table_cell = css`
  font-size: 20px;
  border: 1px solid black;
  padding: 1em;
  text-align: left;
`;

export default function ToDoListItem(props) {
  const [update_todo] = useMutation(UPDATE_TODO);
  return (
    <tr>
      <td className={cx(table_cell)}>
        <Link to={{ pathname: props.id, state: { id: props.id } }}>
          {props.title}
        </Link>
      </td>
      <td className={cx(table_cell)}> {props.type}</td>
      <td className={cx(table_cell)}> {props.createdAt}</td>
      <td className={cx(table_cell)}>
        <input
          className={css``}
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
