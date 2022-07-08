import React from "react";
import styled from "styled-components";

const Title = styled.div`
  font-family: "Manrope";
  border-bottom: 3px solid var(--color-brand-secondary);
  width: fit-content;
  padding: 0px 0.5em 0.5em 0px;
  text-align: ${(props) => props.align};
  h1 {
    font-size: 2.2em;
    margin: 0px;
    color: var(--color-font-primary);
    font-weight: 800;
  }
  span {
    font-size: 2.2em;
    color: var(--color-font-primary);
    font-weight: 400;
  }
`;

const CustomPrincipalTitle = ({ greet, subGreet, align = "left" }) => {
  return (
    <Title align={align}>
      <h1>{greet}</h1>
      <span>{subGreet}</span>
    </Title>
  );
};

export default CustomPrincipalTitle;
