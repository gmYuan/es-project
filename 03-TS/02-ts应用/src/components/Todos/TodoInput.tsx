import React, { ReactNode } from "react";
import { Todo } from "@/models";
import { withDefaultProps, DefaultProps } from "@/utils";
/* 
type DefaultProps = {
    settings?: { maxLength: number, placeholder:string}
} */
interface OwnProps {
  addTodo: (todo: Todo) => void;
}
type Props = OwnProps & DefaultProps;
interface State {
  text: string;
}

let id = 0;

//老组件是OwnProps和DefaultProps的联合 所 属性更多
class TodoInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { text: "" };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let text = this.state.text.trim();
    if (!text) return;
    this.props.addTodo({ id: id++, text });
    this.setState({ text: "" });
  };

  render() {
    const { text } = this.state;
    const { settings } = this.props;
    const { handleChange, handleSubmit } = this;
    return (
      <form onSubmit={handleSubmit}>
        <input
          maxLength={settings?.maxLength}
          placeholder={settings?.placeholder}
          type="text"
          value={this.state.text}
          onChange={handleChange}
        />
        <input type="submit" value="添加" />
      </form>
    );
  }
}

//Props=OwnProps & DefaultProps;
export default withDefaultProps<Props>(TodoInput); //NewTodoInput