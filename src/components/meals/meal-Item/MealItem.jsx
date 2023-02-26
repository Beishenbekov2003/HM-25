// import React, { useContext } from 'react'
import { styled } from "@mui/system";
import style from "styled-components";
import MealForm from "./MealForm";

function MealItem({ meal }) {
  return (
    <Container>
      <StyledItemInfo>
        <StyledTitle>{meal.title}</StyledTitle>
        <p>{meal.description}</p>
        <StyledSpan>${meal.price}</StyledSpan>
      </StyledItemInfo>
      <MealForm id={meal._id} price={meal.price} title={meal.title} />
    </Container>
  );
}

export default MealItem;

const Container = style.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d6d6d6;

  margin-bottom: 20px;
  :last-child {
    border: none;
    margin-bottom: o;
  }
`;
const StyledItemInfo = style.div`
  margin-bottom: 20px;
  p {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin: 0;
    margin-top: 4px;
  }
 
  margin-bottom: 20px;
  font-style: italic;
  font-weight: 400;
  font-size: 1rem;
  line-height: 24px;
`;
const StyledTitle = style.h4`
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #d8d4d5;
  margin: 0;
`;
const StyledSpan = styled("span")(({ theme }) => ({
  fontWeight: "700",
  fontSize: "20px",
  lineHeight: "30px",
  color: theme.palette.primary.light,
  marginTop: "4px",
}));
