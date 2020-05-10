import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

import COLOR from "../../../util/color";

interface Props {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Wrapper = styled.div`
  user-select: none;
  cursor: pointer;
  width: max-content;
  font-size: 1.2rem;
  font-weight: bolder;
  color: ${COLOR.BLACK};
  box-sizing: border-box;
  padding-bottom: 3px;
  border-bottom: 2px solid ${COLOR.BLACK};
`;

const NavButton: React.FC<Props> = (props) => {
  return <Wrapper onClick={props.onClick}>{props.children}</Wrapper>;
};

export default NavButton;
