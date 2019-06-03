import React, { useState, ChangeEvent } from 'react';
import { IMIDIControlChangeEntry } from '../types/pedal';
import { number } from 'prop-types';

interface IPedalKnobProps {
    ccValue: IMIDIControlChangeEntry;
    initialValue: number;
    onSetKnobValue?: (value: number) => void;
}

const PedalKnob: React.FC<IPedalKnobProps> = ({
    ccValue,
    initialValue,
    onSetKnobValue
}) => {
    const [currentKnobValue, setKnobValue] = useState<number>(initialValue);
    const [currentError, setCurrentError] = useState<string>('');

    const onSelectKnobValueHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (currentError) {
            setCurrentError('');
        }

        try {
            const { value } = target;
            const newKnobValue = parseInt(value);

            if (newKnobValue && newKnobValue >= 0 && newKnobValue <= 127) {
                return setKnobValue(newKnobValue)
            }
        }
        catch(e) {
            setCurrentError('An error occurred attempting to parse the number you entered!');
        }

        setCurrentError('Enter a valid number inclusively between 0 and 127');
    };

    return (
        <div className='pedal-knob'>
            {currentError && (
                <div className='pedal-input-error'>{currentError}</div>
            )}

            <input type='input' onChange={ onSelectKnobValueHandler } />
        </div>
    );
};
