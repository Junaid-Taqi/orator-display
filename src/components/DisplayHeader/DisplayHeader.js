import React from 'react';
import { useTranslation } from '../../Services/Localization/Localization';

const DisplayHeader = ({ onAddDisplay }) => {
    const { t } = useTranslation();

    return (
        <header className="displays-dashboard__header">
            <div className="displays-dashboard__title-block">
                <h1 className="displays-dashboard__title">{t('display')}</h1>
                <p className="displays-dashboard__subtitle">
                    {t('monitor_and_manage')}
                </p>
            </div>
            <div className="buttons">
                <button type="button" className="displays-dashboard__add-btn bg-success btn me-3" onClick={onAddDisplay}>
                    <i className="pi pi-plus me-2" />
                    {t('add_display')}
                </button>
            </div>
        </header>
    );
};

export default DisplayHeader;
