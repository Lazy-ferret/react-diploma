import React from 'react';

export default function Layout({ children }) {
    return (
        <>
            <main className="container">
                <div className="row">
                    <div className="col">
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
};
