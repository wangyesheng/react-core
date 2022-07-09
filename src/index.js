import React from "./libs/react";
import ReactDOM from "./libs/react-dom";

// import React from "react";
// import ReactDOM from "react-dom";

class Counter extends React.Component {
  // static defaultProps = {
  //   name: "Counter",
  // };

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    console.log("1、初始化组件属性和状态");
  }

  componentWillMount() {
    console.log("2、组件将要挂载");
  }

  handleIncrement = (e) => {
    this.setState({
      count: this.state.count + 1,
    });

    // ------- 函数 ------
    // this.setState(
    //   (lastState) => ({
    //     count: lastState.count + 1,
    //   }),
    //   () => console.log(this.state.count)
    // );
  };

  render() {
    console.log("3、组件render");
    return (
      <div id={`counter-${this.state.count}`}>
        {/* <span>
          {this.props.name || "Counter"}: {this.state.count}
        </span>
        <ChildCounter count={this.state.count} />*/}
        <button onClick={this.handleIncrement}>
          <span>INCREMENT</span>
        </button>
      </div>
    );
  }

  componentDidMount() {
    console.log("4、组件挂载成功", document.getElementById("counter"));
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("5、组件是否需要更新", nextProps, nextState);
    return true;
  }

  componentWillUpdate() {
    console.log("6、组件将要更新");
  }

  componentDidUpdate() {
    console.log("7、组件更新完成");
  }
}

class ChildCounter extends React.Component {
  componentWillMount() {
    console.log("1、ChildCounter 组件将要挂载");
  }

  render() {
    console.log("2、ChildCounter 组件render");
    return <div>{this.props.count}</div>;
  }

  componentDidMount() {
    console.log("3、ChildCounter组件挂载成功");
  }

  componentWillReceiveProps(nextProps) {
    console.log("4、ChildCounter将接收新的props", nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("5、ChildCounter组件是否需要更新", nextProps, nextState);
    return true;
  }

  componentWillUpdate() {
    console.log("6、ChildCounter组件将要更新");
  }

  componentDidUpdate() {
    console.log("7、ChildCounter组件更新完成");
  }
}

// const el = <Counter />  =>  elVDOM = { type: <Counter />}

// 猜测：执行 render 方法之前，@babel/plugin-react 插件会去寻找 React 包中的 createElement 方法，将 jsx 通过 AST 的方式转换为 React.createElement 方法创建出来的对象
ReactDOM.render(<Counter />, document.getElementById("root"));
