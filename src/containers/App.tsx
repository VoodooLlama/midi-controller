import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Loading from 'components/Loading';
import useEnableWebMIDI from 'hooks/useWebMIDI';

const App = () => {
  const isMIDIEnabled = useEnableWebMIDI();

  return (
      <div className="app">
        {
            isMIDIEnabled
                ? <Loading />
                : <div>INPUTS</div>
        }
      </div>
  );
};

export default App;

