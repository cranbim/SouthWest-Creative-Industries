function UISkin(x,y,r){
  buttons=[];
  
  // buttons.push(new Button(x-width*0.1,y+r,width*0.03,width*0.03,"next",uiNext));
  buttons.push(new Button(x-width*0,y+r,width*0.1,width*0.03,"next",uiNext));
  buttons.push(new Button(x+width*0,y+r+width*0.04,width*0.1,width*0.03,"restart",uiRestart));
  
  this.run=function(){
    buttons.forEach(function(b){
      b.show();
    });
  };
  
  this.clicked=function(){
    action=null;
    buttons.forEach(function(b){
      if(b.clicked(true)){
        action=b.action;
      }
    });
    return action;
  };
  
  
  
  
  function Button(x,y,w,h,label,action){
    var isOver=false;
    var isClicked=false;
    this.action=action;
    
    this.isOver=function(){
      isOver=mouseX>x-w/2 && mouseX<x+w/2 && mouseY>y-h/2 && mouseY<y+h/2;
    };
    
    this.clicked=function(click){
      isClicked=click && isOver;
      return isClicked;
      // if(isClicked){
      //   action();
      // }
    }
    
    this.show=function(){
      this.isOver();
      stroke(0,0,100);
      strokeWeight(h*0.1);
      if(isOver){
        fill(0,0,100);
        if(isClicked){
          fill(0,0,100);
        }
      } else {
        fill(0,0,40);
      }
      rectMode(CENTER);
      rect(x,y,w,h,h/2);
      fill(0,0,isOver?50:100);
      noStroke();
      textSize(h*0.7);
      textAlign(CENTER,CENTER);
      text(label,x,y);
    }
  }
}