import { AppBar, Button } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styledComponents from "styled-components";
import { getBasket } from "../../store/basket/basketReducer";
import { uiActions } from "../../store/UI/UISlice";
import { BasketButton } from "./BasketButton";

export const Header = ({ onShowBasket }) => {
  const items = useSelector((state) => state.basket.items);
  const themeMode = useSelector((state) => state.ui.themeMode);
  const [animationClass, setAnimationClass] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBasket());
  }, [dispatch]);

  const calculateTotalAmount = () => {
    const sum = items.reduce((s, item) => {
      return s + item.amount;
    }, 0);
    return sum;
  };
  const themeHandler = () => {
    const theme = themeMode === "light" ? "dark" : "light";
    dispatch(uiActions.changeTheme(theme));
  };

  useEffect(() => {
    setAnimationClass("bump");

    const id = setTimeout(() => {
      setAnimationClass("");
    }, 300);

    return () => {
      clearTimeout(id);
    };
  }, [items]);

  return (
    <Container>
      <Logo>ReactMeals</Logo>
      <BasketButton
        onClick={onShowBasket}
        className={animationClass}
        count={calculateTotalAmount()}
      />
      <Button
        onClick={themeHandler}
        className={animationClass}
        count={calculateTotalAmount()}
        sx={{ color: "white" }}
      >
        {themeMode === "light" ? "turn light mode" : "turn durk mode"}
      </Button>
    </Container>
  );
};

const Container = styled(AppBar)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  position: "fixed",
  zIndex: "1",
  top: "0",
  height: "101px",
  backgroundColor: theme.palette.primary.main,
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingLeft: "120px",
  paddingRight: "120px",
}));

const Logo = styledComponents.p`
  font-weight: 600;
  font-size: 38px;
  line-height: 57px;
  color: #ffffff;
  margin: 0;
`;
