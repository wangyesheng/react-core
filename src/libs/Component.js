import { createDOM, compareVDOM } from "./react-dom";

export const updateQueue = {
  isBatchingUpdate: false, // 当前是否处理批量更新模式
  updaters: new Set(),
  batchUpdate() {
    for (let updater of this.updaters) {
      updater.updateClassComponent();
    }
    this.isBatchingUpdate = false;
  },
};

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = [];
    this.callbacks = [];
  }

  addState(partialState, cb) {
    this.pendingStates.push(partialState);
    if (typeof cb === "function") {
      this.callbacks.push(cb);
    }
    this.emitUpdate();
  }

  emitUpdate(newProps) {
    if (updateQueue.isBatchingUpdate) {
      updateQueue.updaters.add(this);
    } else {
      this.updateClassComponent();
    }
  }

  updateClassComponent() {
    const { pendingStates, callbacks } = this;
    if (pendingStates.length > 0) {
      this.updateState();
      this.shouldComponentUpdate();
      callbacks.forEach((cb) => cb && cb());
      callbacks.length = 0;
    }
  }

  shouldComponentUpdate() {
    const { classInstance } = this;
    if (
      classInstance.shouldComponentUpdate &&
      !classInstance.shouldComponentUpdate(
        classInstance.props,
        classInstance.state
      )
    ) {
      return;
    }
    classInstance.focusUpdate();
  }

  updateState() {
    const { classInstance, pendingStates } = this;
    pendingStates.forEach((nextState) => {
      if (typeof nextState === "function") {
        nextState = nextState.call(classInstance, classInstance.state);
      }
      classInstance.state = { ...classInstance.state, ...nextState };
    });
    pendingStates.length = 0;
  }
}

class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }

  setState(partialState, callback) {
    this.updater.addState(partialState, callback);
  }

  focusUpdate() {
    this.componentWillUpdate && this.componentWillUpdate();
    const newVDOM = this.render();
    const oldVDOM = this._vdom;
    const comparedVDOM = compareVDOM(oldVDOM.dom.parentNode, oldVDOM, newVDOM);
    this._vdom = comparedVDOM;
    // updateClassComponent(this, newVDOM);
    this.componentDidUpdate && this.componentDidUpdate();
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
