"use client";

import {useEffect, useState} from 'react';

export function useIsLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('access_token');
        setIsLoggedIn(!!token);
    }, []);

    return isLoggedIn;
}
