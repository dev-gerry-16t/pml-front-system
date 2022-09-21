import React from "react";
import styled from "styled-components";

const Chip = styled.div`
  cursor: pointer;
  border: 1px solid var(--color-font-primary);
  color: var(--color-font-primary);
  background: rgba(0, 208, 176, 0.15);
  display: flex;
  flex-direction: column;
  padding: 1em;
  border-radius: 0.6em;
  row-gap: 0.5em;
  font-size: 0.8em;
  .format-amount {
    display: flex;
    align-items: baseline;
    h1 {
      font-size: 1.2em;
      margin: 0px;
    }
  }
  &:hover {
    background: rgba(0, 208, 176, 0.5);
  }
`;

const ComponentChipInfo = (props) => {
  const { title = "", info = "" } = props;
  return (
    <Chip>
      <span>{title}</span>
      <strong>{info}</strong>
    </Chip>
  );
};

export default ComponentChipInfo;
