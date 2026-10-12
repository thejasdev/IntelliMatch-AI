export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    if (value == null || value === false) {
      return;
    }

    if (key === "class") {
      node.className = value;
      return;
    }

    if (key === "dataset") {
      Object.assign(node.dataset, value);
      return;
    }

    if (key === "html") {
      node.innerHTML = value;
      return;
    }

    if (key.startsWith("on") && typeof value === "function") {
      node.addEventListener(key.slice(2).toLowerCase(), value);
      return;
    }

    if (value === true) {
      node.setAttribute(key, "");
      return;
    }

    node.setAttribute(key, String(value));
  });

  []
    .concat(children)
    .filter((child) => child != null && child !== false)
    .forEach((child) => {
      node.append(child.nodeType ? child : document.createTextNode(String(child)));
    });

  return node;
}

export function svgIcon(markup, className = "nav-icon") {
  const wrapper = document.createElement("span");
  wrapper.className = className;
  wrapper.setAttribute("aria-hidden", "true");
  wrapper.innerHTML = markup;
  const svg = wrapper.querySelector("svg");
  if (svg) {
    svg.setAttribute("focusable", "false");
  }
  return wrapper;
}
