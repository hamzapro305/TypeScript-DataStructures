class Node<T> {
    private data: T;
    private next: Node<T> | null;
    constructor(data: T, next: Node<T> | null) {
        this.data = data;
        this.next = next;
    }
    public getData = (): T => this.data;
    public getNext = (): Node<T> | null => this.next;
    public setData = (data: T): void => {
        this.data = data;
    };
    public setNext = (next: Node<T> | null): void => {
        this.next = next;
    };
}

export class LinkedList<T> {
    private head: Node<T> | null = null;
    private size: number = 0;
    constructor(data: T) {
        this.head = new Node<T>(data, null);
    }

    public push = (data: T): void => {
        let temp = this.head;
        if (this.head == null) {
            this.head = new Node<T>(data, null);
            this.size++;
            return;
        }
        while (temp?.getNext() != null) temp = temp.getNext();
        temp?.setNext(new Node<T>(data, null));
        this.size++;
    };

    public addAt = (data: T, index: number): void => {
        let temp = this.head;
        if (index == 0) {
            let endPoint = this.head;
            this.head = new Node<T>(data, endPoint);
            this.size++;
            return;
        }
        let i: number = 0;
        while (temp != null) {
            if (i + 1 == index) {
                let endPoint = temp.getNext();
                temp.setNext(new Node<T>(data, endPoint));
                this.size++;
                return;
            }
            i++;
            temp = temp.getNext();
        }
    };

    public at = (index: number): T => {
        let temp = this.head;
        if (temp == null) throw new Error("Linked List empty error");
        let i: number = 0;
        do {
            if (i === index) return temp.getData();
            temp = temp.getNext();
            i++;
        } while (temp != null);
        throw new Error("Index out of bounds");
    };

    public printList = (): void => {
        let temp = this.head;
        let line: string = "";
        if (temp == null) {
            console.log("[]");
            return;
        }
        do {
            line += `${JSON.stringify(temp.getData())} -> `;
            temp = temp.getNext();
        } while (temp != null);
        console.log(line.slice(0, -4));
    };

    public forEach = (callBack: (data: T, index: number) => void) => {
        let temp = this.head;
        let index: number = 0;
        while (temp != null) {
            callBack(temp.getData(), index);
            temp = temp.getNext();
        }
    };

    public map = (callBack: (data: T, index: number) => T): T[] => {
        let temp = this.head;
        let arr: T[] = [];
        let index: number = 0;
        while (temp != null) {
            arr.push(callBack(temp.getData(), index));
            temp = temp.getNext();
        }
        return arr;
    };

    public getSize = (): number => this.size + 1;
}