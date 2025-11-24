import 'components/Loader/Loader.scss';
import React from 'react';

interface LoaderProps {
    textLoader?: string;
}
export const Loader:React.FC<LoaderProps> = ({ textLoader }) => (
    <div className="loadingContainer">
        <div className="spinner" />
        <span className="loadingText">{textLoader}</span>
    </div>
);
