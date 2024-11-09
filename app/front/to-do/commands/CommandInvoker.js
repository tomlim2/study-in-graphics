// commands/CommandInvoker.js
class CommandInvoker {
    constructor() {
      this.history = [];
      this.redoStack = [];
    }
  
    executeCommand(command) {
      command.execute();
      this.history.push(command);
      this.redoStack = []; // Clear redo stack on new action
    }
  
    undo() {
      const command = this.history.pop();
      if (command) {
        command.undo();
        this.redoStack.push(command);
      }
    }
  
    redo() {
      const command = this.redoStack.pop();
      if (command) {
        command.execute();
        this.history.push(command);
      }
    }
  }
  
  export default CommandInvoker;
  