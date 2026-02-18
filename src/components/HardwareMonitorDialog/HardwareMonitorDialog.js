import React from 'react';
import { Dialog } from 'primereact/dialog';
import './HardwareMonitorDialog.css';

const HardwareMonitorDialog = ({ display, visible, onHide }) => {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      modal
      className="monitor-dialog"
      contentClassName="monitor-dialog-content"
    >
      <div className="dialog-body-content">
        {/* Header Section */}
        <div className="monitor-header">
          <h2 className="monitor-title">{display?.name || 'Display'}</h2>
          <p className="monitor-subtitle">Hardware Monitoring & Diagnostics</p>
        </div>

        {/* Hardware Stats Grid */}
        <div className="hardware-stats-grid">
          {/* Temperature Card */}
          <div className="stat-card temperature-card">
            <div className="stat-card-header">
              <div className="stat-icon temp-icon">
                <i className="pi pi-cloud"></i>
              </div>
              <h3 className="stat-card-title">Temperature</h3>
            </div>
            <div className="stat-card-value">{display?.temperature || '0'}°C</div>
            <div className="stat-progress-bar">
              <div className="progress-fill temp-fill" style={{ width: `${(display?.temperature || 0) / 100 * 100}%` }}></div>
            </div>
            <p className="stat-card-description">Normal operating temperature</p>
          </div>

          {/* Fan Speed Card */}
          <div className="stat-card fan-card">
            <div className="stat-card-header">
              <div className="stat-icon fan-icon">
                <i className="pi pi-refresh"></i>
              </div>
              <h3 className="stat-card-title">Fan Speed</h3>
            </div>
            <div className="stat-card-value">{display?.fanSpeed || '0'}<span className="unit">RPM</span></div>
            <div className="stat-progress-bar">
              <div className="progress-fill fan-fill" style={{ width: `${Math.min((display?.fanSpeed || 0) / 3000 * 100, 100)}%` }}></div>
            </div>
            <p className="stat-card-description">Fan operating normally</p>
          </div>

          {/* Power Consumption Card */}
          <div className="stat-card power-card">
            <div className="stat-card-header">
              <div className="stat-icon power-icon">
                <i className="pi pi-bolt"></i>
              </div>
              <h3 className="stat-card-title">Power</h3>
            </div>
            <div className="stat-card-value">{display?.powerConsumption || '0'}W</div>
            <div className="stat-progress-bar">
              <div className="progress-fill power-fill" style={{ width: `${(display?.powerConsumption || 0) / 500 * 100}%` }}></div>
            </div>
            <p className="stat-card-description">Current power consumption</p>
          </div>

          {/* Brightness Card */}
          <div className="stat-card brightness-card">
            <div className="stat-card-header">
              <div className="stat-icon brightness-icon">
                <i className="pi pi-palette"></i>
              </div>
              <h3 className="stat-card-title">Brightness</h3>
            </div>
            <div className="stat-card-value">{display?.brightness || '85'}%</div>
            <div className="stat-progress-bar">
              <div className="progress-fill brightness-fill" style={{ width: `${display?.brightness || 85}%` }}></div>
            </div>
            <p className="stat-card-description">Display brightness level</p>
          </div>

          {/* Storage Card */}
          <div className="stat-card storage-card">
            <div className="stat-card-header">
              <div className="stat-icon storage-icon">
                <i className="pi pi-inbox"></i>
              </div>
              <h3 className="stat-card-title">Storage</h3>
            </div>
            <div className="stat-card-value storage-value">{display?.storageUsed || '8.4'} GB / {display?.storageTotal || '32'} GB</div>
            <div className="stat-progress-bar">
              <div className="progress-fill storage-fill" style={{ width: `${((display?.storageUsed || 8.4) / (display?.storageTotal || 32)) * 100}%` }}></div>
            </div>
            <div className="storage-percentage">{(((display?.storageUsed || 8.4) / (display?.storageTotal || 32)) * 100).toFixed(1)}%</div>
            <p className="stat-card-description">Used</p>
          </div>

          {/* System Status Card */}
          <div className="stat-card system-card">
            <div className="stat-card-header-full">
              <div className="stat-icon system-icon">
                <i className="pi pi-server"></i>
              </div>
              <h3 className="stat-card-title">System Status</h3>
            </div>
            <div className="system-status-content">
              <div className="status-row">
                <span className="status-label">Status:</span>
                <span className="status-value online-status">{display?.status === 1 ? 'Online' : 'Offline'}</span>
              </div>
              <div className="status-row">
                <span className="status-label">Uptime:</span>
                <span className="status-value">{display?.uptime || '99.8'}%</span>
              </div>
              <div className="status-row">
                <span className="status-label">Resolution:</span>
                <span className="status-value">{display?.resolution || '1920x1080'}</span>
              </div>
              <div className="status-row">
                <span className="status-label">Last Seen:</span>
                <span className="status-value">2 minutes ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="dialog-footer-actions">
          <button className="btn-close" onClick={onHide}>
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default HardwareMonitorDialog;

