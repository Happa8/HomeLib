import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import COLOR from "../../../util/color";

export type RadioButtonProps = {
  data: {
    label: string;
    value: string;
  }[];
  valueSetter: React.Dispatch<React.SetStateAction<string>>;
  value: string;
};

type Props = RadioButtonProps & {
  name: string;
};

const Wrapper = styled.form`
  display: flex;
`;

const Cbox = styled.div`
  color: ${COLOR.BLACK};
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  height: 1rem;
  margin-right: 20px;
  input {
    margin-right: 5px;
  }
`;

const Checkbox: React.FC<Props> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.valueSetter(event.target.value);
  };

  const cboxs = () => {
    return props.data.map((datum) => (
      <Cbox>
        <input
          type="radio"
          name={props.name}
          value={datum.value}
          onChange={handleChange}
        />
        <p>{datum.label}</p>
      </Cbox>
    ));
  };
  return <Wrapper>{cboxs()}</Wrapper>;
};

export default Checkbox;
