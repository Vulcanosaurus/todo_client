# todo-client

## Running the project

1. Clone git repository.  
2. Install dependencies with `npm install`.  
3. Run the app with `npm start`.  

## Built With  

- [react](https://reactjs.org/)  
- [apollo](https://www.apollographql.com/docs/react/)  
- [emotion.sh](https://emotion.sh/docs/introduction)  
- [react-router](https://reactrouter.com/)  

## About the Project  

The scope of this app is to receive an To Do List from an already furnished GraphQL API and then display and filter it.  

We establish a connection to the API in the index.js file by using the ApolloClient and display the list in the `ToDoList` component, the routing being done in the `App` component.  

Here we will filter the response by using the "getTodoList()" query request to the API which can filter the request by passing the filters and orderBy as arguments in the aforementioned query. We can filter list items by date, type, is done status and the only business filter which displays only list items containing the 'Marketing' or 'Communication' types. These filters are stackable and can be reset by pressing the Reset button or refreshing the page.  

Clicking on the title of an to do list item will send the user to the `ToDoDescription` component which will use the clicked items id as an argument in the "getTodoById()" to see their item's description page which displays all information about that to do item.  

Clicking on the checkbox of a to do item changes its status by sending the 'updateTodoStatusById()' mutation from the `ToDoListItem` component to update the isDone property.  
