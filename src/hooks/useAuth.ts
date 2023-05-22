import { useState } from 'react';

export const useAuth = () => {
    const [isAuth, setAuth] = useState(false);
    const response: string | null = localStorage.getItem('token');

    if (response) {
        setAuth(true);
    }

    return [isAuth];
};