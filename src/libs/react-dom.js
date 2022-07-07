import { addEvent } from "./event";

/**
 * 1、将 vdom 变成真实dom
 * 2、将 vdom 上的属性同步更新到真实 dom 上
 * 3、将 vdom 上的儿子们也变成真实 dom 并挂载到自己的 dom 上
 * 4、将自己挂载到容器上
 * @param {*} vdom 虚拟dom
 * @param {*} contanier dom容器
 */
function render(vdom, contanier) {
  // debugger;
  const dom = createDOM(vdom);
  contanier.appendChild(dom);
}

/**
 * 将 vdom 变成真实 dom
 * @param {*} param0
 */
export function createDOM(vdom) {
  if (typeof vdom === "string" || typeof vdom === "number") {
    return document.createTextNode(vdom);
  }
  const { type, props } = vdom;
  let dom;
  if (typeof type === "function") {
    if (type.isReactComponent) {
      return mountClassComponent(vdom);
    }
    // 自定义函数组件
    return mountFunctionComponent(vdom);
  } else {
    dom = document.createElement(type);
  }
  updateProps(dom, props);
  if (
    typeof props.children === "string" ||
    typeof props.children === "number"
  ) {
    /**
     * 
        <div className="wrap" style={{ background: "#00ff11" }}>
           hello world
        </div>
     */
    dom.textContent = props.children;
  } else if (
    // 如果只有一个孩子并且此孩子是一个vdom
    typeof props.children === "object" &&
    props.children !== null &&
    props.children.type
  ) {
    /**
     * 
        <div className="wrap" style={{ background: "#00ff11" }}>
            <span style={{ color: "#ff0000" }}>hello</span>
        </div>
     */
    render(props.children, dom);
  } else if (Array.isArray(props.children)) {
    /**
     * 
        <div className="wrap" style={{ background: "#00ff11" }}>
            <span style={{ color: "#ff0000" }}>hello</span>
            <span style={{ color: "#1100ff" }}>world</span>
            <div>
                <span>1.0.0</span>
            </div>
        </div>
     */
    reconcileChildren(props.children, dom);
  } else {
    dom.textContent = props.children ? props.children.toString() : "";
  }
  vdom.dom = dom;
  return dom;
}

function updateProps(dom, newProps, oldProps) {
  for (const key in newProps) {
    if (key === "children") continue;
    if (key === "style") {
      const styleObj = newProps.style;
      for (const attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (/^on[A-Z]/.test(key)) {
      // const eventName = key.toLowerCase();
      // dom[eventName] = newProps[key];
      addEvent(dom, key.toLowerCase(), newProps[key]);
    } else {
      // 给真实 dom 元素赋 class => el.className = 'xxx'
      dom[key] = newProps[key];
    }
  }
}

function reconcileChildren(childrenVDOM, parentDOM) {
  for (let i = 0; i < childrenVDOM.length; i++) {
    const child = childrenVDOM[i];
    render(child, parentDOM);
  }
}

function mountFunctionComponent(vdom) {
  const { type: FunctionComponent, props } = vdom;
  const _vdom = FunctionComponent(props);
  return createDOM(_vdom);
}

function mountClassComponent(vdom) {
  const { type: ClassComponent, props } = vdom;
  const classInstance = new ClassComponent(props);
  const _vdom = classInstance.render();
  const dom = createDOM(_vdom);
  classInstance.dom = dom;
  return dom;
}

export default { render };
