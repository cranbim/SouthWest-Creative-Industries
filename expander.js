var nextExpID=0;

function Expander(id,x,y,w,h,s,n,isHorizontalExp){
  var expanded=false;
  var expanding=false;
  var collapsing=false;
  var expansion=0;
  var expand=0.025;
  var hover=false;
  var children=[];
  for(var i=0; i<n; i++){
    children.push(new Expander(nextExpID++,x,y+(i+1)*h/4,w,h,s,0,true));
  }
  console.log(x,y);
  
  this.show=function(offa, offx, offy){
    push();
    translate(x,y);
    rotate(offa);
    translate(offx,offy);
    fill(0,100,100);
    noStroke();
    rectMode(CORNER);
    if(isHorizontalExp){
      rect(-s/2,-s/2,expansion*(w)+s,s,s/2);
    } else {
      rect(-s/2,-s/2,s,expansion*(h)+s,s/2);
    }
    fill(120,50,50);
    if(expanded){
      fill(30,70,70);
    }
    noStroke();
    if(hover){
      stroke(200,70,70);
      strokeWeight(10);
    }
    ellipse(0,0,s);
    pop();
  };
  
  this.run=function(offa,offx,offy){
    // console.log(expanded,expanding, collapsing, expansion);
    hover=dist(mouseX, mouseY,x,y)<s/2;
    if(collapsing){
      if(expansion>0){
        expansion-=expand;
      } else {
        expanded=false;
        collapsing=false;
      }
    }
    if(expanding){
      if(expansion<1){
        expansion+=expand;
      } else {
        expanded=true;
        expanding=false;
      }
    }
    if(expanded){
      children.forEach(function(child){
        child.show(offa, offx, offy);
        child.run();
      });
    }
  };
  
  this.click=function(){
    console.log("click");
    if(expanded){
      children.forEach(function(child){
        child.click();
      });
    }
    if(true){
      console.log(id+" clicked");
      if(!expanding && !collapsing){
        if(expanded){
          collapsing=true;
          expanded=false;
        } else {
          expanding=true;
        }
      }
      
      return true;
    }
  };
}