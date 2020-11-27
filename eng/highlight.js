
/*
Gradual-Highlight Image Script II- 
By J. Mark Birenbaum (birenbau@ugrad.cs.ualberta.ca)
Permission granted to Dynamicdrive.com to feature script in archive
For full source to script, visit http://dynamicdrive.com
*/

nereidFadeObjects = new Object();
nereidFadeTimers = new Object();

/* object - image to be faded (actual object, not name);
 * destop - destination transparency level (ie 80, for mostly solid)
 * rate   - time in milliseconds between trasparency changes (best under 100)
 * delta  - amount of change each time (ie 5, for 5% change in transparency)
 */

function nereidFade(object, destOp, rate, delta){
if (!document.all)
return
    if (object != "[object]"){  //do this so I can take a string too
        setTimeout("nereidFade("+object+","+destOp+","+rate+","+delta+")",0);
        return;
    }
        
    clearTimeout(nereidFadeTimers[object.sourceIndex]);
    
    diff = destOp-object.filters.alpha.opacity+50;
    direction = 1;
    if (object.filters.alpha.opacity > destOp){
        direction = -1;
    }
    delta=Math.min(direction*diff,delta);
    object.filters.alpha.opacity+=direction*delta;

    if (object.filters.alpha.opacity != destOp){
        nereidFadeObjects[object.sourceIndex]=object;
        nereidFadeTimers[object.sourceIndex]=setTimeout("nereidFade(nereidFadeObjects["+object.sourceIndex+"],"+destOp+","+rate+","+delta+")",rate);
    }
}
