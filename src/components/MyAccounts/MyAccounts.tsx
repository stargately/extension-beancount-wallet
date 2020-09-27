import React from "react";
import { styled } from "onefx/lib/styletron-react";
import Button from "antd/lib/button";
import {
  ApiOutlined,
  DownloadOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  SearchOutlined,
  SettingFilled,
} from "@ant-design/icons";
import Input from "antd/lib/input";
import { fonts } from "../../styles/style-font";
import { AccountItem } from "./AccountItem";
import { MenuItem } from "./MenuItem";

export const MyAccounts = () => {
  return (
    <>
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              ...fonts.normal,
              color: "white",
              margin: "10px",
            }}
          >
            My Accounts
          </div>

          <div
            style={{
              width: "80px",
              margin: "10px",
            }}
          >
            <Button type={"default"} ghost block size={"small"}>
              Lock
            </Button>
          </div>
        </div>

        <HDivider />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "10px",
            marginTop: "5px",
            marginRight: "10px",
            justifyContent: "space-between",
          }}
        >
          <SearchOutlined style={{ color: "#ffffff", fontSize: "20px" }} />

          <div style={{ flexGrow: 1 }}>
            <Input
              placeholder={"Search Accounts"}
              bordered={false}
              style={{ ...fonts.normal, color: "white" }}
            />
          </div>
        </div>

        <HDivider />

        <AccountItem checked={true} />

        <AccountItem checked={false} />

        <HDivider />

        <MenuItem
          icon={() => (
            <PlusOutlined style={{ color: "white", fontSize: "20px" }} />
          )}
          content={"Create Account"}
        />

        <MenuItem
          icon={() => (
            <DownloadOutlined style={{ color: "white", fontSize: "20px" }} />
          )}
          content={"Import Account"}
        />

        <MenuItem
          icon={() => (
            <ApiOutlined style={{ color: "white", fontSize: "20px" }} />
          )}
          content={"Connect Hardware Wallet"}
        />

        <HDivider />

        <MenuItem
          icon={() => (
            <ExclamationCircleFilled
              style={{ color: "white", fontSize: "20px" }}
            />
          )}
          content={"Info & Help"}
        />

        <MenuItem
          icon={() => (
            <SettingFilled style={{ color: "white", fontSize: "20px" }} />
          )}
          content={"Settings"}
        />
      </Container>
    </>
  );
};

const Container = styled("div", {
  backgroundColor: "rgba(0,0,0,0.5)",
  borderRadius: "4px",
});

const HDivider = styled("div", {
  backgroundColor: "rgba(255,255,255,0.3)",
  height: "1px",
});
