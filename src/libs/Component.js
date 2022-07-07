class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
  }

  setState() {}

  render() {
    throw new Error("Abstract methods need to be implemented by subclasses");
  }
}

export default Component;
