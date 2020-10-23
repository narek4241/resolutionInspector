import { Inspector } from "./modules/Inspector.js";
import regeneratorRuntime from "regenerator-runtime"; // avoids

//////////////////////////////////// // ok?rm
let obj = {};
obj.selector = "p"; 
window["objSel"] = obj;
////////////////////////////////////

((window, document) => {
  const { body } = document; // {param} #needsRes

  window["Inspector"] = Inspector;
})(window, document);
