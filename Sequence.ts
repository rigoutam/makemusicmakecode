// Takes in a pattern, function, and rate
// Calls the function when pattern is on
// - represents off
// # represents on
export class Sequence {
    pattern: string;
    callback: () => void;
    repeat: boolean;

    index: number;
    on: string;
    off: string;

    constructor(pattern: string, callback: () => void, 
    repeat: boolean=true, on: string ="#", off: string = "-") {
        this.pattern = pattern;
        this.callback = callback;
        this.repeat = repeat;
        this.on = on;
        this.off = off;
    }

    // Does the next thing in the sequence
    public next(): boolean {
        if (this.hasNext()) {
            let p = this.pattern.charAt(this.index);
            if (p === this.on) {
                this.callback();
                return true;
            } else if (p === this.off) {
                return false;
            } else {
                // ignores bad input
                return false;
            }
        }
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
