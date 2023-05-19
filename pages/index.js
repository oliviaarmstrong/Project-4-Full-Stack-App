// pages/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Redirect to other pages
export default function Home() {
    // Router to other pages
    const router = useRouter();

    // Redirect to other routes
    useEffect(() => {
        router.replace('/GameSave');
    }, []);

    return null;
}