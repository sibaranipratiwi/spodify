import "./App.css";
import React from "react";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import NavigationBar from "./components/Navigation";

function App() {
  return (
    <Provider store={store}>
      <NavigationBar/>
      <div className="App">
        <Login />
      </div>
    </Provider>
  );
}

export default App;
