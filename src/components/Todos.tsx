import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../App.css";

interface Todo {
  _id: string;
  title: string;
  desc: string;
  completed: boolean;
}

const Todos: React.FC = () => {
  const [create, setCreate] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [display, setDisplay] = useState<Todo | null>(null);

  const [updateTitle, setUpdateTitle] = useState<string>("");
  const [updateDesc, setUpdateDesc] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title || !desc) return;
    const response = await fetch(
      "https://todo-app-api-fkhb.onrender.com/api/todos/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc: desc,
        }),
      }
    );
    if (response.status === 201) {
      window.location.reload();
    }

    setTitle("");
    setDesc("");
    setCreate(false);
  }

  const handleRemoveTodo = async (id: string) => {
    const response = await fetch(
      `https://todo-app-api-fkhb.onrender.com/api/todos/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 204) {
      window.location.reload();
    }
  };

  async function handleTodoClick(id: string) {
    const response = await fetch(
      `https://todo-app-api-fkhb.onrender.com/api/todos/${id}`
    );
    const data = await response.json();
    const displayTodo = data.data.data;

    const updateResponse = await fetch(
      `https://todo-app-api-fkhb.onrender.com/api/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !displayTodo.completed,
        }),
      }
    );

    if (updateResponse.status === 200) {
      window.location.reload();
    }
  }

  async function displaySingle(id: string) {
    const response = await fetch(
      `https://todo-app-api-fkhb.onrender.com/api/todos/${id}`
    );
    const data = await response.json();
    const displayTodo = data.data.Todo;

    setDisplay(displayTodo);
    setUpdateTitle(displayTodo.title);
    setUpdateDesc(displayTodo.desc);
  }

  const handleUpdate = async () => {
    if (display) {
      await fetch(
        `https://todo-app-api-fkhb.onrender.com/api/todos/${display._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updateTitle,
            desc: updateDesc,
          }),
        }
      );

      setUpdateTitle("");
      setUpdateDesc("");
      setView(false);
    }
  };

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch(
        "https://todo-app-api-fkhb.onrender.com/api/todos"
      );
      const data = await response.json();
      setTodos(data.data.data);
    }
    fetchTodos();
  }, []);

  let real = active || completed ? filtered : todos;

  return (
    <div className="App">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="on_top">
        <div className="name">
          <div>
            <h1>TODO</h1>
          </div>
        </div>
        <div>
          <button onClick={() => setCreate(true)} className="button-add">
            Click here to add a TODO
          </button>
        </div>
        <div className="list">
          <ul>
            {real.map((todo) => {
              const { title, desc, _id } = todo;
              return (
                <li key={_id}>
                  <span onClick={() => handleTodoClick(todo._id)}>
                    <input
                      type="checkbox"
                      name="complete"
                      checked={todo.completed}
                      id="complete"
                    />{" "}
                  </span>
                  <div className="title-dec">
                    <span
                      onClick={() => {
                        setView(true);
                        displaySingle(todo._id);
                      }}
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {title}
                    </span>
                    {/* <span
                      onClick={() => {
                        setView(true);
                        displaySingle(todo._id);
                      }}
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {desc}
                    </span> */}
                  </div>
                  <span onClick={() => handleRemoveTodo(todo._id)}>
                    <AiOutlineClose />
                  </span>
                </li>
              );
            })}
          </ul>
          {todos.length > 0 ? (
            <div className="action">
              <span
                style={{
                  color: !active && !completed ? "" : "hsl(235, 19%, 35%)",
                }}
                onClick={() => {
                  // setFiltered(todos);
                  setActive(false);
                  setCompleted(false);
                }}
              >
                All
              </span>
              <span
                style={{
                  color: active && !completed ? "" : "hsl(235, 19%, 35%)",
                }}
                onClick={() => {
                  setFiltered(
                    todos.filter((todo) => {
                      return todo.completed === false;
                    })
                  );
                  setCompleted(false);
                  setActive(true);
                }}
              >
                Active
              </span>
              <span
                style={{
                  color: !active && completed ? "" : "hsl(235, 19%, 35%)",
                }}
                onClick={() => {
                  setFiltered(
                    todos.filter((todo) => {
                      return todo.completed !== false;
                    })
                  );
                  // setAll(false);
                  setCompleted(true);
                  setActive(false);
                }}
              >
                Completed
              </span>
              <span
                onClick={() => {
                  setTodos([]);
                  setActive(false);
                  setCompleted(false);
                }}
              >
                Clear all
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="addTodo" style={{ display: create ? "flex" : "none" }}>
        <span className="close" onClick={() => setCreate(false)}>
          Close
        </span>
        {/* <h1>Add todo</h1> */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter title here..."
              value={title}
              onChange={function (e) {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              placeholder="Enter description here..."
              value={desc}
              onChange={function (e) {
                setDesc(e.target.value);
              }}
            />
          </div>
          <div>
            <button>Add</button>
          </div>
        </form>
      </div>
      <div className="addTodo" style={{ display: view ? "flex" : "none" }}>
        <h2 className="close" onClick={() => setView(false)}>
          Close
        </h2>

        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter title here..."
              value={updateTitle}
              onChange={function (e) {
                setUpdateTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              placeholder="Enter description here..."
              value={updateDesc}
              onChange={function (e) {
                setUpdateDesc(e.target.value);
              }}
            />
          </div>
          <div>
            <button>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Todos;
