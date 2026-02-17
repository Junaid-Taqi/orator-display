import './css/main.scss';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './Services/Store/Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import OratorContentLibrary from "./components/OratorContentLibrary/OratorContentLibrary";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <OratorContentLibrary/>
                </PersistGate>
            </Provider>
        </div>
    );
}

export default App;
