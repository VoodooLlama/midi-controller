import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loading from '../components/Loading';
import Input from '../containers/Input';
import useEnableWebMIDI from '../hooks/useEnableWebMIDI';

const App: React.FC = () => {
  const isMIDIEnabled: boolean = useEnableWebMIDI();
  const Container = isMIDIEnabled ? Input : Loading;

  return (
    <div className="app">
      <Container />
    </div>
  );
};

export default App;

