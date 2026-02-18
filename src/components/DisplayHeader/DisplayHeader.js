import React from 'react';

const DisplayHeader = ({ onAddDisplay }) => {
    return (
        <header className="displays-dashboard__header">
            <div className="displays-dashboard__title-block">
                <h1 className="displays-dashboard__title">Displays</h1>
                <p className="displays-dashboard__subtitle">
                    Monitor and manage all connected digital signage displays
                </p>
            </div>
            <div className="buttons">
                <button type="button" className="displays-dashboard__add-btn bg-success btn me-3" onClick={onAddDisplay}>
                    <i className="pi pi-plus me-2" />
                    Add Display
                </button>
            </div>
        </header>
    );
};

export default DisplayHeader;
