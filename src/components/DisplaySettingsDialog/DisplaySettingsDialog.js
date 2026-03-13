import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { updateDisplay } from '../../Services/Slices/UpdateDisplaySlice';
import { getAllDisplays } from '../../Services/Slices/GetDisplaysSlice';
import './DisplaySettingsDialog.css';
import { useTranslation } from '../../Services/Localization/Localization';

const DisplaySettingsDialog = ({ display, visible, onHide, user }) => {
  const { t } = useTranslation();
  const NAME_MAX = 300;
  const LOCATION_MAX = 500;
  const PLAYER_ID_MAX = 300;
  const TIME_MAX = 5; // HH:mm
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.UpdateDisplay);

  const [enableSchedule, setEnableSchedule] = useState(false);
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const nextSleepTime = display?.sleepTime || '';
    const nextWakeTime = display?.wakeTime || '';
    setSleepTime(nextSleepTime);
    setWakeTime(nextWakeTime);
    setEnableSchedule(Boolean(nextSleepTime || nextWakeTime));
    setErrorMessage('');
  }, [display, visible]);

  const handleScheduleToggle = (e) => {
    setEnableSchedule(e.target.checked);
  };

  const handleSave = async () => {
    setErrorMessage('');

    if (!display?.displayId) {
      setErrorMessage('Display ID is missing. Unable to update display.');
      return;
    }

    const groupId = user?.groups?.[0]?.id;
    const normalizedWakeTime = (wakeTime || '').trim();
    const normalizedSleepTime = (sleepTime || '').trim();
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (enableSchedule) {
      if (!timePattern.test(normalizedSleepTime) || !timePattern.test(normalizedWakeTime)) {
        setErrorMessage('Sleep Time and Wake Time must be in HH:mm format.');
        return;
      }
    }

    const payload = {
      displayId: String(display.displayId),
      name: display?.name || '',
      location: display?.location || '',
      playerId: display?.playerId || '',
      resolution: display?.resolution || '',
      orientation: display?.orientation || '',
      assignmentStatus: display?.assignmentStatus || '',
      wakeTime: enableSchedule ? normalizedWakeTime : '',
      sleepTime: enableSchedule ? normalizedSleepTime : '',
    };

    const result = await dispatch(updateDisplay(payload));
    if (updateDisplay.fulfilled.match(result) && result.payload?.success) {
      if (groupId) {
        dispatch(getAllDisplays({ groupId: String(groupId) }));
      }
      onHide();
      return;
    }

    setErrorMessage(result?.payload?.message || result?.error?.message || 'Unable to update display.');
  };

  const handleCancel = () => {
    const nextSleepTime = display?.sleepTime || '';
    const nextWakeTime = display?.wakeTime || '';
    setSleepTime(nextSleepTime);
    setWakeTime(nextWakeTime);
    setEnableSchedule(Boolean(nextSleepTime || nextWakeTime));
    setErrorMessage('');
    onHide();
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      modal
      className="settings-dialog"
      contentClassName="settings-dialog-content"
    >
      <div className="dialog-body-content">
        <div className="settings-section">
          <div className="section-header">
            <i className="pi pi-calendar"></i>
            <h3 className="section-title">{t('sleep_schedule')}</h3>
          </div>
          <p className="section-description">{t('sleep_schedule_description')}</p>

          <div className="schedule-item">
            <div className="schedule-label-row">
              <label className="schedule-label">{t('enable_sleep_schedule')}</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={enableSchedule}
                  onChange={handleScheduleToggle}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <p className="schedule-description">{t('auto_manage_sleep')}</p>
          </div>

          <div className="time-inputs-group">
            <div className="time-input-block">
              <label className="time-label">{t('sleep_time')}</label>
              <input
                type="text"
                className="time-input"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                placeholder="HH:mm"
                maxLength={TIME_MAX}
              />
              <p className="time-hint">{t('sleep_time_hint')}</p>
            </div>

            <div className="time-input-block">
              <label className="time-label">{t('wake_time')}</label>
              <input
                type="text"
                className="time-input"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                placeholder="HH:mm"
                maxLength={TIME_MAX}
              />
              <p className="time-hint">{t('wake_time_hint')}</p>
            </div>
          </div>

          <div className="schedule-summary">
            <span className="summary-icon">OK</span>
            <span className="summary-text">
              Schedule {enableSchedule ? 'enabled' : 'disabled'}.
              {enableSchedule ? ` Sleep: ${sleepTime || '--'} | Wake: ${wakeTime || '--'}` : ''}
            </span>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="section-title">{t('display_information')}</h3>

          <div className="info-group">
            <label className="info-label">{t('display_name')}</label>
            <input
              type="text"
              className="info-input"
              value={display?.name || ''}
              maxLength={NAME_MAX}
              readOnly
            />
          </div>

          <div className="info-group">
            <label className="info-label">{t('location')}</label>
            <input
              type="text"
              className="info-input"
              value={display?.location || ''}
              maxLength={LOCATION_MAX}
              readOnly
            />
          </div>

          <div className="info-group">
            <label className="info-label">{t('thirdParty_MonitorId')}</label>
            <input
              type="text"
              className="info-input"
              value={display?.playerId || ''}
              maxLength={PLAYER_ID_MAX}
              readOnly
            />
          </div>

          <div className="info-group">
            <label className="info-label">UUID</label>
            <input
              type="text"
              className="info-input"
              value={display?.displayUuid || ''}
              maxLength={PLAYER_ID_MAX}
              readOnly
            />
          </div>
        </div>

        <div className="dialog-footer-actions">
          <button className="btn-cancel" onClick={handleCancel} disabled={status === 'loading'}>
            {t('cancel')}
          </button>
          <button className="btn-save" onClick={handleSave} disabled={status === 'loading'}>
            {status === 'loading' ? 'Saving...' : t('save')}
          </button>
        </div>
        {errorMessage ? (
          <p className="schedule-description" style={{ marginTop: '10px', color: '#ffb3b3' }}>
            {errorMessage}
          </p>
        ) : null}
      </div>
    </Dialog>
  );
};

export default DisplaySettingsDialog;
