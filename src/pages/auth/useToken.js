import {useState } from 'react';

export const useToken = () => {
    const [userToken , setTokenInternal]= useState( () => {
        return localStorage.getItem('userToken');
    });

    const setToken = newToken => {
        localStorage.setItem('userToken', newToken);
        setTokenInternal(newToken);
    }
    return [userToken ,setToken];
}