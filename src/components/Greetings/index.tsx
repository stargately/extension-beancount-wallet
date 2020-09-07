import React from "react";
import { useAccount } from "../../hooks/use-account";

const Greetings = (): JSX.Element => {
  const [acc] = useAccount();
  return <div>{acc?.getAddress()}</div>;
};

export default Greetings;
