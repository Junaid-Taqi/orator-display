import React, {useEffect, useRef, useState} from 'react';
import 'primeicons/primeicons.css';
import '../../css/add-display-modal.css';
import DisplyCardList from './DisplyCardList';

// Resolution & orientation options for Add Display form
const LANDSCAPE_RESOLUTIONS = [
    {value: '1920x1080', label: '1920x1080 (Full HD)'},
    {value: '1280x720', label: '1280x720 (HD)'},
    {value: '3840x2160', label: '3840x2160 (4K)'},
    {value: '2560x1440', label: '2560x1440 (QHD)'},
];
const PORTRAIT_RESOLUTIONS = [
    {value: '1080x1920', label: '1080x1920 (Full HD)'},
    {value: '720x1280', label: '720x1280 (HD)'},
    {value: '1440x2560', label: '1440x2560 (QHD)'},
];
const RESOLUTION_OPTIONS = LANDSCAPE_RESOLUTIONS;

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

    const handleOrientationChange = (orientation) => {
        const defaultResolution = orientation === 'Portrait' ? '1080x1920' : '1920x1080';
        setFormData((prev) => ({
            ...prev,
            orientation,
            resolution: defaultResolution,
        }));
    };

    const getResolutionOptions = () => {
        return formData.orientation === 'Portrait' ? PORTRAIT_RESOLUTIONS : LANDSCAPE_RESOLUTIONS;
    };

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
                        <div className="add-display-header">
                            <h2 id="add-display-title" className="add-display-title">Add New Display</h2>
                            <p className="add-display-subtitle">Configure and register a new digital signage display</p>
                            <button type="button" className="close-btn" onClick={closeAddDisplay} aria-label="Close">×</button>
                        </div>
                        <form onSubmit={handleAddDisplaySubmit} className="add-display-form-new">
                            {/* Display Identification Section */}
                            <div className="form-section">
                                <div className="section-icon"><i className="pi pi-info-circle"/></div>
                                <h3>Display Identification</h3>
                                <p className="section-desc">Auto-generated and external monitoring IDs</p>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Auto-Generated Display ID</label>
                                        <div className="input-with-btn">
                                            <input type="text" placeholder="DSP-364UV97I" readOnly className="form-input"/>
                                            <button type="button" className="btn-regenerate">Regenerate</button>
                                        </div>
                                        <small>Unique system identifier (auto-generated)</small>
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Third-Party Monitoring ID</label>
                                        <input type="text" placeholder="e.g., MAN-12345, EXT-ABC123" className="form-input"/>
                                        <small>Optional: External monitoring system ID for integration</small>
                                    </div>
                                </div>
                            </div>

                            {/* Basic Information Section */}
                            <div className="form-section">
                                <h3>Basic Information</h3>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Display Name *</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g., Totem 1 - Community Center"
                                            value={formData.displayName}
                                            onChange={(e) => handleFormChange('displayName', e.target.value)}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Location *</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g., Main Entrance, Building A"
                                            value={formData.location}
                                            onChange={(e) => handleFormChange('location', e.target.value)}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Assignment Status</label>
                                        <select className="form-select">
                                            <option>Unassigned</option>
                                            <option>Assigned</option>
                                        </select>
                                    </div>
                                </div>
                                <small>Assign display to a specific zone or department</small>
                            </div>

                            {/* Display Specifications Section */}
                            <div className="form-section">
                                <h3>Display Specifications</h3>
                                
                                <div className="form-row two-col">
                                    <div className="form-group">
                                        <label>Orientation *</label>
                                        <div className="orientation-toggle">
                                            <button 
                                                type="button" 
                                                className={`orientation-btn ${formData.orientation === 'Landscape' ? 'active' : ''}`}
                                                onClick={() => handleOrientationChange('Landscape')}
                                            >
                                                <i className="pi pi-tablet"/>
                                                <span>Landscape</span>
                                            </button>
                                            <button 
                                                type="button" 
                                                className={`orientation-btn ${formData.orientation === 'Portrait' ? 'active' : ''}`}
                                                onClick={() => handleOrientationChange('Portrait')}
                                            >
                                                <i className="pi pi-mobile"/>
                                                <span>Portrait</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Resolution *</label>
                                        <select 
                                            value={formData.resolution}
                                            onChange={(e) => handleFormChange('resolution', e.target.value)}
                                            className="form-select"
                                            required
                                        >
                                            {getResolutionOptions().map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                        <small>Select screen resolution</small>
                                    </div>
                                </div>
                            </div>

                            {/* Sleep Schedule Section */}
                            <div className="form-section">
                                <div className="section-icon"><i className="pi pi-moon"/></div>
                                <h3>Sleep Schedule</h3>
                                <p className="section-desc">Configure power management and sleep times</p>
                                
                                <div className="form-row two-col">
                                    <div className="form-group">
                                        <label>Wake Time</label>
                                        <div className="time-input">
                                            <input type="time" defaultValue="05:00" className="form-input"/>
                                            <i className="pi pi-calendar"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Sleep Time</label>
                                        <div className="time-input">
                                            <input type="time" defaultValue="23:59" className="form-input"/>
                                            <i className="pi pi-calendar"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Note Section */}
                            <div className="form-note">
                                <i className="pi pi-info-circle"/>
                                <p><strong>Next Steps:</strong> After creating this display, you'll need to install the ORATOR Player app on the physical device and use the generated Display ID for the pairing process.</p>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={closeAddDisplay}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit">
                                    Create Display
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
