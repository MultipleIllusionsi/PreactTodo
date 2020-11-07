import { FunctionalComponent, h, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

import EditedTodoItem from "../../components/EditedTodoItem";
import TodoItem from "../../components/TodoItem";

import * as style from "./style.scss";

interface Props {
  user: string;
}

type TodoItem = { id: string; text: string; isEditing: boolean };

const initialState: TodoItem[] = [
  {
    id: "1",
    text: "Some todo 1",
    isEditing: false
  },
  {
    id: "2",
    text: "Some todo 2",
    isEditing: false
  }
];

const Home: FunctionalComponent<Props> = () => {
  const [todoInSearch, setTodoInSearch] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    setTodos(initialState);
  }, []);

  const onInputNewTodo = ({
    currentTarget
  }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    setTodoInSearch(currentTarget.value);
  };

  const onAddNewTodo = () => {
    setTodos(prev => [
      { id: String(Date.now()), text: todoInSearch, isEditing: false },
      ...prev
    ]);
    setTodoInSearch("");
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
      <ul class={style.todoList}>
        {todos.map(({ id, text, isEditing }) => (
          <li class={style.todoListItem}>
            {isEditing ? (
              <EditedTodoItem
                id={id}
                text={text}
                onSaveEditing={onSaveEditing}
                onDiscardEditing={onDiscardEditing}
              />
            ) : (
              <TodoItem
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
