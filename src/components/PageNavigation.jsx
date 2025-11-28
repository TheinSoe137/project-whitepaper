import React from 'react';
import { sections } from '../data/sections';
import '../styles/PageNavigation.css';

const PageNavigation = ({ currentParentKey, currentChildKey, onSectionChange }) => {
    // Build flat list of all pages for navigation
    const buildPageList = () => {
        const pages = [];
        for (const [parentKey, section] of Object.entries(sections)) {
            // Add parent page
            pages.push({ type: 'parent', parentKey, childKey: null, title: section.title });
            
            // Add child pages if they exist
            if (section.children) {
                for (const [childKey, child] of Object.entries(section.children)) {
                    pages.push({ type: 'child', parentKey, childKey, title: child.title });
                }
            }
        }
        return pages;
    };

    // Get current page index
    const getCurrentPageIndex = (parentKey, childKey = null) => {
        const pages = buildPageList();
        return pages.findIndex(page => 
            page.parentKey === parentKey && page.childKey === childKey
        );
    };

    const pages = buildPageList();
    const currentIndex = getCurrentPageIndex(currentParentKey, currentChildKey);
    const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
    const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

    const handlePrevClick = () => {
        if (prevPage) {
            onSectionChange(prevPage.parentKey, prevPage.childKey);
        }
    };

    const handleNextClick = () => {
        if (nextPage) {
            onSectionChange(nextPage.parentKey, nextPage.childKey);
        }
    };

    return (
        <div className="page-navigation">
            {prevPage ? (
                <button className="nav-button prev" onClick={handlePrevClick}>
                    <span className="nav-button-icon">←</span>
                    <span>{prevPage.title}</span>
                </button>
            ) : (
                <div></div>
            )}
            
            {nextPage ? (
                <button className="nav-button next" onClick={handleNextClick}>
                    <span>{nextPage.title}</span>
                    <span className="nav-button-icon">→</span>
                </button>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default PageNavigation;

