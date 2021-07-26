import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import { css, cx } from "@emotion/css";

import ToDoListItem from "./ToDoListItem";

const GET_TODO_ALL = gql`
  query GetTodoList($filter: [TodoTypes!], $isDone: Boolean, $order: Ordering) {
    getTodoList(filters: { types: $filter, isDone: $isDone }, orderBy: $order) {
      id
      title
      type
      createdAt
      isDone
    }
  }
`;

const form_item = css`
  margin: 0.5em;
`;

function ToDoList() {
  // STATES

  const { pathname } = useLocation();
  const [orderBy, setOrderBy] = useState("DATE_ASC");
  const [filterBy, setFilterBy] = useState([
    "RH",
    "Tech",
    "Marketing",
    "Communication",
  ]);
  const [filterIsDone, setFilterIsDone] = useState("");
  const [filterEmpty] = useState();
  const [filterOnlyBusiness, setFilterOnlyBusiness] = useState([]);

  let filter = [];
  if (filterOnlyBusiness.length === 2) {
    filter = [...filterOnlyBusiness];
    if (filterBy[0] === "Marketing" || filterBy[0] === "Communication") {
      filter = [...filterBy];
    }
  } else {
    filter = [...filterBy];
  }

  // HOOK

  const { loading, error, data } = useQuery(GET_TODO_ALL, {
    variables: {
      filter: filter,
      order: orderBy,
      isDone: typeof filterIsDone === "boolean" ? filterIsDone : filterEmpty,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error</p>;
  }

  //  RENDER

  if (!(pathname === "/")) {
    return null;
  }

  return (
    <div className="App">
      <div
        className={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 920px;
          margin: auto;
          margin-bottom: 1em;
          text-align: center;
          font-size: 18px;
        `}
      >
        <div className={cx(form_item)}>
          <label htmlFor="order">Order by:</label>
          <select
            name="order"
            value={orderBy}
            onChange={(e) => {
              setOrderBy(e.target.value);
            }}
          >
            <option value="DATE_ASC" default>
              ASC
            </option>
            <option value="DATE_DESC">DESC</option>
          </select>
        </div>
        <div className={cx(form_item)}>
          <label htmlFor="filter">Type:</label>
          <select
            name="filter"
            value={typeof filterBy === "object" ? "default" : filterBy}
            onChange={(e) => {
              if (e.target.value === "default") {
                setFilterBy(["RH", "Tech", "Marketing", "Communication"]);
                return null;
              }
              setFilterBy([e.target.value]);
            }}
          >
            <option value="default" default>
              Select...
            </option>
            <option value="RH">RH</option>
            <option value="Tech">TECH</option>
            <option value="Marketing">Marketing</option>
            <option value="Communication">Communication</option>
          </select>
        </div>
        <div className={cx(form_item)}>
          <label htmlFor="isDone">Is Done ?</label>
          <input
            type="checkbox"
            name="isDone"
            checked={filterIsDone}
            onChange={(e) => {
              setFilterIsDone(e.target.checked);
            }}
          />
        </div>
        <div className={cx(form_item)}>
          <label htmlFor="isOnlyBusiness">Only Business ?</label>
          <input
            type="checkbox"
            name="isOnlyBusiness"
            checked={filterOnlyBusiness.length === 0 ? false : true}
            onChange={(e) => {
              if (e.target.checked) {
                setFilterOnlyBusiness(["Marketing", "Communication"]);
              } else {
                setFilterOnlyBusiness([]);
              }
            }}
          />
        </div>
        <button
          className={cx(form_item)}
          onClick={(e) => {
            e.preventDefault();
            setOrderBy("DATE_ASC");
            setFilterBy(["RH", "Tech", "Marketing", "Communication"]);
            setFilterIsDone("");
            setFilterOnlyBusiness([]);
          }}
        >
          Reset
        </button>
      </div>
      <table
        className={css`
          margin: auto;
          border-collapse: collapse;
        `}
      >
        <thead
          className={css`
            font-size: 20px;
          `}
        >
          <tr>
            <th
              className={css`
                padding: 0.5em;
              `}
            >
              Title
            </th>
            <th>Type</th>
            <th>Created At</th>
            <th>Is Done</th>
          </tr>
        </thead>
        <tbody>
          {data.getTodoList.map((el, i) => {
            let date = new Date(el?.createdAt);
            return (
              <ToDoListItem
                key={i}
                id={el?.id}
                title={el?.title}
                type={el?.type}
                createdAt={date.toUTCString()}
                isDone={el?.isDone}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ToDoList;
