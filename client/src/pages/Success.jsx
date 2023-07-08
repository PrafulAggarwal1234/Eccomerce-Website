import { useLocation } from "react-router-dom";

const Success = ()=>{
    const location = useLocation();
    console.log(location);
    return(
        <div>
            Your Payment Was Successfull
        </div>
    )
}
export default Success;