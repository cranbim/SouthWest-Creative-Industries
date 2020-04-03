function Container(id,x,y,r,contents){
  var currentContent=-1;
  var outR=r;
  var inR=r*0.8;
  var navR=r*0.9;
  var navBD=r*0.16;
  var dispD=r*0.78*2;
  var dispW=dispD*0.5;
  var dispH=dispD*0.8;
  var Statements=[];
  var a=0;
  var currentStatement=-1;

  var aStep=PI/10;
  var n=contents.length;
  var aStart=+PI/2+aStep*(n-1)/2;
  for(var i=0; i<n; i++){
    var statement=new Statement(0,0,a,x,y,dispW, dispH, 0, dispD,contents[i].t, contents[i].i, contents[i].r);
    var bx=x+cos(aStart-i*aStep)*navR;
    var by=y+sin(aStart-i*aStep)*navR;
    statement.assignButton(i,bx,by,navBD,200,120,240);
    Statements.push(statement);
  }
  
  this.click=function(){
    Statements.forEach(function(statement,i){
      if(statement.click()){
        currentStatement=i;
      }
      // console.log(currentStatement,i,statement.click());
      
    });
  };
  
  this.reset=function(){
    currentStatement=-1;
  };
  
  
  this.run=function(){
    if(currentStatement<0){
      currentStatement++;
    }
  };
  
  this.show=function(pathLabel, stopLabel, cHue){//isStopped,currentContainer
    push();
    translate(x,y);
    fill(0,0,30);
    noStroke();
    ellipse(0,0,outR*2);
    // fill(cHue,70,60);
    // // ellipse(0,0,inR*2);
    // textFont("Bitter");
    // textSize(outR*0.2);
    // textAlign(CENTER, CENTER);
    // text(pathLabel+": "+stopLabel,0,-outR*1.2);
    
    // var aStep=PI/10;
    // var aStart=-PI/2-aStep*(n-1)/2;
    for(var i=0; i<n; i++){
      // var bx=cos(aStart+i*aStep)*navR;
      // var by=sin(aStart+i*aStep)*navR;
      // ellipse(bx,by,navBD);
    }
    fill(0,0,60);
    ellipse(0,0,dispD);
    pop();
    Statements.forEach(function(statement){
      statement.show(cHue);
      statement.run(currentStatement);//,isStopped
    });
  }
}



function Statement(ox,oy,oa,x,y,w,h,a,s,contents,img,ref){
  var absX=ox+cos(oa)*x+cos(oa+PI/2)*y;
  var absY=oy+sin(oa)*x+sin(oa+PI/2)*y;
  // var w=s*0.5;
  // var h=s*0.8;
  var sn=0.1*s;
  var grow=1.05;
  var words=contents.split(';');
  var tw=[];
  var ts=[];
  var ws=[];
  var hAcc=0;
  var hover=false;
  var growing=false;
  var shrinking=false;
  var hBase=0;
  var hRange=60;
  var sBase=50;
  var sRange=30;
  var hCol=[];
  var sCol=[];
  var button;
  var id=-1;
  var fade=0;
  
  textFont("Anton");
  for(var i=0; i<words.length; i++){
    textWidth(20);
    var ttw=textWidth(words[i]);
    var tts=20*(w*0.8)/ttw;
    tw[i]=ttw;
    ts[i]=tts;
    hCol[i]=hBase+random(hRange);
    sCol[i]=sBase+random(sRange);
    hAcc+=tts;
  }
  // for(var i=0; i<words.length; i++){
  //   ts[i]=ts[i]*h/hAcc;
  // }
  for(var i=0; i<words.length; i++){
    ts[i]=ts[i]*h/hAcc;
    textSize(ts[i]);
    tw[i]=textWidth(words[i]);
    ws[i]=w/tw[i];
  }
  // console.log(ws);
  
  this.assignButton=function(idg,x,y,d,hn, hh, ha){
    button=new Button(idg,x,y,d,hn, hh, ha);
    id=idg;
  }
  
  
  
  this.show=function(nHBase){
    // var ref="[test]";
    // textFont("Anton");
    push();
    translate(x,y);
    rotate(a);
    fill(nHBase,sBase,50,fade);
    noStroke();
    ellipse(0,0,sn);
    
    if(!img){
      fill(0,0,100,fade);
      rectMode(CENTER);
      rect(0,0,sn*0.55,sn*0.85,s*0.03);
      textAlign(CENTER, CENTER);
      if(sn>s*0.1){
        push();
        textFont("Anton");
    
        scale(sn/s);
        translate(0,-h/2);
        for(var i=0; i<words.length; i++){
          fill(nHBase+hCol[i],sCol[i],60,fade*0.7);
          translate(0,ts[i]*0.6);
          push();
          scale(ws[i],1.1);
          textSize(ts[i]);
          text(words[i],0,0);
          pop();
          translate(0,ts[i]*0.4);
        }
        pop();
        translate(s*0,s*0.475);
        scale(sn/s);
        fill(0,0,100);
        noStroke();
        textFont("Bitter");
        textAlign(CENTER, CENTER);
        textSize(sn*0.05);
        text(ref,0,0);
      }
    } else {
      if(sn>s*0.1){
        push();
        imageMode(CENTER);
        // tint(255,fade);
        image(img,0,0,sn*0.7,sn*0.7);
        translate(s*0,s*0.475);
        scale(sn/s);
        fill(0,0,100);
        noStroke();
        textFont("Bitter");
        textAlign(CENTER, CENTER);
        textSize(sn*0.05);
        text(ref,0,0);
        pop();
      }
    }
    pop();
    button.show();
  };
  
  this.run=function(current,isStopped){
    fade=(sn-0.1*s)/(s*0.8);
    // hover=dist(mouseX,mouseY,absX,absY)<sn/2;
    
    if(current==id){
      growing=true;
      shrinking=false;
    } else {
      growing=false;
      shrinking=true;
    }
    button.run(current);
    if(growing){
      if(sn<s){
        sn*=grow;
      }
    }
    if(shrinking){
      if(sn>0.1*s){
        sn/=grow;
      }
    }
  };
  
  this.showAbs=function(){
    fill(255,0,0);
    ellipse(absX,absY,20);
  }
  
  this.open=function(){
    if(true){//sn<0.2*s
      growing=true;
      shrinking=false;
    }
  };
  
  this.close=function(){
    if(true){//sn>0.9*s
      growing=false;
      shrinking=true;
    }
  };
  
  this.click=function(){
    // if(button.click()){
    //   if(sn<0.2*s){
    //     growing=true;
    //     shrinking=false;
    //   }
    //   if(sn>0.9*s){
    //     growing=false;
    //     shrinking=true;
    //   }
    // }
    return button.click();
  };
  

  function Button(id,x,y,d,hn,hh,ha){
    var active=false;
    var hover=false;
    
    this.run=function(current){
      active=current==id;
      hover=dist(mouseX, mouseY, x,y)<d/2;
    }
    
    this.click=function(){
      return hover;
    }
    
    this.show=function(){
      fill(hn,0,40);
      noStroke(0);
      if(active){
        stroke(0,0,100);
        strokeWeight(d*0.1);
        fill(ha,0,50);
      }if(hover){
        fill(0,0,100);
        noStroke();
      }
      
      ellipse(x,y,d);
      fill(0,0,100);
      noStroke();
      textSize(d*0.5);
      textAlign(CENTER,CENTER);
      text(id+1,x,y);
    }
  }
}

