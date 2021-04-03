import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import NavBar from "./views/NavBar/NavBar.js";
import MainPage from "./views/MainPage/MainPage.js";
import SignUpPage from "./views/SignUpPage/SignUpPage.js";
import SignInPage from "./views/SignInPage/SignInPage.js";
import AddItemPage from "./views/Admin/Item/AddItemPage/AddItemPage.js";


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/product/add" component={AddItemPage} />
      </Switch>
      </div>
    </Suspense>
  );
}

export default App;
