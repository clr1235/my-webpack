import React from "react";
import ReactDOM from "react-dom";

// import { configure } from 'mobx';

// import * as serviceWorker from './serviceWorker';

// import App from "./app";

configure({
  enforceActions: "observed"
});

ReactDOM.render(
    <div>home</div>,
    document.getElementById("home")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


