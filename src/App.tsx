/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Suspense, useEffect } from "react";
import { ConfigProvider } from "antd-mobile";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { getUserInfo } from "@util/user";
import Home from '@pages/home';
import Group from '@pages/group';
import GroupList from '@pages/group-list';
import GroupNotice from '@pages/group-notice';
import GroupNoticeEdit from '@pages/group-notice/edit';
import "./App.css";

const history = createBrowserHistory();

// eslint-disable-next-line @typescript-eslint/ban-types

const App = () => {
  // useEffect(() => {
  //   const user = getUserInfo();
  //   if (!user) {
  //     // history.push("/admin/login");
  //   }
  // }),
  //   [];
  return (
    <>
      <Router history={history}>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            {/* <Route exact path="/admin/login" component={props => <LoginIndex {...props} />} /> */}
            {/* <Route exact path="/auth" component={AuthIndex} /> */}
            <Route path="/home" component={props => <Home {...props}/>} />
            <Route path="/group" component={props => <Group {...props}/>} />
            <Route path="/group-list" component={props => <GroupList {...props}/>} />
            <Route exact path="/group-notice" component={props => <GroupNotice {...props}/>} />
            <Route exact path="/group-notice/edit" component={props => <GroupNoticeEdit {...props}/>} />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
