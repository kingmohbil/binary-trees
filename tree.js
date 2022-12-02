//! ---------------------------- printing the BST ---------------------------- //
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
  }
}
//! -------------------- function to give a random number -------------------- */
function randomNumbers(n) {
  const arr = []
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * n))
  }
  return arr
}
//! ---------------------- a class to create a tree Node --------------------- */
function Tnode(data) {
  return {
    data,
    left: null,
    right: null,
  }
}
class bstTree {
  //! ------- constructor takes an array and turns it to a balanced tree ------- */
  //! ----- after sorting and removing duplicates and stores it in the root ---- */
  constructor(array) {
    array = [...new Set(array)]
    array = array.sort((prev, next) => prev - next)
    this.root = this.buildTree(array, 0, array.length)
  }
  //! ----------------------- function to print the tree ----------------------- */
  print() {
    prettyPrint(this.root)
  }
  //! --------------------- builds the balanced binary tree -------------------- */
  buildTree(arr, start, end) {
    //! -------------------- stops after the array of length 1 ------------------- */
    if (start >= end) return null
    //! -------------------------- calclautes mid point -------------------------- */
    const mid = parseInt((start + end) / 2)
    //! ---------- sets the middle element as the data for the root node --------- */
    const root = Tnode(arr[mid])
    //!------------- recursivly doing the same for the left sub tree ------------ */
    root.left = this.buildTree(arr, start, mid)
    //!------------ recursivly doing the same for the right sub tree ------------ */
    root.right = this.buildTree(arr, mid + 1, end)
    return root
  }
  //! ----------------- taking a value and calling the _search ----------------- */
  //! -------------------- method on the root and the value -------------------- */
  find(value) {
    return this._search(this.root, value)
  }
  //! ------ calls the _insertRec function and returns it to the root node ----- */
  insert(value) {
    this.root = this._insertRec(this.root, value)
  }
  //! --- this function here calls the _deleteRec function with the root node -- */
  delete(value) {
    this.root = this._deleteRec(this.root, value)
  }
  //! ------------------- level order traverse the tree in a ------------------- */
  //!---------------- breadth-first if with a callback function --------------- */
  //! -------------------- if no function specified then it -------------------- */
  //! ------------ returns an array with the breadth-first traverse ------------ */
  levelOrder(f) {
    //! -- we check if the tree is empty or not if it's emppty returns the root -- */
    if (!this.root) return this.root
    //!---------------- here we create an array to act as a queue --------------- */
    const queue = [this.root]
    //!--------- we create the list to hold the data after the traverse --------- */
    const list = []
    //!---------------- while the queue isn't empty run this code --------------- */
    while (queue.length > 0) {
      //! ------------------ the current node taken from the queue ----------------- */
      const current = queue.shift()
      //! --------------- checks if the function is undefined or not --------------- */
      f ? f(current) : list.push(current.data)
      //! ------------------------ checks if there is a node ----------------------- */
      if (!!current.left) queue.push(current.left)
      if (!!current.right) queue.push(current.right)
    }
    //! ----------- if the function is undefined then return the array ----------- */
    return !f ? list : undefined
  }
  //! ---------- function to traverse the tree in an inorder traverse ---------- */
  inorder(f) {
    //! ------------------- a function to be called recursivly ------------------- */
    function inorderRec(node) {
      if (!node) return
      inorderRec(node.left)
      !f ? results.push(node.data) : f(node.data)
      inorderRec(node.right)
    }
    let results = []
    inorderRec(this.root)
    return !f ? results : undefined
  }
  //! ---------- function to traverse the tree in an postorder traverse ---------- */
  postorder(f) {
    function postorderRec(node) {
      if (!node) return
      postorderRec(node.left)
      postorderRec(node.right)
      !f ? results.push(node.data) : f(node.data)
    }
    let results = []
    postorderRec(this.root)
    return !f ? results : undefined
  }
  //! ---------- function to traverse the tree in an preorder traverse ---------- */
  preorder(f) {
    function preorderRec(node) {
      if (!node) return
      !f ? results.push(node.data) : f(node.data)
      preorderRec(node.left)
      preorderRec(node.right)
    }
    let results = []
    preorderRec(this.root)
    return !f ? results : undefined
  }
  //! -------------- function to find the height of any given node ------------- */
  height(node) {
    if (!node) return -1
    let lh = this.height(node.left)
    let rh = this.height(node.right)
    return lh > rh ? lh + 1 : rh + 1
  }
  //!----------------- function to find the depth of any node ----------------- */
  depth(node) {
    let counter = 0
    let current = this.root
    while (current !== null) {
      if (node.data === current.data) {
        return counter
      } else if (node.data < current.data) {
        current = current.left
        counter++
      } else if (node.data > current.data) {
        current = current.right
        counter++
      }
    }
    return counter
  }
  //! ----------------- to check if the tree is balanced or not ---------------- */
  isBalanced() {
    let balanced = true
    let t = this
    this.levelOrder(function (node) {
      let lh = t.height(node.left)
      let rh = t.height(node.right)
      if (Math.abs(lh - rh) > 1) balanced = false
    })
    return balanced
  }
  //! ----------------------- rebalancing the binary tree ---------------------- */
  rebalance() {
    const newArray = this.postorder()
    this.root = this.buildTree(newArray, 0, newArray.length)
  }
  //! ---------------------- here are the private methods ---------------------- */
  //! ----------- _search for the value in a certain node recursivly ----------- */
  _search(node, value) {
    //! ---------- returns the node if the specified value wasn't found ---------- */
    //! ----------------------- or it was equal to the node ---------------------- */
    if (!node || node.data === value) return node
    //! ---- _searches the left sub tree if the value is lesser than the root ---- */
    if (node.data > value) return this._search(node.left, value)
    //! --- _searches the right sub tree if the value is greater than the root --- */
    if (node.data < value) return this._search(node.right, value)
  }
  //! ----------------- this function here inserts a node in at ---------------- */
  //! ------------------- the leef and make sure there are no ------------------ */
  //! ---------------------------- duplicate values --------------------------- *
  _insertRec(node, value) {
    //! ---------- check for the value if it's there before moving down ---------- */
    if (this._search(node, value) !== null) return `the value already exists`
    //! ---------------- when the leef node is found it creates a ---------------- */
    //! ---------------- node with the given value and returns it ---------------- */
    if (!node) {
      node = new Tnode(value)
      return node
    }
    //! ------- check the left and right subtrees untill found a leef node ------- */
    if (node.data < value) node.right = this._insertRec(node.right, value)
    if (node.data > value) node.left = this._insertRec(node.left, value)
    return node
  }
  _deleteRec(node, value) {
    //! --------- if the value isn't found the functions returns the root -------- */
    if (!this._search(node, value)) return node
    //! -------------- if the value was found there are 3 main cases ------------- */
    if (node.data === value) {
      //! ---- if the node is a leef node it simply makes it null and returns it --- */
      if (!node.right && !node.left) {
        node = null
        return node
      }
      //! ------------------ if the node has only a left child it ------------------ */
      //! ------------------ replace the node with the left child ------------------ */
      else if (!node.right && node.left !== null) {
        node = node.left
        return node
      }
      //! ------------------ if the node has only a right child it ----------------- */
      //! ------------------ replace the node with the right child ----------------- */
      else if (!node.left && node.right !== null) {
        node = node.right
        return node
      }
      //! --------------- here is if the node has two childs we need --------------- */
      //! -------------------- to get the smallest child in the -------------------- */
      //! ------------------------------ right subtree ----------------------------- */
      else if (node.right !== null && node.left !== null) {
        //! ------- we take the min value and make it the data in the root node ------ */
        const temp = this._minValue(node.right)
        node.data = temp.data
        //! ----------- here we delete the min value from the right subtree ---------- */
        node.right = this._deleteRec(node.right, temp.data)
        return node
      }
    }
    //! ------------------- we recursivly search for the value ------------------- */
    if (node.data < value) node.right = this._deleteRec(node.right, value)
    if (node.data > value) node.left = this._deleteRec(node.left, value)
    return node
  }
  //! ------------------ find the min value of any given node ------------------ */
  _minValue(node) {
    if (!node.left) return node
    node = this._minValue(node.left)
    return node
  }
}
//! ------------------- testing on the methods of the tree ------------------- */
const tree = new bstTree(randomNumbers(50))
tree.print()
console.log(tree.isBalanced())
console.log(tree.levelOrder())
console.log(tree.postorder())
console.log(tree.inorder())
console.log(tree.preorder())
tree.insert(100)
tree.insert(110)
tree.insert(120)
tree.insert(150)
tree.insert(190)
console.log(tree.isBalanced())
tree.rebalance()
console.log(tree.isBalanced())
tree.print()
