import React from 'react';
import ReactDOM from 'react-dom/client';
import { HomeContent } from '@/components/features/HomeContent';
import { wallpapers } from '@/data/wallpapers';
import './index.css';

// Client-side random selection for extension
const randomBg = wallpapers[Math.floor(Math.random() * wallpapers.length)];

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HomeContent initialBg={randomBg} />
    </React.StrictMode>
);
