import React from 'react';
import {Route, IndexRoute} from "react-router";

import UPortLogin from "./layouts/home/UPortLogin";
import App from "./App";

export default (
    <Route component={App} path="/">
        <Route path="uport" component={UPortLogin} />
    </Route>
)
