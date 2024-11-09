class Command{
    execute(){
        throw new Error("Execute method should be implemented");
    }

    undo(){
        throw new Error("Undo method should be implemented");
    }
}

export default Command;