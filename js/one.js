/*
One.js loads slower than multiple includes, but allows for centralized changes.
*/

function loadScript(url, callback)
{
    if (!document.getElementById(url)) { // Prevents multiple loads.
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = url; // Prevents multiple loads.
        // Then bind the event to the callback function. Two events for cross browser compatibility.
        script.onreadystatechange = callback;
        script.onload = callback;
        //$(document).ready(function () { // Only needed if appending to body
            var head = document.getElementsByTagName('head')[0];
           head.appendChild(script);
        //});
    } else {
        console.log("Script already available.");
    }
}
function includeCSS(url) {
    if (!document.getElementById(url.replace("/","-").replace(".","-"))) { // Prevents multiple loads.
        var link  = document.createElement('link');
        link.id   = url.replace("/","-").replace(".","-");
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.media = 'all';
        $(document).ready(function () { /* Not necessary if appending to head */
            var body  = document.getElementsByTagName('body')[0];
            body.appendChild(link);
        });
    }
}

//alert('#indexHolder length: ' + $('#indexHolder').length);

var script1 = "js/index.js";
if (location.host != 'localhost' && location.host != 'review.georgia.org') {
    // Use https when available
    script1 = "js/index.js";
}

var file1 = loadScript(script1);

var file2 = 1;
//var file3 = $.getJSON("json/site.json"); // Possible alternative to ajax?

var gotHTML   = $.when(file1, file2); 
//var gotHTML = $.when(file1);    // and $.when groups several Deferreds

// example usage - you can do the same for the individual files
gotHTML.done(function () {
    //$("#indexHolder").append(getIndexHtml()); // Within index.js

    // Called when all files have been successfully loaded
    loadStrVar(0);  
});

gotHTML.fail(function () {
  console.log("gotHTML fail");
});

gotHTML.always(function () {
  // Call regardless of completion - to hide loading icons.

});

function loadStrVar(attempts) {
    attempts++;
    if (typeof strVar == "undefined") {
        console.log("strVar not available yet. Attempt " + attempts + ".  Wait 0.1 seconds.");
        setTimeout(function(){ // Allows time for strVar to be assigned.
            loadStrVar(attempts);
        }, 100);
        return;
    } else {
        console.log("strVar available");

        //alert('#indexHolder length: ' + $('#indexHolder').length);

        loadScript("js/embed.js",embedLoaded);  // Acts upon index.js string rendered to DOM.
    }
}
