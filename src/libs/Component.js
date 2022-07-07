import { createDOM } from "./react-dom";

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
    if (updateQueue.isBatchingUpdate) {
      updateQueue.updaters.add(this);
    } else {
      this.updateClassComponent();
    }
  }

  updateClassComponent() {
    const { classInstance, pendingStates, callbacks } = this;
    if (pendingStates.length > 0) {
      this.updateState();
      classInstance.focusUpdate();
      callbacks.forEach((cb) => cb && cb());
      callbacks.length = 0;
    }
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
