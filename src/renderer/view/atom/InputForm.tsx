import * as React from "react";
import styled from "styled-components";

import COLOR from "../../../util/color";

type Props = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent) => void;
  fontSize?: string;
};

const Wrapper = styled.input<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize};
  height: calc(${(props) => props.fontSize} + 0.8rem);
  padding: 0;
  padding-left: 10px;
  box-sizing: border-box;
  border: none;
  background-color: ${COLOR.GLAY};
  color: ${COLOR.BLACK};
  width: 100%;
`;

const InputForm: React.FC<Props> = (props) => {
  return (
    <Wrapper
      name={props.name}
      type="text"
      value={props.value}
      onChange={props.onChange}
      fontSize={props.fontSize || "1.2rem"}
    />
  );
};

const TextAreaElm = Wrapper.withComponent("textarea");
const TextAreaEx = styled(TextAreaElm)`
  height: 100px;
  padding: 5px 10px;
`;

export const InputTextArea: React.FC<Props> = (props) => {
  return (
    <TextAreaEx
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      fontSize={props.fontSize || "1.2rem"}
    />
  );
};

export default InputForm;
