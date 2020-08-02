import * as React from "react";
import styled from "styled-components";
import Input from "../molecule/InputWithLabel";
import { Props as InputProps } from "../molecule/InputWithLabel";

type Props = {
  InputProps: InputProps[];
};

const Wrapper = styled.div`
  width: 100%;
`;

const InputM = styled(Input)`
  margin: 10px 0;
  width: 100%;
  border-radius: 0;
`;

const MultipleInput: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      {props.InputProps.map((elm) => (
        <InputM {...elm} key={elm.name} isCenter={false} />
      ))}
    </Wrapper>
  );
};

export default MultipleInput;
