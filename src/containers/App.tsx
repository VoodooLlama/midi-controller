import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loading from '../components/Loading';
import Devices from './Devices';
import useEnableWebMIDI from '../hooks/useEnableWebMIDI';
import { DeviceContext, DeviceProvider } from '../context/Device';

const App: React.FC = () => {
    const isMIDIEnabled: boolean = useEnableWebMIDI();

    const renderContent = () => (
        <DeviceProvider>
            <Devices />
        </DeviceProvider>
    );

    return (
        <main className='app'>
            {
                isMIDIEnabled
                    ? renderContent()
                    : <Loading />
            }
        </main>
    );
};

export default App;
