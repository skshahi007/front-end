import {useState , useEffect } from 'react';
import {useToken } from './useToken';

export const useUser = () => {
    const [userToken]= useToken();

    const getPayLoadFromToken = token => {
        
        const encodedPayLoad=token.split('.')[1];
        return JSON.parse(atob(encodedPayLoad));
    }

    const [user, setUser] = useState( () => {
        if(!userToken) return null;
        return getPayLoadFromToken(userToken);
    });
    useEffect( () => {
        if(!userToken){
            setUser(null);            
        }else{
            setUser(getPayLoadFromToken(userToken));
        }
    },[userToken]);
    return user;
}
