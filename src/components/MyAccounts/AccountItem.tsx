import React from "react";
import { styled } from "onefx/lib/styletron-react";
import { CheckOutlined } from "@ant-design/icons";
import { fonts } from "../../styles/style-font";

interface AccountItemProps {
  checked: boolean;
}

export const AccountItem = (props: AccountItemProps) => {
  return (
    <div
      style={{
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <CheckOutlined
          style={{
            ...fonts.normal,
            color: "white",
            marginLeft: "15px",
            visibility: props.checked ? "visible" : "hidden",
          }}
        />

        <CircleAvatar
          src={require("../../assets/img/logo.png")}
          style={{ marginLeft: "5px" }}
        />

        <div style={{ ...fonts.normal, color: "white", marginLeft: "10px" }}>
          Account 1
        </div>
      </div>

      <div
        style={{
          color: "#A9A9A9",
          fontSize: "14px",
          marginLeft: "76px",
        }}
      >
        $504.40 USD
      </div>
    </div>
  );
};

const CircleAvatar = styled("img", {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
});
