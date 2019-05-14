import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loading from '../components/Loading';
import Devices from './Devices';
import useEnableWebMIDI from '../hooks/useEnableWebMIDI';

const App: React.FC = () => {
  const isMIDIEnabled: boolean = useEnableWebMIDI();

  return (
    <main className="app">
      <Loading isLoaded={ isMIDIEnabled }>
        <Devices />
      </Loading>
    </main>
  );
};

export default App;
