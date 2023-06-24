export class BinaryTreeNode<T> {
    left: BinaryTreeNode<T>;
    data: T;
    right: BinaryTreeNode<T>;
    constructor(left: BinaryTreeNode<T>, data: T, right: BinaryTreeNode<T>) {
        this.left = left;
        this.data = data;
        this.right = right;
    }
}

type TraverseType = `${"PRE" | "POST" | "IN"}_ORDER`;
type Comparer<T> = (a: T, b: T) => 1 | 0 | -1;

export default class BinarySearchTree<T> {
    public root: BinaryTreeNode<T> = null;
    private comparer: Comparer<T>;

    constructor(data: T, comparer: Comparer<T>) {
        this.comparer = comparer;
        this.root = new BinaryTreeNode<T>(null, data, null);
    }

    public generateNode(
        left: BinaryTreeNode<T>,
        data: T,
        right: BinaryTreeNode<T>
    ) {
        return new BinaryTreeNode(left, data, right);
    }

    private preOrderTraversal(
        node: BinaryTreeNode<T>,
        callBack: (data: BinaryTreeNode<T>) => void
    ) {
        if (node) {
            callBack(node);
            this.preOrderTraversal(node.left, callBack);
            this.preOrderTraversal(node.right, callBack);
        }
    }

    private postOrderTraversal(
        node: BinaryTreeNode<T>,
        callBack: (data: BinaryTreeNode<T>) => void
    ) {
        if (node) {
            this.postOrderTraversal(node.left, callBack);
            this.postOrderTraversal(node.right, callBack);
            callBack(node);
        }
    }

    private inOrderTraversal(
        node: BinaryTreeNode<T>,
        callBack: (node: BinaryTreeNode<T>) => void
    ) {
        if (node) {
            this.inOrderTraversal(node.left, callBack);
            callBack(node);
            this.inOrderTraversal(node.right, callBack);
        }
    }

    public search(data: T): BinaryTreeNode<T> | undefined {
        if (this.root == null) return undefined;

        let current = this.root;

        while (current !== null) {
            if (this.comparer(data, current.data) !== 0) {
                current =
                    this.comparer(data, current.data) === -1
                        ? current.left
                        : current.right;
            } else return current;
        }

        return undefined;
    }

    public printTree(): void {
        console.log(
            "POST_ORDER",
            this.traverseTree("POST_ORDER").map((node) => node.data)
        );
        console.log(
            "PRE_ORDER",
            this.traverseTree().map((node) => node.data)
        );
        console.log(
            "IN_ORDER",
            this.traverseTree("IN_ORDER").map((node) => node.data)
        );
    }

    public traverseTree(PrintType?: TraverseType): BinaryTreeNode<T>[] {
        let output: BinaryTreeNode<T>[] = [];
        switch (PrintType) {
            case "IN_ORDER":
                this.inOrderTraversal(this.root, (data) => output.push(data));
                break;
            case "PRE_ORDER":
                this.preOrderTraversal(this.root, (data) => output.push(data));
                break;
            case "POST_ORDER":
                this.postOrderTraversal(this.root, (data) => output.push(data));
                break;
            default:
                this.preOrderTraversal(this.root, (data) => output.push(data));
                break;
        }
        return output;
    }
}
