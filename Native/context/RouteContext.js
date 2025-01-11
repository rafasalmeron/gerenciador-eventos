import React, { createContext, useContext, useState } from 'react';

const RouteContext = createContext();

export const useRoute = () => useContext(RouteContext);

export const RouteProvider = ({ children }) => {
    const [route, setRoute] = useState('login');

    const navigate = (newRoute) => {
        setRoute(newRoute);
    };

    return (
        <RouteContext.Provider value={{ route, navigate }}>
            {children}
        </RouteContext.Provider>
    );
};