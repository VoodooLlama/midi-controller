import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect } from "react";
import webmidi from "webmidi";

function useEnableWebMIDI() {
  const [enabled, setEnabledState] = useState(false);

  useEffect(() => {
    function onStatusChange(err) {
        if (err) {
            setEnabledState(false);
        }

        setEnabledState(true);
    }

    webmidi.enable(onStatusChange)
  });
}

export default useEnableWebMIDI;
