import { styled } from "styled-components"
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userRequest } from "../requestMethods";
console.log("userRequest",userRequest);
const KEY = process.env.RAZORPAY_KEY;



const Container = styled.div`
  background-color:#eee;
  display:flex;
  flex-direction:column;
  padding:20px;
`
const Title = styled.h1`
    font-weight:300;
    text-align:center;
`;
const Form= styled.form`
  display:flex;
  flex-direction:column;
`
const Input = styled.input`
  height:50px;
margin:10px;
`
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: purple;
  cursor:pointer;
  color: white;
  font-weight: 600;
`;


const Checkout = () =>{
  const cart = useSelector(state=>state.cart);
  const navigate=useNavigate();
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const updateOrder = async ()=>{
      const tempResponse = {
        "userId":"64a1d1a837010410388f785d",
        "products":cart.products,
        "amount":cart.total,
        "address":inputs,
      }
      const tempUrl = "http://localhost:5000/api/orders";
      const temp = await userRequest.post(tempUrl,tempResponse);
      console.log("temp",temp);
      console.log("cart",cart.userId);
  }

  const initPayment = (data) => {
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
          if(data.code==="success"){
            await updateOrder();
          }
          data.code==="success"&&navigate('/success',{state:{data:data}});
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
    }

  console.log("checkoutpd",cart);
   return(
    <Container>
        <Title>Enter Your Adress Here</Title>
        <Input placeholder="Name" name="name" onChange={handleChange}/>
        <Input placeholder="Email" name="email" onChange={handleChange}/>
        <Input placeholder="Phone" name="phone" onChange={handleChange}/>
        <Input placeholder="House Number" name="house" onChange={handleChange}/>
        <Input placeholder="Landmark" name="landmark" onChange={handleChange}/>
        <Input placeholder="City" name="city" onChange={handleChange}/>
        <Input placeholder="State" name="state" onChange={handleChange} required/>
        <Input placeholder="PINCODE" name="pincode" onChange={handleChange} required/>
        <Button onClick={()=>handleClick(cart.total)}>Pay ₹ {cart.total}</Button>
    </Container>
   )
}

export default Checkout;