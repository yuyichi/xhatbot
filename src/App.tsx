/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Suspense, useEffect } from "react";
import { ConfigProvider } from "antd-mobile";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { getUserInfo } from "@util/user";
import "./assets/index.less"; // 引入官方提供的 less 样式入口文件
import "./App.css";

const history = createBrowserHistory();

// eslint-disable-next-line @typescript-eslint/ban-types

const App = () => {
  useEffect(() => {
    const user = getUserInfo();
    if (!user) {
      history.push("/admin/login");
    }
  }),
    [];
  return (
    <>
      <Router history={history}>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            {/* <Route exact path="/admin/login" component={props => <LoginIndex {...props} />} /> */}
            {/* <Route exact path="/auth" component={AuthIndex} /> */}
            {/* <Route path="/admin" component={props => <AdminLayout {...props}/>} /> */}
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
