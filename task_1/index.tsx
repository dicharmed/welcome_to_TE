import React, { Component, memo, PureComponent } from "react";

type IUser = {
  name: string;
  age: number;
};

type IProps = {
  user: IUser;
};

// functional component
// Используем memo: при неизменных name/age компонент не будет перерисовываться
const FirstComponent = memo(({ name, age }: IUser) => (
  <div>
    my name is {name}, my age is {age}
  </div>
));

// functional component
// Этот компонент является необязательным для выполнения задания, но продемонстрирует глубину знаний в React.
// Так как объект user меняет ссылку, добавляем кастомный сравниватель, который сравнивает именно поля
const SecondComponent = memo(
  ({ user: { name, age } }: IProps) => (
    <div>
      my name is {name}, my age is {age}
    </div>
  ),
  (prevProps: IProps, nextProps: IProps) =>
    prevProps.user.name === nextProps.user.name &&
    prevProps.user.age === nextProps.user.age
);

// class component
// PureComponent делает поверхностное сравнение пропсов, поэтому при одинаковых name/age ререндера не будет
class ThirdComponent extends PureComponent<IUser> {
  render() {
    return (
      <div>
        my name is {this.props.name}, my age is {this.props.age}
      </div>
    );
  }
}

// class component
// user меняет ссылку, поэтому явно сравниваем поля внутри shouldComponentUpdate
class FourthComponent extends Component<IProps> {
  shouldComponentUpdate(nextProps: IProps) {
    return (
      this.props.user.name !== nextProps.user.name ||
      this.props.user.age !== nextProps.user.age
    );
  }

  render() {
    return (
      <div>
        my name is {this.props.user.name}, my age is {this.props.user.age}
      </div>
    );
  }
}
