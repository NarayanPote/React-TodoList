import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
      todoarray: [],
      edit_task: "",
      search: "",
    };
  }

  addtask = (e) => {
    this.setState({
      todo: e.target.value,
    });
  };


  addtodo = () => {
    const { todo, todoarray } = this.state;
    let obj = {
      id: todoarray.length == 0 ? 1 : todoarray[todoarray.length - 1].id + 1,
      name: todo,
      is_edit: false,
      is_delete: false,
    };
    todoarray.push(obj);
    this.setState({
      todoarray: todoarray,
      todo: "",
    });
  };


  edit = (obj) => {
    const { todoarray } = this.state;
    let i = todoarray.findIndex((task) => task.id == obj.id);
    todoarray[i].is_edit = !todoarray[i].is_edit;

    todoarray.map((task) => {
      task.id !== obj.id
        ? (task.is_edit = false)
        : (task.is_edit = task.is_edit);

      return task;
    });
    
    this.setState({
      todoarray: todoarray,
      edit_task: obj.name,
    });
  };


  editTask = (task) => {
    this.setState({
      edit_task: task,
    });
  };


  saveEditTask = (obj) => {
    let { todoarray, edit_task } = this.state;
    let i = todoarray.findIndex((task) => task.id === obj.id);
    todoarray[i].name = edit_task;

    this.setState(
      {
        todoarray: todoarray,
        edit_task: "",
      },
      (e) => {
        this.edit(obj);
      }
    );
  };


  done = (obj) => {
    let { todoarray } = this.state;
    let i = todoarray.findIndex((task) => task.id === obj.id);
    todoarray[i].is_done = true;

    this.setState({
      todoarray: todoarray,
    });
  };


  delete = (obj) => {
    let { todoarray } = this.state;
    let i = todoarray.findIndex((task) => task.id === obj.id);
    todoarray.splice(i, 1);
    this.setState({
      todo_array: todoarray,
    });
  };


  onchange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { search, todoarray } = this.state;
    const filteredCountries = todoarray.filter((todo) => {
      return todo.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    return (
      <Grid container justifyContent="center">
        <div>
          <h2>Todo List</h2>
          <TextField
            label="Name"
            value={this.state.todo}
            onChange={this.addtask}
          />
          <Button onClick={this.addtodo}>Add</Button>

          <br />
          <br />
          <div>
            <SearchIcon style={{ width: 100, height: 50 }} />
             <TextField
              label="Search Item"
              icon="search"
              onChange={this.onchange}
            />
          </div>

          

          {filteredCountries.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell
                    colSpan={2}
                    align="center"
                    style={{ verticalAlign: "top" }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              {filteredCountries.map((obj, index) => {
                return (
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {obj.is_edit ? (
                          <TextField
                            label="Name"
                            value={this.state.edit_task}
                            onChange={(e) => this.editTask(e.target.value)}
                          />
                        ) : obj.is_done ? (
                          <s>{obj.name}</s>
                        ) : (
                          <span>{obj.name}</span>
                        )}
                      </TableCell>

                      <TableCell>
                        {obj.is_edit ? (
                          <div>
                            <Button
                              disabled={this.state.edit_task == ""}
                              onClick={(e) => this.saveEditTask(obj)}
                            >
                              Save
                            </Button>

                            <Button onClick={(e) => this.edit(obj)}>
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Button onClick={(e) => this.edit(obj)}>
                              Edit
                            </Button>

                            <Button
                              disabled={obj.is_done}
                              onClick={(e) => this.done(obj)}
                            >
                              Done
                            </Button>

                            <Button onClick={(e) => this.delete(obj)}>
                              Delete
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          ) : (
            <h2>No Data Found!</h2>
          )}
        </div>
      </Grid>
    );
  }
}

export default App;
