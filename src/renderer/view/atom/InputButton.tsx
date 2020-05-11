import * as React from "react";
import styled from "styled-components";

import COLOR from "../../../util/color";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const Wrapper = styled.div`
  cursor: pointer;
  padding: 0 20px;
  height: 2rem;
  font-size: 1.2rem;
  letter-spacing: 0.3rem;
  padding-left: calc(0.3rem + 20px);
  display: flex;
  align-items: center;
  background-color: ${COLOR.BLACK};
  font-weight: bold;
  color: #fff;
`;

const InputButton: React.FC<Props> = (props) => {
  return <Wrapper onClick={props.onClick}>{props.children}</Wrapper>;
};

export default InputButton;
