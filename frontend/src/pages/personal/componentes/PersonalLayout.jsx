import React from 'react';
import { Outlet } from 'react-router-dom';

const PersonalLayout = () => {
    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default PersonalLayout;