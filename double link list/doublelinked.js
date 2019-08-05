
function Node(data){
  this.data = data;
  this.previous = null;
  this.next = null;
}

//Double link list constructor with same parameters as a SinglyLinkedList
//constructor. The only difference between the two is the addtional pointer
//available to all nodes found inside
function DoublyLinkedList(){
  this.head = null;
  this.tail = null;
  this.numberOfValues = 0;
}

//Method for adding nodes to the link list. Similar to single link list. User
//passes data through. A variable is assigned to a new node created by the node
//constructor from the data being passed through.
DoublyLinkedList.prototype.add = function (data){
  var node = new Node(data);
//If there is no head present in the link list this means that it's empty. head
//and tail values are assigned to the new node as it is the first node created
//for the list
  if(!this.head) {
    this.head = node;
    this.tail = node;
//else statement accounts for creation of additional nodes beyond the first node
//created. New node added becomes the new tail for the link list and tail.next pointers
//to null. The only difference between a double and single list is the reference
//connecting the new tail to the previous one through node.previous. This allows the
//user to traverse the link list both forwards and backwards.
  } else {
    node.previous = this.tail;
    this.tail.next = node;
    this.tail = node;
  }
//numberofvalues increments with the addtion of every new node
  this.numberOfValues++;
}

//Method for removing nodes from double link list. Data passed through for comparison to
//see which node(s) are to be removed. Can remove one, several, or no nodes at all(if data
//doesn't match any node data in link list)
DoublyLinkedList.prototype.remove = function(data){
//variable set to head of link list to traverse it. While loop kicks user out once current
//traverses the entire list and returns a value of null
  var current = this.head;
  while(current){
//iffy statment tripped when current's data matches the data passed through initially
    if(current.data === data){
//outlier iffy statement accounting for the possibility of a link list with only a single node
//head and tail values reset to null to remove node
      if(current === this.head && current === this.tail){
        this.head = null;
        this.tail = null;
//outlier iffy statment accounting for the possibility of the node being removed is the head of
//the link list. Changes the head to the next node on the link list (this.head.next) and then reassigns
//the previous value of the new head to null. Please note that order is important here. Previous must be
//reassigned to null AFTER the new head is assigned
      } else if(current === this.head){
        this.head = this.head.next;
        this.head.previous = null;
//outlier iffy statment accounting for the possibility of the node being removed is the tail of
//the link list. Changes the tail to the previous node on the link list (this.tail.previous) and then reassigns
//the next value of the new tail to null. Please note that order is important here. Next must be
//reassigned to null AFTER the new tail is assigned
      } else if(current === this.tail){
        this.tail = this.tail.previous;
        this.tail.next = null;
//else statment accounting for everything other than the outliers(single node linklist, node at head, node at tail are outliers).
//current.previous.next is a roundabout way of pointing to the current value tripped by the initial if statement since that value
//matches the data being passed in for removal. This same logic applies to current.next.previous. Current.previous.next then is set
//to current.next and current.next.previous is set to current.previous effectively removing the current node from the link list.
      } else {
        console.log('current.previous.next', current.previous.next);
        console.log('current.next.previous', current.next.previous);
        current.previous.next = current.next;
        current.next.previous = current.previous;
      }
//total number of values in the link list is decrimented by 1 to account for the removal of the node
      this.numberOfValues--;
    }
//current becomes current.next until its value equals null to be able to kick us out of our while loop
    current = current.next;
  }
}

//method for inserting a new node after a specified node value(multiples can be added depending on how
//many values match)
DoublyLinkedList.prototype.insertAfter = function(data, toNodeData){
//sets a current variable equal to the head of the linked list
  var current = this.head;
//while loop that continues until current is equal to null
  while(current){
//iffy statement tripped if the current.data is equal to the nodedata being passed through
    if(current.data === toNodeData) {
//new node created using data passed through and by calling the node constructor
      var node = new Node(data);
//outlier nested iffy statement accounting for the possibility that the toNodeData listed is the tail
//of the link list. The new nodes previous value becomes the old tail. The link list's tail.next and tail
//values are reassigned to the new Node. Numberofvalues on the link list incremented by 1.
      if(current === this.tail){
        node.previous = this.tail;
        this.tail.next = node;
        this.tail = node;
        this.numberOfValues++;
//else statement accounting for placement in spots on the link list that are anywhere else. Current.next.previous
//is a roundabout way of saying the new current value is equal to the new node being pushed in. The node's previous
//value is assigned to the old current and the node's next value is connected to the old current's next value.
//The old current's next value is reassigned to the node to complete the process of inserting the new node, and total
//numberOfValues is incremented by 1 to account for the new node being added.
      } else {
        current.next.previous = node;
        node.previous = current;
        node.next = current.next;
        current.next = node;
        this.numberOfValues++;
      }
    }
//current value incremented til it hits null and kicks us out of the while loop
    current = current.next;
  }
}

//method for inserting a new node before a specified node value(multiples can be added depending on how
//many values match)
DoublyLinkedList.prototype.insertBefore = function(data, beforeNodeData){
//sets a current variable equal to the tail of the linked list
  var current = this.tail;
  //while loop that continues until current is equal to null
  while(current) {
//iffy statement tripped if the current.data is equal to the beforededata being passed through
    if(current.data === beforeNodeData){
//new node created using data passed through and by calling the node constructor
      var node = new Node(data);
//outlier nested iffy statement accounting for the possibility that the beforeNodeData listed is the head
//of the link list. The new nodes previous value becomes the old head. The link list's head.next and head
//values are reassigned to the new Node. Numberofvalues on the link list incremented by 1.
      if(current === this.head){
        node.next = this.head;
        this.head.previous = node;
        this.head = node;
        this.numberOfValues++;
//else statement accounting for placement in spots on the link list that are anywhere else. Current.next.previous
//is a roundabout way of saying the new current value is equal to the new node being pushed in. The node's previous
//value is assigned to the old current and the node's next value is connected to the old current's next value.
//The old current's next value is reassigned to the node to complete the process of inserting the new node, and total
//numberOfValues is incremented by 1 to account for the new node being added.
      } else{
        current.previous.next = node;
        node.next = current;
        current.previous = node;
        this.numberOfValues++;
      }
    }
//current value incremented til it hits null and kicks us out of the while loop
    current = current.previous;
  }
}

//method that traverses the entire link list from front to back and runs a function on each
//respective node
DoublyLinkedList.prototype.traverse = function(fn){
//sets a variable equal to the head of the link list
  var current = this.head;
//while current exists(until it becomes null) run the following:
  while(current){
//iffy statement checking to see if a function exists. If a function does exists,
//then run that function on the current node
    if(fn) {
      fn(current);
    }
//increments current until it reaches null
    current = current.next;
  }
}

//method that traverses the entire link list from back to front and runs a function on each
//respective node
DoublyLinkedList.prototype.traverseReverse = function(fn){
//sets a variable equal to the tail of the link list
  var current = this.tail;
//while current exists(until it becomes null) run the following:
  while(current){
//iffy statement checking to see if a function exists. If a function does exists,
//then run that function on the current node
    if(fn) {
      fn(current);
    }
//increments current until it reaches null
    current = current.previous;
  }
}

//method that returns the total length of the linked list by returning the numberOfValues
//property
DoublyLinkedList.prototype.length = function() {
  return this.numberOfValues;
};

//method that console.logs the entire link list. Passes the link list through.
//variable for empty string created and variable current assigned to head.
DoublyLinkedList.prototype.print = function() {
  let list = [];
  var current = this.head;
//while loop that runs through the entire link list until current equals null
  while(current) {
//data from each link list node added to string and concatinated with a space
//current incremented within while loop til it equals null
    list.push(current.data);
    console.log(current.data);
    current = current.next;
  }
//console.log that returns the string back trimmed
return  list;
}

//finds the middle node in the link list. Passes the link list through. Two pointers are needed
//faster pointer moves twice as fast as slow pointer in the while loop. Once fast point equals null
//loop ends with slow pointer pointing to the correct node in the middle. Additional iffy comments in
//while loop account for outlier possibilities of smaller link lists
DoublyLinkedList.prototype.findMiddle = function(node){
  let slow = node.head;
  let fast = node.head;
  while(fast && fast.next && fast.next.next){
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow
}

//same logic as findMiddle but done in reverse starting at the tail
DoublyLinkedList.prototype.findMiddleReverse = function(node){
  let slow = node.tail;
  let fast = node.tail;
  while(fast && fast.previous && fast.previous.previous){
    slow = slow.previous;
    fast = fast.previous.previous;
  }
  return slow
}

//finds the nth node from last. N being the number of nodes from the tail
DoublyLinkedList.prototype.findnth = function(node, n){
//i is initially set to 0 and both slow and fast are set to the head value
  let i;
  let slow = node.head;
  let fast = node.head;
//for loop that kicks user out once index is greater than your nth value
//and the fast node value (this is there for a null outlier)
//n value is used to get the faster pointer the necessary slots ahead of
//the slow pointer to find the correct value
  for(i = 0; i < n && fast; i++){
    fast = fast.next;
  }
// if your index is stil less than your n value then by this point we know
//that your n value or the nth point in your list is greater than the list's
//total length, so null is the proper response
  if(i < n) return null;
//iterates through entire list til fast point reaches the end. Slow pointer
//should be the proper number of spaces behind the fast pointer so the value
//it returns should be what we're looking for
  while(fast) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow;
}
//same logic as findnth but done in reverse to find items n places from the head
//starts at the tail
DoublyLinkedList.prototype.findnthReverse = function(node, n){
  let i;
  let slow = node.tail;
  let fast = node.tail;
  for(i = 0; i < n && fast; i++){
    fast = fast.previous;
  }
  if(i < n) return null;
  while(fast) {
    fast = fast.previous;
    slow = slow.previous;
  }
  return slow;
}
