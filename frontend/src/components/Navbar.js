import React from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <NavContainer>
      <Link to="/">
        <h3>CompApp</h3>
      </Link>
      <List>
        <ListItem style={{ position: "relative" }}>
          <Dot>{cartItems.length}</Dot>
          <Link to="/cart">
            <AiOutlineShoppingCart />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/products/new">
            <AiOutlinePlusCircle />
          </Link>
        </ListItem>
      </List>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  margin: 10px;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.text.secondary};
  a {
    color: ${({ theme }) => theme.text.secondary};
  }
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  font-size: 3rem;
  padding: 0px 5px;
  margin: 0px 10px;
`;

const Dot = styled.span`
  position: absolute;
  top: -40%;
  left: 72%;
  padding: 2px 6px;
  border-radius: 50%;
  color: ${({ theme }) => theme.text.primary};
`;
