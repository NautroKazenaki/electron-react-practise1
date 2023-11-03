import React from "react";
// import { electron } from "webpack";
import AStyles from './App.module.css'

const App = () => {
  return (
    <div className={AStyles}>
      <h1>I'm a component</h1>
      <button onClick={() => {
        electron.notificationApi.sendNotification("i'm working")
      }}>Notify</button>
    </div>
  );
};

export default App;
