!function(a,b,c){var d,e,f;f="PIN_"+~~((new Date).getTime()/864e5),a[f]||(a[f]=!0,a.setTimeout(function(){d=b.getElementsByTagName("SCRIPT")[0],e=b.createElement("SCRIPT"),e.type="text/javascript",e.async=!0,e.src=c,d.parentNode.insertBefore(e,d)},10))}(window,document,"//assets.pinterest.com/js/pinit_main.js");


/* data-w-scale on fullscreen-img
data-w-scale="2" = center orizzontally
data-w-scale="1" = align right
data-w-scale="0" = align left
data-w-scale="1.5" = custom value
*/
/* data-h-scale on fullscreen-img
data-h-scale="2" = center vertically
data-h-scale="1" = align bottom
data-h-scale="0" = align top
data-h-scale="1.5" = custom value
*/
function afterLoad(path){
    path.css("display", "block");
    // here you can put animations
    // this get executed when the image is loaded
}
function getClone(path){
    // get values
    var clone = path.clone();
    clone.css("visibility","hidden");
    $("body").append(clone);
    var o = {};
    o.w = clone.width();
    o.h = clone.height();
    clone.remove();
    return(o);
}
function loadImage(path, func){
    var oldSrc = path.attr('src');
    path.attr('src', '').load(function(){
        var o = getClone(path);
        path.data("w", o.w);
        path.data("h", o.h);
        // resize
        var cont = $(this).closest(".fullscreen-cont");
        resizeImage(path, getMaxW(cont), getMaxH(cont));
        afterLoad(path);
    });
    path.attr('src', oldSrc);
}
function resizeImage(path, w, h){
    // variables
    var winit = path.data("w");
    var hinit = path.data("h");
    var ratio = winit/hinit;
    var wdiff = (w - winit);
    var hdiff = (h - hinit) * ratio;
    // resize image
    if(wdiff > hdiff){
        wfinal = w;
        hfinal = w / ratio;
    }else{
        wfinal = h * ratio;
        hfinal = h;
    }
    path.css("width", wfinal);
    path.css("height", hfinal);
    // center image
    var wScale = path.attr("data-w-scale");
    if(wScale == undefined){wScale = 2;}
    var hScale = path.attr("data-h-scale");
    if(hScale == undefined){hScale = 2;}
    path.css("left", - (wfinal - w) / wScale);
    path.css("top", - (hfinal - h) / hScale);
}
function getMaxW(path){
    var w = $(window).width();
    var o = getClone(path);
    var overflowW = o.w;
    if(overflowW > w){w = overflowW;}
    return w;
}
function getMaxH(path){
    var h = $(window).height();
    var o = getClone(path);
    var overflowH = o.h;
    if(overflowH > h){h = overflowH;}
    return h;
}
$('.fullscreen-img').each(function(i){
    loadImage($(this));
});
$(window).resize(function(){
    $('.fullscreen-cont').each(function(i){
        resizeImage($(this).find(".fullscreen-img"), getMaxW($(this)), getMaxH($(this)));
    });
});