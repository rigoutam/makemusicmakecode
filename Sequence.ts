// A Sequence Factory
class SequenceFactory {
    repeat: boolean;
    on: string;
    off: string;
    constructor(repeat: boolean = true, on: string = "#", off: string = "-") {
        this.repeat = repeat;
        this.on = on;
        this.off = off;
    }

    public createSequence(pattern: string): Sequence {
        return new Sequence(pattern, this.repeat, this.on, this.off);
    }
}

// A set of Sequences
class SequenceSet {
    sequences: Sequence[];
    constructor(sequences: Sequence[]) {
        this.sequences = sequences;
    }

    // Returns the next sequence
    public next(): Sequence {
        for (let i = 0; i < this.sequences.length; i++) {
            let sequence = this.sequences[i];
            if (sequence.hasNext()) {
                sequence.next();
                if (sequence.isNextOn()) {
                    return sequence;
                }

            }
        }
        return null;
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
    repeat: boolean;

    index: number;
    on: string;
    off: string;

    constructor(pattern: string, repeat: boolean = true, on: string = "#", off: string = "-") {
        let stripped = "";
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] !== " ") {
                stripped += pattern[i];
            }
        }
        this.pattern = stripped;
        this.repeat = repeat;
        this.on = on;
        this.off = off;
    }

    // Does the next thing in the sequence
    // Returns whether it did the on thing
    // TODO we can't actually call this now cause no callbacks work in PXT
    public next(): boolean {
        if (this.hasNext()) {
            let p = this.pattern.charAt(this.index);
            this.index++;

            if (p === this.on) {
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

// Usage
let f = new SequenceFactory(true, "#", "-");
let a = f.createSequence("#-#-");
let b = f.createSequence("-#-#");
let set = new SequenceSet([a]);
input.onButtonPressed(Button.A, () => {
    let seq = set.next();
    if (seq === a) {
        music.playTone(100, 1000);
        basic.showLeds(`
            . . # . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    } else if (seq === b) {
        music.playTone(200, 200);
        basic.showLeds(`
            . . # . .
            . . . . .
            . . # . .
            . . . . .
            . . # . .
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    }
});
