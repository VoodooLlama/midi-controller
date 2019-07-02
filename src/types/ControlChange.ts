export type IControlChangeValue = number;

/**
 * Represents a labeled set of values which can be sent as a CC parameter
 */
export type IControlChangeEnumeration = {
    description: string;
    value: IControlChangeValue;
};
type IControlChangeEnumerationRange = IControlChangeEnumeration[];

/**
 * Range of unlabeled CC values to be sent (e.g. [0, 127])
 */
type IControlChangeValueRange = IControlChangeValue[];

type IControlChangeRange =
    | IControlChangeValueRange
    | IControlChangeEnumerationRange;

/**
 * Represents a CC Parameter along with the collection of valid values which can be received
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
     * MIDI Control Change Number (CC#) (0..127)
     */
    value: IControlChangeValue;

    /**
     * MIDI Value to be sent to the CC# (0..127)
     */
    range?: IControlChangeRange;
}

// export function getControlChangeRange(range: IControlChangeRange) {
//     let max: IControlChangeValue = 127;
//     let min: IControlChangeValue = 0;

//     if (isControlChangeValueRange(range)) {
//         min = range[0];
//         max = range[1];
//     } else {
//         // Range of enumerations
//         min = 127;
//         max = 0;

//         for (const ccEntry of range) {
//             const { value } = ccEntry;

//             if (value < min) {
//                 min = value;
//             }

//             if (value > max) {
//                 max = value;
//             }
//         }
//     }

//     return { min, max };
// }

export function isControlChangeValue(
    value: number
): value is IControlChangeValue {
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
