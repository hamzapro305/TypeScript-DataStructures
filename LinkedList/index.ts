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

	constructor(...data: T[]) {
		this.push(...data);
	}

	public push = (...data: T[]): void => {
		if (data.length > 0) {
			if (this.head == null) {
				this.head = new Node<T>(data[0], null);
				this.size++;
				data = data.slice(1);
			}
			let EndNode = this.getEndNode();
			data.forEach((Item) => {
				EndNode.setNext(new Node<T>(Item, null));
				this.size++;
				EndNode = EndNode.getNext();
			});
		}
	};

	private getEndNode = (): Node<T> | null => {
		if (this.head == null) return null;
		let currentNode = this.head;
		while (currentNode.getNext() != null) currentNode = currentNode.getNext();
		return currentNode;
	};

	public getNodeAt = (index: number): Node<T> | null => {
		if (this.head === null) return null;

		let currentNode = this.head;
		let currentIndex = 0;

		while (currentNode !== null && currentIndex < index) {
			currentNode = currentNode.getNext();
			currentIndex++;
		}

		if (currentIndex === index && currentNode !== null) return currentNode;
		else if (currentIndex < index) throw new Error("Range exceed error");
		else throw new Error("No node found at the specified index");
	};

	public fromArray = (InputArray: T[]): void => {
		this.clear();
		this.push(...InputArray);
	};

	public addAt = (data: T, index: number): void => {
		if (index > this.size) this.push(data);
		if (index === 0) {
			let currentNode = this.head;
			this.head = new Node(data, currentNode);
			return;
		}
		let currentNode = this.getNodeAt(index - 1);
		let temp = currentNode.getNext();
		currentNode.setNext(new Node<T>(data, temp));
	};

	public at = (index: number): T => {
		let node = this.getNodeAt(index);
		return node.getData();
	};

	public printList = (): void => {
		let currentNode = this.head;
		let line: string = "[";
		if (currentNode === null) {
			console.log("[]");
			return;
		}
		do {
			line += `${JSON.stringify(currentNode.getData())} -> `;
			currentNode = currentNode.getNext();
		} while (currentNode !== null);
		console.log(line.slice(0, -4) + "]");
	};

	public forEach = (callBack: (data: T, index: number) => void) => {
		let currentNode = this.head;
		let index: number = 0;
		while (currentNode !== null) {
			callBack(currentNode.getData(), index);
			currentNode = currentNode.getNext();
		}
	};

	public map<ReturnTypeOfMap>(
		callBack: (data: T, index: number) => ReturnTypeOfMap
	): ReturnTypeOfMap[] {
		let currentNode = this.head;
		let arr: ReturnTypeOfMap[] = [];
		let index: number = 0;
		while (currentNode !== null) {
			arr.push(callBack(currentNode.getData(), index));
			currentNode = currentNode.getNext();
		}
		return arr;
	}

	public clear = (): void => {
		let currentNode = this.head;
		while (currentNode !== null) {
			const nextNode = currentNode.getNext();
			currentNode.setNext(null);
			currentNode = nextNode;
		}
		this.head = null;
		this.size = 0;
	};

	public getSize = (): number => this.size + 1;
}