var choices=["A","A","L", "R"];
var paths=[];
var numPaths=3;
var blobsPerPath=1;
var blobs=[];
var numBlobs;
var currentPath=0;
// var stops=[0.5,0.75,0.99];
// var nextStopIndex=-1;
// var nextStop=null;
// var isStopped=false;
var nextStopID=0;


  
var containers=[];
var nextContainerID=0;
var currentContainer=0;
// var contents=[];
// =[
//     {t:"BIG;growth;2017 over 2016",i:null},
//     {t:"your life;will;never;be;the same;again",i:null},
//     {t:"there are no;good;reasons;to go;outside",i:null},
//     {t:"", i:images[0]}
//   ];
  
var offset={x:0, y:0, a:0};
var fadeMask;
var ui;
var images=[];
var thick=1;
var thickness=0.005;
var pathOrigin={x:100,y:100};

function preload(){
  images.push(loadImage("assets/un1.png"));
  images.push(loadImage("assets/un2.png"));
  images.push(loadImage("assets/un3.png"));
  images.push(loadImage("assets/DCMS1.png"));
  images.push(loadImage("assets/rocketmakers1.png"));
  images.push(loadImage("assets/rocketmakers2.png"));
}

function setup() {
  buildContents();
  numPaths=pathDesigns.length;
  numBlobs=pathDesigns.length;
  var cnv=createCanvas(windowWidth, windowHeight);
  var myDiv=select('#canvas');
  var refDiv=select('#refs');
  refDiv.hide();
  cnv.parent(myDiv);
  pathOrigin={x:width*0.3, y:height*0.5};
  colorMode(HSB);
  thick=width*thickness;
  var stepSize=width/30;
  var pathStart={x:0,y:0};
  for(var i=0; i<numPaths; i++){
    var stopIDs=[];
    stopIDs=pathDesigns[i].stops.map(function(s,i){
      return nextStopID++;
    });
    console.log(stopIDs);
    // var path=new Path(i,pathDesigns[i].x*width, pathDesigns[i].y*width,pathDesigns[i].dir,stepSize,16,pathDesigns[i].design,pathDesigns[i].stops, stopIDs, pathDesigns[i].stopLabels,pathDesigns[i].label);
    var path=new Path(i,pathStart.x, pathStart.y ,pathDesigns[i].dir,stepSize,16,pathDesigns[i].design,pathDesigns[i].stops, stopIDs, pathDesigns[i].stopLabels,pathDesigns[i].label);
    pathStart=path.getEnd();
    var len=path.getLen();
    paths.push(path);
    blobs.push(new Blob(0.01*len/100,0.02*len/100,340));
  }
  // for(var i=0; i<numBlobs; i++){
  //   blobs.push(new Blob(0.003,0.01,340));
  // }
  fadeMask=new FadeMask(width*2, height*2,width*0.15);
  ui=new UISkin(width/2, height/2,height*0.25);
  containerContents.forEach(function(cc){
    containers.push(new Container(nextContainerID++,width*0.7,height*0.5,width*0.15,cc));
  });
  refDiv.show();
  // container=new Container(nextContainerID++,width*0.7,height*0.5,width*0.15,contents);
}

function buildContents(){
  containerContents.forEach(function(cc){
    cc.forEach(function(ccline){
      if(ccline.i!==null){
        ccline.i=images[ccline.i];
      }
      if(ccline.r){
        ccline.r=sources[ccline.r];
      } else {
        ccline.r="";
      }
    });
  });
  // console.log(containerContents);
  // contents=[
  //   {t:"BIG;growth;2017 over 2016",i:null},
  //   {t:"your life;will;never;be;the same;again",i:null},
  //   {t:"there are no;good;reasons;to go;outside",i:null},
  //   {t:"", i:images[0]}
  // ];
}

function mousePressed(){
  // paths.forEach(function(path){
  //   path.click();
  // });
  // paths[currentPath].click();
  var action=ui.clicked();
  if(action!==null){
    action();
  }
  containers[currentContainer].click();
}

function uiNext(){
  console.log("Next");
  if(!paths[currentPath].click()){
    currentPath=(currentPath+1)%paths.length;
  }
}

function uiRestart(){
  console.log("Restart");
  reset();
}

function reset(){
  paths.forEach(function(path){
    path.reset();
  });
  containers.forEach(function(container){
    container.reset();
  });
  currentPath=0;
  nextStopID=0;
  nextContainerID=0;
  currentContainer=0;
}

function uiBack(){
  console.log("Back");
}

function draw() {
  background(0,0,30);
  
  push();
  for(var i=paths.length-1; i>=0; i--){
    // paths[i].run();
    // console.log(offset);
    paths[i].showStops(pathOrigin,offset,thick,currentPath==i);
    paths[i].show(pathOrigin,offset,thick);
    paths[i].showBlob(pathOrigin,offset,thick);
  }
  
  offset=paths[currentPath].run();
  var status=paths[currentPath].getStatus();
  // console.log(status);
  // paths[currentPath].showStops();
  // paths[currentPath].show(10);
  // paths[currentPath].showBlob(10);
  pop();
  
  push();
  imageMode(CENTER);
  translate(pathOrigin.x, pathOrigin.y);
  // for(var i=0; i<5; i++){
    image(fadeMask.get(),0,0);
  //   scale(1.1);
  // }
  pop();
  ui.run();
  fill(0,0,30);
  noStroke();
  ellipse(width*0.7,height*0.5,width*0.15*2);
  if(status.isStopped){
    currentContainer=status.contentIndex;
    containers[currentContainer].run();
    containers[currentContainer].show(status.pathLabel,status.stopLabel, status.cHue);
    push();
    translate(width/2,height*0.25);
    fill(status.cHue,80,80);
    stroke(0,0,50);
    strokeWeight(width*0.002)
    // ellipse(0,0,inR*2);
    textFont("Bitter");
    textSize(width*0.025);
    textAlign(CENTER, CENTER);
    text(status.pathLabel+":",0,0);
    translate(0,width*0.03);
    textSize(width*0.03);
    text(status.stopLabel,0,0);
    pop();
  }
  // containers[status.nextStopIndex].show();//paths[currentPath].isStopped(), paths[currentPath].getStop()
  fill(0,0,80);
  noStroke();
  textFont("Bitter");
  textSize(width*0.05);
  textAlign(CENTER);
  text("SouthWest Creative Industries in 2020",width*0.5,height*0.15);
  translate(width*0.05,height*0.9);
  textSize(width*0.01);
  textAlign(LEFT,CENTER);
  text("By Dave Webb for Bath Spa University 2020",0,0);
  textSize(width*0.02);
  text("Scroll down for references",0,height*0.03);
}



function FadeMask(w,h,r){
  var buf=createGraphics(w,h);
  var n=60;
  var aStep=TWO_PI/n;
  buf.beginShape();
  buf.vertex(0,0);
  buf.vertex(w,0);
  buf.vertex(w,h);
  buf.vertex(0,h);
  buf.beginContour();
  for(var i=0; i<n; i++){
    buf.vertex(w/2+cos(TWO_PI-i*aStep)*r, h/2+sin(TWO_PI-i*aStep)*r);
  }
  buf.endContour();
  buf.fill(20,150);//0,20
  buf.noStroke(0);
  buf.endShape(CLOSE);
  var img=buf.get();
  
  this.get=function(){
    return img;
  }
}