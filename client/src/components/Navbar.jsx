import React from "react";
import { styled } from "styled-components";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import {mobile} from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Container = styled.div`
    height: 60px;
    ${mobile({height:"50px"})};
`;

const Wrapper =  styled.div`
padding: 10px 20px;
display: flex;
align-items:center;
justify-content:space-between;
${mobile({padding:"10px 0px"})};
`
const Left =  styled.div`
    flex:1;
    display: flex;
    align-items:center;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({display:"none"})};
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items:center;
    margin-left:25px;
    padding: 5px;
`
const Input = styled.input`
    border: none;
    ${mobile({width:"50px"})};
`
const Logo = styled.h1`
    font-weight: bold;
    color:#000000;
    ${mobile({fontSize:"24px"})};

`
const Center =  styled.div`
     flex:1;
    text-align: center;
`
const Right =  styled.div`
     flex:1;
     display: flex;
     justify-content:flex-end;
     ${mobile({flex:2,justifyContent:"center"})};
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left:25px;
    color:#000000;
    ${mobile({fontSize:"12px", marginLeft:"10px"})};
`
const Navbar = () => {

    const quantity = useSelector(state=>state.cart.quantity)
    console.log(quantity);

    return(
        <Container>
            <Wrapper>
                <Left>
                    <Language>
                        EN
                    </Language>
                    <SearchContainer>
                       <Input placeholder="Search"/>
                        <Search style={{color:"gray",fontsize:16}}/>
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                    <Logo>KGP.</Logo>
                    </Link>
                </Center>
                <Right>
                    <Link to ="/register" style={{ textDecoration: 'none' }}>
                    <MenuItem>Register</MenuItem>
                    </Link>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                    <MenuItem>SIGN IN</MenuItem>
                    </Link>
                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined/>
                        </Badge>
                    </MenuItem>
                    </Link>
                </Right> 
            </Wrapper>

        </Container>
    )
}

export default Navbar;