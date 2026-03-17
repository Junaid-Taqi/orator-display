import React, { useState } from 'react';
import './DisplyCardList.css';
import DisplaySettingsDialog from '../DisplaySettingsDialog/DisplaySettingsDialog';
import HardwareMonitorDialog from '../HardwareMonitorDialog/HardwareMonitorDialog';
import { useTranslation } from '../../Services/Localization/Localization';

const statusLabel = (status) => {
  if (status === 1) return { label: 'Online', cls: 'pill--green' };
  return { label: 'Offline', cls: 'pill--red' };
};

const DisplyCardList = ({ displays = [], user }) => {
  const [selectedDisplay, setSelectedDisplay] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [monitorDialogVisible, setMonitorDialogVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const { t } = useTranslation();

  const handleSettingsClick = (display) => {
    setSelectedDisplay(display);
    setDialogVisible(true);
  };

  const handleMonitorClick = (display) => {
    setSelectedDisplay(display);
    setMonitorDialogVisible(true);
  };
  if (displays.length === 0) {
    return (
      <section className="display-card-list-wrap">
        <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '40px' }}>
          No displays found. Add a display to get started.
        </p>
      </section>
    );
  }

  return (
    <section className="display-card-list-wrap">
      {displays.slice(0, visibleCount).map((d) => {
        const { label, cls } = statusLabel(d.status);
        return (
          <article key={d.displayId} className="display-card--big">
            <div className="display-card--inner">
              <div className="display-card__top">
                <div className="icon-square">
                  <i className="pi pi-desktop" />
                </div>
                <div className="title-block">
                  <h2 className="title text-capitalize">{d.name}</h2>
                  <div className="location text-capitalize"><i className="pi pi-map-marker" /> {d.location}</div>
                  <div className="badges-row">
                    <span className={`pill ${cls}`}><i className="pi pi-wifi" /> {label}</span>
                    {d.displayUuid && (
                      <span className="pill pill--blue"><i className="pi pi-hashtag" /> {d.displayUuid}</span>
                    )}
                    <span className="pill pill--purple"><i className="pi pi-tv" /> {d.orientation}</span>
                  </div>
                </div>
              </div>

              <div className="display-card__panel">
                <div className="panel-grid">
                  <div className="panel-col">
                    <p className="panel-label">{t('resolution')}</p>
                    <p className="panel-value">{d.resolution || '—'}</p>
                  </div>
                  <div className="panel-col">
                    <p className="panel-label">{t('uptime')}</p>
                    <p className="panel-value">{d.uptime != null ? d.uptime.toFixed(1) + '%' : '—'}</p>
                  </div>
                  <div className="panel-col">
                    <p className="panel-label">{t('wake_sleep')}</p>
                    <p className="panel-value">{d.wakeTime} / {d.sleepTime}</p>
                  </div>
                  <div className="panel-col">
                    <p className="panel-label">{t('assignment')}</p>
                    <p className="panel-value">{d.assignmentStatus || '—'}</p>
                  </div>
                </div>
              </div>

              <div className="display-card__stats-row">
                <div className="stat-pill">
                  <i className="pi pi-cloud" />
                  <div>
                    <p className="stat-label">{t('temperature')}</p>
                    <p className="stat-value">{d.temperature != null ? d.temperature + '°C' : '—'}</p>
                  </div>
                </div>
                <div className="stat-pill">
                  <i className="pi pi-refresh" />
                  <div>
                    <p className="stat-label">{t('fan')}</p>
                    <p className="stat-value">{d.fanSpeed != null ? d.fanSpeed + ' RPM' : '—'}</p>
                  </div>
                </div>
                <div className="stat-pill">
                  <i className="pi pi-bolt" />
                  <div>
                    <p className="stat-label">{t('power')}</p>
                    <p className="stat-value">{d.powerConsumption != null ? d.powerConsumption + 'W' : '—'}</p>
                  </div>
                </div>
              </div>

              <div className="display-card__actions-row">
                <button className="action-btn"><i className="pi pi-eye" /> {t('preview')}</button>
                <button className="action-btn" onClick={() => handleMonitorClick(d)}><i className="pi pi-line-chart" /> {t('monitor')}</button>
                <button className="action-icon" onClick={() => handleSettingsClick(d)}><i className="pi pi-cog" /></button>
              </div>

              <div className="sleep-btn-wrap">
                <button className="sleep-btn"><i className="pi pi-moon" /> {t('enter_sleep_mode')}</button>
              </div>

              <div className={`display-card__footer ${d.status === 1 ? '' : 'footer--offline'}`}>
                {d.status === 1 ? t('display_active') : t('display_offline')}
              </div>
            </div>
          </article>
        );
      })}

      {visibleCount < displays.length && (
        <div style={{ textAlign: 'center' }}>
          <button
            className="btn btn-outline-primary px-4 py-2 my-5"
            onClick={() => setVisibleCount(prev => prev + 6)}
            style={{ fontWeight: 500, borderRadius: '50rem' }}
          >
            {t('load_more')}
          </button>
        </div>
      )}

      <DisplaySettingsDialog
        display={selectedDisplay}
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        user={user}
      />
      <HardwareMonitorDialog
        display={selectedDisplay}
        visible={monitorDialogVisible}
        onHide={() => setMonitorDialogVisible(false)}
      />
    </section>
  );
};

export default DisplyCardList;
