// Implementation of the classic data structure (Singly) Linked List
// In this case, I decided to follow the FIFO policy.

/**
 * Class to implement the LinkedList
 */
class LinkedList {
    /**
     * Basic constructor to inizialize the LL
     * @param {*} head is the first element of the LL.
     */
    constructor(head = null) {
        this.head = head;
        this.size = 0;
        this.tail = head;
    }

    /**
     * Function to return the last element of the LL
     * @returns the last element
     */
    getLast() {
        return this.tail;
    }

    /**
     * Function to return the first element of the LL
     * @returns the first element
     */
    getFirst() {
        return this.head;
    }

    /**
     * This function add a element in the LL
     * @param {*} node which is the element to add in the LL
     */
    add(node) {
        if (this.head != null) {
            this.tail.next = node;
            this.tail = node;
        } else {
            this.head = node;
            this.tail = node;
        }
        this.size++;
    }

    /**
     * The function remove the first element in the LL
     */
    remove() {
        if (this.size > 0) {
            let successor = this.head.next;
            this.head = successor;
            this.size--;
        }
    }

    /**
     * DEBUG FUNCTION. This function prints a string rappresenting the LL. Beware of what type of data you use
     * @returns a string rappresenting the LL
     */
    toString() {
        let linkedlist = "";
        let node = this.head;
        while (node != null) {
            linkedlist += node.data + " ";
            node = node.next;
        }
        return linkedlist;
    }
}