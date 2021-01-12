import { styled } from "onefx/lib/styletron-react";
import React from "react";
import "./styles/antd.less";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Story } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { WrapThemeProvider } from "./styles/theme-provider";

export const themeDecorator = () =>
  function Inner(story: Story): JSX.Element {
    return (
      <WrapThemeProvider>
        <RecoilRoot>
          <Overlay>
            <MobileContent>
              <BrowserRouter>{React.createElement(story)}</BrowserRouter>
            </MobileContent>
          </Overlay>
        </RecoilRoot>
      </WrapThemeProvider>
    );
  };

const MobileContent = styled("div", () => ({
  width: "360px",
  height: "600px",
  border: "1px solid #DDD",
}));

const Overlay = styled("div", ({ $theme }) => ({
  width: "100%",
  height: "700px",
  backgroundColor: $theme.colors.black10,
  textAlign: "center",
}));
