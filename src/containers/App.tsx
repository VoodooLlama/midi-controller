import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loading from '../components/Loading';
import Input from './Device';
import useEnableWebMIDI from '../hooks/useEnableWebMIDI';

const App: React.FC = () => {
  const isMIDIEnabled: boolean = useEnableWebMIDI();
  const Container = isMIDIEnabled ? Input : Loading;

  return (
    <main className="app">
      <Container />
    </main>
  );
};

export default App;
