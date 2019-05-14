import { useState } from 'react';

const useInputDeviceSelection = (): [string, React.Dispatch<string>] => {
    const [selectedInputDevice, setSelectedInputDevice] = useState<string>('');

    return [selectedInputDevice, setSelectedInputDevice];
};

export default useInputDeviceSelection;
