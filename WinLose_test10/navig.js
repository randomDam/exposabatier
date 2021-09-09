function navigDroite(largEcran,hautEcran,navigD,y){
    /// lumière bleu sous échelle verticale ///
    if ((mouseX>=navigD)&&(mouseY>110)&&(mouseY<hautEcran-50)){
        tint(43, 183, 255);
        imageMode(CORNER);
        image(ligneD,navigD-14,110,28,hautEcran-110-50);
        noTint();
    }

    noStroke();
    fill(fond);
    rect(navigD, 90,width, hautEcran-90-34);

    var co=hautEcran-160;

    /// hachures ///
    for (var i=-19; i<17; i++) {
        strokeCap(SQUARE);
        strokeWeight(0.018*co);
        stroke(0,50);
        line (navigD, y-(i*0.03*co), width, y-(i*0.03*co));
        strokeCap(ROUND);
    }
    ///
    noStroke();
    
    if ((mouseX>=navigD)&&(mouseY>110)&&(mouseY<hautEcran-50)) {
        //   imageMode(CORNER);
        //    noTint();
        //   image(flecheD,navigD+60, y-10);
        if(width-navigD>400){
            var al=map(navigD,width/2+40,width-400,255,0);
            fill(255,al);
            textAlign(LEFT);
            textSize(34);
            textLeading(32);
            text("AND AFTER?",navigD+60,100,300,600);
            textSize(14);
            text("Drag right or use the arrows",navigD+60,height-55);
        }
    }else{
        // imageMode(CORNER);
        //   tint(114, 129, 179);
        //   image(flecheD,navigD+60, y-10);
        if(width-navigD>400){
            var al=map(navigD,width/2+40,width-400,255,0);
            fill(grisBleu,al);
            textAlign(LEFT);
            textSize(34);
            textLeading(32);
            text("AND AFTER?",navigD+60,100,300,600);
            textSize(14);
            text("Drag right or use the arrows",navigD+60,height-55);
        }
    }

    stroke(grisBleu);
    strokeWeight(1);
    line(navigD, 110, navigD, hautEcran-50);


    for (var i=0; i<5; i++) {
        strokeWeight(1);
        stroke(grisBleu);
        line (navigD, y-(i*0.1*co), navigD+8, y-(i*0.1*co));
        if (i<4) {
            for (var j=0; j<5; j++) {
                line (navigD, y-(i*0.1*co)-(j*0.02*co), navigD+4, y-(i*0.1*co)-(j*0.02*co));
            }
        }
        noStroke();
        fill(grisBleu);
        textSize(12);
        textLeading(12);
        textAlign(LEFT);
        text(10*i + "%", navigD+12, y-(i*0.1*co));
    }
    for (var i=0; i<5; i++) {
        strokeWeight(1);
        stroke(grisBleu);
        line (navigD, y+(i*0.1*co), navigD+8, y+(i*0.1*co));
        noStroke();
        fill(grisBleu);
        text(-10*i + "%", navigD+12, y+(i*0.1*co));
        if (i<4) {
            for (var j=0; j<5; j++) {
                strokeWeight(1);
                stroke(grisBleu);
                line (navigD, y+(i*0.1*co)+(j*0.02*co), navigD+4, y+(i*0.1*co)+(j*0.02*co));
            }
        }
    }
    /// fleche ouverture/fermeture ///
    /// Droite ///
    if ((mouseX>width-32)&&(mouseX<width-8)&&(mouseY>y-22)&&(mouseY<y)) {
        imageMode(CORNER);
        noTint();
        image(flecheD,width-30, y-25);
    }else{
        imageMode(CORNER);
        tint(114, 129, 179);
        image(flecheD,width-30, y-25);
    }
    if ((mouseX>width-32)&&(mouseX<width-8)&&(mouseY>y)&&(mouseY<y+22)) {
        imageMode(CORNER);
        noTint();
        image(fleche,width-30, y);
    }else{
        imageMode(CORNER);
        tint(114, 129, 179);
        image(fleche,width-30, y);
    }
}


function navigGauche(largEcran,hautEcran,navigG,y){
    if ((mouseX<=navigG)&&(mouseY>110)&&(mouseY<hautEcran-50)){
        imageMode(CORNER);
        tint(43, 183, 255);
        image(ligneG,navigG-14,110,28,hautEcran-110-50);

    }

    noStroke();
    fill(fond);
    rect(0, 90, navigG, hautEcran-90-34);
    
    var co=hautEcran-160;
    /// hachures ///
    for (var i=-19; i<17; i++) {
        strokeCap(SQUARE);
        strokeWeight(0.018*co);
        stroke(0,50);
        line (0, y-(i*0.03*co), navigG, y-(i*0.03*co));
        strokeCap(ROUND);
    }
    ///
    noStroke();
    
    imageMode(CORNER);
    if ((mouseX<=navigG)&&(mouseY>110)&&(mouseY<hautEcran-50)){
        // imageMode(CORNER);
        //    noTint();
        //  image(fleche,navigG-80, y-10);
        if(navigG>400){
            var al=map(navigG,width/2-40,400,255,0);
            fill(255,al);
            textAlign(RIGHT);
            textSize(34);
            textLeading(32);
            text("DO YOU KNOW HOW THINGS WERE GOING BEFORE THE FOURTH QUARTER OF 2008?",navigG-50,100,300,600);
            textSize(14);
            text("Drag left or use the arrows",navigG-60,height-55);
        }
    }else{
        //  imageMode(CORNER);
        //tint(114, 129, 179);
        //    image(fleche,navigG-80, y-10);
        if(navigG>400){
            var al=map(navigG,width/2-40,400,255,0);
            fill(grisBleu,al);
            textAlign(RIGHT);
            textSize(34);
            textLeading(32);
            text("DO YOU KNOW HOW THINGS WERE GOING BEFORE THE FOURTH QUARTER OF 2008?",navigG-50,100,300,600);
            textSize(14);
            text("Drag left or use the arrows",navigG-60,height-55);
        }
    }

    stroke(grisBleu);
    strokeWeight(1);
    line(navigG, 110, navigG, hautEcran-50);
    //var co=hautEcran-160;

    for (var i=0; i<5; i++) {
        strokeWeight(1);
        stroke(grisBleu);
        line (navigG-8, y-(i*0.1*co), navigG, y-(i*0.1*co));
        if (i<4) {
            for (var j=0; j<5; j++) {
                line (navigG-4, y-(i*0.1*co)-(j*0.02*co), navigG, y-(i*0.1*co)-(j*0.02*co));
            }
        }
        noStroke();
        fill(grisBleu);
        textSize(12);
        textLeading(12);
        textAlign(RIGHT);
        text(10*i + "%", navigG-12, y-(i*0.1*co));
    }
    for (var i=0; i<5; i++) {
        strokeWeight(1);
        stroke(grisBleu);
        line (navigG-8, y+(i*0.1*co), navigG, y+(i*0.1*co));
        noStroke();
        fill(grisBleu);
        text(-10*i + "%", navigG-12, y+(i*0.1*co));
        if (i<4) {
            for (var j=0; j<5; j++) {
                strokeWeight(1);
                stroke(grisBleu);
                line (navigG-4, y+(i*0.1*co)+(j*0.02*co), navigG, y+(i*0.1*co)+(j*0.02*co));
            }
        }
    }
    /// fleche ouverture/fermeture ///
    /// Gauche ///
    if ((mouseX>11)&&(mouseX<35)&&(mouseY>y)&&(mouseY<y+22)) {
        imageMode(CORNER);
        noTint();
        image(flecheD,13, y);
    }else{
        imageMode(CORNER);
        tint(114, 129, 179);
        image(flecheD,13, y);
    }
    if ((mouseX>11)&&(mouseX<35)&&(mouseY>y-22)&&(mouseY<y)) {
        imageMode(CORNER);
        noTint();
        image(fleche,13, y-25);
    }else{
        imageMode(CORNER);
        tint(114, 129, 179);
        image(fleche,13, y-25);
    }
}