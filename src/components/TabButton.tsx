import React from 'react';

interface TabButtonProps {
    id: string;
    activeTab: string;
    setActiveTab: (id: string) => void;
    children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ id, activeTab, setActiveTab, children }) => {
    const isActive = activeTab === id;
    const classes = isActive
        ? 'border-blue-600 text-blue-600 font-semibold'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
    
    return (
        <button
            onClick={() => setActiveTab(id)}
            className={`py-4 px-1 border-b-2 text-sm font-medium transition-colors ${classes}`}
        >
            {children}
        </button>
    );
};

export default TabButton;
