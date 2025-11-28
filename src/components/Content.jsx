import React, { useEffect, useRef } from 'react';
import { sections } from '../data/sections';
import '../styles/Content.css';

const Content = ({ parentKey, childKey }) => {
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [parentKey, childKey]);

    const getContent = () => {
        if (childKey && sections[parentKey]?.children?.[childKey]) {
            return sections[parentKey].children[childKey].content;
        }
        if (sections[parentKey]) {
            return sections[parentKey].content;
        }
        return '<p>Content not found</p>';
    };

    return (
        <div className="content" ref={contentRef}>
            <div dangerouslySetInnerHTML={{ __html: getContent() }} />
        </div>
    );
};

export default Content;

