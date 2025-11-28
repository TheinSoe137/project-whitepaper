import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import PageNavigation from './components/PageNavigation';
import Footer from './components/Footer';
import './App.css';

function App() {
    const [currentParentKey, setCurrentParentKey] = useState('executive-summary');
    const [currentChildKey, setCurrentChildKey] = useState(null);

    const handleSectionChange = (parentKey, childKey = null) => {
        setCurrentParentKey(parentKey);
        setCurrentChildKey(childKey);
    };

    return (
        <div className="app">
            <Sidebar 
                currentParentKey={currentParentKey}
                currentChildKey={currentChildKey}
                onSectionChange={handleSectionChange}
            />
            <div className="content-wrapper">
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
    );
}

export default App;

