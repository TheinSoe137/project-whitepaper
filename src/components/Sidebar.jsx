import React, { useState } from 'react';
import { sections } from '../data/sections';
import '../styles/Sidebar.css';

const Sidebar = ({ currentParentKey, currentChildKey, onSectionChange, isMobileOpen, onCloseMobile }) => {
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (key) => {
        setExpandedSections(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleToggleClick = (key, event) => {
        event.stopPropagation();
        toggleSection(key);
    };

    const handleParentClick = (key) => {
        onSectionChange(key, null);
        if (onCloseMobile) {
            onCloseMobile();
        }
        // Expand children if section has children and is not already expanded
        if (sections[key].children && Object.keys(sections[key].children).length > 0) {
            if (!expandedSections[key]) {
                setExpandedSections(prev => ({
                    ...prev,
                    [key]: true
                }));
            }
        }
    };

    const handleChildClick = (parentKey, childKey, event) => {
        event.preventDefault();
        onSectionChange(parentKey, childKey);
        if (onCloseMobile) {
            onCloseMobile();
        }
        // Expand parent if not already expanded
        if (!expandedSections[parentKey]) {
            setExpandedSections(prev => ({
                ...prev,
                [parentKey]: true
            }));
        }
    };

    return (
        <div className={`sidebar ${isMobileOpen ? 'sidebar-open' : ''}`}>
            <div className="sidebar-header">
                {/* <h1>Coronad Whitepaper</h1> */}
                <button
                    type="button"
                    className="sidebar-close-btn"
                    onClick={onCloseMobile}
                >
                    ✕
                </button>
            </div>
            <nav className="navigation">
                {Object.entries(sections).map(([key, section]) => {
                    const hasChildren = section.children && Object.keys(section.children).length > 0;
                    const isExpanded = expandedSections[key];
                    const isParentActive = currentParentKey === key && currentChildKey === null;
                    
                    return (
                        <div key={key} className="nav-item">
                            {hasChildren ? (
                                <>
                                    <div 
                                        className={`nav-link ${isParentActive ? 'active' : ''}`}
                                        onClick={() => handleParentClick(key)}
                                    >
                                        <span 
                                            className={`nav-toggle ${isExpanded ? 'expanded' : ''}`}
                                            onClick={(e) => handleToggleClick(key, e)}
                                        >
                                            ▶
                                        </span>
                                        {section.title}
                                    </div>
                                    <div className={`nav-children ${isExpanded ? 'expanded' : ''}`}>
                                        {Object.entries(section.children).map(([childKey, child]) => {
                                            const isChildActive = currentParentKey === key && currentChildKey === childKey;
                                            return (
                                                <button
                                                    key={childKey}
                                                    type="button"
                                                    className={`nav-child ${isChildActive ? 'active' : ''}`}
                                                    onClick={(e) => handleChildClick(key, childKey, e)}
                                                >
                                                    {child.title}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <div 
                                    className={`nav-link ${isParentActive ? 'active' : ''}`}
                                    onClick={() => handleParentClick(key)}
                                >
                                    {section.title}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;

