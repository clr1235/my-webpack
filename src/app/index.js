import React from "react";
import ReactDOM from "react-dom";

import './index.less'

configure({
  enforceActions: "observed"
});

ReactDOM.render(
    <div>app页面</div>,
    document.getElementById("root")
);



