
var path = "https://spreadsheets.google.com/feeds/list/1ptO6gjAh1afJdeKs8H-XWo8Fvc8TraxZuW54hMvthd0/od6/public/values?alt=json";
//var path = "data.json";

var loupeMoins, loupeMoinsG;
var loupePlus, loupePlusG;
var ligneD, ligneG;
var bar, courbe;
var part, info; 
var flecheD, fleche;
var fleche1, fleche2, fleche3;
var zoomMoins=false;
var etat=0;

function preload() {
    loupeMoins = loadImage("loupeMoins.png");
    loupeMoinsG = loadImage("loupeMoinsG.png");
    loupePlus = loadImage("loupePlus.png");
    loupePlusG = loadImage("loupePlusG.png");
    bar = loadImage("bar.png");
    courbe = loadImage("courbe.png");
    ligneD = loadImage("ligneD2.png");
    ligneG = loadImage("ligneG2.png");
    part = loadImage("part.png");
    fleche = loadImage("fleche.png");
    flecheD = loadImage("flecheD.png");
    fleche1 = loadImage("fleche1.png");
    fleche2 = loadImage("fleche2.png");
    fleche3 = loadImage("fleche3.png");
    info = loadImage("i.png");
}

function setup() {
    createCanvas(windowWidth-5, windowHeight-5);
    fond = color(40, 45, 65);
    grisBleu = color(114, 129, 179);
    finance = color(197, 129, 0);
    ets = color(18, 124, 255);
    menage = color(46, 255, 209);
    totEco = color(174, 182, 209);
    colPos = color(0, 183, 108);
    colNeg = color(255, 0, 42);

    background(fond);
    frameRate(100);
    //textFont("Roboto");

    loadJSON(path,loaded);
}

var ligneEchelle;
var data;
var espace;
var reg = "2008Q4";
var id_reg=0;
var load=false;
var px=0;
var navigD;
var navigG;
var checkD = false;
var checkG = false;
var checkpx = false;
var affExpli = true;
var affCred = false;
var etatFinance = true;
var etatEts = false;
var etatMenage = false;
var etatTotEco = true;

var tabItemFin=[];
var tabItemEts=[];
var tabItemHou=[];
var tabItemTot=[];
var tabCom=[];
var tabFin=[];
var tabEts=[];
var tabHou=[];
var tabTot=[];

function loaded(_data){
    data=_data;
    espace = ligneEchelle / (data.feed.entry.length-1);
    createTab();
    load=true;
}

function createTab(){
    for (var i=0;i<data.feed.entry.length; i++){
        var x = 50+(espace*i);
        var y = 60+(height-120)/2;
        var co = height-160;
        var valueFin = parseFloat(data.feed.entry[i].gsx$fincorp.$t);
        var valueEts = parseFloat(data.feed.entry[i].gsx$nonfincorp.$t);
        var valueHou = parseFloat(data.feed.entry[i].gsx$households.$t);
        var valueTot = parseFloat(data.feed.entry[i].gsx$totecon.$t);
        var txt = data.feed.entry[i].gsx$comment.$t;

        tabItemFin.push(new Item(x,y,co,valueFin,finance,i));
        tabItemEts.push(new Item(x,y,co,valueEts,ets,i));
        tabItemHou.push(new Item(x,y,co,valueHou,menage,i));
        tabItemTot.push(new Item(x,y,co,valueTot,totEco,i));
        tabCom.push(txt);
        tabFin.push(valueFin);
        tabEts.push(valueEts);
        tabHou.push(valueHou);
        tabTot.push(valueTot);
    }
}

var posYwin = 300;
var posYLose = -300;
var posXCriz = -300;

function draw() {
    background(fond);
    //var espace = ligneEchelle / (data.feed.entry.length-1);
    var y = 60+(height-120)/2;
    var co = height-160;
    
    if(load==true){
        if(etat==0){
            var m = millis();
            var s = second();
            area();
            noStroke();
            textAlign(LEFT);
            textSize(48);
            textFont("Montserrat");
            textLeading(44);

            if (m>=500){
                fill(255);
                text("WELL,",50,150);
            }

            if (m>=700){
                fill(colPos);
                if(posYwin>0)
                    posYwin-=12;
                push();
                translate(0,posYwin);
                text("WHO WON",50,190);
                pop();
            }

            if (m>=1200){
                fill(255);
                text("AND",50,230);
            }

            if (m>=1300){
                fill(colNeg);
                if(posYLose<0)
                    posYLose+=12;
                push();
                translate(0,posYLose);
                text("WHO LOST",50,270);
                pop();
            }

            if (m>=1900){
                fill(255);
                text("AFTER",50,310);
            }

            if (m>=2100){
                fill(grisBleu);
                if(posXCriz<0)
                    posXCriz+=12;
                push();
                translate(posXCriz,0);
                text("THE CRISIS?",50,350);
                pop();
            }

            if (m>=2600){
                if(s%2){
                    fill(colPos);
                }else{
                    fill(colNeg);
                }
                rect(355,335,15,15);
            }
            if (m>=4000){
                fill(grisBleu);
                textSize(10);
                text("(CLICK TO ENTER)",53,365);
            }
        }

        if(etat==1){
            etat=2;
        }

        if(etat==2){

            for (var i=0; i<data.feed.entry.length; i++) {
                if (data.feed.entry[i].gsx$quarters.$t==reg) {  
                    id_reg = i;
                }
            }
            if (zoomMoins==true){
                ligneEchelle = width-100;
                espace = (ligneEchelle / (data.feed.entry.length-1));
                px=0;
                area();
                icone();
                // traceCom();
                boutonCourbe(co);
                comment();
                credit();
                expli();

            }else{
                ligneEchelle = width*2;
                espace = (ligneEchelle / (data.feed.entry.length-1));
                //px=id_reg*espace+50+espace/2-(width/2);

                if (checkD==true){
                    navigD=newNavigD;
                    if(newNavigD>width-50){
                        newNavigD=width-50;
                    }
                }else{
                    navigD = (width/2)+40;
                }
                if (checkG==true){
                    navigG=newNavigG;
                    if(newNavigG<50){
                        newNavigG=50;
                    }
                }else{
                    navigG = (width/2)-40;
                }

                if (checkpx==true){
                    px=newPX;
                }else{
                    px=id_reg*espace+50-(width/2);
                }

                area();
                icone();
                boutonCourbe(co);
                comment();
                navigDroite(width,height,navigD,y);
                navigGauche(width,height,navigG,y);
                credit();
                expli();

            }
        }

        if(etat==3){
            ligneEchelle = width-100;
            espace = (ligneEchelle / (data.feed.entry.length-1));
            px=0;
            area();
            icone();
            drawBar();
            credit();
            expli();
        }
    }
}

function windowResized(){
    resizeCanvas(windowWidth-5,windowHeight-5);
}


function trace(nomTabItem,coef,col) {
    /// trace courbe ///
    strokeWeight(6);
    noFill();
    this.y = 60+(height-120)/2;
    this.col = col;

    beginShape();
    for (var i=0; i<nomTabItem.length; i++) {
        stroke(col);
        vertex(nomTabItem[i].getX(),nomTabItem[i].getY());
    }
    endShape();


    for (var i=0; i<nomTabItem.length; i++) {
        nomTabItem[i].display();
    }
}

/*function trace2() {
    this.y = 90+(height-120)/2;
    for (var i=0; i<tabCom.length; i++) {
        tabCom[i].display();
    }
}*/

var press;


function mouseClicked() {
    /// Fin de l'intro ///
    if(etat==0){
        etat=1;
    }

    /// Passage Zoom - + ///
    if ((mouseX>width-50-30 && mouseX<width-50)&&(mouseY>26 && mouseY<56)){
        if (zoomMoins == true) {
            zoomMoins=false;
        } else {
            zoomMoins = true;
        }
    }

    /// Passage etat 2 à 3 ///
    if ((mouseX>width-50-30 && mouseX<width-50)&&(mouseY>51 && mouseY<74)){
        if (etat == 2) {
            etat=3;
        } 
    }

    /// Passage etat 3 à 2 ///
    if ((mouseX>width-50-30 && mouseX<width-50)&&(mouseY>26 && mouseY<49)){
        if (etat == 3) {
            etat=2;
        } 
    }

    /// (dés)activation bouton finance ///
    if ((mouseX > width-465) && (mouseX < width-240) && (mouseY > 23) && (mouseY < 47)) {
        if (etatFinance == true) {
            etatFinance = false;
        }else{
            etatFinance = true;
        }
    }

    /// (dés)activation bouton ets ///
    if ((mouseX > width-465) && (mouseX < width-240) && (mouseY > 47) && (mouseY < 71)) {
        if (etatEts == true) {
            etatEts = false;
        }else{
            etatEts = true;
        }
    }

    /// (dés)activation bouton Menage ///
    if ((mouseX > width-225) && (mouseX < width-90) && (mouseY > 23) && (mouseY < 47)) {
        if (etatMenage == true) {
            etatMenage = false;
        }else{
            etatMenage = true;
        }
    }

    /// (dés)activation bouton TotEco ///
    if ((mouseX > width-225) && (mouseX < width-90) && (mouseY > 47) && (mouseY < 71)) {
        if (etatTotEco == true) {
            etatTotEco = false;
        }else{
            etatTotEco = true;
        }
    }

    /// Désafficher/afficher Expli ///

    /*if (mouseX>48 && mouseX<74 && mouseY>82 && mouseY<109){
        if(affExpli==true){
            affExpli=false;
        }else{
            affExpli=true;
        }
    }*/
    if(etat>1){
        if(affExpli==true){
            affExpli=false;
        }else{
            if (mouseX>48 && mouseX<74 && mouseY>82 && mouseY<109){
                affExpli=true;
            }
        }
    }

    /// Afficher bloc crédits /// 
    if ((mouseX > 232) && (mouseX < 292) && (mouseY > height-32) && (mouseY < height-4)) {

        if (affCred==false){
            affCred=true;
        }else{
            affCred=false;
        }
    }

    /// Ouverture fenêtres avec flèches
    if ((mouseX>width-32)&&(mouseX<width-8)&&(mouseY>y-22)&&(mouseY<y)) {
        if(navigD>width-50){
            navigD=width-50;
        }
        if (checkD==false){
            checkD=true;
        }
        newNavigD=navigD+30;
    }
    if ((mouseX>width-32)&&(mouseX<width-8)&&(mouseY>y)&&(mouseY<y+22)) {
        if(navigD<width/2+40){
            navigD=width/2+40;
        }
        if (checkD==false){
            checkD=true;
        }
        newNavigD=navigD-30;
    }

    if ((mouseX>11)&&(mouseX<35)&&(mouseY>y)&&(mouseY<y+22)) {
        if(navigG>width/2-40){
            navigG=width/2-40;
        }
        if (checkG==false){
            checkG=true;
        }
        newNavigG=navigG+30;
    }
    if ((mouseX>11)&&(mouseX<35)&&(mouseY>y-22)&&(mouseY<y)) {
        if(navigG<50){
            navigG=50;
        }
        if (checkG==false){
            checkG=true;
        }
        newNavigG=navigG-30;
    }
}


function mouseDragged(){
    if(zoomMoins==false){


        /// déplacer l'échelle verticale et le cache ///
        if ((mouseX>=navigD)&&(mouseX<=width-50)) {
            if(navigD<width/2+40){
                navigD=width/2+40;
            }
            if (checkD==false){
                checkD=true;
            }
            newNavigD=navigD-(pmouseX-mouseX);

        } 
        if ((mouseX>=50)&&(mouseX<=navigG)) {
            if(navigG>width/2-40){
                navigG=width/2-40;
            }
            if (checkG==false){
                checkG=true;
            }
            newNavigG=navigG-(pmouseX-mouseX);
        }

        if ((mouseX<navigD)&&(mouseX>navigG)) { //&&(px<=ligneEchelle-width+150)&&(px>=-50)
            if(px>ligneEchelle-width+150){
                px=ligneEchelle-width+150;
            }
            if(px<-50){
                px=-50;
            }

            if (checkpx==false){
                checkpx=true;
            }
            newPX=px+(pmouseX-mouseX);
        }



        /// déplacer px ///
        /*   if ((mouseX<navigD)&&(mouseX>navigG)&&(px-150<ligneEchelle-width)) {
            if (checkpx==false){
                checkpx=true;
            }
            newPX=mouseX;
        }*/

        /// déplacer px ///
        /*    if ((mouseX>width-50)&&(px<ligneEchelle-width+150)) {
            if (checkpx==false){
                checkpx=true;
            }
            newPX=px+10;
        }

        if ((mouseX<50)&&(px>-50)) {
            if (checkpx==false){
                checkpx=true;
            }
            newPX=px-10;
        }*/
    }
}


/// bulle txt ///
function comment(){
    /// entre-filets timeline ///
    var posY = height-90;
    stroke(0);
    strokeWeight(1);
    line(50, posY-10, width-40, posY-10);
    line(50, posY+10, width-40, posY+10);
    noStroke();
    fill(0);
    textSize(12);
    textLeading(12);
    textAlign(LEFT);
    if (zoomMoins==true){
        text("HISTORICAL CONTEXT", 50, posY-15);
    }else{
        text("HISTORICAL CONTEXT", navigG+6, posY-15);
    }

    for(var i=0; i<data.feed.entry.length; i++){
        if(tabCom[i]!=""){
            var posYtxt = height-185;
            var posX = 50+(espace*i)-px;
            noStroke();
            fill(0);
            ellipse(posX, posY, 8,8);
            if ((mouseX>(posX-4))&& (mouseX<(posX+espace-4))&&(mouseY>posY-12)&&(mouseY<posY+12)){
                if(i>(80*data.feed.entry.length/100)){
                    push();
                    translate(-150,0);
                    fill(0,200);
                    rect(posX-8,posYtxt-55,164,120);
                    fill(255);
                    textSize(13);
                    textLeading(13);
                    textAlign(LEFT);
                    text(tabCom[i], posX, posYtxt-50, 150, 110);
                    pop();
                    stroke(0,100);
                    strokeWeight(3);
                    line(posX,posYtxt-55+120,posX,posY);

                }else{
                    fill(0,200);
                    rect(posX-8,posYtxt-55,164,120);
                    fill(255);
                    textSize(13);
                    textLeading(13);
                    textAlign(LEFT);
                    text(tabCom[i], posX, posYtxt-50, 150, 110);
                    stroke(0,100);
                    strokeWeight(3);
                    line(posX,posYtxt-55+120,posX,posY);
                }
            }
        }
    }
}

function expli(){
    if(affExpli==false){
        if (mouseX>48 && mouseX<74 && mouseY>82 && mouseY<109){
            noTint();
            imageMode(CORNER);
            image(info,50,85);
        }else{
            tint(114, 129, 179);
            imageMode(CORNER);
            image(info,50,85);
        }

    }else{
        fill(0,170);
        rect(0,0,width,height);

        /// flèche+texte 3 ///
        noTint();
        imageMode(CORNER);
        noStroke();
        image(fleche3,width-58-fleche3.width, 86);
        fill(255);
        textSize(15);
        textAlign(RIGHT);
        textLeading(16);
        text("Switch from a mode of data display to another.", width-58-fleche3.width-10, 86+fleche3.height-10, 200, 300);
        
        /// expli générale
        textAlign(LEFT);
        text("The infographics show how much more (or less) profit did the economic actors make with respect to 2008?",78, 78, 200, 300);

        image(bar,width-50-30, 52);
        image(info,50,82);

        if(etat==2){      
            for (var j=100; j<height-70; j+=6) {
                fill(255);

                ellipse(50+(espace*id_reg)-px, j, 2, 2);
            }

            textAlign(LEFT);
            textSize(15);
            fill(finance);
            text("Financial Corporations", width-470+20, 32+12);
            noFill();
            stroke(finance);
            strokeWeight(2);
            rect(width-470, 32, 12, 12);
            noStroke();
            fill(ets);
            text("Non-Financial Corporations", width-470+20, 56+12);
            noFill();
            stroke(ets);
            strokeWeight(2);
            rect(width-470, 56, 12, 12);
            noStroke();
            fill(menage);
            text("Households", width-230+20, 32+12);
            noFill();
            stroke(menage);
            strokeWeight(2);
            rect(width-230, 32, 12, 12);
            noStroke();
            fill(totEco);
            text("EU Economy", width-230+20, 56+12);
            rect(width-230, 56, 12, 12);

            image(loupeMoins,width-50-30, 26);

            /// flèche+texte 1 ///
            image(fleche1,round(50+(espace*id_reg)-px-6-fleche1.width), round(y+6));
            textSize(15);
            textLeading(16);
            textAlign(RIGHT);
            fill(255);
            noStroke();
            text("Data are based on the institutional sector operating surplus in the fourth quarter of 2008. Open the window to see the gains and losses relative to the climax of the crisis.", 50+(espace*id_reg)-px-10-fleche1.width-6, y+10, 200, 300);

            /// flèche+texte 2 ///
            image(fleche2,width-470, 86);
            textAlign(LEFT);
            text("Compare institutional sector to identify the winners and losers.", width-470+fleche2.width+10, 86+fleche2.height-10, 200, 300);

        }
        if(etat==3){
            y = 60+(height-120)/2;
            image(courbe,width-50-30, 26);

            /// flèche+texte 1 ///
            stroke(255);
            line(50,y,50+ligneEchelle,y);
            noStroke();
            image(fleche1,round(width-fleche1.width-58), round(y+6));
            textSize(15);
            textLeading(16);
            textAlign(RIGHT);
            fill(255);
            noStroke();
            text("Data are based on the institutional sector operating surplus in the fourth quarter of 2008.", width-58-fleche3.width-10, y+50, 200, 300);

        }
    }
}


function credit(){
    noStroke();
    textSize(13);
    textAlign(LEFT);

    if(affCred==true){
        fill(255);
        text("Credits",240,height-15);
        stroke(255);
        line(240,height-11,288,height-11);

        noStroke();
        fill(0,150);
        rect(width-142,height-150,140,150);
        fill(grisBleu);
        textSize(13);
        textLeading(13);
        textAlign(LEFT);
        text("Source:\nECB Statistical\nData Warehouse\n\nElaboration:\nStefano Battiston\n& Marco D'Errico\n\nDesign:\nFabrice Sabatier", width-132, height-144, 124, 140);

    }else{
        fill(grisBleu);
        text("Credits",240,height-15);
        stroke(grisBleu);
        line(240,height-11,288,height-11);
    }

}