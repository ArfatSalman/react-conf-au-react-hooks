let idx = 0;
const hooks = [];

const setPropsOnElement = (el, props) => {
  for (const [propKey, value] of Object.entries(props).filter(
    ([key, _]) => !key.startsWith("__")
  )) {
    if (propKey.startsWith("on")) {
      const eventName = propKey.slice(2).toLowerCase();
      el.addEventListener(eventName, value);
    } else {
      el.setAttribute(propKey, value);
    }
  }
};

const generateDOM = componentAST => {
  if (typeof componentAST === "object" && componentAST !== null) {
    const { type, props } = componentAST;
    if (typeof type === "function") {
      return generateDOM(type(props));
    } else {
      const { children, ...rest } = props;

      const domElement = document.createElement(type);
      setPropsOnElement(domElement, rest);

      if (Array.isArray(children)) {
        children.forEach(child => {
          if (Array.isArray(child)) {
            child.forEach(subChild => {
              domElement.appendChild(generateDOM(subChild));
            });
          } else {
            domElement.appendChild(generateDOM(child));
          }
        });
      } else {
        domElement.appendChild(generateDOM(children));
      }
      return domElement;
    }
  } else {
    return document.createTextNode(componentAST);
  }
};

let reRender;

const ReactDOM = {
  render(component, root) {
    reRender = () => {
      idx = 0;
      while (root.firstChild) {
        root.removeChild(root.firstChild);
      }
      root.appendChild(generateDOM(component));
    }
    reRender();
  }
};


const React = {
  createElement(type, props, ...children) {
    const firstChild = children[0];
    const isOnlyChild = children.length === 1;

    return {
      type,
      props: {
        ...props,
        children: isOnlyChild ? firstChild : children.map(child => child)
      }
    };
  },
  useState(initialValue) {
    const value = hooks[idx] || initialValue;
    const _idx = idx;
    const setState = newValue => {
      console.log(`Hooks state = ${hooks}`);
      hooks[_idx] = newValue;
      setTimeout(() => {
        reRender();
      });
    };
    idx++;
    return [value, setState];
  }
};

export default React;
export { ReactDOM }
