import * as React from "react";
import styled from "styled-components";

import COLOR from "../../../util/color";

type Props = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Wrapper = styled.input`
  font-size: 1.2rem;
  height: 2rem;
  padding: 0;
  padding-left: 10px;
  box-sizing: border-box;
  border: none;
  background-color: ${COLOR.GLAY};
`;

const InputForm: React.FC<Props> = (props) => {
  return (
    <Wrapper
      name={props.name}
      type="text"
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default InputForm;
