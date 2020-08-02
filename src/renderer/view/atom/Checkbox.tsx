import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import COLOR from "../../../util/color";

export type CheckboxProps = {
  data: {
    label: string;
    value: string;
  }[];
  valueSetter: React.Dispatch<React.SetStateAction<string[]>>;
  value: string[];
};

type Props = CheckboxProps & {
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
    if (event.target.checked && !props.value.includes(event.target.value)) {
      props.valueSetter([...props.value, event.target.value]);
    } else if (
      !event.target.checked &&
      props.value.includes(event.target.value)
    ) {
      props.valueSetter(props.value.filter((r) => r !== event.target.value));
    }
  };

  const cboxs = () => {
    return props.data.map((datum) => (
      <Cbox>
        <input
          type="checkbox"
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
