import React, { useEffect, useState } from 'react';
import { retrievePedalData } from '../services/pedal';
import { IPedal } from '../state/pedal';
import Pedal from '../components/Pedal';

const Pedals: React.FC = () => {
    let [pedalData, setPedalData] = useState<IPedal[]>();

    useEffect(() => {
        retrievePedalData().then(({ devices }) => {
            setPedalData(devices);
        });
    }, []);

    const renderPedalData = (pedalData: IPedal[]) => {
        return pedalData.map((pedal: IPedal) => (
            <Pedal key={pedal.id} pedal={pedal} />
        ));
    };

    return (
        <section className='pedals-container'>
            {pedalData ? <>{renderPedalData(pedalData)}</> : <>Loading</>}
        </section>
    );
};

export default Pedals;
