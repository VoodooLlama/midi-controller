import React from 'react';
import ReactDOM from 'react-dom';
import { IPedal } from 'state/pedal';

interface IPedalProps {
    pedal: IPedal;
}

const Pedal: React.FC<IPedalProps> = ({ pedal }) => {
    const {
        description,
        id,
        name,
        manufacturer,
        listenChannel,
        ccValues
    } = pedal;

    return (
        <article className='pedal'>
            <section className='details'>
                <h2>
                    {manufacturer} {name}
                </h2>
                <div>Listening on Channel {listenChannel}</div>
                <div className='details'>{description}</div>
            </section>
            <section className='parameters'>
                <div>CC Values</div>
                {ccValues.map(
                    ({ name: ccName, description: ccDescription, value }) => (
                        <article className='cc-value' key={`${id}${value}`}>
                            <h3>{value}</h3>
                            <div className='cc-value-details'>
                                <div>Name: {ccName}</div>
                                <div>Description: {ccDescription}</div>
                            </div>
                        </article>
                    )
                )}
            </section>
        </article>
    );
};

export default Pedal;
