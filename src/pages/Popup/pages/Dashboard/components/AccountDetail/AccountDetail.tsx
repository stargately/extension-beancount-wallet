import React, { useEffect } from "react";
import qrcode from "qrcode";
import { styled } from "onefx/lib/styletron-react";
import { Typography, Image, Modal, Space, Button } from "antd";

type AccountDetailProps = {
  address: string;
  name: string;
  visible: boolean;
  onNameChange?: (value: string) => void;
  onView?: () => void;
  onExport?: () => void;
  onCancel?: () => void;
};

export const AccountDetail: React.FC<AccountDetailProps> = function (props) {
  const [dataUrl, setDataUrl] = React.useState("");
  useEffect(() => {
    qrcode.toDataURL(props.address).then((dataUrl) => {
      setDataUrl(dataUrl);
    });
  }, [props.address]);
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      footer={
        <Space>
          <Button type="primary" onClick={props.onView}>
            View on IoTex
          </Button>
          <Button type="primary" onClick={props.onExport}>
            Export Private Key
          </Button>
        </Space>
      }
    >
      <Container>
        <Typography.Paragraph editable={{ onChange: props.onNameChange }}>
          {props.name}
        </Typography.Paragraph>
        <Image preview={false} src={dataUrl}></Image>
        <Typography.Paragraph
          style={{ maxWidth: "80%", textAlign: "center" }}
          copyable={{ text: props.address }}
        >
          {props.address}
        </Typography.Paragraph>
      </Container>
    </Modal>
  );
};

const Container = styled("div", {
  position: "relative",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
