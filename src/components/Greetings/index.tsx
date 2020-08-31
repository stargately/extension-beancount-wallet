import React, { useState } from "react";
import icon from "../../assets/img/icon-128.png";

const Greetings = (): JSX.Element => {
  const [name] = useState("dev");
  return (
    <div>
      <p>Hello, {name}!</p>
      <img src={icon} alt="extension icon" />
    </div>
  );
};

export { Greetings };
