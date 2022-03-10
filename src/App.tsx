/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Suspense, useEffect } from "react";
import { ConfigProvider } from "antd-mobile";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { getUserInfo } from "@util/user";
import Home from '@pages/home';
import Group from '@pages/group';
import GroupList from '@pages/group-list';
import GroupListEdit from '@pages/group-list/edit';
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
            {/* <Route exact path="/" component={props => <Home {...props}/>} /> */}
            <Route exact path="/home" component={props => <Home {...props}/>} />
            <Route exact path="/home/group" component={props => <Group {...props}/>} />
            <Route exact path="/home/group-list" component={props => <GroupList {...props}/>} />
            <Route exact path="/home/group-list/edit" component={props => <GroupListEdit {...props}/>} />
            <Route exact path="/home/group-notice" component={props => <GroupNotice {...props}/>} />
            <Route exact path="/home/group-notice/edit" component={props => <GroupNoticeEdit {...props}/>} />
            <Redirect path="/" to="/home"  />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
