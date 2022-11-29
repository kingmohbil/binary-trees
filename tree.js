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
class Tree{
  constructor(array){
    array = [...new Set(array)]
    array = array.sort((prev, next) => prev - next)
    this.root = this.buildTree(array, 0, array.length)
}

  buildTree(arr, start, end){
    if(start >= end) return null
    const mid = parseInt((start+end) / 2)
    const root = Tnode(arr[mid])
    root.left = this.buildTree(arr, start, mid)
    root.right = this.buildTree(arr, mid+1, end)
    return root
  }  

  find(value){
     return this.search(this.root, value)
  }

  search(node, value){
    if(node === null || node.data === value) return node
    if(node.data < value) return this.search(node.right, value)
    if(node.data > value) return this.search(node.left, value)
  }

  insert(value){
   this.insertRec(this.root, value)
  }
  insertRec(node, value){
    if(this.search(node, value) !== null)return `the value already exists`
    if(node === null){
       node = new Tnode(value)
        return node
    }
    if(node.data < value) node.right = this.insertRec(node.right, value)
    if(node.data > value) node.left =  this.insertRec(node.left, value)
    return node 
  }
  delete(value){
    if(this.search(this.root, value) === null) return null
    let element = this.search(this.root, value)
    if(element.left === null && element.right === null){
      element = null
      return
    }
    if(element.left !== null && element.right === null){
      element = element.left
      element.left = null
      return
  }
  if(element.right !== null && element.left === null){
    element = element.right
    element.right = null
    return
    }
  }
}
let t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

t.insert(10)
prettyPrint(t.root)
console.log(t.insert(10))