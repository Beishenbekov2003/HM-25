import { createTheme, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Basket } from "./components/basket/Basket";
import { Header } from "./components/header/Header";
import { Meals } from "./components/meals/Meals";
import { Summary } from "./components/summary/Summary";
import Snackbar from "./components/UI/Snackbar";
import { darkTheme, lightTheme } from "./lib/constans/theme";
import { store } from "./store";
import { uiActions } from "./store/UI/UISlice";

function AppContent() {
  const dispatch = useDispatch();

  const snackbar = useSelector((state) => state.ui.snackbar);
  const themeMode = useSelector((state) => state.ui.themeMode);
  const [isBasketVisible, setBasketVisible] = useState(false);

  const showBasketHandler = () => {
    setBasketVisible((prevState) => !prevState);
  };
  const theme = useMemo(() => {
    const currrentTheme =
      themeMode === "light" ? { ...lightTheme } : { ...darkTheme };
    return createTheme(currrentTheme);
  }, [themeMode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header onShowBasket={showBasketHandler} />
        <Content>
          <Summary />
          <Meals />
          {isBasketVisible && (
            <Basket open={isBasketVisible} onClose={showBasketHandler} />
          )}
          <Snackbar
            isOpen={snackbar.isOpen}
            severity={snackbar.severity}
            message={snackbar.message}
            onClose={() => dispatch(uiActions.closeSnackbar())}
          />
        </Content>
      </ThemeProvider>
    </>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;

const Content = styled.div`
  margin-top: 101px;
`;
