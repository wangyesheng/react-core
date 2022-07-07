import React from "./libs/react";
import ReactDOM from "./libs/react-dom";

// import React from "react";
// import ReactDOM from "react-dom";

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

  handleIncrement = () => {
    let { count } = this.state;
    this.setState({
      count: count + 1,
      domain: {
        provice: "-zhejiang-",
        city: "-hangzhou-",
      },
    });
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
