import React, { useState, ChangeEvent } from 'react';
import { IMIDIControlChangeEntry } from '../types/ControlChange';
import { number } from 'prop-types';

interface IPedalKnobProps {
    ccEntry: IMIDIControlChangeEntry;
    onSetKnobValueCallback?: (value: number) => void;
}

const PedalKnob: React.FC<IPedalKnobProps> = ({
    ccEntry,
    onSetKnobValueCallback
}) => {
    const [currentKnobValue, setKnobValue] = useState<number>(0);

    const onSelectKnobValueHandler = ({
        target
    }: ChangeEvent<HTMLInputElement>) => {
        const { value: targetValue } = target;
        const knobValue = Number(targetValue);

        setKnobValue(knobValue);

        if (onSetKnobValueCallback) {
            onSetKnobValueCallback(knobValue);
        }
    };

    if (!currentKnobValue) {
        return <div className='loading' />;
    }

    return (
        <div className='pedal-knob'>
            <input
                min={0}
                max={127}
                onChange={onSelectKnobValueHandler}
                type='range'
            />
        </div>
    );
};
