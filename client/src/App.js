import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import OrdersPage from "./pages/OrderPage"; // New orders page
import NotFound from "./pages/NotFound";
import Authentication from "./pages/Authentication";
import Favourites from "./pages/Favourites";
import Cart from "./pages/Cart";
import FoodDetails from "./pages/FoodDetails";
import FoodListing from "./pages/FoodListing";
import { useState } from "react";
import { useSelector } from "react-redux";

const Container = styled.div``;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar setOpenAuth={setOpenAuth} openAuth={openAuth} currentUser={currentUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favourites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dishes/:id" element={<FoodDetails />} />
            <Route path="/dishes" element={<FoodListing />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/orders" element={<OrdersPage />} /> {/* Updated route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {openAuth && <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
