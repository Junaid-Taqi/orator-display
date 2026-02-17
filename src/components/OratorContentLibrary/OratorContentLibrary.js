import React, {useEffect, useRef, useState} from 'react';
import 'primeicons/primeicons.css';
import DisplyCardList from './DisplyCardList';

// Resolution & orientation options for Add Display form
const RESOLUTION_OPTIONS = [
    {value: '1920x1080', label: '1920x1080 (Full HD)'},
    {value: '1280x720', label: '1280x720 (HD)'},
    {value: '3840x2160', label: '3840x2160 (4K)'},
    {value: '2560x1440', label: '2560x1440 (QHD)'},
];
const ORIENTATION_OPTIONS = [
    {value: 'Landscape', label: 'Landscape'},
    {value: 'Portrait', label: 'Portrait'},
];

const OratorContentLibrary = () => {
    const totalDisplays = 24;
    const onlineCount = 22;
    const offlineCount = 2;

    const [addDisplayOpen, setAddDisplayOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    const user = JSON.parse(sessionStorage.getItem("liferayUser"));

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };
        if (userMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [userMenuOpen]);

    const [formData, setFormData] = useState({
        displayName: '',
        location: '',
        resolution: '1920x1080',
        orientation: 'Landscape',
    });

    const openAddDisplay = () => setAddDisplayOpen(true);
    const closeAddDisplay = () => {
        setAddDisplayOpen(false);
        setFormData({
            displayName: '',
            location: '',
            resolution: '1920x1080',
            orientation: 'Landscape',
        });
    };

    const handleFormChange = (field, value) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleAddDisplaySubmit = (e) => {
        e.preventDefault();
        // TODO: API call to add display; for now just close
        closeAddDisplay();
    };

    const handleLogout = () => {
        setUserMenuOpen(false);
        window.location.href = '/c/portal/logout';
    };

    return (
        <div className="displays-dashboard">
            {/* Top navigation bar */}
            <nav className="displays-dashboard__nav">
                <span className="displays-dashboard__nav-bell">
                    <i className="pi pi-bell"/>
                    <span className="nav-bell-dot" aria-hidden/>
                </span>
                <div className="displays-dashboard__nav-user-wrap" ref={userMenuRef}>
                    <button
                        type="button"
                        className="displays-dashboard__nav-user"
                        onClick={() => setUserMenuOpen((v) => !v)}
                        aria-expanded={userMenuOpen}
                        aria-haspopup="true"
                    >
                        <i className="pi pi-user nav-user-icon"/>
                        <div className="nav-user-info">
                            <span className="nav-user-name">{user?.fullName}</span>
                            <span className="nav-user-email">{user?.email}</span>
                        </div>
                        <i className={`pi pi-chevron-down nav-user-chevron ${userMenuOpen ? 'is-open' : ''}`}/>
                    </button>
                    {userMenuOpen && (
                        <div className="displays-dashboard__nav-user-menu" role="menu">
                            <button type="button" className="displays-dashboard__nav-user-menu-item" role="menuitem">
                                <i className="pi pi-user"/>
                                Profile
                            </button>
                            <button
                                type="button"
                                className="displays-dashboard__nav-user-menu-item displays-dashboard__nav-user-menu-item--logout"
                                role="menuitem"
                                onClick={handleLogout}
                            >
                                <i className="pi pi-sign-out"/>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main header */}
            <header className="displays-dashboard__header">
                <div className="displays-dashboard__title-block">
                    <h1 className="displays-dashboard__title">Displays</h1>
                    <p className="displays-dashboard__subtitle">
                        Monitor and manage all connected digital signage displays
                    </p>
                </div>
                <div className="buttons">
                    <button type="button" className="displays-dashboard__add-btn bg-success btn me-3" onClick={openAddDisplay}>
                        <i className="pi pi-plus me-2"/>
                        Add Display
                    </button>
                </div>
            </header>

            {/* Summary cards */}
            <section className="displays-dashboard__cards">
                <div className="displays-dashboard__card">
                    <div className="displays-dashboard__card-content">
                        <p className="displays-dashboard__card-title">Total Content</p>
                        <p className="displays-dashboard__card-value">{totalDisplays}</p>
                    </div>
                    <i className="pi pi-file-o fs-3 pt-3 text-light-blue"/>
                </div>
                <div className="displays-dashboard__card">
                    <div className="displays-dashboard__card-content">
                        <p className="displays-dashboard__card-title">Active</p>
                        <p className="displays-dashboard__card-value">{onlineCount}</p>
                    </div>
                    <span
                        className="displays-dashboard__card-icon icon-online mt-4"
                        style={{width: 16, height: 16, borderRadius: '50%', background: '#50E3C2', display: 'inline-block'}}
                        aria-hidden
                    />
                </div>
                <div className="displays-dashboard__card">
                    <div className="displays-dashboard__card-content">
                        <p className="displays-dashboard__card-title">Sleeping</p>
                        <p className="displays-dashboard__card-value">{offlineCount}</p>
                    </div>
                    <i className="pi pi-user displays-dashboard__card-icon icon-offline pt-3"/>
                </div>
                <div className="displays-dashboard__card">
                    <div className="displays-dashboard__card-content">
                        <p className="displays-dashboard__card-title">Offline</p>
                        <p className="displays-dashboard__card-value">{offlineCount}</p>
                    </div>
                    <i className="pi pi-wifi displays-dashboard__card-icon icon-offline pt-3"/>
                </div>
                <div className="displays-dashboard__card">
                    <div className="displays-dashboard__card-content">
                        <p className="displays-dashboard__card-title">Avg. Uptime</p>
                        <p className="displays-dashboard__card-value">{offlineCount}</p>
                    </div>
                    <i className="pi pi-clock displays-dashboard__card-icon icon-offline pt-3"/>
                </div>
            </section>

            {/* Display cards (new component) */}
            <DisplyCardList/>

            {/* Help button */}
            <button
                type="button"
                className="displays-dashboard__help-btn"
                aria-label="Help"
            >
                <i className="pi pi-question"/>
            </button>

            {/* Add New Display modal */}
            {addDisplayOpen && (
                <div className="add-display-overlay" onClick={closeAddDisplay} role="presentation">
                    <div
                        className="add-display-dialog"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="add-display-title"
                    >
                        <h2 id="add-display-title" className="add-display-dialog__title">
                            Add New Display
                        </h2>
                        <form onSubmit={handleAddDisplaySubmit} className="add-display-form">
                            <div className="add-display-form__field">
                                <label htmlFor="display-name">Display Name</label>
                                <input
                                    id="display-name"
                                    type="text"
                                    placeholder="e.g., Lobby Screen 2"
                                    value={formData.displayName}
                                    onChange={(e) => handleFormChange('displayName', e.target.value)}
                                    className="add-display-form__input"
                                />
                            </div>
                            <div className="add-display-form__field">
                                <label htmlFor="location">Location</label>
                                <input
                                    id="location"
                                    type="text"
                                    placeholder="e.g., Main Entrance"
                                    value={formData.location}
                                    onChange={(e) => handleFormChange('location', e.target.value)}
                                    className="add-display-form__input"
                                />
                            </div>
                            <div className="add-display-form__field">
                                <label htmlFor="resolution">Resolution</label>
                                <select
                                    id="resolution"
                                    value={formData.resolution}
                                    onChange={(e) => handleFormChange('resolution', e.target.value)}
                                    className="add-display-form__select"
                                >
                                    {RESOLUTION_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                <i className="pi pi-chevron-down add-display-form__chevron" aria-hidden/>
                            </div>
                            <div className="add-display-form__field">
                                <label htmlFor="orientation">Orientation</label>
                                <select
                                    id="orientation"
                                    value={formData.orientation}
                                    onChange={(e) => handleFormChange('orientation', e.target.value)}
                                    className="add-display-form__select"
                                >
                                    {ORIENTATION_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                <i className="pi pi-chevron-down add-display-form__chevron" aria-hidden/>
                            </div>
                            <div className="add-display-form__actions">
                                <button type="button" className="add-display-form__cancel" onClick={closeAddDisplay}>
                                    Cancel
                                </button>
                                <button type="submit" className="add-display-form__submit">
                                    Add Display
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OratorContentLibrary;
