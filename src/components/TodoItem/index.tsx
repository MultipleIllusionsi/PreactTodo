import { FunctionalComponent, h, JSX, Fragment } from "preact";

import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";

import * as style from "./style.scss";

type Props = {
  text: string;
  id: string;
  onEditTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
};

const TodoItem: FunctionalComponent<Props> = ({
  text,
  id,
  onEditTodo,
  onDeleteTodo
}) => {
  return (
    <Fragment>
      <div class={style.todoText}>{text}</div>
      <div class={style.todoActions}>
        <span onClick={() => onEditTodo(id)}>
          <EditIcon />
        </span>
        <span onClick={() => onDeleteTodo(id)}>
          <DeleteIcon />
        </span>
      </div>
    </Fragment>
  );
};

export default TodoItem;
