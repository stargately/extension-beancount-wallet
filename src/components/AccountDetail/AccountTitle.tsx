import React, { useEffect, useRef } from "react";
import { styled } from "onefx/lib/styletron-react";
import { Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import ClipboardJS from "clipboard";

type AccountTitleProps = {
  account?: {
    name: string;
    address: string;
  };
};

export const AccountTitle: React.FC<AccountTitleProps> = ({ account }) => {
  const buttonRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let clipboard: ClipboardJS;
    if (buttonRef.current) {
      clipboard = new ClipboardJS(buttonRef.current);
    }
    return () => {
      if (clipboard) {
        clipboard.destroy();
      }
    };
  }, []);

  return (
    <Container>
      <Title>
        <Account>{account?.name}</Account>
        <AddressView>
          <Address title={account?.address}>
            <span>{account?.address} </span>
          </Address>
          <Tooltip title="Copied" trigger="click">
            <span ref={buttonRef} data-clipboard-text={account?.address}>
              <CopyButton />
            </span>
          </Tooltip>
        </AddressView>
      </Title>
    </Container>
  );
};

const Container = styled("div", {
  textAlign: "center",
});

const Title = styled("div", ({ $theme }) => ({
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  padding: "12px",
  borderBottom: `1px solid ${$theme.colors.black40}`,
}));

const Account = styled("div", {
  fontWeight: "bold",
});

const Address = styled("div", ({ $theme }) => ({
  color: $theme.colors.black60,
  width: "150px",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const AddressView = styled("div", () => ({
  display: "flex",
}));

const CopyButton = styled(CopyOutlined, ({ $theme }) => ({
  color: $theme.colors.black80,
  marginLeft: $theme.sizing[0],
  cursor: "pointer",
}));
