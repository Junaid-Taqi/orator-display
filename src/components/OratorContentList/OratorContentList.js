import React, { useEffect } from 'react';

const CSS_ID = 'orator-content-list-styles';
const styles = `
.orator-content-list {
  margin: 24px 0;
  border-radius: 12px;
  padding: 18px;
  background: linear-gradient(90deg, rgba(12,97,114,0.14) 0%, rgba(16,110,125,0.12) 100%), linear-gradient(180deg, rgba(9,121,135,0.18), rgba(13,77,92,0.06));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 8px rgba(0,0,0,0.06);
  color: #eaf6f7;
  border: 1px solid rgba(255,255,255,0.03);
  backdrop-filter: blur(6px);
}

.orator-content-list__header {
  font-size: 16px;
  margin-bottom: 12px;
  color: rgba(255,255,255,0.95);
  padding-left: 6px;
}

.orator-content-list__items {
  border-top: 1px solid rgba(255,255,255,0.03);
}

.orator-content-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  transition: background 0.18s ease;
}

.orator-content-item:last-child {
  border-bottom: none;
}

.orator-content-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.orator-thumb {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  background: linear-gradient(135deg,#00c2d7,#00a6d6);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.12), inset 0 -6px 16px rgba(255,255,255,0.03);
  flex-shrink: 0;
}

.orator-thumb .pi {
  color: #fff;
  font-size: 20px;
  opacity: 0.98;
}

.orator-content-meta {
  min-width: 0;
}

.orator-content-title {
  font-size: 15px;
  color: #ffffff;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.orator-content-sub {
  font-size: 12px;
  color: rgba(255,255,255,0.65);
}

.orator-content-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.orator-stats {
  text-align: center;
  margin-right: 8px;
  min-width: 100px;
}

.orator-stats .value {
  font-size: 18px;
  color: #fff;
}

.orator-stats .label {
  display: block;
  font-size: 11px;
  color: rgba(255,255,255,0.65);
  margin-top: 4px;
}

.orator-engagement {
  margin-top: 4px;
  color: #ffffff;
  font-size: 14px;
}

.orator-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.orator-action-btn {
  width: 36px;
  height: 28px;
  border-radius: 12px;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
}

.orator-action-chart {
  background: linear-gradient(90deg, #8f7bff, #6b9df4);
}

.orator-action-edit {
  background: linear-gradient(90deg, #34d6bf, #29b7c4);
}

@media (max-width: 720px) {
  .orator-stats { display: none; }
}
`;
const OratorContentList = () => {
    const demoData = [
        {
            id: 1,
            title: 'Spring Sale Campaign',
            template: 'Template: Product Showcase',
            time: '2 days ago',
            views: '2546',
            engagement: '85%',
        },
        {
            id: 2,
            title: 'Welcome Message',
            template: 'Template: News Feed',
            time: '5 days ago',
            views: '1823',
            engagement: '72%',
        },
        {
            id: 3,
            title: 'Event Calendar',
            template: 'Template: Event Announcement',
            time: '1 week ago',
            views: '987',
            engagement: '64%',
        },
    ];
    useEffect(() => {
        if (!document.getElementById(CSS_ID)) {
            const styleTag = document.createElement('style');
            styleTag.id = CSS_ID;
            styleTag.innerHTML = styles;
            document.head.appendChild(styleTag);
        }
    }, []);

    return (
        <div className="orator-content-list" role="region" aria-label="Your Content">
            <div className="orator-content-list__header">Your Content</div>
            <div className="orator-content-list__items">
                {demoData.map((item) => (
                    <div key={item.id} className="orator-content-item">
                        <div className="orator-content-left">
                            <div className="orator-thumb" aria-hidden>
                                <i className="pi pi-image" />
                            </div>
                            <div className="orator-content-meta">
                                <div className="orator-content-title">{item.title}</div>
                                <div className="orator-content-sub">
                                    {item.template}
                                    <span style={{ display: 'block', marginTop: 6, color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>{item.time}</span>
                                </div>
                            </div>
                        </div>

                        <div className="orator-content-right">
                            <div className="orator-stats" aria-hidden>
                                <div className="value">{item.views}</div>
                                <div className="label">Views</div>
                                {/*<div className="orator-engagement">{item.engagement} <span style={{ fontWeight: 600, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Engagement</span></div>*/}
                            </div>
                            <div className="orator-stats" aria-hidden>
                                <div className="value">{item.engagement}</div>
                                <div className="label">Engagement</div>
                            </div>

                            <div className="orator-actions" role="group" aria-label="Actions">
                                <button className="orator-action-btn orator-action-chart" title="View stats" type="button">
                                    <i className="pi pi-chart-bar" />
                                </button>
                                <button className="orator-action-btn orator-action-edit" title="Edit content" type="button">
                                    <i className="pi pi-pencil" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OratorContentList;