"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import API from '@/utils/axiosInstance';

const SiteContext = createContext();

// Provider component to wrap your app
export const SiteProvider = ({ children }) => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [hasMore, setHasMore] = useState(true);
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(1);
    useEffect(() => {
        const initializeSite = async () => {
            try {
                const foundPosts = await API.get(`/posts/${offset}/${limit}`);
                if (foundPosts.data.length < limit) {
                    setHasMore(false); // No more pages if returned posts are less than limit
                }
                setPages(prevPages => [...prevPages, foundPosts.data]);
                setOffset(prevOffset => prevOffset + limit);
            } catch (error) {
                console.error('Error loading posts:', error);
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        if (hasMore) {
            initializeSite();
        }
    }, [offset, limit, hasMore]); // Add relevant dependencies

    return (
        <SiteContext.Provider value={{ pages, loading, hasMore }}>
            {children}
        </SiteContext.Provider>
    );
};

// Hook to use the store
export const useSite = () => {
    return useContext(SiteContext);
};