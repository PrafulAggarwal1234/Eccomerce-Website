import { styled } from "styled-components";
import { popularProducts } from "../data/data";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
const Container = styled.div`
    padding:20px;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    
`
const Products = ({cat,filters,sortValue})=>{
    const [products,setProducts]=useState([]);
    const [filteredProducts,setFilteredProducts]=useState([]);

    useEffect( ()=>{
        const getProducts  = async () => {
            try{
                const res = await axios.get(cat? `http://localhost:5000/api/products?category=${cat}`:`http://localhost:5000/api/products`);
                setProducts(res.data);
                console.log(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[cat])

    useEffect(()=>{
        cat && setFilteredProducts(
            products.filter(item => Object.entries(filters).every(([key,value])=>
            item[key].includes(value)
        )
            ));
    },[products,cat,filters])

    useEffect(()=>{
        if(sortValue==='newest'){

            setFilteredProducts((prev)=>
            [...prev].sort((a, b) => 
                new Date(a.createdAt) - new Date(b.createdAt)
            )
            );
        }
        else if(sortValue==='asc'){
            setFilteredProducts((prev)=>
            [...prev].sort((a,b)=> a.price - b.price)
            );
        }
        else{
            setFilteredProducts((prev)=>
            [...prev].sort((a,b)=> b.price - a.price)
            );
        }

    },[sortValue])

    console.log(filteredProducts);
    return (
        <Container>
            {cat
            ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
            : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
        </Container>
    );
};
export default Products;