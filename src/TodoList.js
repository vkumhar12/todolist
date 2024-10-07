import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  searchTodo,
  updateTodo,
} from "./components/TodoSlice";

import { Delete, Edit } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchText, setSearchText] = useState("");

  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    console.log("addtodo");
    if (!isEditing) {
      dispatch(addTodo({ id: uuidv4(), text }));
    } else {
      dispatch(updateTodo({ id: editId, text }));
      setIsEditing(false);
    }
    setText("");
  };
  const handleEditTodo = (todo) => {
    setText(todo.text);
    setIsEditing(true);
    setEditId(todo.id);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    dispatch(searchTodo(e.target.value));
  };

  return (
    <div>
      <h1>To-do List </h1>
      <div style={{ padding: "20px" }}>
        <TextField
          label="Add / Update Todo"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleAddTodo} fullWidth>
          {isEditing ? "Update" : "Add"}
        </Button>
        <TextField
          label="Search Todos"
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
          margin="normal"
          style={{ marginTop: "20px" }}
        />
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <>
                  <IconButton
                    onClick={() => handleEditTodo(todo)}
                    style={{ color: "green" }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    style={{ color: "red" }}
                  >
                    <Delete />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={todo.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default TodoList;
