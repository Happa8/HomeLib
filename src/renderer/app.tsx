import * as React from "react";
import * as ReactDOM from "react-dom";

const container = document.getElementById("app");

const App: React.FC = () => {
  return <div>Hello, world!</div>;
};

ReactDOM.render(<App />, container);
