/**
 * Represents a MIDI CC parameter value on a device
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
     * MIDI Control Change (CC) (between 0 and 127)
     */
    value: number;
}
