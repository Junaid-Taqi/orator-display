import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/add-display-modal.css';
import DisplayNav from '../DisplayNav/DisplayNav';
import DisplayHeader from '../DisplayHeader/DisplayHeader';
import StatsCards from '../StatsCards/StatsCards';
import AddDisplayModal from '../AddDisplayModal/AddDisplayModal';
import DisplyCardList from './DisplyCardList';
import { getAllDisplays } from '../../Services/Slices/GetDisplaysSlice';

const OratorContentLibrary = () => {
    const dispatch = useDispatch();
    const { displayList, stats } = useSelector((state) => state.GetDisplays);
    const user = JSON.parse(sessionStorage.getItem("liferayUser"));

    const [addDisplayOpen, setAddDisplayOpen] = useState(false);

    useEffect(() => {
        if (user?.groups?.[0]?.id) {
            dispatch(getAllDisplays({ groupId: String(user.groups[0].id) }));
        }
    }, [dispatch]);

    return (
        <div className="displays-dashboard">
            <DisplayNav user={user} />
            <DisplayHeader onAddDisplay={() => setAddDisplayOpen(true)} />
            <StatsCards stats={stats} />
            <DisplyCardList displays={displayList} />

            <button
                type="button"
                className="displays-dashboard__help-btn"
                aria-label="Help"
            >
                <i className="pi pi-question" />
            </button>

            {addDisplayOpen && (
                <AddDisplayModal user={user} onClose={() => setAddDisplayOpen(false)} />
            )}
        </div>
    );
};

export default OratorContentLibrary;
