function boutonON(nomTabItem, col,label,origineRectX,origineRectY){
    fill(col);
    textAlign(LEFT);
    textSize(15);
    textLeading(15);
    noStroke();
    text(label, origineRectX+20, origineRectY+12);

    if ((mouseX > origineRectX-5) && (mouseX < origineRectX+220) && (mouseY > origineRectY-9) && (mouseY < origineRectY+15)) {
        stroke(255);
        strokeWeight(2);
        rect(origineRectX, origineRectY, 12, 12);

        //
        noStroke();
        fill(col, 140);
        beginShape();
        for (var i=0; i<nomTabItem.length; i++) {
            vertex(nomTabItem[i].getX(),nomTabItem[i].getY());
        }
        vertex(nomTabItem[nomTabItem.length-1].getX(), this.y);
        vertex(nomTabItem[0].getX(), this.y);
        endShape(CLOSE);

    } else {
        noStroke();
        rect(origineRectX, origineRectY, 12, 12);
    }
}

function boutonOFF(col,label,origineRectX,origineRectY){
    fill(col);
    textAlign(LEFT);
    textSize(15);
    textLeading(15);
    noStroke();
    text(label, origineRectX+20, origineRectY+12);

    if ((mouseX > origineRectX-5) && (mouseX < origineRectX+220) && (mouseY > origineRectY-9) && (mouseY < origineRectY+15)) {
        stroke(col);
        strokeWeight(2);
        fill(col,100);
        rect(origineRectX, origineRectY, 11, 11);
    }else{
        stroke(col);
        strokeWeight(2);
        noFill();
        rect(origineRectX, origineRectY, 11, 11);
    }
}

function boutonCourbe(co){
    /// bouton Finance ///
    if (etatFinance == true) {
        boutonON(tabItemFin,finance, "Financial Corporations", width-470, 32);
        trace(tabItemFin,co,finance);
    } else {
        boutonOFF(finance, "Financial Corporations", width-470, 32);
    }

    /// bouton Ets ///
    if (etatEts == true) {
        boutonON(tabItemEts,ets, "Non-Financial Corporations", width-470, 56);
        trace(tabItemEts,co,ets);
    } else {
        boutonOFF(ets, "Non-Financial Corporations", width-470, 56);
    }

    /// bouton Menage ///
    if (etatMenage == true) {
        boutonON(tabItemHou,menage, "Households", width-230, 32);
        trace(tabItemHou,co,menage);
    } else {
        boutonOFF(menage, "Households", width-230, 32);
    }

    /// bouton TotEco ///
    if (etatTotEco == true) {
        boutonON(tabItemTot,totEco, "EU Economy", width-230, 56);
        trace(tabItemTot,co,totEco);
    } else {
        boutonOFF(totEco, "EU Economy", width-230, 56);
    }

    
    
    /// 1er plan au survol ///
    if (etatFinance == true) {
            for (var i=0; i<tabItemFin.length; i++) {
            if(((mouseX>(tabItemFin[i].getX()-5)) && (mouseX<(tabItemFin[i].getX()+5)) && (mouseY>(tabItemFin[i].getY()-5)) && (mouseY<(tabItemFin[i].getY()+5)))||((mouseX > 100) && (mouseX < 120) && (mouseY > 100) && (mouseY < 120))){
                //(mouseX > width-465) && (mouseX < width-240) && (mouseY > 23) && (mouseY < 47)
                trace(tabItemFin,co,finance);
            }
        }
    }
    
    if (etatEts == true) {
            for (var i=0; i<tabItemEts.length; i++) {
            if((mouseX>(tabItemEts[i].getX()-5)) && (mouseX<(tabItemEts[i].getX()+5)) && (mouseY>(tabItemEts[i].getY()-5)) && (mouseY<(tabItemEts[i].getY()+5))){
                trace(tabItemEts,co,ets);
            }
        }
    }
    
    if (etatMenage == true) {
            for (var i=0; i<tabItemHou.length; i++) {
            if((mouseX>(tabItemHou[i].getX()-5)) && (mouseX<(tabItemHou[i].getX()+5)) && (mouseY>(tabItemHou[i].getY()-5)) && (mouseY<(tabItemHou[i].getY()+5))){
                trace(tabItemHou,co,menage);
            }
        }
    }
    
    if (etatTotEco == true) {
            for (var i=0; i<tabItemTot.length; i++) {
            if((mouseX>(tabItemTot[i].getX()-5)) && (mouseX<(tabItemTot[i].getX()+5)) && (mouseY>(tabItemTot[i].getY()-5)) && (mouseY<(tabItemTot[i].getY()+5))){
                trace(tabItemTot,co,totEco);
            }
        }
    }
}