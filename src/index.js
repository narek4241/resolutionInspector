import regeneratorRuntime from "regenerator-runtime";

let obj = {}; // ok?rm
obj.selector = "p"; // ok?rm
window["objSel"] = obj; // ok?rm

((window, document) => {
  const { body } = document; // {param} #needsRes

  function _Tooltip() {
    const element = document.createElement("div");
    element.style.cssText = `
    z-index: 999999999; 
    position: fixed; 
    top: 0; 
    left: 0; 
    background-color: black;
    color: white; display: none;
    padding: 5px; `;

    const show = () => (element.style.display = "block");
    const hide = () => (element.style.display = "none");

    this.activate = ({ width, height, top, left }) => {
      show();

      element.innerText = `${Math.floor(width)}x${Math.floor(height)}`;
      const rect = element.getBoundingClientRect();

      element.style.top = `${top + height - rect.height}px`; //
      element.style.left = `${left + width - rect.width}px`; //
    };

    this.deactivate = () => {
      hide();

      element.innerText = ``;
      element.style.top = "0";
      element.style.left = "0";
    };

    this.remove = () => element.parentNode.removeChild(element);

    body.appendChild(element);

    // this.element = element;
    // return this;
  }

  function Inspector({ selector }) {
    // {param} #needsRes
    const Tooltip = new _Tooltip();

    const checkConfigs = () => {
      if (!selector || typeof selector !== "string") {
        throw "Unexpected Selector given.";
        return Promise.reject(); // #needsRes
      }

      return Promise.resolve(); //#needsRes
    };

    const appendStyles = () => {
      const style = document.createElement("style");
      style.innerHTML =
        ".inspector-active-state{ outline: 3px solid red; cursor: pointer }";
      body.appendChild(style);
    };

    const getELements = (selector) => document.querySelectorAll(selector);

    const appendRect = (element) => {
      const { width, height, top, left } = element.getBoundingClientRect();
      element.rect = { width, height, top, left };
    };

    const activateState = (element) => {
      element.classList.add("inspector-active-state");
    };

    const deactivateState = (element) =>
      element.classList.remove("inspector-active-state");

    const attactEvents = (element) => {
      element.addEventListener("resize", () => appendRect(element));
      element.addEventListener("scroll", () => appendRect(element));

      appendRect(element);

      element.addEventListener("mouseover", () => {
        activateState(element);

        const { width, height, top, left } = element.getBoundingClientRect();

        Tooltip.activate({ width, height, top, left });
      });
      element.addEventListener("mouseleave", () => {
        deactivateState(element);
        Tooltip.deactivate();
      });
    };

    const init = async () => {
      try {
        await checkConfigs();

        appendStyles();

        const elements = getELements(selector);

        if (!elements.length) {
          throw "No present selector matched.";
          return;
        }

        elements.forEach((element) => {
          attactEvents(element);
        });
      } catch (error) {
        console.error(error);
        Tooltip.remove();
      }
    };

    return init();
  }

  window["Inspector"] = Inspector;
})(window, document);
