class TreeNode<T> {
    data: T;
    children: TreeNode<T>[];

    constructor(data: T) {
        this.data = data;
        this.children = [];
    }

    addChild(childData: T): void {
        const childNode = new TreeNode<T>(childData);
        this.children.push(childNode);
    }
}

export class Tree<T> {
    root: TreeNode<T>;

    constructor(data: T, ...items: T[]) {
        this.root = new TreeNode<T>(data);
        for (const i of items) {
            this.root.addChild(i);
        }
    }

    traversePreOrder(callback: (data: T) => void): void {
        this.traversePreOrderRecursive(this.root, callback);
    }

    private traversePreOrderRecursive(node: TreeNode<T>, callback: (data: T) => void): void {
        callback(node.data);
        for (const child of node.children) {
            this.traversePreOrderRecursive(child, callback);
        }
    }

    traversePostOrder(callback: (data: T) => void): void {
        this.traversePostOrderRecursive(this.root, callback);
    }

    private traversePostOrderRecursive(node: TreeNode<T>, callback: (data: T) => void): void {
        for (const child of node.children) {
            this.traversePostOrderRecursive(child, callback);
        }
        callback(node.data);
    }
}
