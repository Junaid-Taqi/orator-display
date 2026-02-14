import React from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primeicons/primeicons.css';

// Mock data for displays list (can be replaced with props from parent)
const DEFAULT_DISPLAYS_DATA = [
    {
        id: 1,
        name: 'Lobby Screen 1',
        location: 'Main Entrance',
        status: 'online',
        resolution: '1920x1080',
        orientation: 'Landscape',
        playlist: 'Main Content Feed',
        lastSeen: 'Just now',
    },
    {
        id: 2,
        name: 'Conference Room A',
        location: 'Building B',
        status: 'online',
        resolution: '1920x1080',
        orientation: 'Landscape',
        playlist: 'Meeting Schedule',
        lastSeen: '2 min ago',
    },
    {
        id: 3,
        name: 'Reception Display',
        location: 'Ground Floor',
        status: 'offline',
        resolution: '1920x1080',
        orientation: 'Portrait',
        playlist: 'Welcome Feed',
        lastSeen: '1 hour ago',
    },
    {
        id: 4,
        name: 'Cafeteria Screen',
        location: 'Building A',
        status: 'online',
        resolution: '1920x1080',
        orientation: 'Landscape',
        playlist: 'Promotions',
        lastSeen: 'Just now',
    },
];

const OratorDisplayTable = ({value = DEFAULT_DISPLAYS_DATA}) => {
    const displayBodyTemplate = (rowData) => (
        <div className="display-cell">
            <i className="pi pi-desktop display-icon"/>
            <div className="display-info">
                <span className="display-name">{rowData.name}</span>
                <span className="display-location">
          <i className="pi pi-map-marker" style={{fontSize: '0.7rem'}}/>
                    {rowData.location}
        </span>
            </div>
        </div>
    );

    const statusBodyTemplate = (rowData) => (
        <span className={`status-badge status-${rowData.status}`}>{rowData.status}</span>
    );

    const mutedBodyTemplate = (value) => (
        <span className="muted-cell">{value}</span>
    );

    const lastSeenBodyTemplate = (rowData) => (
        <span className="last-seen-cell">{rowData.lastSeen}</span>
    );

    const actionsBodyTemplate = () => (
        <span className="actions-cell" role="button" tabIndex={0}>
      <i className="pi pi-ellipsis-v"/>
    </span>
    );

    return (
        <div className="displays-dashboard__table-wrap">
            <DataTable
                value={value}
                rowKey="id"
                className="displays-datatable p-datatable-sm"
                tableStyle={{minWidth: '50rem'}}
                size="small"
            >
                <Column header="DISPLAY" body={displayBodyTemplate}/>
                <Column field="status" header="STATUS" body={statusBodyTemplate}/>
                <Column field="resolution" header="RESOLUTION" body={(row) => mutedBodyTemplate(row.resolution)}/>
                <Column field="orientation" header="ORIENTATION" body={(row) => mutedBodyTemplate(row.orientation)}/>
                <Column field="playlist" header="CURRENT PLAYLIST"/>
                <Column field="lastSeen" header="LAST SEEN" body={lastSeenBodyTemplate}/>
                <Column header="ACTIONS" body={actionsBodyTemplate} bodyStyle={{width: '80px'}}/>
            </DataTable>
        </div>
    );
};

export default OratorDisplayTable;
