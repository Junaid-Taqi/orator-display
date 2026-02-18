import React, { useState } from 'react';
import './DisplyCardList.css';
import DisplaySettingsDialog from '../DisplaySettingsDialog/DisplaySettingsDialog';
import HardwareMonitorDialog from '../HardwareMonitorDialog/HardwareMonitorDialog';

const statusLabel = (status) => {
  if (status === 1) return { label: 'Online', cls: 'pill--green' };
  return { label: 'Offline', cls: 'pill--red' };
};

const DisplyCardList = ({ displays = [] }) => {
  const [selectedDisplay, setSelectedDisplay] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [monitorDialogVisible, setMonitorDialogVisible] = useState(false);

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
      {displays.map((d) => {
        const { label, cls } = statusLabel(d.status);
        return (
          <article key={d.displayId} className="display-card--big">
            <div className="display-card--inner">
              <div className="display-card__top">
                <div className="icon-square">
                  <i className="pi pi-desktop" />
                </div>
                <div className="title-block">
                  <h2 className="title">{d.name}</h2>
                  <div className="location"><i className="pi pi-map-marker" /> {d.location}</div>
                  <div className="badges-row">
                    <span className={`pill ${cls}`}><i className="pi pi-wifi" /> {label}</span>
                    <span className="pill pill--purple"><i className="pi pi-tv" /> {d.orientation}</span>
                  </div>
                </div>
              </div>

              <div className="display-card__panel">
                <div className="panel-grid">
                  <div className="panel-col">
                    <p className="panel-label">Resolution</p>
                    <p className="panel-value">{d.resolution || '—'}</p>
                  </div>
                  <div className="panel-col">
                    <p className="panel-label">Uptime</p>
                    <p className="panel-value">{d.uptime != null ? d.uptime.toFixed(1) + '%' : '—'}</p>
                  </div>
                  <div className="panel-col">
                    <p className="panel-label">Wake / Sleep</p>
                    <p className="panel-value">{d.wakeTime} / {d.sleepTime}</p>
                  </div>
                  <div className="panel-col">
                    <p className="panel-label">Assignment</p>
                    <p className="panel-value">{d.assignmentStatus || '—'}</p>
                  </div>
                </div>
              </div>

              <div className="display-card__stats-row">
                <div className="stat-pill">
                  <i className="pi pi-thermometer" />
                  <div>
                    <p className="stat-label">Temp</p>
                    <p className="stat-value">{d.temperature != null ? d.temperature + '°C' : '—'}</p>
                  </div>
                </div>
                <div className="stat-pill">
                  <i className="pi pi-refresh" />
                  <div>
                    <p className="stat-label">Fan</p>
                    <p className="stat-value">{d.fanSpeed != null ? d.fanSpeed + ' RPM' : '—'}</p>
                  </div>
                </div>
                <div className="stat-pill">
                  <i className="pi pi-bolt" />
                  <div>
                    <p className="stat-label">Power</p>
                    <p className="stat-value">{d.powerConsumption != null ? d.powerConsumption + 'W' : '—'}</p>
                  </div>
                </div>
              </div>

              <div className="display-card__actions-row">
                <button className="action-btn"><i className="pi pi-eye" /> Preview</button>
                <button className="action-btn" onClick={() => handleMonitorClick(d)}><i className="pi pi-line-chart" /> Monitor</button>
                <button className="action-icon" onClick={() => handleSettingsClick(d)}><i className="pi pi-cog" /></button>
              </div>

              <div className="sleep-btn-wrap">
                <button className="sleep-btn"><i className="pi pi-moon" /> Enter Sleep Mode</button>
              </div>

              <div className={`display-card__footer ${d.status === 1 ? '' : 'footer--offline'}`}>
                {d.status === 1 ? 'Display is active and playing content' : 'Display is offline'}
              </div>
            </div>
          </article>
        );
      })}
      <DisplaySettingsDialog
        display={selectedDisplay}
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
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
