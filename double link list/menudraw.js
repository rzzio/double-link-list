/// <reference path="./p5.global-mode.d.ts" />

var msg = "WELCOME";
var colour = undefined;
let input = [], button = [];

    var dll = new DoublyLinkedList();


    dll.add(2);
    dll.add(4);
    dll.add(5);
    dll.add(10);
    // console.log(dll);
     // dll.remove(5);
    dll.insertAfter(66,5);
    dll.insertAfter(30,2);
    // dll.insertBefore(1,2);
    // dll.insertBefore(7,2);
    // dll.insertBefore(34,2);
    // dll.insertBefore(23,2);

    console.log(dll.print());

    //console.log(dll);
    console.log(dll.findMiddle(dll));
    console.log(dll.findnth(dll, 2));

function setup() {
    let can = createCanvas(window.innerWidth - 15, window.innerHeight - 90);

    // //input section


    //
    //
    // //button section
    button[1] = createButton('ADD');
    button[1].position(40, 135);
    button[1].mousePressed(insert);
    button[1].attribute('class', 'button');

    input[1] = createInput();
    input[1].attribute('placeholder', 'num');
    input[1].position(button[1].x + button[1].width + 12, button[1].y)
    //
    //
    button[2] = createButton('Insert');
    button[2].position(button[1].x, button[1].y+button[1].height+4);
    button[2].mousePressed(insertAfter);
    button[2].attribute('class', 'button');


    input[2] = createInput();
    input[2].attribute('placeholder', 'This');
    input[2].position(button[2].x + button[2].width + 10, button[2].y);
    // input[2].attribute('class', 'input');

    inputafter = createInput();
    inputafter.attribute('placeholder', 'num');
    inputafter.position(input[2].x + 2*input[2].width, input[2].y);
    // inputafter.attribute('class', 'input');


    button[3] = createButton('Insert');
    button[3].position(button[2].x, button[2].y + button[2].height + 4);
    button[3].mousePressed(insertBefore);
    // button[3].attribute('class', 'button');


    input[3] = createInput();
    input[3].attribute('placeholder', 'This');
    input[3].position(input[2].x, input[2].y + input[2].height +4);

    inputbefore = createInput();
    inputbefore.attribute('placeholder', 'num');
    inputbefore.position(input[3].x + 2*input[3].width, input[3].y);
    // inputbefore.attribute('class', 'input');



    button[4] = createButton('SEARCH');
   button[4].position(button[1].x, input[3].y + input[3].height + 4);
   button[4].mousePressed(search);
   button[4].attribute('class', 'button');

    input[4] = createInput();
    input[4].attribute('placeholder', 'num');
    input[4].position(button[4].x+button[4].width+10,input[3].y + input[3].height + 4);


   button[5] = createButton('Remove');
   button[5].position(button[4].x, button[4].y + button[4].height + 4);
   button[5].mousePressed(removeNode);
   button[5].attribute('class', 'button');

   input[5] = createInput();
   input[5].attribute('placeholder', 'num');
   input[5].position(input[4].x,input[4].y + input[4].height + 4);

    noLoop();

}
var x;


function draw() {
    background(100, 210, 140);
    push();
    fill(255);
    textSize(20);
    text("Before",input[2].x+input[2].width+10,input[2].y);
    text("After",input[1].x+input[1].width+10,input[1].y)
    pop();
    stroke(10);
    var list=dll.print();
    drawList(list);
    colour=undefined;
}

function drawList(list){
    textSize(15);
    text("Head ->",520,100);
    var y=100;
    var x=600;
  for(let i=0;i<list.length;x+=80,i++){
    if(i===colour){
    fill(255,0,0,200);
  } else fill(255);
  if(x>=1400) {x=600;y+=35};
    rect(x-20,y-20,60,30);
    fill(0);
    textSize(20);

    text(list[i],x,y);

  }
  textSize(15);
  text("<-Tail",x-40,y);
}
function insert(){
  if(parseInt(input[1].value())){
  dll.add(parseInt(input[1].value()));
  redraw();
}
}

function insertAfter(){
  if(parseInt(inputafter.value())&&parseInt(input[2].value())){
  dll.insertAfter(parseInt(input[2].value()),parseInt(inputafter.value()));
  redraw();
}
}

function insertBefore(){
  if(parseInt(input[3].value())&&parseInt(inputbefore.value())){
  dll.insertBefore(parseInt(input[3].value()),parseInt(inputbefore.value()));
  redraw();
}
}

function search(){
  let list =dll.print();
  let val=parseInt(input[4].value());
  if(val){
  for(let i=0;i<list.length;i++){
    if(list[i]===val) colour =i;
  }
redraw();
}
}

function removeNode(){
  dll.remove(parseInt(input[5].value()));
  redraw();
}
