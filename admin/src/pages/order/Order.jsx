import { Link, useLocation } from "react-router-dom";
import "./order.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateOrder } from "../../redux/apiCalls";
export default function Order() {
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderId)
  );

  const handleChange = (e)=>{
    console.log(e.target.name);
    order.status=e.target.value;
    console.log("order: ",order);
  }
  const handleClick = (e) => { 
    // console.log("clicked");
    e.preventDefault();
    updateOrder(orderId,order,dispatch)
  }

  return (
    <div className="order">
      <div className="orderTitleContainer">
        <h1 className="orderTitle">Order</h1>
      </div>
      <div className="orderTop">
        <div className="orderTopRight">
          <div className="orderInfoTop">
            <img src={order.img} alt="" className="orderInfoImg" />
            <span className="orderName">{order.title}</span>
          </div>
          <div className="orderInfoBottom">
            <div className="orderInfoItem">
              <span className="orderInfoKey">id:</span>
              <span className="orderInfoValue">{order._id}</span>
            </div>
            <div className="orderInfoItem">
              <span className="orderInfoKey">Total amount:</span>
              <span className="orderInfoValue">{order.amount}</span>
            </div>
            <div className="orderInfoItem">
              <span className="orderInfoKey">Status: </span>
              <span className="orderInfoValue">{order.status}</span>
            </div>
            <div >
              <span className="orderInfoKey">Products: </span>
              <span>{order.products.map((item)=>{return item.title+','})}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="orderBottom">
        <form className="orderForm">
          <div className="orderFormLeft">
            {/* {/* <label>Total Amount</label>
            <input type="text" placeholder={order.amount} /> */}
            <label>Status</label> 
            <select name="status"  onChange={handleChange}>
              <option value="pending">pending</option>
              <option value="shipped">shipped</option>
            </select>
          </div>
            <button className="orderButton" style={{width:"200px"}} onClick={handleClick}>Update</button>
        </form>
      </div>
    </div>
  );
}
