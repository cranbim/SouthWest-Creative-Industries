function Path(id,x,y,d,s,sno,design,stops,stopIDs,stopLabels, label){
  var verts=[];
  var dir=d;
  var px=x;
  var py=y;
  var type="ahead";
  var sn=sno;
  var currentA=0;//dir*PI/2;
  var cpos={x:0,y:0};
  var blob=new Blob(0.005,random(0.01,0.08),random(10));
  var cHue=id*360/6;
  var cx,cy,ca;
  var contentIndex=-1;
  var nextStopIndex=-1;
  var nextStop=null;
  var isStopped=false;
  
  this.getEnd=function(){
    return {x: px, y:py}
  }
  
  this.getStatus=function(){
    return {
      isStopped: isStopped,
      stopIndex: nextStopIndex,
      contentIndex: contentIndex,
      pathLabel: label,
      stopLabel: stopLabels[nextStopIndex],
      cHue: cHue
    };
  };
  
  this.reset=function(){
    contentIndex=-1;
    nextStopIndex=-1;
    nextStop=null;
    isStopped=false;
    blob.reset();
  };

  this.click=function(){
    if(isStopped){
      nextStopIndex++;
      if(nextStopIndex>=stops.length){
        blob.reset();
        nextStopIndex=-1;
        return false;
      }
      nextStop=stops[nextStopIndex];
      contentIndex=stopIDs[nextStopIndex];
      console.log(contentIndex);
    }
    return true;
  };

  var addVerts={
    A: function(sn){
      var x,y;
      for(var i=0; i<sn; i++){
        x=cos(dir*PI/2)*i*s/sn;
        y=sin(dir*PI/2)*i*s/sn;
        verts.push({
          x:px+x,
          y:py+y,
          a:dir*PI/2
        });
        // console.log("A",verts[verts.length-1]);
      }
      px+=x;
      py+=y;
      dir=dir;
    },
    L: function(sn){
      var x,y;
      var newDir=(dir+1)%4;
      for(var i=0; i<sn; i++){
        x=cos(newDir*PI/2)*s+cos(newDir*HALF_PI-PI+(i*HALF_PI/sn))*s;
        y=sin(newDir*PI/2)*s+sin(newDir*HALF_PI-PI+(i*HALF_PI/sn))*s;
        verts.push({
          x:px+x,
          y:py+y,
          a:(newDir+1)%4*HALF_PI-PI+(i*HALF_PI/sn)
        });
        // console.log("L",verts[verts.length-1]);
      }
      px+=x;
      py+=y;
      dir=newDir;
    },
    R: function(sn){
      var x,y;
      var newDir=(dir-1+4)%4;
      for(var i=0; i<sn; i++){
        x=cos(newDir*PI/2)*s+cos(newDir*HALF_PI+PI-(i*HALF_PI/sn))*s;
        y=sin(newDir*PI/2)*s+sin(newDir*HALF_PI+PI-(i*HALF_PI/sn))*s;
        verts.push({
          x:px+x,
          y:py+y,
          a:(newDir-1)%4*HALF_PI+PI-(i*HALF_PI/sn)
        });
        // console.log("R",verts[verts.length-1]);
      }
      px+=x;
      py+=y;
      dir=newDir;
    }
  };
  
  buildVerts(design);

  function buildVerts(design){
    var count=design.length*sno;
    var typeIndex=0;
    while(typeIndex<design.length){
      type=design[typeIndex++];//random(choices);
      addVerts[type](sn);
      console.log(type);
      sn=sno*1;//random(0.8,1.25);
    }
    verts.forEach(function(v,i){
      if(i>0){
        // pv=verts[i-1];
        // a=atan2(v.y-pv.y, v.x-pv.x);
        // v.a=a;
        // d=dist(v.x, v.y, pv.x, pv.y);
        v.d=d;
      }
    });
    verts[0].a=verts[1].a;
    verts[0].d=0;
    // console.log(px,py,px/width,py/width);
    cx=x+(px-x)/2;
    cy=y+(py-y)/2;
    ca=atan2(py-y,px-x);
  }
  
  this.getLen=function(){
    return verts.length;
  }
  
  this.run=function(){
    if(nextStopIndex<0){
      nextStopIndex++;
      nextStop=stops[nextStopIndex];
      contentIndex=stopIDs[nextStopIndex];
      console.log(contentIndex);
    }
    
    isStopped=blob.run(nextStop);
    return {
      x: cpos.x,
      y: cpos.y,
      a: currentA
    };
  };
  
  this.isStopped=function(){
    return isStopped;
  };
  
  this.getStop=function(){
    return nextStop;
  };
  
  this.show=function(po,offset,rad){
    push();
    translate(po.x,po.y);
    rotate(-offset.a-PI/2);
    translate(-offset.x, -offset.y);
    beginShape();
    verts.forEach(function(v){
      vertex(v.x, v.y);
      // push();
      // stroke(0,0,100);
      // strokeWeight(1);
      // translate(v.x,v.y);
      // rotate(v.a);
      // line(0,0,0,50);
      // pop();
    });
    stroke(cHue,40,40,1);
    strokeWeight(rad*2);
    noFill();
    endShape();
    push();
    translate(cx,cy);
    rotate(ca);
    fill(cHue,60,70,0.4);
    strokeWeight(rad*0.25);
    noStroke();
    textSize(rad*5);
    textAlign(CENTER, CENTER);
    text(label,0,0);
    pop();
    
    pop();
  };
  
  
  
  this.showStops=function(po,offset,rad,isCurrentPath){
    push();
    translate(po.x, po.y);
    rotate(-offset.a-PI/2);
    
    translate(-offset.x, -offset.y);
    fill(0,100,100);
    ellipse(0,0,rad*4);
    var path=this;
    stops.forEach(function(stop,i){
      var thisStop=nextStopIndex==i && isStopped;
      var sverts=path.getVerts(stop);
      var p=sverts[1];
      var a=atan2(sverts[1].y-sverts[0].y, sverts[1].x-sverts[0].x);
      push();
      translate(p.x, p.y);
      noStroke();
      fill(cHue,isCurrentPath?60:0,60,1);
      ellipse(0,0,rad*4);
      rotate(a);
      translate(0,-rad*8);
      rotate(PI/2);
      push();
      rectMode(CENTER);
      fill(isCurrentPath?cHue:0,isCurrentPath?(thisStop?80:30):0,isCurrentPath?70:40);
      if(nextStopIndex==i && isStopped){
        stroke(0,0,100);
        strokeWeight(rad*0.3);
      } else {
        noStroke();
      }
      rect(0,0,rad*15,rad*3,rad*2);
      noStroke();
      fill(0,0,isCurrentPath?(thisStop?100:0):30);
      // textFont("RobotoSlab");//:wght@700
      textFont("Bitter");
      textSize(rad*2.5);
      var tw=textWidth(stopLabels[i]);
      if(tw>rad*13){
        scale(rad*13/tw,1);
      }
      textAlign(CENTER, CENTER);
      text(stopLabels[i],0,0);
      pop();
      pop();
    });
    pop();
  };
  
  this.getVerts=function(stop){
    return getVerts(stop);
  }
  
  function getVerts(stop){
    var sv=constrain(floor(stop*verts.length)+1,0,verts.length);
    var svert=verts[sv];
    var ev=constrain(sv-1,0,verts.length);
    var evert=verts[ev];
    return([evert,svert]);
  }
  

  this.showBlob=function(po,offset,rad){//pos,end,rad,cHue
    var pos=constrain(blob.pos,0,0.99);
    var end=blob.end;
    var cHue=blob.cHue;
    push();
    translate(po.x, po.y);
    rotate(-offset.a-PI/2);
    translate(-offset.x, -offset.y);
    // stroke(cHue,70,70,1);
    
    var sv=floor(pos*verts.length);
    var svert=verts[sv];
    // var sv2=constrain(sv-2,0,verts.length);
    // var svert2=verts[sv2];
    var ev=floor(end*verts.length);
    var evert=verts[ev];
    cpos.x=svert.x;
    cpos.y=svert.y;
    // currentA=atan2(svert2.y-svert.y,svert2.x-svert.x);
    currentA=svert.a;
    noFill();
    stroke(0,0,100,0.5);
    strokeWeight(rad*3.5);
    beginShape();
    for(var i=ev; i<sv; i++){
      vertex(verts[i].x, verts[i].y);
    }
    endShape();
    stroke(0,0,100);
    noFill();
    strokeWeight(rad*2);
    beginShape();
    for(var i=ev; i<sv; i++){
      vertex(verts[i].x, verts[i].y);
    }
    endShape();
    pop();
  }
  
  this.getA=function(){
    return currentA;
  };
  
  this.showSin=function(aInc,thick){
    var a=0;
    var len=0;
    push();
    beginShape();
    verts.forEach(function(v,i){
      var sinVert=sin(len*aInc)*thick/2;
      vertex(v.x+cos(v.a-PI/2)*sinVert, v.y+sin(v.a-PI/2)*sinVert);
      len+=v.d;
    });
    stroke(255,0,0);
    noFill();
    endShape();
    pop();
  }
  
  
}

function Blob(speed,len,cHue){
  this.pos=0;
  this.end=0;
  this.cHue=cHue%360;//random(360);

  this.reset=function(){
    this.pos=0;
  }

  this.run=function(stop){
    if(this.pos<stop){
      this.pos=(this.pos+speed)%1;
      this.end=(this.pos-len+1)%1;
      return false;
    }
    return true;
  }
}