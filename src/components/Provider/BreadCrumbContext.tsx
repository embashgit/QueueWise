import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BreadcrumbContextType } from './interface';

// Define the context type


// Create the context with a default value
const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

// Define the provider props
interface BreadcrumbProviderProps {
    children: ReactNode;
}

// Create the provider component
export const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({ children }) => {
    const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

    const addBreadcrumb = (route: string) => {
        setBreadcrumb((prev) => {
            if (!prev.includes(route)) {
                return [...prev, route];
            }
            return prev;
        });
    };

    return (
        <BreadcrumbContext.Provider value={{ breadcrumb, addBreadcrumb }}>
            {children}
        </BreadcrumbContext.Provider>
    );
};

// Custom hook to use the breadcrumb context
export const useBreadcrumb = (): BreadcrumbContextType => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
    }
    return context;
};
