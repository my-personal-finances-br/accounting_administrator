import React, { useEffect, useRef, Fragment } from "react";
import { useField } from "@unform/core";
import { Container, InputRadio, LabelInput, SubTitle } from "./style";

const RadioTeste = ({ name, options, ...rest }) => {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue = "" } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs) => {
        return (
          (refs.find((ref) => ref.checked) &&
            refs.find((ref) => ref.checked).value) ||
          ""
        );
      },
      setValue(refs, value) {
        const item = refs.find((ref) => ref.value === value);

        if (item) {
          item.checked = true;
        }
      },
      clearValue: (refs) => {
        const inputRef = refs.find((ref) => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <Fragment>
      {options.map((option, index) => (
        <Container>
          <LabelInput htmlFor={option.id} key={option.id}>
            <InputRadio
              ref={(ref) => ref && (inputRefs.current[index] = ref)}
              id={option.id}
              type={option.type}
              name={name}
              defaultChecked={defaultValue === option.value}
              value={option.value}
              {...rest}
            />

            {option.label}
          </LabelInput>
          {option.description && <SubTitle>{option.description}</SubTitle>}
        </Container>
      ))}
    </Fragment>
  );
};

export default RadioTeste;
