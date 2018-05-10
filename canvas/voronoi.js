// Helper Functions
// HF#1 Like in PARI/GP: return random number 0..max-1
function randgp(max) {return Math.floor(Math.random()*max)}
function randInRange(min,max) {return Math.floor(Math.random()*(max-min)) + min}
// HF#2 Random hex color returned as "#RRGGBB"
function randhclr() {
    return "#"+
    ("00"+randgp(256).toString(16)).slice(-2)+
    ("00"+randgp(256).toString(16)).slice(-2)+
    ("00"+randgp(256).toString(16)).slice(-2)
}
// HF#3 Return the value of a metric: Euclidean, Manhattan or Minkovski
function Metric(x,y,mt) {
    if(mt==1) {return Math.sqrt(x*x + y*y)}
    if(mt==2) {return Math.abs(x) + Math.abs(y)}
    if(mt==3) {return(Math.pow(Math.pow(Math.abs(x),3) + Math.pow(Math.abs(y),3),0.33333))}
}

function plotVoronoli(ctx,w,h,X,Y,mt){
    var n = X.length;
    var x=y=d=dm=j=0, w1=w-2, h1=h-2;

    var C = new Array(n);
    for(var i=0; i<n; i++) {
        C[i]=randhclr();
    }

    var polygons = [];
    mt = mt || 2;
    for(y=0; y<h1; y++) {
        for(x=0; x<w1; x++) {
            
            dm=Metric(h1,w1,mt); j=-1;
            for(var i=0; i<n; i++) {
                d=Metric(X[i]-x,Y[i]-y,mt)
                if(d<dm) {
                    dm=d; 
                    j=i;
                }
            }//fend i
            ctx.fillStyle=C[j]; ctx.fillRect(x,y,1,1);
            if(!polygons[j]){
                polygons[j] = {
                    X : [],
                    Y : []
                }
            }else{
                polygons[j].X.push(x);
                polygons[j].Y.push(y);
            }
        }//fend x
    }//fend y
    
    return polygons;
}


function drawPoints(ctx,n,X,Y){
    ctx.fillStyle="black";
    for(var i=0; i<n; i++) {
        ctx.fillRect(X[i],Y[i],3,3);
    }
}

function drawNumberPoints(ctx,n,X,Y){
    ctx.fillStyle="black";
    for(var i=0; i<n; i++) {
        ctx.font = "10px Arial";
        ctx.fillText(i,X[i],Y[i]);
    }
}

/**
 * bug: points in single line are skipped
 * @param {object} polygon 
 */
function concavePolygonOutline(polygon){
    var outline = {};
    var max, min;
    for(var index=0; index<polygon.Y.length; index++){
        var y = polygon.Y[index];
        if(!outline[y]){
            outline[y] = {
                min : polygon.X[index],
                max : polygon.X[index],
            } ;
        }else{
            outline[y] = {
                min : min(outline[y].min,polygon.X[index]),
                max : max(outline[y].max,polygon.X[index])
            }
        }
    }

    return outline;
}

function max(a,b) { return a> b?a:b}
function min(a,b) { return a> b?b:a}

function drawPolygon(ctx,polygon){
    var ys = Object.keys(polygon);
    ctx.fillStyle="#000"; 
    for(var point_i=0; point_i < ys.length; point_i++){
        var y = ys[point_i];
        var x1 = polygon[y].min;
        var x2 = polygon[y].max;
        ctx.fillRect(x1,y,1,1);
        ctx.fillRect(x2,y,1,1);
    }
}