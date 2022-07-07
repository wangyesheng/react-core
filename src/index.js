// import React from "./libs/react";
// import ReactDOM from "./libs/react-dom";

import React from "react";
import ReactDOM from "react-dom";

// const el = (
//   <div className="wrap" style={{ background: "#00ff11" }}>
//     <span style={{ color: "#ff0000" }}>hello</span>
//     <span style={{ color: "#1100ff" }}>world</span>
//     <div>
//       <span>1.0.0</span>
//     </div>
//   </div>
// );

// function Child(props) {
//   return <span>{props.description}</span>;
// }

// function Welcome(props) {
//   return (
//     <div>
//       <span>{props.name}</span>
//       <Child description={props.description} />
//       {props.children}
//     </div>
//   );
// }

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Count",
      count: 0,
      domain: {
        provice: "-jiangsu-",
        city: "-nantong-",
      },
    };
  }

  /**
   * 合成事件和批量更新
   * 1、一次事件处理函数中，假设 setState 在同步代码中进行调用，则会将多个 setState 操作合成为一次处理，处理的时机是在事件处理函数处理完成之后
   * 2、假设 setState 在异步代码中进行调用（不管是宏任务还是微任务），则多个 setState 操作不会合成为一次处理
   * 结论：jsx 事件处理函数是 react 控制的，只要归 react 控制就是批量更新，不归 react 控制就是非批量更新
   */
  handleIncrement = () => {
    this.setState({
      count: this.state.count + 1,
    });
    console.log(this.state.count);
    this.setState({
      count: this.state.count + 1,
    });
    console.log(this.state.count);
    queueMicrotask(() => {
      this.setState({
        count: this.state.count + 1,
      });
      console.log(this.state.count);
      this.setState({
        count: this.state.count + 1,
      });
      console.log(this.state.count);
    }, 0);
  };

  render() {
    return (
      <div>
        <span>
          {this.state.name}: {this.state.count}
        </span>
        <span>{this.state.domain.provice}</span>
        <span>{this.state.domain.city}</span>
        <button onClick={this.handleIncrement}>INCREMENT</button>
      </div>
    );
  }
}

// 猜测：执行 render 方法之前，@babel/plugin-react 插件会去寻找 React 包中的 createElement 方法，将 jsx 通过 AST 的方式转换为 React.createElement 方法创建出来的对象
ReactDOM.render(<Counter />, document.getElementById("root"));
