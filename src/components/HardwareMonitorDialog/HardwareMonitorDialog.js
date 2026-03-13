import React from 'react';
import { Dialog } from 'primereact/dialog';
import './HardwareMonitorDialog.css';
import { useTranslation } from '../../Services/Localization/Localization';

const getDisplayValue = (value, suffix = '') => {
  if (value === null || value === undefined || value === '') return '--';
  return `${value}${suffix}`;
};

const clampPercent = (value, max) => {
  const num = Number(value);
  if (Number.isNaN(num) || max <= 0) return 0;
  return Math.min((num / max) * 100, 100);
};

const clampDirectPercent = (value) => {
  const num = Number(value);
  if (Number.isNaN(num)) return 0;
  return Math.min(Math.max(num, 0), 100);
};

const HardwareMonitorDialog = ({ display, visible, onHide }) => {
  const { t } = useTranslation();
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      modal
      className="monitor-dialog"
      contentClassName="monitor-dialog-content"
    >
      <div className="dialog-body-content">
        <div className="monitor-header">
          <h2 className="monitor-title">{display?.name ?? 'Display'}</h2>
          <p className="monitor-subtitle">{t('hardware_monitoring')}</p>
        </div>

        <div className="hardware-stats-grid">
          <div className="stat-card temperature-card">
            <div className="stat-card-header">
              <div className="stat-icon temp-icon">
                <i className="pi pi-cloud"></i>
              </div>
              <h3 className="stat-card-title">{t('temperature')}</h3>
            </div>
            <div className="stat-card-value">{getDisplayValue(display?.temperature, '�C')}</div>
            <div className="stat-progress-bar">
              <div className="progress-fill temp-fill" style={{ width: `${clampPercent(display?.temperature, 100)}%` }}></div>
            </div>
            <p className="stat-card-description">{t('temperature_description')}</p>
          </div>

          <div className="stat-card fan-card">
            <div className="stat-card-header">
              <div className="stat-icon fan-icon">
                <i className="pi pi-refresh"></i>
              </div>
              <h3 className="stat-card-title">{t('fanSpeed')}</h3>
            </div>
            <div className="stat-card-value">{getDisplayValue(display?.fanSpeed, ' RPM')}</div>
            <div className="stat-progress-bar">
              <div className="progress-fill fan-fill" style={{ width: `${clampPercent(display?.fanSpeed, 3000)}%` }}></div>
            </div>
            <p className="stat-card-description">{t('fan_description')}</p>
          </div>

          <div className="stat-card power-card">
            <div className="stat-card-header">
              <div className="stat-icon power-icon">
                <i className="pi pi-bolt"></i>
              </div>
              <h3 className="stat-card-title">{t('power')}</h3>
            </div>
            <div className="stat-card-value">{getDisplayValue(display?.powerConsumption, 'W')}</div>
            <div className="stat-progress-bar">
              <div className="progress-fill power-fill" style={{ width: `${clampPercent(display?.powerConsumption, 500)}%` }}></div>
            </div>
            <p className="stat-card-description">{t('power_description')}</p>
          </div>

          <div className="stat-card brightness-card">
            <div className="stat-card-header">
              <div className="stat-icon brightness-icon">
                <i className="pi pi-palette"></i>
              </div>
              <h3 className="stat-card-title">{t('brightness')}</h3>
            </div>
            <div className="stat-card-value">{getDisplayValue(display?.brightness, '%')}</div>
            <div className="stat-progress-bar">
              <div className="progress-fill brightness-fill" style={{ width: `${clampDirectPercent(display?.brightness)}%` }}></div>
            </div>
            <p className="stat-card-description">{t('brightness_description')}</p>
          </div>

          <div className="stat-card storage-card">
            <div className="stat-card-header">
              <div className="stat-icon storage-icon">
                <i className="pi pi-inbox"></i>
              </div>
              <h3 className="stat-card-title">{t('storage')}</h3>
            </div>
            <div className="stat-card-value storage-value">{getDisplayValue(display?.storage)}</div>
            <div className="stat-progress-bar">
              <div className="progress-fill storage-fill" style={{ width: `${clampDirectPercent(display?.storage)}%` }}></div>
            </div>
            <p className="stat-card-description">{t('storage_description')}</p>
          </div>

          <div className="stat-card system-card">
            <div className="stat-card-header-full">
              <div className="stat-icon system-icon">
                <i className="pi pi-server"></i>
              </div>
              <h3 className="stat-card-title">{t('systemStatus')}</h3>
            </div>
            <div className="system-status-content">
              <div className="status-row">
                <span className="status-label">{t('status')} </span>
                <span className="status-value online-status">{display?.status === 1 ? 'Online' : 'Offline'}</span>
              </div>
              <div className="status-row">
                <span className="status-label">{t('uptime')}:</span>
                <span className="status-value">{getDisplayValue(display?.uptime)}</span>
              </div>
              <div className="status-row">
                <span className="status-label">{t('resolution')}:</span>
                <span className="status-value">{getDisplayValue(display?.resolution)}</span>
              </div>
              <div className="status-row">
                <span className="status-label">{t('lastSeen')}:</span>
                <span className="status-value">{getDisplayValue(display?.lastSeen)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dialog-footer-actions">
          <button className="btn-close" onClick={onHide}>
            {t('close')}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default HardwareMonitorDialog;
