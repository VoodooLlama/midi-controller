export type IControlChangeValue = number;

/**
 * Represents an enumeration of values which can be sent for a CC parameter
 */
export type IControlChangeEnumeration = {
    description: string;
    value: IControlChangeValue;
};

/**
 * Range of possible CC values to be sent
 */
export type IControlChangeValueRange = IControlChangeValue[];

/**
 *
 */

export interface IMIDIControlChangeEntry {
    /**
     * Human-readable control change description
     */
    description: string;

    /**
     * MIDI Parameter Name
     */
    name: string;

    /**
     * MIDI Control Change Number (CC#) (between 0 and 127)
     */
    value: IControlChangeValue;

    /**
     * MIDI Value Range
     */
    range?: IControlChangeValueRange | IControlChangeEnumeration[];
}

export function isControlChangeValue(value: number): value is IControlChangeValue {
    return value >= 0 && value <= 127;
}

export function isControlChangeValueRange(
    range: IControlChangeValueRange
): range is IControlChangeValueRange {
    return (
        range.length === 2 &&
        range[0] < range[1] &&
        isControlChangeValue(range[0]) &&
        isControlChangeValue(range[1])
    );
}
