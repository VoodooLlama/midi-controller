import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loading from '../components/Loading';
import Devices from './Devices';
import useEnableWebMIDI from '../hooks/useEnableWebMIDI';
import { DeviceContext, DeviceProvider } from '../context/Device';

const App: React.FC = () => {
  const isMIDIEnabled: boolean = useEnableWebMIDI();

  return (
    <main className="app">
      <Loading isLoaded={ isMIDIEnabled }>
        <DeviceProvider>
          <Devices />
        </DeviceProvider>
      </Loading>
    </main>
  );
};

export default App;
