import React from 'react';

const StatsCards = ({ stats }) => {
    const total = stats?.totalDisplays ?? 0;
    const online = stats?.online ?? 0;
    const sleeping = stats?.sleeping ?? 0;
    const offline = stats?.offline ?? 0;
    const avgUptime = stats?.averageUptime != null ? stats.averageUptime.toFixed(1) + '%' : '—';

    return (
        <section className="displays-dashboard__cards">
            <div className="displays-dashboard__card">
                <div className="displays-dashboard__card-content">
                    <p className="displays-dashboard__card-title">Total Displays</p>
                    <p className="displays-dashboard__card-value">{total}</p>
                </div>
                <i className="pi pi-desktop fs-3 pt-3 text-light-blue" />
            </div>
            <div className="displays-dashboard__card">
                <div className="displays-dashboard__card-content">
                    <p className="displays-dashboard__card-title">Active</p>
                    <p className="displays-dashboard__card-value">{online}</p>
                </div>
                <span
                    className="displays-dashboard__card-icon icon-online mt-4"
                    style={{ width: 16, height: 16, borderRadius: '50%', background: '#50E3C2', display: 'inline-block' }}
                    aria-hidden
                />
            </div>
            <div className="displays-dashboard__card">
                <div className="displays-dashboard__card-content">
                    <p className="displays-dashboard__card-title">Sleeping</p>
                    <p className="displays-dashboard__card-value">{sleeping}</p>
                </div>
                <i className="pi pi-moon displays-dashboard__card-icon icon-offline pt-3" />
            </div>
            <div className="displays-dashboard__card">
                <div className="displays-dashboard__card-content">
                    <p className="displays-dashboard__card-title">Offline</p>
                    <p className="displays-dashboard__card-value">{offline}</p>
                </div>
                <i className="pi pi-wifi displays-dashboard__card-icon icon-offline pt-3" />
            </div>
            <div className="displays-dashboard__card">
                <div className="displays-dashboard__card-content">
                    <p className="displays-dashboard__card-title">Avg. Uptime</p>
                    <p className="displays-dashboard__card-value">{avgUptime}</p>
                </div>
                <i className="pi pi-clock displays-dashboard__card-icon icon-offline pt-3" />
            </div>
        </section>
    );
};

export default StatsCards;
