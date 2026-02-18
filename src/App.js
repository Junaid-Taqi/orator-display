import './css/main.scss';
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './Services/Store/Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import OratorContentLibrary from "./components/OratorContentLibrary/OratorContentLibrary";
import { fetchToken } from './Services/Slices/AuthSlice';

function AppContent() {
    const dispatch = useDispatch();
    const { token, expiresIn } = useSelector((state) => state.auth);

    // Initial token fetch
    useEffect(() => {
        dispatch(fetchToken());
    }, [dispatch]);

    // Auto-refresh token 60 seconds before expiry
    useEffect(() => {
        if (token && expiresIn) {
            const refreshTime = (expiresIn - 60) * 1000;
            if (refreshTime > 0) {
                const timer = setTimeout(() => {
                    console.log("Token expiring soon, refreshing...");
                    dispatch(fetchToken());
                }, refreshTime);
                return () => clearTimeout(timer);
            }
        }
    }, [token, expiresIn, dispatch]);

    return <OratorContentLibrary />;
}

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <AppContent />
            </Provider>
        </div>
    );
}

export default App;
