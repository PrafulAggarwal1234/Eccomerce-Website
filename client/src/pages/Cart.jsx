import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { Add, Key, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import axios from 'axios';
import StripeCheckout from "react-stripe-checkout";
import Checkout from "./Checkout";
import { Link, Navigate } from "react-router-dom";

const KEY = process.env.RAZORPAY_KEY;

const Container = styled.div``;
const Wrapper = styled.div`
    padding:20px;
    ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
    font-weight:300;
    text-align:center;
`;
const Top = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
`;
const TopButton = styled.button`
    padding:10px;
    font-weight:600;
    cursor:pointer;
    border:${props=>props.type==="filled"&&"none"};
    color:${props=>props.type==="filled"&&"white"};
    background-color:${props=>props.type==="filled"?"black":"transparent"};
`
const TopTexts = styled.div`
${mobile({ display: "none" })}
`;
const TopText = styled.span`
    text-decoration:underline;
    cursor:pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display:flex;
    justify-content:space-between;
    ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
    flex:3
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}

`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}

 
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;;

`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  cursor:pointer;
  color: white;
  font-weight: 600;
`;

/* const initPayment = (data) => {
		const options = {
			key: KEY,
			amount: data.amount,
			currency: data.currency,
			name: "KGP. STORE",
			description: "Test Transaction",
            image:"https://shorturl.at/iFS12",
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:5000/api/checkout/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

    const handleClick = async (totalAmount) =>{
        try{
            const orderUrl="http://localhost:5000/api/checkout/payment";
            const res = await axios.post(orderUrl, { tokenId:1,amount: totalAmount*100 });
			console.log(res.data);
            initPayment(res.data);
        }catch(err){
            console.log(err);
        }
    } */
   

const Cart = () =>{
    const cart = useSelector(state=>state.cart);
    console.log("cart",cart);
    return(
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag({cart.quantity})</TopText>
                        <TopText>Your Wishlist</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((item)=> <Product>
                            <ProductDetail> 
                            <Image src={item.img} />
                                <Details>
                                <ProductName>
                                    <b>Product:</b> {item.title}
                                </ProductName>
                                <ProductId>
                                    <b>ID:</b> {item._id}
                                </ProductId>
                                <ProductColor color={item.color}/>
                                <ProductSize>
                                    <b>Size:</b> {item.size}
                                </ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                     <ProductAmountContainer>
                                        <Add/>
                                        <ProductAmount>{item.quantity}</ProductAmount>
                                        <Remove/>
                                    </ProductAmountContainer>
                                    <ProductPrice>₹ {item.price*item.quantity}</ProductPrice>
                            </PriceDetail>
                        </Product>)}
                        <Hr/>
                    </Info>
                    <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>₹ 100</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>₹ -100</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <Link to="/checkout">
                        <Button>CHECKOUT NOW</Button>
                        </Link>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    )
}
export default Cart;