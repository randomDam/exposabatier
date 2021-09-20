function area(){
    /// echelle ///
    var y = 60+(height-120)/2;
    stroke(255);
    line(50-px,y,50+ligneEchelle-px,y); // ligne 0

    var an=0;
    var init;
    var newYear;

    for(var i=0; i<data.feed.entry.length; i++){
        var quarter = data.feed.entry[0].gsx$quarters.$t;
        init = quarter.substring(0,quarter.length-2);
        var last = quarter.substring(5,6);

        if (last==1){
            init=parseInt(init);
        }else{
            init=parseInt(init)+1;
        }

        if(last==1){
            newYear=0;
        }
        if(last==2){
            newYear=3;
        }
        if(last==3){
            newYear=2;
        }
        if(last==4){
            newYear=1;
        }

        var x = 50+(espace*i)-px;

        if ((i % 4) == newYear) {
            ellipseMode(CENTER);
            if (mouseX>x && (mouseX<=x+espace)) {    
                fill(0,100);
                ellipse(50+(espace*i)-px, height-65, 20, 20);
                textAlign(CENTER);
                fill(grisBleu);
                textSize(12);
                text(String("Q1"), 50+(espace*i)-px, height-37);



            }
            noStroke();
            fill(grisBleu);
            textAlign(CENTER);
            textSize(12);
            textLeading(12);
            text(String(init+an), 50+(espace*i)-px, height-50);

            an++;

            if (mouseX>x && (mouseX<=x+espace)) {  
                if (etat==3){
                    image(calendar,50,116);
                    fill(grisBleu);
                    textAlign(CENTER);
                    textSize(20);
                    text(String(init-1+an), 50+(calendar.width)/2, 164);
                    textSize(14);
                    textLeading(14);
                    text(String("First\nquarter"), 50+(calendar.width)/2, 180);

                    /*fill(255);
                    textAlign(LEFT);
                    textSize(20 + round(width/110));
                    text(String(init-1+an), 50, 140);
                    textSize(7 + round(width/110));
                    text(String("First quarter"), 50, 160);*/
                }
            }

            fill(grisBleu);
            ellipse(50+(espace*i)-px, height-65, 4, 4);
        } else {
            noStroke();
            if (mouseX>x && (mouseX<=x+espace)) {    
                fill(0,100);
                ellipse(50+(espace*i)-px, height-65, 16, 16);
            }
            fill(grisBleu);
            ellipse(50+(espace*i)-px, height-65, 2, 2);
        }

        if ((i % 4) == newYear+1) {
            if (mouseX>x && (mouseX<=x+espace)) {  
                stroke(grisBleu);
                line(50+(espace*i)-px,height-65,50+(espace*i)-px,height-48);
                noStroke();
                textAlign(CENTER);
                fill(grisBleu);
                textSize(12);
                text(String("Q2"), 50+(espace*i)-px, height-37);

                if (etat==3){
                    image(calendar,50,116);
                    fill(grisBleu);
                    textAlign(CENTER);
                    textSize(20);
                    text(String(init-1+an), 50+(calendar.width)/2, 164);
                    textSize(14);
                    textLeading(14);
                    text(String("Second\nquarter"), 50+(calendar.width)/2, 180);

                    /*fill(255);
                    textAlign(LEFT);
                    textSize(20 + round(width/110));
                    text(String(init-1+an), 50, 140);
                    textSize(7 + round(width/110));
                    text(String("Second quarter"), 50, 160);*/
                }
            }
        }
        if ((i % 4) == newYear+2) {
            if (mouseX>x && (mouseX<=x+espace)) {  
                stroke(grisBleu);
                line(50+(espace*i)-px,height-65,50+(espace*i)-px,height-48);
                noStroke();
                textAlign(CENTER);
                fill(grisBleu);
                textSize(12);
                text(String("Q3"), 50+(espace*i)-px, height-37);

                if (etat==3){
                    image(calendar,50,116);
                    fill(grisBleu);
                    textAlign(CENTER);
                    textSize(20);
                    text(String(init-1+an), 50+(calendar.width)/2, 164);
                    textSize(14);
                    textLeading(14);
                    text(String("Third\nquarter"), 50+(calendar.width)/2, 180);

                    /*fill(255);
                    textAlign(LEFT);
                    textSize(20 + round(width/110));
                    text(String(init-1+an), 50, 140);
                    textSize(7 + round(width/110));
                    text(String("Third quarter"), 50, 160);*/
                }
            }
        }
        if ((i % 4) == newYear-1) {
            if (mouseX>x && (mouseX<=x+espace)) {  
                stroke(grisBleu);
                line(50+(espace*i)-px,height-65,50+(espace*i)-px,height-48);
                noStroke();
                textAlign(CENTER);
                fill(grisBleu);
                textSize(12);
                text(String("Q4"), 50+(espace*i)-px, height-37);

                if (etat==3){
                    image(calendar,50,116);
                    fill(grisBleu);
                    textAlign(CENTER);
                    textSize(20);
                    text(String(init-1+an), 50+(calendar.width)/2, 164);
                    textSize(14);
                    textLeading(14);
                    text(String("Fourth\nquarter"), 50+(calendar.width)/2, 180);

                    /*fill(255);
                    textAlign(LEFT);
                    textSize(20 + round(width/110));
                    text(String(init-1+an), 50, 140);
                    textSize(7 + round(width/110));
                    text(String("Fourth quarter"), 50, 160);*/
                }
            }
        }
        /*      
        if(((etat==2) && (zoomMoins==true)) || (etat==3)){
            if (mouseX>x && (mouseX<=x+espace)) {    
                noFill();
                stroke(grisBleu);
                arc(x+espace/2,height-65,espace,espace,PI,2*PI,OPEN);
            }
        }*/
    }

    /// entre-filets ///
    stroke(grisBleu);
    strokeWeight(1);
    line(50, 20, width-50, 20);
    line(50, 79, width-50, 79);

    noStroke();
    fill(grisBleu);
    textSize(14);
    textLeading(15);
    textAlign(LEFT);
    text("RELATIVE CHANGE IN OPERATING SURPLUS BY \nINSTITUTIONAL SECTOR (Euro area aggregate) \nRelative to the fourth quarter of 2008", 50, 39);

    /// 2008Q4 ///
    if(etat==2){
        for (var i=0; i<data.feed.entry.length; i++) {
            if (i==id_reg) {        
                for (var j=100; j<height-70; j+=6) {
                    ellipse(50+(espace*i)-px, j, 1, 1);
                }
            }
        }
    }
}

function icone(){

    if (etat==2){
        ///boutons loupe///
        if (zoomMoins==false){
            noTint();
            if ((mouseX>width-50-30 && mouseX<width-50)&&(mouseY>26 && mouseY<49)){
                image(loupeMoins,width-50-30, 26);
            }else{
                image(loupeMoinsG,width-50-30, 26);
            }
        }
        if (zoomMoins==true){
            noTint();
            if ((mouseX>width-50-30 && mouseX<width-50)&&(mouseY>26 && mouseY<49)){
                image(loupePlus,width-50-30, 26);
            }else{
                image(loupePlusG,width-50-30, 26);
            }
        }
        ///bouton bar///
        if ((mouseX>width-50-30 && mouseX<width-50)&&(mouseY>51 && mouseY<74)){
            noTint();
            imageMode(CORNER);
            image(bar,width-50-30, 52);
        }else{
            if (iconeBarBoolean==false){
                tint(114, 129, 179);
                imageMode(CORNER);
                image(bar,width-50-30, 52);
                noTint();
            }else{
                noTint();
                imageMode(CORNER);
                image(bar,width-50-30, 52);
            }
        }
    }

    if (etat==3){
        ///bouton courbe///
        if ((mouseX>width-50-30 && mouseX<width-50)&&(mouseY>26 && mouseY<49)){
            image(courbe,width-50-30, 26);
        }else{
            if (iconeLineBoolean==false){
                tint(114, 129, 179);
                image(courbe,width-50-30, 26);
            }else{
                image(courbe,width-50-30, 26);
            }
        }

        ///bouton bar///
        if ((mouseX>width-50-30 && mouseX<width-50)&&(mouseY>51 && mouseY<74)){
            imageMode(CORNER);
            image(bar,width-50-30, 52);
        }else{
            imageMode(CORNER);
            tint(114, 129, 179);
            image(bar,width-50-30, 52);
        }
    }
}