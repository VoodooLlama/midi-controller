import { useState } from 'react';

const useOutputDeviceSelection = (): [string, React.Dispatch<string>] => {
    const [selectedOutputDevice, setSelectedOutputDevice] = useState<string>('');

    return [selectedOutputDevice, setSelectedOutputDevice];
};

export default useOutputDeviceSelection;
