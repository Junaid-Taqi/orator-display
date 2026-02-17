import React from 'react';
import './DisplyCardList.css';

const sampleDisplays = [
  {
    id: 1,
    name: 'Totem 1 - Main Square',
    location: 'Main Square, Downtown',
    status: 'Online',
    orientation: 'Landscape',
    resolution: '1920x1080',
    uptime: '99.8%',
    lastSeen: '2 minutes ago',
    currentSlide: 'Spring Festival 2026',
    temp: '42°C',
    fan: '1850 RPM',
    power: '125W',
  },
];

const DisplyCardList = () => {
  return (
    <section className="display-card-list-wrap">
      {sampleDisplays.map((d) => (
        <article key={d.id} className="display-card--big">
          <div className="display-card--inner">
            <div className="display-card__top">
              <div className="icon-square">
                <i className="pi pi-desktop" />
              </div>
              <div className="title-block">
                <h2 className="title">{d.name}</h2>
                <div className="location"><i className="pi pi-map-marker" /> {d.location}</div>
                <div className="badges-row">
                  <span className="pill pill--green"><i className="pi pi-wifi" /> {d.status}</span>
                  <span className="pill pill--purple"><i className="pi pi-tv" /> {d.orientation}</span>
                </div>
              </div>
            </div>

            <div className="display-card__panel">
              <div className="panel-grid">
                <div className="panel-col">
                  <p className="panel-label">Resolution</p>
                  <p className="panel-value">{d.resolution}</p>
                </div>
                <div className="panel-col">
                  <p className="panel-label">Uptime</p>
                  <p className="panel-value">{d.uptime}</p>
                </div>
                <div className="panel-col">
                  <p className="panel-label">Last Seen</p>
                  <p className="panel-value">{d.lastSeen}</p>
                </div>
                <div className="panel-col">
                  <p className="panel-label">Current Slide</p>
                  <p className="panel-value">{d.currentSlide}</p>
                </div>
              </div>
            </div>

            <div className="display-card__stats-row">
              <div className="stat-pill">
                <i className="pi pi-thermometer" />
                <div>
                  <p className="stat-label">Temp</p>
                  <p className="stat-value">{d.temp}</p>
                </div>
              </div>
              <div className="stat-pill">
                <i className="pi pi-refresh" />
                <div>
                  <p className="stat-label">Fan</p>
                  <p className="stat-value">{d.fan}</p>
                </div>
              </div>
              <div className="stat-pill">
                <i className="pi pi-bolt" />
                <div>
                  <p className="stat-label">Power</p>
                  <p className="stat-value">{d.power}</p>
                </div>
              </div>
            </div>

            <div className="display-card__actions-row">
              <button className="action-btn"><i className="pi pi-eye" /> Preview</button>
              <button className="action-btn"><i className="pi pi-line-chart" /> Monitor</button>
              <button className="action-icon"><i className="pi pi-cog" /></button>
            </div>

            <div className="sleep-btn-wrap">
              <button className="sleep-btn"><i className="pi pi-moon" /> Enter Sleep Mode</button>
            </div>

            <div className="display-card__footer">Display is active and playing content</div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default DisplyCardList;
