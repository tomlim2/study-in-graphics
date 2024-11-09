// commands/CompleteTaskCommand.js
import Command from './Command';

class CompleteTaskCommand extends Command {
  constructor(taskList, taskId) {
    super();
    this.taskList = taskList;
    this.taskId = taskId;
  }

  execute() {
    this.previousState = this.taskList.toggleComplete(this.taskId);
  }

  undo() {
    this.taskList.toggleComplete(this.taskId, this.previousState);
  }
}

export default CompleteTaskCommand;
