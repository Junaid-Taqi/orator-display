import React from 'react';
import { useTranslation } from '../../Services/Localization/Localization';

const StatsCards = ({ stats }) => {
    const { t } = useTranslation();
    const total = stats?.totalDisplays ?? 0;
    const online = stats?.online ?? 0;
    const sleeping = stats?.sleeping ?? 0;
    const offline = stats?.offline ?? 0;
    const avgUptime = stats?.averageUptime != null ? stats.averageUptime.toFixed(1) + '%' : '—';

    return (
        <section className="displays-dashboard__cards">
            <div className="displays-dashboard__card">
                <div className="displays-dashboard__card-content">
                    <p className="displays-dashboard__card-title">{t('total_displays')}</p>
                    <p className="displays-dashboard__card-value">{total}</p>
                </div>
                <i className="pi pi-desktop fs-3 pt-3 text-light-blue" />
            </div>
            <div className="displays-dashboard__card">
                <div className="displays-dashboard__card-content">
                    <p className="displays-dashboard__card-title">{t('active')}</p>
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
                    <p className="displays-dashboard__card-title">{t('sleeping')}</p>
                    <p className="displays-dashboard__card-value">{sleeping}</p>
                </div>
                <i className="pi pi-moon displays-dashboard__card-icon icon-offline pt-3" />
            </div>
            <div className="displays-dashboard__card">
                <div className="displays-dashboard__card-content">
                    <p className="displays-dashboard__card-title">{t('offline')}</p>
                    <p className="displays-dashboard__card-value">{offline}</p>
                </div>
                <i className="pi pi-wifi displays-dashboard__card-icon icon-offline pt-3" />
            </div>
            <div className="displays-dashboard__card">
                <div className="displays-dashboard__card-content">
                    <p className="displays-dashboard__card-title">{t('avg_uptime')}</p>
                    <p className="displays-dashboard__card-value">{avgUptime}</p>
                </div>
                <i className="pi pi-clock displays-dashboard__card-icon icon-offline pt-3" />
            </div>
        </section>
    );
};

export default StatsCards;
