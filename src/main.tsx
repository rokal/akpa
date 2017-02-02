/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react-dom/react-dom.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import {Application} from "./view/application";

ReactDOM.render(
    <Application/>,
    document.getElementById("app")
);