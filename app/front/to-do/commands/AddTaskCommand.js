import Command from "./Command";

class AddTaskCommand extends Command{
    constructor(taskList, task){
        super();
        this.taskList = taskList;
        this.task = task;
    }

    execute(){
        this.taskList.add(this.task);
    }

    undo(){
        this.taskList.remove(this.task);
    }
}

export default AddTaskCommand;