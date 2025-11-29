import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import PageNavigation from './components/PageNavigation';
import Footer from './components/Footer';
import './App.css';

function App() {
    const [currentParentKey, setCurrentParentKey] = useState('executive-summary');
    const [currentChildKey, setCurrentChildKey] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSectionChange = (parentKey, childKey = null) => {
        setCurrentParentKey(parentKey);
        setCurrentChildKey(childKey);
        // When navigating via PageNavigation on mobile, also close the sidebar
        setIsSidebarOpen(false);
    };

    return (
        <div className="app-root">
            <header className="app-header">
                Coronad Whitepaper
            </header>
            <div className="app">
                <Sidebar 
                    currentParentKey={currentParentKey}
                    currentChildKey={currentChildKey}
                    onSectionChange={handleSectionChange}
                    isMobileOpen={isSidebarOpen}
                    onCloseMobile={() => setIsSidebarOpen(false)}
                />
                <div className="content-wrapper">
                    <button
                        type="button"
                        className="sidebar-toggle-button"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        ☰ Navigation
                    </button>
                    <Content 
                        parentKey={currentParentKey}
                        childKey={currentChildKey}
                    />
                    <PageNavigation 
                        currentParentKey={currentParentKey}
                        currentChildKey={currentChildKey}
                        onSectionChange={handleSectionChange}
                    />
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default App;

