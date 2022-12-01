// printing the BST
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
  }
}
// a class to create a tree Node 
function Tnode(data){
    return{
        data,
        left:null, 
        right:null
    }
}
class bstTree{
  // constructor takes an array and turns it to a balanced tree
  // after sorting and removing duplicates and stores it in the root
  constructor(array){
    array = [...new Set(array)]
    array = array.sort((prev, next) => prev - next)
    this.root = this.buildTree(array, 0, array.length)
}
  print(){
    prettyPrint(this.root)
  }
// builds the balanced binary tree
  buildTree(arr, start, end){
    // stops after the array of length 1
    if(start >= end) return null
    // calclautes mid point 
    const mid = parseInt((start + end) / 2)
    // sets the middle element as the data for the root node
    const root = Tnode(arr[mid])
    // recursivly doing the same for the left sub tree
    root.left = this.buildTree(arr, start, mid)
    // recursivly doing the same for the right sub tree
    root.right = this.buildTree(arr, mid+1, end)
    return root
  }  
  // taking a value and calling the search method on the root and the value
  find(value){
     return this.search(this.root, value)
  }
  // search for the value in a certain node recursivly
  search(node, value){
    // returns the node if the specified value wasn't found 
    // or it was equal to the node
    if(!node || node.data === value) return node
    // searches the left sub tree if the value is lesser than the root
    if(node.data > value) return this.search(node.left, value)
    // searches the right sub tree if the value is greater than the root
    if(node.data < value) return this.search(node.right, value)
  }

  insert(value){
   this.root = this.insertRec(this.root, value)
  }
  insertRec(node, value){
    if(this.search(node, value) !== null)return `the value already exists`
    if(!node){
      node = new Tnode(value)
      return node
    }
    if(node.data < value) node.right = this.insertRec(node.right, value)
    if(node.data > value) node.left =  this.insertRec(node.left, value)
    return node 
  }
  delete(value){
   this.root = this.deleteRec(this.root, value)
    }
  
  deleteRec(node, value){
    if(!this.search(node, value))return node
    if(node.data === value){
      if(!node.right && !node.left){
        node = null 
        return node
      }  
      else if(!node.right && node.left !== null){
        node = node.left
        return node
      }
      else if(!node.left && node.right !== null){
        node = node.right
        return node
    }
    else if(node.right !== null && node.left !== null){
      const temp = this.minValue(node.right)
      node.data = temp.data 
      node.right = this.deleteRec(node.right, temp.data)
      return node
    }
    }
    if(node.data < value) node.right = this.deleteRec(node.right, value)
    if(node.data > value) node.left =  this.deleteRec(node.left, value) 
    return node
  }
    minValue(node){
      if(!node.left)
        return node
        node = this.minValue(node.left)
      return node
    }

    levelOrder(f){
      if(!this.root) return this.root
      let queue = [this.root]
      let list = []
      while(queue.length > 0){
        const current = queue.shift()
        f?f(current):
        list.push(current.data)
        if(!!current.left) 
          queue.push(current.left)
        if(!!current.right) 
          queue.push(current.right)
      }
      if(!f) return list
    }
    
  }

const obj = new bstTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
for(let i = 10; i < 15; i++){
  obj.insert(i)
}
obj.print()
console.log(obj.levelOrder())

