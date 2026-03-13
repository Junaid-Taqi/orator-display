import './css/main.scss';
import React, {useEffect} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './Services/Store/Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import OratorContentLibrary from "./components/OratorContentLibrary/OratorContentLibrary";
import {fetchToken} from './Services/Slices/AuthSlice';
import {LanguageProvider, useTranslation} from './Services/Localization/Localization';

function AppContent() {
    const {t, lang, setLanguage} = useTranslation();
    const dispatch = useDispatch();
    const {token, expiresIn, status, error} = useSelector((state) => state.auth);

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

    const isBootstrappingAuth = !token && (status === 'idle' || status === 'loading');
    if (isBootstrappingAuth) {
        return (
            <div style={{minHeight: '100vh', display: 'grid', placeItems: 'center'}}>
                <div style={{fontSize: '16px', fontWeight: 600}}>Loading...</div>
            </div>
        );
    }

    if (!token && status === 'failed') {
        return (
            <div style={{minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#b91c1c'}}>
                <div>Failed to load token{error ? `: ${error}` : ''}</div>
            </div>
        );
    }

    return <OratorContentLibrary/>;
}

function App() {
    return (
        <div className="App">
            <LanguageProvider>
                <Provider store={store}>
                    <AppContent/>
                </Provider>
            </LanguageProvider>
        </div>
    );
}

export default App;
