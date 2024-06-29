import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TokenSetter = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');

        if (token) {
            localStorage.setItem('accessToken', token);
            navigate('/', { replace: true }); // Redirect to home and replace the history entry
        }
    }, [location, navigate]);

    return <div>Redirecting...</div>; // Optional: You can show a loading spinner or message
};

export default TokenSetter;