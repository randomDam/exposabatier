function drawBar(){
    var y = 60+(height-120)/2;
    var marge=200;
    var largeur = (width-(2*marge))/3;
    var step;
    var valeur;
    var posY;
    var posDef; 

    if(height>600){
        var coef = -600;
    }else{
        var coef = -360;
    }
    if(width>750){
        var corps = 12 + round(width/110);
    }else{
        var corps = 12;
    }

    /// passage bar à line sans icône
    if (mouseY>y-6 && mouseY<y+6){
        iconeLineBoolean=true;
        if (mouseIsPressed==true){
            etat=2;
            zoomMoins=true;
        }
    }else{
        iconeLineBoolean=false;
    }
    ///

    for (var i=0; i<data.feed.entry.length; i++) {
        var x = 50+(espace*i);
        if ((mouseX>x) && (mouseX<=(x+espace))) {
            step = floor(map(mouseX, 50, 50+(espace*data.feed.entry.length),0,data.feed.entry.length));

            rectMode(CORNER);
            noStroke();

            /// val Fin ///
            fill(finance);
            rect(marge+largeur, y, largeur, tabFin[step]*(coef));
            textAlign(CENTER);
            textSize(corps);
            textLeading(22);
            fill(255);
            valeur = tabFin[step]*100;
            posDef = y+(tabFin[step]*(coef));
            if ((posDef>y-50) && (posDef<y+24)){
                posY=y+24;
            }else{
                posY=posDef;
            }
            text("Financial Corporations", marge+largeur+largeur/2, y-50,largeur,80);
            text((round(valeur*100))/100 + "%", marge+largeur+largeur/2, posY);

            /// val NonFin ///
            fill(ets);
            rect(marge, y, largeur, tabEts[step]*(coef));
            fill(255);
            valeur = tabEts[step]*100;
            posDef = y+(tabEts[step]*(coef));
            if ((posDef>y-50) && (posDef<y+24)){
                posY=y+24;
            }else{
                posY=posDef;
            }
            text("Non Financial Corporations", marge+largeur/2, y-50,largeur,80);
            text((round(valeur*100))/100 + "%", marge+largeur/2, posY);

            /// val Hou ///
            fill(menage);
            rect(marge+2*largeur, y, largeur, tabHou[step]*(coef));
            fill(255);
            valeur = tabHou[step]*100;
            posDef = y+(tabHou[step]*(coef));
            if ((posDef>y-50) && (posDef<y+24)){
                posY=y+24;
            }else{
                posY=posDef;
            }
            text("Households", marge+2*largeur+largeur/2, y-50,largeur,80);
            text((round(valeur*100))/100 + "%", marge+2*largeur+largeur/2, posY);

            /// val Tot ///
            fill(0,120);
            rect(50, y, width-100, tabTot[step]*(coef));
            fill(grisBleu);
            valeur = tabTot[step]*100;
            posDef = y+(tabTot[step]*(coef));
            if ((posDef>y-50) && (posDef<y+24)){
                posY=y+24;
            }else{
                posY=posDef;
            }
            textAlign(LEFT);
            text("EU Economy", 50, y-50,marge-50,80);
            text((round(valeur*100))/100 + "%", 50, posY);
        }
    }
}