export class Stack<T> {
    private stack: T[] = [];

    constructor(stack: T[]) {
        this.stack = stack;
    }

    public Size = (): number => {
        return this.stack.length;
    };

    public peek = (): T => {
        if (this.isEmpty()) {
            throw new Error("Stack empty error");
        } else {
            return this.stack[this.Size() - 1];
        }
    };

    public pop = (): T => {
        if (this.isEmpty()) {
            throw new Error("Stack empty error");
        } else {
            return this.stack.pop();
        }
    };

    public push = (item: T): void => {
        this.stack.push(item);
    };

    public isEmpty = (): Boolean => {
        if (this.stack.length == 0) return true;
        return false;
    };
}
