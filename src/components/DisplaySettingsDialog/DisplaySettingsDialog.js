import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import './DisplaySettingsDialog.css';

const DisplaySettingsDialog = ({ display, visible, onHide }) => {
  const [enableSchedule, setEnableSchedule] = useState(false);
  const [sleepTime, setSleepTime] = useState('11:59:59 PM');
  const [wakeTime, setWakeTime] = useState('05:59:59 AM');

  const handleScheduleToggle = (e) => {
    setEnableSchedule(e.target.checked);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving settings:', { enableSchedule, sleepTime, wakeTime });
    onHide();
  };

  const handleCancel = () => {
    // Reset states if needed
    setEnableSchedule(false);
    setSleepTime('11:59:59 PM');
    setWakeTime('05:59:59 AM');
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
        {/* Daily Sleep Schedule Section */}
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
              />
              <p className="time-hint">Display will wake up at this time</p>
            </div>
          </div>

          <div className="schedule-summary">
            <span className="summary-icon">✓</span>
            <span className="summary-text">
              Schedule Active: Display will sleep at {sleepTime} and wake at {wakeTime} daily.
            </span>
          </div>
        </div>

        {/* Display Information Section */}
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
        </div>

        {/* Action Buttons */}
        <div className="dialog-footer-actions">
          <button className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default DisplaySettingsDialog;

