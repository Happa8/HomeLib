import * as React from "react";
import styled from "styled-components";

import COLOR from "../../../util/color";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const Wrapper = styled.div`
  width: 40%;
  max-width: 500px;
  height: 30%;
  max-height: 300px;
  background-color: ${COLOR.GLAY};
  color: ${COLOR.BLACK};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;

  transition-duration: 100ms;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 4px 1px ${COLOR.GLAY};
    transition-duration: 100ms;
  }
`;

const TopButton: React.FC<Props> = (props) => {
  return <Wrapper onClick={props.onClick}>{props.children}</Wrapper>;
};

export default TopButton;
