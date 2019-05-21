interface IMIDIControlChangeEntry {
    /**
     * Human-readable control change description
     */
    description: string;

    /**
     * Midi Parameter Name
     *
     */
    name: number;
}

/**
 * Represents a map of MIDI CC parameter descriptions, keyed by the MIDI CC#
 */
export type IMIDIControlMap = Record<number, IMIDIControlChangeEntry>;
