function Item(x,y,co,val,col,id){
    this.co = co;
    this.x = x;
    this.y = y;
    this.val = val;
    this.col = col;
    this.id = id;


    this.getX = function(){
        this.x= 50+(espace*id)-px;
        return this.x;
    }

    this.getY = function(){
        this.y = 60+(height-120)/2;
        this.co = height-160;
        return this.y-(this.val*this.co);    
    }

    this.display = function() {
        
        /// point souligné au survol
        noStroke();
        if (mouseX>this.x && mouseX<this.x+espace) {
            r=red(this.col);
            g=green(this.col);
            b=blue(this.col);
            tint(r,g,b, map(abs(this.x-(mouseX)), 0, espace, 255, 0));
            imageMode(CENTER);
            image(part, this.x, this.y-(this.val*this.co), 30, 30);
            noTint();
        }

        /// Point pour chaque valeur ///
        strokeWeight(1);
        stroke(this.col);
        fill(255);
        ellipse(this.x, this.y-(this.val*this.co), 3,3);


        /// Labels ///
        if (mouseX>this.x && mouseX<this.x+espace) {
            stroke(this.col);
            strokeWeight(1);
            fill(this.col);
            rectMode(CENTER);
            rect(this.x, this.y-(this.val*this.co)+22, 50, 16);
            fill(255);
            rect(this.x-2, this.y-(this.val*this.co)+20, 50, 16);
            rectMode(CORNER);
            fill(this.col);
            noStroke();
            textAlign(CENTER);
            textSize(11);
            textLeading(11);
            var valeur = this.val*100;
            text((round(valeur*100))/100 + "%", this.x, this.y-(this.val*this.co)+24);
        }
    }
}