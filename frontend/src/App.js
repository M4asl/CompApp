import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import defaultTheme from "./styles/default";
import GlobalStyles from "./styles/globals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "./pages/EditProduct";
import NewProduct from "./pages/NewProduct";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Navbar />
        <ToastContainer position="bottom-center" autoClose={5000} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/cart" component={Cart} />
          <Route path="/products/new" component={NewProduct} />
          <Route path="/products/:productId" component={EditProduct} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
