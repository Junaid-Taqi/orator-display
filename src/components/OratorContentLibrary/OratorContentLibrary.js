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
    const user = JSON.parse(sessionStorage.getItem("liferayUser")) || {
        "userId": "24608",
        "fullName": "admin lahore",
        "email": "admin@lahore.com",
        "groups": [
            {
                "id": "24593",
                "name": "Municipility One"
            }
        ]
    };
    
    const { token, expiresIn } = useSelector((state) => state.auth);
    const [addDisplayOpen, setAddDisplayOpen] = useState(false);

    useEffect(() => {
        if (user?.groups?.[0]?.id && token) {
            dispatch(getAllDisplays({ groupId: String(user.groups[0].id) }));
        }
    }, [dispatch, token]);

    return (
        <div className="displays-dashboard">
            <DisplayNav user={user} />
            <DisplayHeader onAddDisplay={() => setAddDisplayOpen(true)} />
            <StatsCards stats={stats} />
            <DisplyCardList displays={displayList} user={user} />

            {addDisplayOpen && (
                <AddDisplayModal user={user} onClose={() => setAddDisplayOpen(false)} />
            )}
        </div>
    );
};

export default OratorContentLibrary;
