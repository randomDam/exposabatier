/*
    HEY! ENJOY THE SOURCE CODE ^^
    this code are maked by Damien BaÃ¯s and Fabrice Sabatier
    www.corp-lab.com

    for the student of workShop Namur 25/02/2015
*/


//var path ="https://spreadsheets.google.com/feeds/list/16qldFx6yxGvMIfmYuFew6JqR48yCMnJOl6sD1dI5trY/od6/public/values?alt=json";
var path="localData/bugs.json";

//bugs
//var path ="https://spreadsheets.google.com/feeds/list/1spwTlLzHcpu4PljrroYvMfoL0EH3F1XiR94B_5VHl-A/od6/public/values?alt=json";


//>> COLOR OF TRANSMITION
//// color ////
var airborne;
var bites;
var fecal;
var food;
var fluids;
var sexual;
var surfaces;

//>> Sctockage des images
var virus_im;
var bacterium_im;
var parasite_im
var legende_im;

//>> LIMITE DE MICROBE
var limiteMicrobe=120;

//>> Stockage des datas json
var data;
var load=false;

//>> TABLEAU DE MICROBE ET TABLEAU DE FOOD
var tabMic=[];
var tabFood=[];

//font 
var font;

//>> fonction de preload
function preload(){
    virus_im = loadImage("localData/virusB.png");
    bacterium_im = loadImage("localData/bacterieB.png");
    parasite_im = loadImage("localData/parasiteB.png");
    legende_im = loadImage("localData/legende4.png");
}

//-----------------------------------------------------------------
// INITIALISAITON
//-----------------------------------------------------------------
function setup() {
    createCanvas(windowWidth-4, windowHeight-5);
    background(20);
    frameRate(100);

    // LOAD DES DATAS JSON
    loadJSON(path,loaded);

    // FOOD PAR DEFAUT
    for(var i=0;i<20;i++)tabFood.push(new Food());


    //>> COLOR OF TRANSMITION
    //// color ////
    airborne = color(82,187,255);
    bites = color(158,0,57);
    fecal = color(96,57,19);
    food = color(0,116,107);
    fluids = color(243,108,79);
    sexual = color(240,110,170);
    surfaces = color(57,181,74);


}


//-----------------------------------------------------------------
// LOAD DATA
//-----------------------------------------------------------------
function loaded(_data){
    data=_data;

    for(var i=1;i<data.feed.entry.length;i++){
        var mic= new Microbe();
        mic.type = data.feed.entry[i].gsx$pathogentype.$t;
        mic.name = data.feed.entry[i].gsx$_cn6ca.$t;
        mic.col = color(parseInt(random(255)),parseInt(random(255)),parseInt(random(255)));
        mic.repro = parseFloat(data.feed.entry[i].gsx$averagebasicreproductiverate.$t);
        mic.power=parseFloat(data.feed.entry[i].gsx$casefatalityrate.$t);

        mic.trans = data.feed.entry[i].gsx$primarymodeoftransmission.$t;

        if(mic.trans=="airborne droplet"){
            mic.col=airborne;
        }
        if(mic.trans=="bites"){
            mic.col=bites;
        }
        if(mic.trans=="fecal-oral"){
            mic.col=fecal;
        }
        if(mic.trans=="food"){
            mic.col=food;
        }
        if(mic.trans=="body fluids"){
            mic.col=fluids;
        }
        if(mic.trans=="sexual contact"){
            mic.col=sexual;
        }
        if(mic.trans=="surfaces"){
            mic.col=surfaces;
        }

        //console.log(i+" : "+mic.power);
        tabMic.push(mic);
    }
    load=true; // CHARGEMENT OK!
}


//---------------------------------------------------
//  FONCTION DRAW
//---------------------------------------------------    
function draw(){
    background(10,10,25);

    //----------------------------------------------
    //  DRAW FOOD
    for(var i=0;i<tabFood.length;i++){
        tabFood[i].draw();
        if(tabFood[i].rate<0){
            tabFood.splice(i,1);
        }
    }

    //----------------------------------------------
    //  DRAW MICROBE
    for(var i=0;i<tabMic.length;i++){
        tabMic[i].draw(tabMic,tabFood);
        if(tabMic[i].life<0){
            tabMic.splice(i,1);
        }
    }

    //----------------------------------------------
    //  DRAW CONSOLE
    noStroke(); 
    fill(255);
    textFont("Arial",12,50);
    text("Microbes : "+tabMic.length.toString(),30,height-20);
    
    //----------------------------------------------
    //  DRAW LEGENDE
    
    imageMode(CORNER);
    noTint();
    image(legende_im,10,height-legende_im.height-25);
}

//---------------------------------------------------
//  VARIABLE GLOBAL MICROBE
//---------------------------------------------------
var friction = 1.01;

//---------------------------------------------------
//  CLASS MICROBE
//---------------------------------------------------
function Microbe(){
    //type > bacterium / virus / parasite
    this.type="na";

    // VECTEUR POSITION ET VITESSE
    this.p=createVector(random(width),random(height));
    this.v = createVector(0,0);

    // DATA MICROBE
    this.taille=9;
    this.life=1000;

    //DATA DE GOOGLESHEET
    this.name="na";
    this.power=1;
    this.procrea=0;
    this.trans;

    // VARIABLE DE VIE DE FONCTION
    this.mange=false;
    this.tEvent=0;
    this.tEventMax=random(40,100);
    this.col;

    //---------------------------------------------------
    //  FONCTION DRAW
    //---------------------------------------------------
    this.draw = function(tabM,tabF){

        this.link(tabM,tabF);
        this.reproduction();
        this.affichageMicrobe();
        this.info();
        this.physic();
        this.legend();

    } 

    //---------------------------------------------------
    //  FONCTION LINK
    //---------------------------------------------------
    this.link = function(tabM,tabF){
        strokeWeight(0.2);
                
        //----------------------------------------------
        // LINK FOR FOOD
        
        for(var i=0;i<tabF.length;i++){
            if(this.p.dist(tabF[i].p)<50){
                this.mange=true;
                tabF[i].rate--;
                stroke(0,255,0);
                this.v.div(friction);
                line(this.p.x,this.p.y,tabF[i].p.x,tabF[i].p.y);
                this.procrea+=this.repro;
            }else{
                this.mange=false;
            }
        }

        //----------------------------------------------
        // ATTACK AND LOOKING FOR FOOD
        
        for(var i=0;i<tabM.length;i++){
            if(this!=tabM[i]){
                
                //LOOKING
                if(this.p.dist(tabM[i].p)<50){
                    stroke(255);
                    strokeWeight(0.2);
                    line(this.p.x,this.p.y,tabM[i].p.x,tabM[i].p.y);
                    
                }
                
                //ATTACK !
                if(this.p.dist(tabM[i].p)<40){
                    stroke(255,0,0,50);
                    strokeWeight(3);
                    tabM[i].life-=this.power/10;
                    line(this.p.x,this.p.y,tabM[i].p.x,tabM[i].p.y);
                }
            }
        }
    }



    //---------------------------------------------------
    //  FONCTION AFFICHAHE MICROBE
    //---------------------------------------------------
    this.affichageMicrobe = function(){
        imageMode(CENTER);
        tint(this.col);
        if(this.type=="bacterium"){
            image(bacterium_im,this.p.x,this.p.y);
        }   
        if(this.type=="virus"){
            image(virus_im,this.p.x,this.p.y);
        }
        if(this.type=="parasite"){
            image(parasite_im,this.p.x,this.p.y);
        }
    }


    //---------------------------------------------------
    //  FONCTION REPRODUCTION
    //---------------------------------------------------
    this.reproduction = function(){
        if(this.procrea>1000){
            var mic= new Microbe();
            mic.p.x=this.p.x;
            mic.p.y=this.p.y;
            mic.type=this.type;
            mic.name=this.name;
            mic.col=this.col;
            mic.repro=this.repro;
            mic.power=this.power;
            var force=6;
            mic.v = createVector(random(-force,force),random(-force,force));

            if(tabMic.length<limiteMicrobe)tabMic.push(mic);
            this.procrea=0;
        }
    }

    //---------------------------------------------------
    //  FONCTION INFO BARRE DE VIE DE REPRO
    //---------------------------------------------------
    this.info = function(){
        rectMode(CORNER);
        noStroke();
        fill(200,0,0);
        rect(this.p.x,this.p.y-15,map(this.life,0,1000,0,30),2);

        fill(0,200,0);
        rect(this.p.x,this.p.y-17,map(this.procrea,0,1000,0,30),2);
    }

    //---------------------------------------------------
    //  FONCTION INFO BARRE DE VIE DE REPRO
    //---------------------------------------------------
    this.physic = function(){
        this.p.add(this.v);
        this.v.div(friction);

        if(this.p.x<0 || this.p.x>width)this.v.x*=-1;
        if(this.p.y<0 || this.p.y>height)this.v.y*=-1;
        
        var extraLimit=30;
        if(this.p.x<-extraLimit)this.p.x=1;
        if(this.p.x>width+extraLimit)this.p.x=width-1;
        
        if(this.mange==false)if(this.tEvent>this.tEventMax){
            this.v.x = random(-3,3);
            this.v.y = random(-3,3);
            this.tEventMax = random(200,300);
            this.tEvent=0;
        }
        this.tEvent++;
    }
    //---------------------------------------------------
    //  FONCTION INFO BARRE DE VIE DE REPRO
    //---------------------------------------------------
    this.legend = function(){
        if(this.p.dist(createVector(mouseX,mouseY))<50){
            stroke(255);
            strokeWeight(1);
            line(mouseX+3,mouseY,this.p.x,this.p.y);
            
            var textMax = textWidth("Name : "+this.name+"  ")+6;
            noStroke();
            fill(200);
            rect(mouseX,mouseY-12,textMax,40);
            
            fill(0);
            noStroke();
            text("Name : "+this.name,mouseX+3,mouseY);
            text("Mortalite : "+this.power+"%",mouseX+3,mouseY+12);
            text("Fecondite : "+this.repro,mouseX+3,mouseY+12*2);
            
        }
    }
    //////////////////////////////////////////////////////
}
//---------------------------------------------------
//---------------------------------------------------    




//---------------------------------------------------
//  FONCTION RESIZE
//---------------------------------------------------    
function windowResized() {
    resizeCanvas(windowWidth-4, windowHeight-5);
}


//---------------------------------------------------
//  CLASS FOOD
//---------------------------------------------------    
function Food(){
    this.rate=random(100,300);
    this.p = createVector(random(width),random(height));

    this.draw = function(){
        noStroke();
        fill(20,150,20,50);
        ellipse(this.p.x,this.p.y,this.rate/10,this.rate/10);
    }
}

//---------------------------------------------------
//  MOUSE CLICK EVENT
//---------------------------------------------------
function mouseClicked(){
    var f=new Food();
    f.p.x=mouseX;
    f.p.y=mouseY;
    tabFood.push(f);
}
