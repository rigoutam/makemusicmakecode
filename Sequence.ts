// A set of Sequences
class SequenceSet {
    sequences: Sequence[];
    constructor(sequences: Sequence[]) {
        this.sequences = sequences;
    }

    // Calls next on all its sequences
    public next() {
        for (let i = 0; i < this.sequences.length; i++) {
            let sequence = this.sequences[i];
            if (sequence.hasNext()) {
                sequence.next();
            }
        }
    }

    // Resets all sequences to start at their beginnings
    public resetAll(): void {
        for (let i = 0; i < this.sequences.length; i++) {
            this.sequences[i].reset();
            
        }
    }
}

// Takes in a pattern, function, and rate
// Calls the function when pattern is on
// - represents off
// # represents on
class Sequence {
    pattern: string;
    callback: () => void;
    repeat: boolean;

    index: number;
    on: string;
    off: string;

    constructor(pattern: string, callback: () => void, 
    repeat: boolean=true, on: string ="#", off: string = "-") {
        let stripped = "";
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] !== " ") {
                stripped += pattern[i];
            }
        }
        this.pattern = stripped;
        this.callback = callback;
        this.repeat = repeat;
        this.on = on;
        this.off = off;
    }

    // Does the next thing in the sequence
    // Returns whether it did the on thing
    public next(): boolean {
        if (this.hasNext()) {
            let p = this.pattern.charAt(this.index);
            this.index++;

            if (p === this.on) {
                this.callback();
                return true;
            } else if (p === this.off) {
                return false;
            } else {
                // ignores bad input
                return false;
            }
        } else {
            return false;
        }
    }

    public reset(): void {
        this.index = 0;
    }

    // Always true if repeating the pattern
    public hasNext(): boolean {
        return this.repeat || this.index < this.pattern.length;
    }

    // if the next in the sequence is 'on'
    public isNextOn() {
        return this.hasNext() && this.pattern.charAt(this.index) === this.on;
    }
}
