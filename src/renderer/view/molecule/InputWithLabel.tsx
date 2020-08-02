import * as React from "react";
import styled from "styled-components";
import Input, { InputTextArea } from "../atom/InputForm";
import Checkbox, { CheckboxProps } from "../atom/Checkbox";
import RadioButton, { RadioButtonProps } from "../atom/RadioButton";
import COLOR from "../../../util/color";
import { Brackets } from "typeorm";

type basicProps = {
  label: string;
  name: string;
  className?: string;
  isCenter?: boolean;
};

export type Props = basicProps &
  (
    | {
        type?: "text" | "textarea" | undefined;
        input: {
          value: string;
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        };
      }
    | {
        type: "checkbox";
        input: CheckboxProps;
      }
    | {
        type: "radio";
        input: RadioButtonProps;
      }
  );

const Wrapper = styled.div<{ isCenter: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${(props) => (props.isCenter ? "center" : "inherit")};
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
`;

const Label = styled.p`
  min-width: 100px;
  text-align: right;
  margin-right: 20px;
  font-size: 0.8rem;
  color: ${COLOR.BLACK};
`;

const InputWithLabel: React.FC<Props> = (props) => {
  let elm;
  switch (props?.type) {
    case "checkbox":
      elm = (
        <Checkbox
          name={props.name}
          data={props.input.data}
          valueSetter={props.input.valueSetter}
          value={props.input.value}
        />
      );
      break;
    case "textarea":
      elm = (
        <InputTextArea
          name={props.name}
          value={props.input.value}
          onChange={props.input.onChange}
          fontSize="0.9rem"
        />
      );
      break;
    case "radio":
      elm = (
        <RadioButton
          name={props.name}
          data={props.input.data}
          valueSetter={props.input.valueSetter}
          value={props.input.value}
        />
      );
      break;
    case "text":
    case undefined:
      elm = (
        <Input
          name={props.name}
          value={props.input.value}
          onChange={props.input.onChange}
          fontSize="0.9rem"
        />
      );
      break;
  }
  return (
    <Wrapper className={props.className} isCenter={props?.isCenter ?? true}>
      <Label>{props.label}</Label>
      {elm}
    </Wrapper>
  );
};

export default InputWithLabel;
