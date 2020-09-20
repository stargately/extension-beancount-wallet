import { styled } from "onefx/lib/styletron-react";
import React from "react";
import "./styles/antd.less";
import { Story } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import { WrapTemeProvider } from "./styles/theme-provider";

export const themeDecorator = () =>
  function Inner(story: Story): JSX.Element {
    return (
      <WrapTemeProvider>
        <Overlay>
          <MobileContent>
            <BrowserRouter>{React.createElement(story)}</BrowserRouter>
          </MobileContent>
        </Overlay>
      </WrapTemeProvider>
    );
  };

const MobileContent = styled("div", () => ({
  width: "360px",
  height: "600px",
}));

const Overlay = styled("div", ({ $theme }) => ({
  width: "100%",
  height: "700px",
  backgroundColor: $theme.colors.black10,
}));
