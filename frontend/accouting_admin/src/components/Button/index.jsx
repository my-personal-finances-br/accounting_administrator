import React from "react";
import { CustomButton, TextButton } from "./style";

export default function Button({ title, ...rest }) {
  return (
    <CustomButton {...rest}>
      <TextButton>{title}</TextButton>
    </CustomButton>
  );
}
