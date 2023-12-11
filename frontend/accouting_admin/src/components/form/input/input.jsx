import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

import { Input } from "./style";

export default function InputUnform({ name, value, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return <Input ref={inputRef} defaultValue={value} {...rest} />;
}
