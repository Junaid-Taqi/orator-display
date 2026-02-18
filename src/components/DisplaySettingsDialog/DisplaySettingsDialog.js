import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { updateDisplay } from '../../Services/Slices/UpdateDisplaySlice';
import { getAllDisplays } from '../../Services/Slices/GetDisplaysSlice';
import './DisplaySettingsDialog.css';

const DisplaySettingsDialog = ({ display, visible, onHide }) => {
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

    const user = JSON.parse(sessionStorage.getItem('liferayUser')) || {};
    const groupId = user?.groups?.[0]?.id;

    const payload = {
      displayId: String(display.displayId),
      name: display?.name || '',
      location: display?.location || '',
      playerId: display?.playerId || '',
      resolution: display?.resolution || '',
      orientation: display?.orientation || '',
      assignmentStatus: display?.assignmentStatus || '',
      wakeTime: enableSchedule ? wakeTime : '',
      sleepTime: enableSchedule ? sleepTime : '',
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
            <h3 className="section-title">Daily Sleep Schedule</h3>
          </div>
          <p className="section-description">Automatically put display to sleep and wake up</p>

          <div className="schedule-item">
            <div className="schedule-label-row">
              <label className="schedule-label">Enable Sleep Schedule</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={enableSchedule}
                  onChange={handleScheduleToggle}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <p className="schedule-description">Automatically manage display power</p>
          </div>

          <div className="time-inputs-group">
            <div className="time-input-block">
              <label className="time-label">Sleep Time</label>
              <input
                type="text"
                className="time-input"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                placeholder="HH:mm"
              />
              <p className="time-hint">Display will enter sleep mode at this time</p>
            </div>

            <div className="time-input-block">
              <label className="time-label">Wake Time</label>
              <input
                type="text"
                className="time-input"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                placeholder="HH:mm"
              />
              <p className="time-hint">Display will wake up at this time</p>
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
          <h3 className="section-title">Display Information</h3>

          <div className="info-group">
            <label className="info-label">Display Name</label>
            <input
              type="text"
              className="info-input"
              value={display?.name || ''}
              readOnly
            />
          </div>

          <div className="info-group">
            <label className="info-label">Location</label>
            <input
              type="text"
              className="info-input"
              value={display?.location || ''}
              readOnly
            />
          </div>

          <div className="info-group">
            <label className="info-label">Player ID</label>
            <input
              type="text"
              className="info-input"
              value={display?.playerId || ''}
              readOnly
            />
          </div>
        </div>

        <div className="dialog-footer-actions">
          <button className="btn-cancel" onClick={handleCancel} disabled={status === 'loading'}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSave} disabled={status === 'loading'}>
            {status === 'loading' ? 'Saving...' : 'Save'}
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
