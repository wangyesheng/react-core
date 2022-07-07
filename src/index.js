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
      count: 0,
    };
  }

  handleIncrement = () => {
    let { count } = this.state;
    this.setState({
      ...this.state,
      count: count + 1,
    });
  };

  render() {
    return (
      <div>
        <span>Count: {this.state.count}</span>
        <button onClick={this.handleIncrement}>INCREMENT</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));
