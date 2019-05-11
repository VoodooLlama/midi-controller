import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect } from "react";
import webmidi from "webmidi";

function useEnableWebMIDI(): boolean {
  const [enabled, setEnabledState] = useState<boolean>(false);

  useEffect(() => {
    function onStatusChange(err?: Error){
        if (err) {
            console.warn('An error occured connecting MIDI devices!');

            setEnabledState(false);
        }

        setEnabledState(true);
    }

    webmidi.enable(onStatusChange)

    return () => {
      webmidi.disable();
    };
  });

  return enabled;
}

export default useEnableWebMIDI;
