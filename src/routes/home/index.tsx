import { FunctionalComponent, h, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

import EditedTodoItem from "../../components/EditedTodoItem";
import TodoItem from "../../components/TodoItem";

import * as style from "./style.scss";

interface Props {
  user: string;
}

type TodoItem = {
  id: string;
  text: string;
  isEditing: boolean;
  isCompleted: boolean;
};

type Filters = "all" | "done" | "undone";

const initialState: TodoItem[] = [
  {
    id: "1",
    text: "Some todo 1",
    isEditing: false,
    isCompleted: false
  },
  {
    id: "2",
    text: "Some todo 2",
    isEditing: false,
    isCompleted: true
  },
  {
    id: "3",
    text: "Some todo 3",
    isEditing: false,
    isCompleted: false
  }
];

const Home: FunctionalComponent<Props> = () => {
  const [todoInSearch, setTodoInSearch] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>(initialState);
  const [todosToShow, setTodosToShow] = useState<TodoItem[]>(todos);
  const [activeFilter, setActiveFilter] = useState<Filters>("all");

  useEffect(() => {
    switch (activeFilter) {
      case "all":
        setTodosToShow(todos);
        break;
      case "done":
        setTodosToShow(todos.filter(todo => Boolean(todo.isCompleted)));
        break;
      case "undone":
        setTodosToShow(todos.filter(todo => todo.isCompleted === false));
        break;
    }
  }, [activeFilter, todos]);

  const onInputNewTodo = ({
    currentTarget
  }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    setTodoInSearch(currentTarget.value);
  };

  const onAddNewTodo = () => {
    setTodos(prev => [
      {
        id: String(Date.now()),
        text: todoInSearch,
        isEditing: false,
        isCompleted: false
      },
      ...prev
    ]);
    setTodoInSearch("");
    setActiveFilter("all");
  };

  const onDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const onEditTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, isEditing: !todo.isEditing }
          : { ...todo, isEditing: false }
      )
    );
  };

  const onSaveEditing = (id: string, value: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: value, isEditing: false } : todo
      )
    );
  };

  const onDiscardEditing = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const onToggleCompleted = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div class={style.todo}>
      <div class={style.addInputWrapper}>
        <input
          placeholder="Add new todo ←"
          value={todoInSearch}
          onInput={onInputNewTodo}
          type="text"
        />
        <button onClick={onAddNewTodo} disabled={!todoInSearch}>
          Add todo
        </button>
      </div>

      <div class={style.filterWrapper}>
        <button onClick={() => setActiveFilter("all")}>All</button>
        <button onClick={() => setActiveFilter("done")}>Done</button>
        <button onClick={() => setActiveFilter("undone")}>Undone</button>
      </div>

      <ul class={style.todoList}>
        {todosToShow.map(({ id, text, isEditing, isCompleted }) => (
          <li
            class={`${style.todoListItem} ${
              isCompleted ? style.todoListItemCompleted : ""
            }`}
          >
            {isEditing ? (
              <EditedTodoItem
                id={id}
                text={text}
                onSaveEditing={onSaveEditing}
                onDiscardEditing={onDiscardEditing}
              />
            ) : (
              <TodoItem
                onToggleCompleted={onToggleCompleted}
                isCompleted={isCompleted}
                id={id}
                text={text}
                onDeleteTodo={onDeleteTodo}
                onEditTodo={onEditTodo}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
