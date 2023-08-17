import { useEffect } from "react";
import { useUser } from "../guru-pages/auth/useUser";
import { useNavigate } from "react-router-dom";

const GuruPrivateRoute = props => {
    const navigate=useNavigate();

    const guruUser = useUser();
    useEffect(() => {
        if(!guruUser ) navigate('/guru/login')    
        else{
            navigate('/guru/dashboard');
        }
      },[]);

    
    
}
export default GuruPrivateRoute;