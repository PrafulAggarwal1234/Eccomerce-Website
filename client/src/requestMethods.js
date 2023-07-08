import axios from "axios";

const BASE_URL="http://localhost:5000/api/"
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTJhYjhjYjFkNGFlNGI1N2UwMjAwYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4ODQ3NDAxNSwiZXhwIjoxNjg4NzMzMjE1fQ.-oW1e4pU-oXCZnHOIqrNpMVXjURX4ICIj5b5OGOQHM4";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;


export const publicRequest = axios.create({
    baseURL:BASE_URL,
})
export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
})