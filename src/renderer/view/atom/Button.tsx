import * as React from "react";
import styled from "styled-components";

import COLOR from "../../../util/color";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  theme?: "default" | "reversed";
  size?: "default" | "mini";
  style?: React.CSSProperties;
} & Partial<typeof themes["default"]> &
  Partial<typeof sizes["default"]>;

const themes = {
  default: {
    bgColor: COLOR.BLACK,
    textColor: COLOR.WHITE,
    borderColor: COLOR.TRANSPARENT,
  },
  reversed: {
    bgColor: COLOR.TRANSPARENT,
    textColor: COLOR.BLACK,
    borderColor: COLOR.BLACK,
  },
};

const sizes = {
  default: {
    padding: "0 20px",
    fontSize: "0.8rem",
    heightSubset: "1rem",
  },
  mini: {
    padding: "0 20px",
    fontSize: "0.8rem",
    heightSubset: "0.5rem",
  },
};

const Wrapper = styled.div<{
  fontSize: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  padding: string;
  heightSubset: string;
}>`
  cursor: pointer;
  padding: ${(props) => props.padding};
  height: calc(${(props) => props.heightSubset} + ${(props) => props.fontSize});
  font-size: ${(props) => props.fontSize};
  letter-spacing: 0.2rem;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  border-radius: 0.2rem;
  border: 0.5px solid ${(props) => props.borderColor};
  justify-content: center;
`;

const Button: React.FC<Props> = (props) => {
  let theme = props?.theme || "default";
  let size = props?.size || "default";
  let bgColor = props?.bgColor || themes[theme].bgColor;
  let textColor = props?.textColor || themes[theme].textColor;
  let borderColor = props?.borderColor || themes[theme].borderColor;
  let fontSize = props?.fontSize || sizes[size].fontSize;
  let heightSubset = props?.heightSubset || sizes[size].heightSubset;
  let padding = props?.padding || sizes[size].padding;
  return (
    <Wrapper
      style={props.style}
      onClick={props.onClick}
      fontSize={fontSize}
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
      heightSubset={heightSubset}
      padding={padding}
    >
      {props.children}
    </Wrapper>
  );
};

export default Button;
