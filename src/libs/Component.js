import { createDOM } from "./react-dom";

class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  setState(partialState) {
    this.state = {
      ...this.state,
      ...partialState,
    };
    const newVDOM = this.render();
    updateClassComponent(this, newVDOM);
  }

  render() {
    throw new Error("Abstract methods need to be implemented by subclasses");
  }
}

function updateClassComponent(classInstance, newVDOM) {
  const oldDOM = classInstance.dom;
  const newDOM = createDOM(newVDOM);
  oldDOM.parentNode.replaceChild(newDOM, oldDOM);
  classInstance.dom = newDOM;
}

export default Component;
