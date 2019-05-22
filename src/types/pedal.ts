/**
 * Represents a MIDI CC parameter value on a device
 */
export interface IMIDIControlChangeEntry {
    /**
     * Human-readable control change description
     */
    description: string;

    /**
     * Midi Parameter Name
     */
    name: string;

    /**
     * Control Change (CC) #
     */
    value: number;
}
