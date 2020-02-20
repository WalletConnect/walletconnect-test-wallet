import * as React from "react";
import styled from "styled-components";

import { colors } from "../styles";

interface ICardStyleProps {
  maxWidth: number;
}

interface ICardProps extends ICardStyleProps {
  children: React.ReactNode;
}

const SCard = styled.div<ICardStyleProps>`
  width: 100%;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(${colors.white});
  color: rgb(${colors.dark});
  border-radius: 6px;
  padding: 20px;
`;

const Card = (props: ICardProps) => {
  return (
    <SCard maxWidth={props.maxWidth} {...props}>
      {props.children}
    </SCard>
  );
};

Card.defaultProps = {
  maxWidth: 600,
};

export default Card;
