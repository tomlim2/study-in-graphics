// commands.js
export class IncrementCommand {
  constructor(counter) {
    this.counter = counter;
  }

  execute() {
    this.counter.increment();
  }

  undo() {
    this.counter.decrement();
  }
}

export class DecrementCommand {
  constructor(counter) {
    this.counter = counter;
  }

  execute() {
    this.counter.decrement();
  }

  undo() {
    this.counter.increment();
  }
}

export class ResetCommand {
  constructor(counter, previousValue) {
    this.counter = counter;
    this.previousValue = previousValue; // Store the previous value to restore on undo
  }

  execute() {
    this.counter.reset();
  }

  undo() {
    this.counter.setValue(this.previousValue);
  }
}
