export const _Tooltip = function () {
  const { body } = document; // task place

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
};
