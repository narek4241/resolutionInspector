import { _Tooltip } from "./Tooltip.js";

export const Inspector = function ({ selector }) {
  const { body } = document;

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
};
