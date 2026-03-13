import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast, ToastContainer } from 'react-bootstrap';
import { addDisplay } from '../../Services/Slices/AddDisplaySlice';
import { getAllDisplays } from '../../Services/Slices/GetDisplaysSlice';
import { useTranslation } from '../../Services/Localization/Localization';

const LANDSCAPE_RESOLUTIONS = [
    { value: '1920x1080', label: '1920x1080 (Full HD)' },
    { value: '1280x720', label: '1280x720 (HD)' },
    { value: '3840x2160', label: '3840x2160 (4K)' },
    { value: '2560x1440', label: '2560x1440 (QHD)' },
];
const PORTRAIT_RESOLUTIONS = [
    { value: '1080x1920', label: '1080x1920 (Full HD)' },
    { value: '720x1280', label: '720x1280 (HD)' },
    { value: '1440x2560', label: '1440x2560 (QHD)' },
];

const extractDisplayId = (response) => {
    if (!response || typeof response !== 'object') return '';

    return (
        response?.displayUuid ||
        ''
    );
};

const AddDisplayModal = ({ onClose, user }) => {
    const { t } = useTranslation();
    const NAME_MAX = 300;
    const LOCATION_MAX = 500;
    const PLAYER_ID_MAX = 300;
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.AddDisplay);

    const [createdDisplayId, setCreatedDisplayId] = useState('');
    const [toastState, setToastState] = useState({
        show: false,
        message: '',
        variant: 'danger',
    });
    const [formData, setFormData] = useState({
        displayName: '',
        location: '',
        thirdPartyMonitoringId: '',
        resolution: '1920x1080',
        orientation: 'Landscape',
        assignmentStatus: 'Unassigned',
        wakeTime: '05:00',
        sleepTime: '23:59',
    });

    const handleFormChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleOrientationChange = (orientation) => {
        const defaultResolution = orientation === 'Portrait' ? '1080x1920' : '1920x1080';
        setFormData((prev) => ({ ...prev, orientation, resolution: defaultResolution }));
    };

    const getResolutionOptions = () =>
        formData.orientation === 'Portrait' ? PORTRAIT_RESOLUTIONS : LANDSCAPE_RESOLUTIONS;

    const resetForm = () => {
        setCreatedDisplayId('');
        setFormData({
            displayName: '',
            location: '',
            thirdPartyMonitoringId: '',
            resolution: '1920x1080',
            orientation: 'Landscape',
            assignmentStatus: 'Unassigned',
            wakeTime: '05:00',
            sleepTime: '23:59',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const groupId = user?.groups?.[0]?.id;
        const userId = user?.userId;
        const name = formData.displayName.trim();
        const location = formData.location.trim();
        const playerId = formData.thirdPartyMonitoringId.trim();
        if (!name || !location || !playerId) {
            setToastState({
                show: true,
                message: 'Display Name, Location, and Third-Party Monitoring ID are required.',
                variant: 'danger',
            });
            return;
        }

        const payload = {
            groupId: String(groupId),
            userId: String(userId),
            name,
            location,
            playerId,
            resolution: formData.resolution,
            orientation: formData.orientation,
            assignmentStatus: formData.assignmentStatus,
            wakeTime: formData.wakeTime,
            sleepTime: formData.sleepTime,
        };

        const result = await dispatch(addDisplay(payload));
        if (addDisplay.fulfilled.match(result) && result.payload?.success) {
            if (groupId) {
                dispatch(getAllDisplays({ groupId: String(groupId) }));
            }
            const apiDisplayId = extractDisplayId(result.payload);
            setCreatedDisplayId(apiDisplayId);
            setToastState({
                show: true,
                message: 'Display created successfully.',
                variant: 'success',
            });
        } else {
            const rawMessage = result?.payload?.message || result?.error?.message || 'Unable to create display.';
            const userMessage = rawMessage.includes('playerId already exists')
                ? 'This Player ID already exists. Please enter a different Third-Party Monitoring ID.'
                : rawMessage;
            setToastState({
                show: true,
                message: userMessage,
                variant: 'danger',
            });
        }
    };

    return (
        <div className="add-display-overlay" onClick={onClose} role="presentation">
            <div
                className="add-display-dialog"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-display-title"
            >
                <div className="add-display-header">
                    <h2 id="add-display-title" className="add-display-title">
                        {createdDisplayId ? 'Display Created' : t('addDisplay')}
                    </h2>
                    <p className="add-display-subtitle">
                        {createdDisplayId
                            ? 'Your display was added successfully. Use this Display ID to pair the player app.'
                            : t('addDisplaySubtitle')}
                    </p>
                    <button type="button" className="close-btn" onClick={onClose} aria-label="Close">&times;</button>
                </div>

                {createdDisplayId ? (
                    <div className="add-display-form-new">
                        <div className="form-section">
                            <h3>{t('generatedDisplayId')}</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t('display_id')}</label>
                                    <input type="text" value={createdDisplayId} readOnly className="form-input" />
                                    <small>{t('Responsecreation')}</small>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-cancel" onClick={onClose}>{t('cancel')}</button>
                            <button type="button" className="btn-submit" onClick={resetForm}>{t('addAnother')}</button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="add-display-form-new">
                        {/* Display Identification */}
                        <div className="form-section">
                            <div className="section-icon"><i className="pi pi-info-circle" /></div>
                            <h3>{t('displayIdentification')}</h3>
                            <p className="section-desc">{t('displayIdentificationDescription')}</p>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t('thirdParty_MonitorId')}</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., MAN-12345, EXT-ABC123"
                                        className="form-input"
                                        maxLength={PLAYER_ID_MAX}
                                        value={formData.thirdPartyMonitoringId}
                                        onChange={(e) => handleFormChange('thirdPartyMonitoringId', e.target.value)}
                                        required
                                    />
                                    <small>{t('displayRegistration')}</small>
                                </div>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="form-section">
                            <h3>{t('basicInformation')}</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t('display_name')} *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Totem 1 - Community Center"
                                        maxLength={NAME_MAX}
                                        value={formData.displayName}
                                        onChange={(e) => handleFormChange('displayName', e.target.value)}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t('location')} *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Main Entrance, Building A"
                                        maxLength={LOCATION_MAX}
                                        value={formData.location}
                                        onChange={(e) => handleFormChange('location', e.target.value)}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t('assignmentStatus')}</label>
                                    <select
                                        className="form-select"
                                        value={formData.assignmentStatus}
                                        onChange={(e) => handleFormChange('assignmentStatus', e.target.value)}
                                    >
                                        <option>{t('Unassigned')}</option>
                                        <option>{t('Assigned')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Display Specifications */}
                        <div className="form-section">
                            <h3>{t('displaySpecifications')}</h3>
                            <div className="form-row two-col">
                                <div className="form-group">
                                    <label>{t('orientation')}</label>
                                    <div className="orientation-toggle">
                                        <button
                                            type="button"
                                            className={`orientation-btn ${formData.orientation === 'Landscape' ? 'active' : ''}`}
                                            onClick={() => handleOrientationChange('Landscape')}
                                        >
                                            <i className="pi pi-tablet" /><span>{t('landscape')}</span>
                                        </button>
                                        <button
                                            type="button"
                                            className={`orientation-btn ${formData.orientation === 'Portrait' ? 'active' : ''}`}
                                            onClick={() => handleOrientationChange('Portrait')}
                                        >
                                            <i className="pi pi-mobile" /><span>{t('portrait')}</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>{t('resolution')} *</label>
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
                                    <small>{t('resolution_description')}</small>
                                </div>
                            </div>
                        </div>

                        {/* Sleep Schedule */}
                        <div className="form-section">
                            <div className="section-icon"><i className="pi pi-moon" /></div>
                            <h3>{t('sleep_schedule')}</h3>
                            <p className="section-desc">{t('sleep_schedule_description')}</p>
                            <div className="form-row two-col">
                                <div className="form-group">
                                    <label>{t('wake_time')}</label>
                                    <div className="time-input">
                                        <input
                                            type="time"
                                            value={formData.wakeTime}
                                            onChange={(e) => handleFormChange('wakeTime', e.target.value)}
                                            className="form-input"
                                        />
                                        <i className="pi pi-calendar" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>{t('sleep_time')}</label>
                                    <div className="time-input">
                                        <input
                                            type="time"
                                            value={formData.sleepTime}
                                            onChange={(e) => handleFormChange('sleepTime', e.target.value)}
                                            className="form-input"
                                        />
                                        <i className="pi pi-calendar" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-note">
                            <i className="pi pi-info-circle" />
                            <p><strong>{t('nextSteps')}:</strong> {t('displaySetupComplete')}</p>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-cancel" onClick={onClose}>
                                {t('cancel')}
                            </button>
                            <button type="submit" className="btn-submit" disabled={status === 'loading'}>
                                {status === 'loading' ? 'Creating...' : t('createDisplay')}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <ToastContainer position="top-end" className="p-3">
                <Toast
                    bg={toastState.variant}
                    show={toastState.show}
                    onClose={() => setToastState((prev) => ({ ...prev, show: false }))}
                    autohide
                    delay={6000}
                >
                    <Toast.Header closeButton>
                        <strong className="me-auto">
                            {toastState.variant === 'success' ? 'Success' : 'Error'}
                        </strong>
                    </Toast.Header>
                    <Toast.Body className={toastState.variant === 'danger' ? 'text-white' : ''}>
                        {toastState.message}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default AddDisplayModal;
