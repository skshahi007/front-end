import { useEffect } from "react";
import { useUser } from "../pages/auth/useUser";
import { useNavigate } from "react-router-dom";

const PrivateRoute = props => {
    const navigate=useNavigate();

    const user = useUser();
    useEffect(() => {
        if(!user ) navigate('/login')    
        else{
            navigate('/dashboard');
        }
      },[]);

    
    
}
export default PrivateRoute;