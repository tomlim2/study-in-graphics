// commands/DeleteTaskCommand.js
import Command from './Command';

class DeleteTaskCommand extends Command {
  constructor(taskList, taskId) {
    super();
    this.taskList = taskList;
    this.taskId = taskId;
  }

  execute() {
    this.task = this.taskList.remove(this.taskId);
  }

  undo() {
    this.taskList.add(this.task);
  }
}

export default DeleteTaskCommand;