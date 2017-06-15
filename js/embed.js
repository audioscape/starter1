/*******************************************

DATAVUE EMBED.JS - Single Page App Framework
Layer driven data for embeddable navigation, maps and video.

OVERVIEW

setHeaderOnScroll - Locks navigation to top and sets .siteHeaderSpacer offset height.
updateOffsets - adjust for narrow surrounding div.

siteHeader
- sitemoduleBackground - dark color behind header image
- siteHeaderImage - opaque image
mContainer
- moduleBackground - dark color behind all
- moduleBackgroundImage - opaque image

displayLayerCheckboxes - Loads layer checkboxes which are displayed in dial menu. Does not need map to load.

layerCheckboxes - called when layer within map is checked
    if checked: loadCartoMap
    if unchecked: hideLayer

onhashchange - only triggered when backing up
    - deselectMenusAndTabs
    - applyHash (set form values from URL)
    - changeLayer

updateTheURL is called by:
    $(".goSearch").click
    $('.layerCheckboxes :checkbox')
    displayDetails2
    $('#alphabet div').click(function()

changeLayer - Occurs when loading, backing up or clicking checkboxes.
    - displaySectionMenu (includes top layer menus)

// CHECKBOX ACTIONS
$('.layerCheckboxes :checkbox') - go change via Layers checkboxes
$('.sectionCat :checkbox') - cat top topic navigation - triggers Layer checkbox since changeLayer is not accessible from these.

UTILITIES
Common script for gettings params, loading files and setting cookies. Omits JQuery.
Also in Controls.js: includeCSS

*******************************************/

// INTERACTJS.IO - for drag and resize
/* interact.js v1.2.8 | https://raw.github.com/taye/interact.js/master/LICENSE */
(function(realWindow){"use strict";if(!realWindow){return}var window=function(){var el=realWindow.document.createTextNode("");if(el.ownerDocument!==realWindow.document&&typeof realWindow.wrap==="function"&&realWindow.wrap(el)===el){return realWindow.wrap(realWindow)}return realWindow}(),document=window.document,DocumentFragment=window.DocumentFragment||blank,SVGElement=window.SVGElement||blank,SVGSVGElement=window.SVGSVGElement||blank,SVGElementInstance=window.SVGElementInstance||blank,HTMLElement=window.HTMLElement||window.Element,PointerEvent=window.PointerEvent||window.MSPointerEvent,pEventTypes,hypot=Math.hypot||function(x,y){return Math.sqrt(x*x+y*y)},tmpXY={},documents=[],interactables=[],interactions=[],dynamicDrop=false,delegatedEvents={},defaultOptions={base:{accept:null,actionChecker:null,styleCursor:true,preventDefault:"auto",origin:{x:0,y:0},deltaSource:"page",allowFrom:null,ignoreFrom:null,_context:document,dropChecker:null},drag:{enabled:false,manualStart:true,max:Infinity,maxPerElement:1,snap:null,restrict:null,inertia:null,autoScroll:null,axis:"xy"},drop:{enabled:false,accept:null,overlap:"pointer"},resize:{enabled:false,manualStart:false,max:Infinity,maxPerElement:1,snap:null,restrict:null,inertia:null,autoScroll:null,square:false,preserveAspectRatio:false,axis:"xy",margin:NaN,edges:null,invert:"none"},gesture:{manualStart:false,enabled:false,max:Infinity,maxPerElement:1,restrict:null},perAction:{manualStart:false,max:Infinity,maxPerElement:1,snap:{enabled:false,endOnly:false,range:Infinity,targets:null,offsets:null,relativePoints:null},restrict:{enabled:false,endOnly:false},autoScroll:{enabled:false,container:null,margin:60,speed:300},inertia:{enabled:false,resistance:10,minSpeed:100,endSpeed:10,allowResume:true,zeroResumeDelta:true,smoothEndDuration:300}},_holdDuration:600},autoScroll={interaction:null,i:null,x:0,y:0,scroll:function(){var options=autoScroll.interaction.target.options[autoScroll.interaction.prepared.name].autoScroll,container=options.container||getWindow(autoScroll.interaction.element),now=(new Date).getTime(),dtx=(now-autoScroll.prevTimeX)/1e3,dty=(now-autoScroll.prevTimeY)/1e3,vx,vy,sx,sy;if(options.velocity){vx=options.velocity.x;vy=options.velocity.y}else{vx=vy=options.speed}sx=vx*dtx;sy=vy*dty;if(sx>=1||sy>=1){if(isWindow(container)){container.scrollBy(autoScroll.x*sx,autoScroll.y*sy)}else if(container){container.scrollLeft+=autoScroll.x*sx;container.scrollTop+=autoScroll.y*sy}if(sx>=1)autoScroll.prevTimeX=now;if(sy>=1)autoScroll.prevTimeY=now}if(autoScroll.isScrolling){cancelFrame(autoScroll.i);autoScroll.i=reqFrame(autoScroll.scroll)}},isScrolling:false,prevTimeX:0,prevTimeY:0,start:function(interaction){autoScroll.isScrolling=true;cancelFrame(autoScroll.i);autoScroll.interaction=interaction;autoScroll.prevTimeX=(new Date).getTime();autoScroll.prevTimeY=(new Date).getTime();autoScroll.i=reqFrame(autoScroll.scroll)},stop:function(){autoScroll.isScrolling=false;cancelFrame(autoScroll.i)}},supportsTouch="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,supportsPointerEvent=PointerEvent&&!/Chrome/.test(navigator.userAgent),margin=supportsTouch||supportsPointerEvent?20:10,pointerMoveTolerance=1,prevTouchTime=0,maxInteractions=Infinity,actionCursors=document.all&&!window.atob?{drag:"move",resizex:"e-resize",resizey:"s-resize",resizexy:"se-resize",resizetop:"n-resize",resizeleft:"w-resize",resizebottom:"s-resize",resizeright:"e-resize",resizetopleft:"se-resize",resizebottomright:"se-resize",resizetopright:"ne-resize",resizebottomleft:"ne-resize",gesture:""}:{drag:"move",resizex:"ew-resize",resizey:"ns-resize",resizexy:"nwse-resize",resizetop:"ns-resize",resizeleft:"ew-resize",resizebottom:"ns-resize",resizeright:"ew-resize",resizetopleft:"nwse-resize",resizebottomright:"nwse-resize",resizetopright:"nesw-resize",resizebottomleft:"nesw-resize",gesture:""},actionIsEnabled={drag:true,resize:true,gesture:true},wheelEvent="onmousewheel"in document?"mousewheel":"wheel",eventTypes=["dragstart","dragmove","draginertiastart","dragend","dragenter","dragleave","dropactivate","dropdeactivate","dropmove","drop","resizestart","resizemove","resizeinertiastart","resizeend","gesturestart","gesturemove","gestureinertiastart","gestureend","down","move","up","cancel","tap","doubletap","hold"],globalEvents={},isOperaMobile=navigator.appName=="Opera"&&supportsTouch&&navigator.userAgent.match("Presto"),isIOS7=/iP(hone|od|ad)/.test(navigator.platform)&&/OS 7[^\d]/.test(navigator.appVersion),prefixedMatchesSelector="matches"in Element.prototype?"matches":"webkitMatchesSelector"in Element.prototype?"webkitMatchesSelector":"mozMatchesSelector"in Element.prototype?"mozMatchesSelector":"oMatchesSelector"in Element.prototype?"oMatchesSelector":"msMatchesSelector",ie8MatchesSelector,reqFrame=realWindow.requestAnimationFrame,cancelFrame=realWindow.cancelAnimationFrame,events=function(){var useAttachEvent="attachEvent"in window&&!("addEventListener"in window),addEvent=useAttachEvent?"attachEvent":"addEventListener",removeEvent=useAttachEvent?"detachEvent":"removeEventListener",on=useAttachEvent?"on":"",elements=[],targets=[],attachedListeners=[];function add(element,type,listener,useCapture){var elementIndex=indexOf(elements,element),target=targets[elementIndex];if(!target){target={events:{},typeCount:0};elementIndex=elements.push(element)-1;targets.push(target);attachedListeners.push(useAttachEvent?{supplied:[],wrapped:[],useCount:[]}:null)}if(!target.events[type]){target.events[type]=[];target.typeCount++}if(!contains(target.events[type],listener)){var ret;if(useAttachEvent){var listeners=attachedListeners[elementIndex],listenerIndex=indexOf(listeners.supplied,listener);var wrapped=listeners.wrapped[listenerIndex]||function(event){if(!event.immediatePropagationStopped){event.target=event.srcElement;event.currentTarget=element;event.preventDefault=event.preventDefault||preventDef;event.stopPropagation=event.stopPropagation||stopProp;event.stopImmediatePropagation=event.stopImmediatePropagation||stopImmProp;if(/mouse|click/.test(event.type)){event.pageX=event.clientX+getWindow(element).document.documentElement.scrollLeft;event.pageY=event.clientY+getWindow(element).document.documentElement.scrollTop}listener(event)}};ret=element[addEvent](on+type,wrapped,Boolean(useCapture));if(listenerIndex===-1){listeners.supplied.push(listener);listeners.wrapped.push(wrapped);listeners.useCount.push(1)}else{listeners.useCount[listenerIndex]++}}else{ret=element[addEvent](type,listener,useCapture||false)}target.events[type].push(listener);return ret}}function remove(element,type,listener,useCapture){var i,elementIndex=indexOf(elements,element),target=targets[elementIndex],listeners,listenerIndex,wrapped=listener;if(!target||!target.events){return}if(useAttachEvent){listeners=attachedListeners[elementIndex];listenerIndex=indexOf(listeners.supplied,listener);wrapped=listeners.wrapped[listenerIndex]}if(type==="all"){for(type in target.events){if(target.events.hasOwnProperty(type)){remove(element,type,"all")}}return}if(target.events[type]){var len=target.events[type].length;if(listener==="all"){for(i=0;i<len;i++){remove(element,type,target.events[type][i],Boolean(useCapture))}return}else{for(i=0;i<len;i++){if(target.events[type][i]===listener){element[removeEvent](on+type,wrapped,useCapture||false);target.events[type].splice(i,1);if(useAttachEvent&&listeners){listeners.useCount[listenerIndex]--;if(listeners.useCount[listenerIndex]===0){listeners.supplied.splice(listenerIndex,1);listeners.wrapped.splice(listenerIndex,1);listeners.useCount.splice(listenerIndex,1)}}break}}}if(target.events[type]&&target.events[type].length===0){target.events[type]=null;target.typeCount--}}if(!target.typeCount){targets.splice(elementIndex,1);elements.splice(elementIndex,1);attachedListeners.splice(elementIndex,1)}}function preventDef(){this.returnValue=false}function stopProp(){this.cancelBubble=true}function stopImmProp(){this.cancelBubble=true;this.immediatePropagationStopped=true}return{add:add,remove:remove,useAttachEvent:useAttachEvent,_elements:elements,_targets:targets,_attachedListeners:attachedListeners}}();function blank(){}function isElement(o){if(!o||typeof o!=="object"){return false}var _window=getWindow(o)||window;return/object|function/.test(typeof _window.Element)?o instanceof _window.Element:o.nodeType===1&&typeof o.nodeName==="string"}function isWindow(thing){return thing===window||!!(thing&&thing.Window)&&thing instanceof thing.Window}function isDocFrag(thing){return!!thing&&thing instanceof DocumentFragment}function isArray(thing){return isObject(thing)&&typeof thing.length!==undefined&&isFunction(thing.splice)}function isObject(thing){return!!thing&&typeof thing==="object"}function isFunction(thing){return typeof thing==="function"}function isNumber(thing){return typeof thing==="number"}function isBool(thing){return typeof thing==="boolean"}function isString(thing){return typeof thing==="string"}function trySelector(value){if(!isString(value)){return false}document.querySelector(value);return true}function extend(dest,source){for(var prop in source){dest[prop]=source[prop]}return dest}var prefixedPropREs={webkit:/(Movement[XY]|Radius[XY]|RotationAngle|Force)$/};function pointerExtend(dest,source){for(var prop in source){var deprecated=false;for(var vendor in prefixedPropREs){if(prop.indexOf(vendor)===0&&prefixedPropREs[vendor].test(prop)){deprecated=true;break}}if(!deprecated){dest[prop]=source[prop]}}return dest}function copyCoords(dest,src){dest.page=dest.page||{};dest.page.x=src.page.x;dest.page.y=src.page.y;dest.client=dest.client||{};dest.client.x=src.client.x;dest.client.y=src.client.y;dest.timeStamp=src.timeStamp}function setEventXY(targetObj,pointers,interaction){var pointer=pointers.length>1?pointerAverage(pointers):pointers[0];getPageXY(pointer,tmpXY,interaction);targetObj.page.x=tmpXY.x;targetObj.page.y=tmpXY.y;getClientXY(pointer,tmpXY,interaction);targetObj.client.x=tmpXY.x;targetObj.client.y=tmpXY.y;targetObj.timeStamp=(new Date).getTime()}function setEventDeltas(targetObj,prev,cur){targetObj.page.x=cur.page.x-prev.page.x;targetObj.page.y=cur.page.y-prev.page.y;targetObj.client.x=cur.client.x-prev.client.x;targetObj.client.y=cur.client.y-prev.client.y;targetObj.timeStamp=(new Date).getTime()-prev.timeStamp;var dt=Math.max(targetObj.timeStamp/1e3,.001);targetObj.page.speed=hypot(targetObj.page.x,targetObj.page.y)/dt;targetObj.page.vx=targetObj.page.x/dt;targetObj.page.vy=targetObj.page.y/dt;targetObj.client.speed=hypot(targetObj.client.x,targetObj.page.y)/dt;targetObj.client.vx=targetObj.client.x/dt;targetObj.client.vy=targetObj.client.y/dt}function isNativePointer(pointer){return pointer instanceof window.Event||supportsTouch&&window.Touch&&pointer instanceof window.Touch}function getXY(type,pointer,xy){xy=xy||{};type=type||"page";xy.x=pointer[type+"X"];xy.y=pointer[type+"Y"];return xy}function getPageXY(pointer,page){page=page||{};if(isOperaMobile&&isNativePointer(pointer)){getXY("screen",pointer,page);page.x+=window.scrollX;page.y+=window.scrollY}else{getXY("page",pointer,page)}return page}function getClientXY(pointer,client){client=client||{};if(isOperaMobile&&isNativePointer(pointer)){getXY("screen",pointer,client)}else{getXY("client",pointer,client)}return client}function getScrollXY(win){win=win||window;return{x:win.scrollX||win.document.documentElement.scrollLeft,y:win.scrollY||win.document.documentElement.scrollTop}}function getPointerId(pointer){return isNumber(pointer.pointerId)?pointer.pointerId:pointer.identifier}function getActualElement(element){return element instanceof SVGElementInstance?element.correspondingUseElement:element}function getWindow(node){if(isWindow(node)){return node}var rootNode=node.ownerDocument||node;return rootNode.defaultView||rootNode.parentWindow||window}function getElementClientRect(element){var clientRect=element instanceof SVGElement?element.getBoundingClientRect():element.getClientRects()[0];return clientRect&&{left:clientRect.left,right:clientRect.right,top:clientRect.top,bottom:clientRect.bottom,width:clientRect.width||clientRect.right-clientRect.left,height:clientRect.height||clientRect.bottom-clientRect.top}}function getElementRect(element){var clientRect=getElementClientRect(element);if(!isIOS7&&clientRect){var scroll=getScrollXY(getWindow(element));clientRect.left+=scroll.x;clientRect.right+=scroll.x;clientRect.top+=scroll.y;clientRect.bottom+=scroll.y}return clientRect}function getTouchPair(event){var touches=[];if(isArray(event)){touches[0]=event[0];touches[1]=event[1]}else{if(event.type==="touchend"){if(event.touches.length===1){touches[0]=event.touches[0];touches[1]=event.changedTouches[0]}else if(event.touches.length===0){touches[0]=event.changedTouches[0];touches[1]=event.changedTouches[1]}}else{touches[0]=event.touches[0];touches[1]=event.touches[1]}}return touches}function pointerAverage(pointers){var average={pageX:0,pageY:0,clientX:0,clientY:0,screenX:0,screenY:0};var prop;for(var i=0;i<pointers.length;i++){for(prop in average){average[prop]+=pointers[i][prop]}}for(prop in average){average[prop]/=pointers.length}return average}function touchBBox(event){if(!event.length&&!(event.touches&&event.touches.length>1)){return}var touches=getTouchPair(event),minX=Math.min(touches[0].pageX,touches[1].pageX),minY=Math.min(touches[0].pageY,touches[1].pageY),maxX=Math.max(touches[0].pageX,touches[1].pageX),maxY=Math.max(touches[0].pageY,touches[1].pageY);return{x:minX,y:minY,left:minX,top:minY,width:maxX-minX,height:maxY-minY}}function touchDistance(event,deltaSource){deltaSource=deltaSource||defaultOptions.deltaSource;var sourceX=deltaSource+"X",sourceY=deltaSource+"Y",touches=getTouchPair(event);var dx=touches[0][sourceX]-touches[1][sourceX],dy=touches[0][sourceY]-touches[1][sourceY];return hypot(dx,dy)}function touchAngle(event,prevAngle,deltaSource){deltaSource=deltaSource||defaultOptions.deltaSource;var sourceX=deltaSource+"X",sourceY=deltaSource+"Y",touches=getTouchPair(event),dx=touches[0][sourceX]-touches[1][sourceX],dy=touches[0][sourceY]-touches[1][sourceY],angle=180*Math.atan(dy/dx)/Math.PI;if(isNumber(prevAngle)){var dr=angle-prevAngle,drClamped=dr%360;if(drClamped>315){angle-=360+angle/360|0*360}else if(drClamped>135){angle-=180+angle/360|0*360}else if(drClamped<-315){angle+=360+angle/360|0*360}else if(drClamped<-135){angle+=180+angle/360|0*360}}return angle}function getOriginXY(interactable,element){var origin=interactable?interactable.options.origin:defaultOptions.origin;if(origin==="parent"){origin=parentElement(element)}else if(origin==="self"){origin=interactable.getRect(element)}else if(trySelector(origin)){origin=closest(element,origin)||{x:0,y:0}}if(isFunction(origin)){origin=origin(interactable&&element)}if(isElement(origin)){origin=getElementRect(origin)}origin.x="x"in origin?origin.x:origin.left;origin.y="y"in origin?origin.y:origin.top;return origin}function _getQBezierValue(t,p1,p2,p3){var iT=1-t;return iT*iT*p1+2*iT*t*p2+t*t*p3}function getQuadraticCurvePoint(startX,startY,cpX,cpY,endX,endY,position){return{x:_getQBezierValue(position,startX,cpX,endX),y:_getQBezierValue(position,startY,cpY,endY)}}function easeOutQuad(t,b,c,d){t/=d;return-c*t*(t-2)+b}function nodeContains(parent,child){while(child){if(child===parent){return true}child=child.parentNode}return false}function closest(child,selector){var parent=parentElement(child);while(isElement(parent)){if(matchesSelector(parent,selector)){return parent}parent=parentElement(parent)}return null}function parentElement(node){var parent=node.parentNode;if(isDocFrag(parent)){while((parent=parent.host)&&isDocFrag(parent)){}return parent}return parent}function inContext(interactable,element){return interactable._context===element.ownerDocument||nodeContains(interactable._context,element)}function testIgnore(interactable,interactableElement,element){var ignoreFrom=interactable.options.ignoreFrom;if(!ignoreFrom||!isElement(element)){return false}if(isString(ignoreFrom)){return matchesUpTo(element,ignoreFrom,interactableElement)}else if(isElement(ignoreFrom)){return nodeContains(ignoreFrom,element)}return false}function testAllow(interactable,interactableElement,element){var allowFrom=interactable.options.allowFrom;if(!allowFrom){return true}if(!isElement(element)){return false}if(isString(allowFrom)){return matchesUpTo(element,allowFrom,interactableElement)}else if(isElement(allowFrom)){return nodeContains(allowFrom,element)}return false}function checkAxis(axis,interactable){if(!interactable){return false}var thisAxis=interactable.options.drag.axis;return axis==="xy"||thisAxis==="xy"||thisAxis===axis}function checkSnap(interactable,action){var options=interactable.options;if(/^resize/.test(action)){action="resize"}return options[action].snap&&options[action].snap.enabled}function checkRestrict(interactable,action){var options=interactable.options;if(/^resize/.test(action)){action="resize"}return options[action].restrict&&options[action].restrict.enabled}function checkAutoScroll(interactable,action){var options=interactable.options;if(/^resize/.test(action)){action="resize"}return options[action].autoScroll&&options[action].autoScroll.enabled}function withinInteractionLimit(interactable,element,action){var options=interactable.options,maxActions=options[action.name].max,maxPerElement=options[action.name].maxPerElement,activeInteractions=0,targetCount=0,targetElementCount=0;for(var i=0,len=interactions.length;i<len;i++){var interaction=interactions[i],otherAction=interaction.prepared.name,active=interaction.interacting();if(!active){continue}activeInteractions++;if(activeInteractions>=maxInteractions){return false}if(interaction.target!==interactable){continue}targetCount+=otherAction===action.name|0;if(targetCount>=maxActions){return false}if(interaction.element===element){targetElementCount++;if(otherAction!==action.name||targetElementCount>=maxPerElement){return false}}}return maxInteractions>0}function indexOfDeepestElement(elements){var dropzone,deepestZone=elements[0],index=deepestZone?0:-1,parent,deepestZoneParents=[],dropzoneParents=[],child,i,n;for(i=1;i<elements.length;i++){dropzone=elements[i];if(!dropzone||dropzone===deepestZone){continue}if(!deepestZone){deepestZone=dropzone;index=i;continue}if(dropzone.parentNode===dropzone.ownerDocument){continue}else if(deepestZone.parentNode===dropzone.ownerDocument){deepestZone=dropzone;index=i;continue}if(!deepestZoneParents.length){parent=deepestZone;while(parent.parentNode&&parent.parentNode!==parent.ownerDocument){deepestZoneParents.unshift(parent);parent=parent.parentNode}}if(deepestZone instanceof HTMLElement&&dropzone instanceof SVGElement&&!(dropzone instanceof SVGSVGElement)){if(dropzone===deepestZone.parentNode){continue}parent=dropzone.ownerSVGElement}else{parent=dropzone}dropzoneParents=[];while(parent.parentNode!==parent.ownerDocument){dropzoneParents.unshift(parent);parent=parent.parentNode}n=0;while(dropzoneParents[n]&&dropzoneParents[n]===deepestZoneParents[n]){n++}var parents=[dropzoneParents[n-1],dropzoneParents[n],deepestZoneParents[n]];child=parents[0].lastChild;while(child){if(child===parents[1]){deepestZone=dropzone;index=i;deepestZoneParents=[];break}else if(child===parents[2]){break}child=child.previousSibling}}return index}function Interaction(){this.target=null;this.element=null;this.dropTarget=null;this.dropElement=null;this.prevDropTarget=null;this.prevDropElement=null;this.prepared={name:null,axis:null,edges:null};this.matches=[];this.matchElements=[];this.inertiaStatus={active:false,smoothEnd:false,ending:false,startEvent:null,upCoords:{},xe:0,ye:0,sx:0,sy:0,t0:0,vx0:0,vys:0,duration:0,resumeDx:0,resumeDy:0,lambda_v0:0,one_ve_v0:0,i:null};if(isFunction(Function.prototype.bind)){this.boundInertiaFrame=this.inertiaFrame.bind(this);this.boundSmoothEndFrame=this.smoothEndFrame.bind(this)}else{var that=this;this.boundInertiaFrame=function(){return that.inertiaFrame()};this.boundSmoothEndFrame=function(){return that.smoothEndFrame()}}this.activeDrops={dropzones:[],elements:[],rects:[]};this.pointers=[];this.pointerIds=[];this.downTargets=[];this.downTimes=[];this.holdTimers=[];this.prevCoords={page:{x:0,y:0},client:{x:0,y:0},timeStamp:0};this.curCoords={page:{x:0,y:0},client:{x:0,y:0},timeStamp:0};this.startCoords={page:{x:0,y:0},client:{x:0,y:0},timeStamp:0};this.pointerDelta={page:{x:0,y:0,vx:0,vy:0,speed:0},client:{x:0,y:0,vx:0,vy:0,speed:0},timeStamp:0};this.downEvent=null;this.downPointer={};this._eventTarget=null;this._curEventTarget=null;this.prevEvent=null;this.tapTime=0;this.prevTap=null;this.startOffset={left:0,right:0,top:0,bottom:0};this.restrictOffset={left:0,right:0,top:0,bottom:0};this.snapOffsets=[];this.gesture={start:{x:0,y:0},startDistance:0,prevDistance:0,distance:0,scale:1,startAngle:0,prevAngle:0};this.snapStatus={x:0,y:0,dx:0,dy:0,realX:0,realY:0,snappedX:0,snappedY:0,targets:[],locked:false,changed:false};this.restrictStatus={dx:0,dy:0,restrictedX:0,restrictedY:0,snap:null,restricted:false,changed:false};this.restrictStatus.snap=this.snapStatus;this.pointerIsDown=false;this.pointerWasMoved=false;this.gesturing=false;this.dragging=false;this.resizing=false;this.resizeAxes="xy";this.mouse=false;interactions.push(this)}Interaction.prototype={getPageXY:function(pointer,xy){return getPageXY(pointer,xy,this)},getClientXY:function(pointer,xy){return getClientXY(pointer,xy,this)},setEventXY:function(target,ptr){return setEventXY(target,ptr,this)},pointerOver:function(pointer,event,eventTarget){if(this.prepared.name||!this.mouse){return}var curMatches=[],curMatchElements=[],prevTargetElement=this.element;this.addPointer(pointer);if(this.target&&(testIgnore(this.target,this.element,eventTarget)||!testAllow(this.target,this.element,eventTarget))){this.target=null;this.element=null;this.matches=[];this.matchElements=[]}var elementInteractable=interactables.get(eventTarget),elementAction=elementInteractable&&!testIgnore(elementInteractable,eventTarget,eventTarget)&&testAllow(elementInteractable,eventTarget,eventTarget)&&validateAction(elementInteractable.getAction(pointer,event,this,eventTarget),elementInteractable);if(elementAction&&!withinInteractionLimit(elementInteractable,eventTarget,elementAction)){elementAction=null}function pushCurMatches(interactable,selector){if(interactable&&inContext(interactable,eventTarget)&&!testIgnore(interactable,eventTarget,eventTarget)&&testAllow(interactable,eventTarget,eventTarget)&&matchesSelector(eventTarget,selector)){curMatches.push(interactable);curMatchElements.push(eventTarget)}}if(elementAction){this.target=elementInteractable;this.element=eventTarget;this.matches=[];this.matchElements=[]}else{interactables.forEachSelector(pushCurMatches);if(this.validateSelector(pointer,event,curMatches,curMatchElements)){this.matches=curMatches;this.matchElements=curMatchElements;this.pointerHover(pointer,event,this.matches,this.matchElements);events.add(eventTarget,supportsPointerEvent?pEventTypes.move:"mousemove",listeners.pointerHover)}else if(this.target){if(nodeContains(prevTargetElement,eventTarget)){this.pointerHover(pointer,event,this.matches,this.matchElements);events.add(this.element,supportsPointerEvent?pEventTypes.move:"mousemove",listeners.pointerHover)}else{this.target=null;this.element=null;this.matches=[];this.matchElements=[]}}}},pointerHover:function(pointer,event,eventTarget,curEventTarget,matches,matchElements){var target=this.target;if(!this.prepared.name&&this.mouse){var action;this.setEventXY(this.curCoords,[pointer]);if(matches){action=this.validateSelector(pointer,event,matches,matchElements)}else if(target){action=validateAction(target.getAction(this.pointers[0],event,this,this.element),this.target)}if(target&&target.options.styleCursor){if(action){target._doc.documentElement.style.cursor=getActionCursor(action)}else{target._doc.documentElement.style.cursor=""}}}else if(this.prepared.name){this.checkAndPreventDefault(event,target,this.element)}},pointerOut:function(pointer,event,eventTarget){if(this.prepared.name){return}if(!interactables.get(eventTarget)){events.remove(eventTarget,supportsPointerEvent?pEventTypes.move:"mousemove",listeners.pointerHover)}if(this.target&&this.target.options.styleCursor&&!this.interacting()){this.target._doc.documentElement.style.cursor=""}},selectorDown:function(pointer,event,eventTarget,curEventTarget){var that=this,eventCopy=events.useAttachEvent?extend({},event):event,element=eventTarget,pointerIndex=this.addPointer(pointer),action;this.holdTimers[pointerIndex]=setTimeout(function(){that.pointerHold(events.useAttachEvent?eventCopy:pointer,eventCopy,eventTarget,curEventTarget)},defaultOptions._holdDuration);this.pointerIsDown=true;if(this.inertiaStatus.active&&this.target.selector){while(isElement(element)){if(element===this.element&&validateAction(this.target.getAction(pointer,event,this,this.element),this.target).name===this.prepared.name){cancelFrame(this.inertiaStatus.i);this.inertiaStatus.active=false;this.collectEventTargets(pointer,event,eventTarget,"down");return}element=parentElement(element)}}if(this.interacting()){this.collectEventTargets(pointer,event,eventTarget,"down");return}function pushMatches(interactable,selector,context){var elements=ie8MatchesSelector?context.querySelectorAll(selector):undefined;if(inContext(interactable,element)&&!testIgnore(interactable,element,eventTarget)&&testAllow(interactable,element,eventTarget)&&matchesSelector(element,selector,elements)){that.matches.push(interactable);that.matchElements.push(element)}}this.setEventXY(this.curCoords,[pointer]);this.downEvent=event;while(isElement(element)&&!action){this.matches=[];this.matchElements=[];interactables.forEachSelector(pushMatches);action=this.validateSelector(pointer,event,this.matches,this.matchElements);element=parentElement(element)}if(action){this.prepared.name=action.name;this.prepared.axis=action.axis;this.prepared.edges=action.edges;this.collectEventTargets(pointer,event,eventTarget,"down");return this.pointerDown(pointer,event,eventTarget,curEventTarget,action)}else{this.downTimes[pointerIndex]=(new Date).getTime();this.downTargets[pointerIndex]=eventTarget;pointerExtend(this.downPointer,pointer);copyCoords(this.prevCoords,this.curCoords);this.pointerWasMoved=false}this.collectEventTargets(pointer,event,eventTarget,"down")},pointerDown:function(pointer,event,eventTarget,curEventTarget,forceAction){if(!forceAction&&!this.inertiaStatus.active&&this.pointerWasMoved&&this.prepared.name){this.checkAndPreventDefault(event,this.target,this.element);return}this.pointerIsDown=true;this.downEvent=event;var pointerIndex=this.addPointer(pointer),action;if(this.pointerIds.length>1&&this.target._element===this.element){var newAction=validateAction(forceAction||this.target.getAction(pointer,event,this,this.element),this.target);if(withinInteractionLimit(this.target,this.element,newAction)){action=newAction}this.prepared.name=null}else if(!this.prepared.name){var interactable=interactables.get(curEventTarget);if(interactable&&!testIgnore(interactable,curEventTarget,eventTarget)&&testAllow(interactable,curEventTarget,eventTarget)&&(action=validateAction(forceAction||interactable.getAction(pointer,event,this,curEventTarget),interactable,eventTarget))&&withinInteractionLimit(interactable,curEventTarget,action)){this.target=interactable;this.element=curEventTarget}}var target=this.target,options=target&&target.options;if(target&&(forceAction||!this.prepared.name)){action=action||validateAction(forceAction||target.getAction(pointer,event,this,curEventTarget),target,this.element);this.setEventXY(this.startCoords,this.pointers);if(!action){return}if(options.styleCursor){target._doc.documentElement.style.cursor=getActionCursor(action)}this.resizeAxes=action.name==="resize"?action.axis:null;if(action==="gesture"&&this.pointerIds.length<2){action=null}this.prepared.name=action.name;this.prepared.axis=action.axis;this.prepared.edges=action.edges;this.snapStatus.snappedX=this.snapStatus.snappedY=this.restrictStatus.restrictedX=this.restrictStatus.restrictedY=NaN;this.downTimes[pointerIndex]=(new Date).getTime();this.downTargets[pointerIndex]=eventTarget;pointerExtend(this.downPointer,pointer);copyCoords(this.prevCoords,this.startCoords);this.pointerWasMoved=false;this.checkAndPreventDefault(event,target,this.element)}else if(this.inertiaStatus.active&&curEventTarget===this.element&&validateAction(target.getAction(pointer,event,this,this.element),target).name===this.prepared.name){cancelFrame(this.inertiaStatus.i);this.inertiaStatus.active=false;this.checkAndPreventDefault(event,target,this.element)}},setModifications:function(coords,preEnd){var target=this.target,shouldMove=true,shouldSnap=checkSnap(target,this.prepared.name)&&(!target.options[this.prepared.name].snap.endOnly||preEnd),shouldRestrict=checkRestrict(target,this.prepared.name)&&(!target.options[this.prepared.name].restrict.endOnly||preEnd);if(shouldSnap){this.setSnapping(coords)}else{this.snapStatus.locked=false}if(shouldRestrict){this.setRestriction(coords)}else{this.restrictStatus.restricted=false}if(shouldSnap&&this.snapStatus.locked&&!this.snapStatus.changed){shouldMove=shouldRestrict&&this.restrictStatus.restricted&&this.restrictStatus.changed}else if(shouldRestrict&&this.restrictStatus.restricted&&!this.restrictStatus.changed){shouldMove=false}return shouldMove},setStartOffsets:function(action,interactable,element){var rect=interactable.getRect(element),origin=getOriginXY(interactable,element),snap=interactable.options[this.prepared.name].snap,restrict=interactable.options[this.prepared.name].restrict,width,height;if(rect){this.startOffset.left=this.startCoords.page.x-rect.left;this.startOffset.top=this.startCoords.page.y-rect.top;this.startOffset.right=rect.right-this.startCoords.page.x;this.startOffset.bottom=rect.bottom-this.startCoords.page.y;if("width"in rect){width=rect.width}else{width=rect.right-rect.left}if("height"in rect){height=rect.height}else{height=rect.bottom-rect.top}}else{this.startOffset.left=this.startOffset.top=this.startOffset.right=this.startOffset.bottom=0}this.snapOffsets.splice(0);var snapOffset=snap&&snap.offset==="startCoords"?{x:this.startCoords.page.x-origin.x,y:this.startCoords.page.y-origin.y}:snap&&snap.offset||{x:0,y:0};if(rect&&snap&&snap.relativePoints&&snap.relativePoints.length){for(var i=0;i<snap.relativePoints.length;i++){this.snapOffsets.push({x:this.startOffset.left-width*snap.relativePoints[i].x+snapOffset.x,y:this.startOffset.top-height*snap.relativePoints[i].y+snapOffset.y})}}else{this.snapOffsets.push(snapOffset)}if(rect&&restrict.elementRect){this.restrictOffset.left=this.startOffset.left-width*restrict.elementRect.left;this.restrictOffset.top=this.startOffset.top-height*restrict.elementRect.top;this.restrictOffset.right=this.startOffset.right-width*(1-restrict.elementRect.right);this.restrictOffset.bottom=this.startOffset.bottom-height*(1-restrict.elementRect.bottom)}else{this.restrictOffset.left=this.restrictOffset.top=this.restrictOffset.right=this.restrictOffset.bottom=0}},start:function(action,interactable,element){if(this.interacting()||!this.pointerIsDown||this.pointerIds.length<(action.name==="gesture"?2:1)){return}if(indexOf(interactions,this)===-1){interactions.push(this)}if(!this.prepared.name){this.setEventXY(this.startCoords,this.pointers)}this.prepared.name=action.name;this.prepared.axis=action.axis;this.prepared.edges=action.edges;this.target=interactable;this.element=element;this.setStartOffsets(action.name,interactable,element);this.setModifications(this.startCoords.page);this.prevEvent=this[this.prepared.name+"Start"](this.downEvent)},pointerMove:function(pointer,event,eventTarget,curEventTarget,preEnd){if(this.inertiaStatus.active){var pageUp=this.inertiaStatus.upCoords.page;var clientUp=this.inertiaStatus.upCoords.client;var inertiaPosition={pageX:pageUp.x+this.inertiaStatus.sx,pageY:pageUp.y+this.inertiaStatus.sy,clientX:clientUp.x+this.inertiaStatus.sx,
clientY:clientUp.y+this.inertiaStatus.sy};this.setEventXY(this.curCoords,[inertiaPosition])}else{this.recordPointer(pointer);this.setEventXY(this.curCoords,this.pointers)}var duplicateMove=this.curCoords.page.x===this.prevCoords.page.x&&this.curCoords.page.y===this.prevCoords.page.y&&this.curCoords.client.x===this.prevCoords.client.x&&this.curCoords.client.y===this.prevCoords.client.y;var dx,dy,pointerIndex=this.mouse?0:indexOf(this.pointerIds,getPointerId(pointer));if(this.pointerIsDown&&!this.pointerWasMoved){dx=this.curCoords.client.x-this.startCoords.client.x;dy=this.curCoords.client.y-this.startCoords.client.y;this.pointerWasMoved=hypot(dx,dy)>pointerMoveTolerance}if(!duplicateMove&&(!this.pointerIsDown||this.pointerWasMoved)){if(this.pointerIsDown){clearTimeout(this.holdTimers[pointerIndex])}this.collectEventTargets(pointer,event,eventTarget,"move")}if(!this.pointerIsDown){return}if(duplicateMove&&this.pointerWasMoved&&!preEnd){this.checkAndPreventDefault(event,this.target,this.element);return}setEventDeltas(this.pointerDelta,this.prevCoords,this.curCoords);if(!this.prepared.name){return}if(this.pointerWasMoved&&(!this.inertiaStatus.active||pointer instanceof InteractEvent&&/inertiastart/.test(pointer.type))){if(!this.interacting()){setEventDeltas(this.pointerDelta,this.prevCoords,this.curCoords);if(this.prepared.name==="drag"){var absX=Math.abs(dx),absY=Math.abs(dy),targetAxis=this.target.options.drag.axis,axis=absX>absY?"x":absX<absY?"y":"xy";if(axis!=="xy"&&targetAxis!=="xy"&&targetAxis!==axis){this.prepared.name=null;var element=eventTarget;while(isElement(element)){var elementInteractable=interactables.get(element);if(elementInteractable&&elementInteractable!==this.target&&!elementInteractable.options.drag.manualStart&&elementInteractable.getAction(this.downPointer,this.downEvent,this,element).name==="drag"&&checkAxis(axis,elementInteractable)){this.prepared.name="drag";this.target=elementInteractable;this.element=element;break}element=parentElement(element)}if(!this.prepared.name){var thisInteraction=this;var getDraggable=function(interactable,selector,context){var elements=ie8MatchesSelector?context.querySelectorAll(selector):undefined;if(interactable===thisInteraction.target){return}if(inContext(interactable,eventTarget)&&!interactable.options.drag.manualStart&&!testIgnore(interactable,element,eventTarget)&&testAllow(interactable,element,eventTarget)&&matchesSelector(element,selector,elements)&&interactable.getAction(thisInteraction.downPointer,thisInteraction.downEvent,thisInteraction,element).name==="drag"&&checkAxis(axis,interactable)&&withinInteractionLimit(interactable,element,"drag")){return interactable}};element=eventTarget;while(isElement(element)){var selectorInteractable=interactables.forEachSelector(getDraggable);if(selectorInteractable){this.prepared.name="drag";this.target=selectorInteractable;this.element=element;break}element=parentElement(element)}}}}}var starting=!!this.prepared.name&&!this.interacting();if(starting&&(this.target.options[this.prepared.name].manualStart||!withinInteractionLimit(this.target,this.element,this.prepared))){this.stop(event);return}if(this.prepared.name&&this.target){if(starting){this.start(this.prepared,this.target,this.element)}var shouldMove=this.setModifications(this.curCoords.page,preEnd);if(shouldMove||starting){this.prevEvent=this[this.prepared.name+"Move"](event)}this.checkAndPreventDefault(event,this.target,this.element)}}copyCoords(this.prevCoords,this.curCoords);if(this.dragging||this.resizing){this.autoScrollMove(pointer)}},dragStart:function(event){var dragEvent=new InteractEvent(this,event,"drag","start",this.element);this.dragging=true;this.target.fire(dragEvent);this.activeDrops.dropzones=[];this.activeDrops.elements=[];this.activeDrops.rects=[];if(!this.dynamicDrop){this.setActiveDrops(this.element)}var dropEvents=this.getDropEvents(event,dragEvent);if(dropEvents.activate){this.fireActiveDrops(dropEvents.activate)}return dragEvent},dragMove:function(event){var target=this.target,dragEvent=new InteractEvent(this,event,"drag","move",this.element),draggableElement=this.element,drop=this.getDrop(dragEvent,event,draggableElement);this.dropTarget=drop.dropzone;this.dropElement=drop.element;var dropEvents=this.getDropEvents(event,dragEvent);target.fire(dragEvent);if(dropEvents.leave){this.prevDropTarget.fire(dropEvents.leave)}if(dropEvents.enter){this.dropTarget.fire(dropEvents.enter)}if(dropEvents.move){this.dropTarget.fire(dropEvents.move)}this.prevDropTarget=this.dropTarget;this.prevDropElement=this.dropElement;return dragEvent},resizeStart:function(event){var resizeEvent=new InteractEvent(this,event,"resize","start",this.element);if(this.prepared.edges){var startRect=this.target.getRect(this.element);if(this.target.options.resize.square||this.target.options.resize.preserveAspectRatio){var linkedEdges=extend({},this.prepared.edges);linkedEdges.top=linkedEdges.top||linkedEdges.left&&!linkedEdges.bottom;linkedEdges.left=linkedEdges.left||linkedEdges.top&&!linkedEdges.right;linkedEdges.bottom=linkedEdges.bottom||linkedEdges.right&&!linkedEdges.top;linkedEdges.right=linkedEdges.right||linkedEdges.bottom&&!linkedEdges.left;this.prepared._linkedEdges=linkedEdges}else{this.prepared._linkedEdges=null}if(this.target.options.resize.preserveAspectRatio){this.resizeStartAspectRatio=startRect.width/startRect.height}this.resizeRects={start:startRect,current:extend({},startRect),restricted:extend({},startRect),previous:extend({},startRect),delta:{left:0,right:0,width:0,top:0,bottom:0,height:0}};resizeEvent.rect=this.resizeRects.restricted;resizeEvent.deltaRect=this.resizeRects.delta}this.target.fire(resizeEvent);this.resizing=true;return resizeEvent},resizeMove:function(event){var resizeEvent=new InteractEvent(this,event,"resize","move",this.element);var edges=this.prepared.edges,invert=this.target.options.resize.invert,invertible=invert==="reposition"||invert==="negate";if(edges){var dx=resizeEvent.dx,dy=resizeEvent.dy,start=this.resizeRects.start,current=this.resizeRects.current,restricted=this.resizeRects.restricted,delta=this.resizeRects.delta,previous=extend(this.resizeRects.previous,restricted),originalEdges=edges;if(this.target.options.resize.preserveAspectRatio){var resizeStartAspectRatio=this.resizeStartAspectRatio;edges=this.prepared._linkedEdges;if(originalEdges.left&&originalEdges.bottom||originalEdges.right&&originalEdges.top){dy=-dx/resizeStartAspectRatio}else if(originalEdges.left||originalEdges.right){dy=dx/resizeStartAspectRatio}else if(originalEdges.top||originalEdges.bottom){dx=dy*resizeStartAspectRatio}}else if(this.target.options.resize.square){edges=this.prepared._linkedEdges;if(originalEdges.left&&originalEdges.bottom||originalEdges.right&&originalEdges.top){dy=-dx}else if(originalEdges.left||originalEdges.right){dy=dx}else if(originalEdges.top||originalEdges.bottom){dx=dy}}if(edges.top){current.top+=dy}if(edges.bottom){current.bottom+=dy}if(edges.left){current.left+=dx}if(edges.right){current.right+=dx}if(invertible){extend(restricted,current);if(invert==="reposition"){var swap;if(restricted.top>restricted.bottom){swap=restricted.top;restricted.top=restricted.bottom;restricted.bottom=swap}if(restricted.left>restricted.right){swap=restricted.left;restricted.left=restricted.right;restricted.right=swap}}}else{restricted.top=Math.min(current.top,start.bottom);restricted.bottom=Math.max(current.bottom,start.top);restricted.left=Math.min(current.left,start.right);restricted.right=Math.max(current.right,start.left)}restricted.width=restricted.right-restricted.left;restricted.height=restricted.bottom-restricted.top;for(var edge in restricted){delta[edge]=restricted[edge]-previous[edge]}resizeEvent.edges=this.prepared.edges;resizeEvent.rect=restricted;resizeEvent.deltaRect=delta}this.target.fire(resizeEvent);return resizeEvent},gestureStart:function(event){var gestureEvent=new InteractEvent(this,event,"gesture","start",this.element);gestureEvent.ds=0;this.gesture.startDistance=this.gesture.prevDistance=gestureEvent.distance;this.gesture.startAngle=this.gesture.prevAngle=gestureEvent.angle;this.gesture.scale=1;this.gesturing=true;this.target.fire(gestureEvent);return gestureEvent},gestureMove:function(event){if(!this.pointerIds.length){return this.prevEvent}var gestureEvent;gestureEvent=new InteractEvent(this,event,"gesture","move",this.element);gestureEvent.ds=gestureEvent.scale-this.gesture.scale;this.target.fire(gestureEvent);this.gesture.prevAngle=gestureEvent.angle;this.gesture.prevDistance=gestureEvent.distance;if(gestureEvent.scale!==Infinity&&gestureEvent.scale!==null&&gestureEvent.scale!==undefined&&!isNaN(gestureEvent.scale)){this.gesture.scale=gestureEvent.scale}return gestureEvent},pointerHold:function(pointer,event,eventTarget){this.collectEventTargets(pointer,event,eventTarget,"hold")},pointerUp:function(pointer,event,eventTarget,curEventTarget){var pointerIndex=this.mouse?0:indexOf(this.pointerIds,getPointerId(pointer));clearTimeout(this.holdTimers[pointerIndex]);this.collectEventTargets(pointer,event,eventTarget,"up");this.collectEventTargets(pointer,event,eventTarget,"tap");this.pointerEnd(pointer,event,eventTarget,curEventTarget);this.removePointer(pointer)},pointerCancel:function(pointer,event,eventTarget,curEventTarget){var pointerIndex=this.mouse?0:indexOf(this.pointerIds,getPointerId(pointer));clearTimeout(this.holdTimers[pointerIndex]);this.collectEventTargets(pointer,event,eventTarget,"cancel");this.pointerEnd(pointer,event,eventTarget,curEventTarget);this.removePointer(pointer)},ie8Dblclick:function(pointer,event,eventTarget){if(this.prevTap&&event.clientX===this.prevTap.clientX&&event.clientY===this.prevTap.clientY&&eventTarget===this.prevTap.target){this.downTargets[0]=eventTarget;this.downTimes[0]=(new Date).getTime();this.collectEventTargets(pointer,event,eventTarget,"tap")}},pointerEnd:function(pointer,event,eventTarget,curEventTarget){var endEvent,target=this.target,options=target&&target.options,inertiaOptions=options&&this.prepared.name&&options[this.prepared.name].inertia,inertiaStatus=this.inertiaStatus;if(this.interacting()){if(inertiaStatus.active&&!inertiaStatus.ending){return}var pointerSpeed,now=(new Date).getTime(),inertiaPossible=false,inertia=false,smoothEnd=false,endSnap=checkSnap(target,this.prepared.name)&&options[this.prepared.name].snap.endOnly,endRestrict=checkRestrict(target,this.prepared.name)&&options[this.prepared.name].restrict.endOnly,dx=0,dy=0,startEvent;if(this.dragging){if(options.drag.axis==="x"){pointerSpeed=Math.abs(this.pointerDelta.client.vx)}else if(options.drag.axis==="y"){pointerSpeed=Math.abs(this.pointerDelta.client.vy)}else{pointerSpeed=this.pointerDelta.client.speed}}else{pointerSpeed=this.pointerDelta.client.speed}inertiaPossible=inertiaOptions&&inertiaOptions.enabled&&this.prepared.name!=="gesture"&&event!==inertiaStatus.startEvent;inertia=inertiaPossible&&now-this.curCoords.timeStamp<50&&pointerSpeed>inertiaOptions.minSpeed&&pointerSpeed>inertiaOptions.endSpeed;if(inertiaPossible&&!inertia&&(endSnap||endRestrict)){var snapRestrict={};snapRestrict.snap=snapRestrict.restrict=snapRestrict;if(endSnap){this.setSnapping(this.curCoords.page,snapRestrict);if(snapRestrict.locked){dx+=snapRestrict.dx;dy+=snapRestrict.dy}}if(endRestrict){this.setRestriction(this.curCoords.page,snapRestrict);if(snapRestrict.restricted){dx+=snapRestrict.dx;dy+=snapRestrict.dy}}if(dx||dy){smoothEnd=true}}if(inertia||smoothEnd){copyCoords(inertiaStatus.upCoords,this.curCoords);this.pointers[0]=inertiaStatus.startEvent=startEvent=new InteractEvent(this,event,this.prepared.name,"inertiastart",this.element);inertiaStatus.t0=now;target.fire(inertiaStatus.startEvent);if(inertia){inertiaStatus.vx0=this.pointerDelta.client.vx;inertiaStatus.vy0=this.pointerDelta.client.vy;inertiaStatus.v0=pointerSpeed;this.calcInertia(inertiaStatus);var page=extend({},this.curCoords.page),origin=getOriginXY(target,this.element),statusObject;page.x=page.x+inertiaStatus.xe-origin.x;page.y=page.y+inertiaStatus.ye-origin.y;statusObject={useStatusXY:true,x:page.x,y:page.y,dx:0,dy:0,snap:null};statusObject.snap=statusObject;dx=dy=0;if(endSnap){var snap=this.setSnapping(this.curCoords.page,statusObject);if(snap.locked){dx+=snap.dx;dy+=snap.dy}}if(endRestrict){var restrict=this.setRestriction(this.curCoords.page,statusObject);if(restrict.restricted){dx+=restrict.dx;dy+=restrict.dy}}inertiaStatus.modifiedXe+=dx;inertiaStatus.modifiedYe+=dy;inertiaStatus.i=reqFrame(this.boundInertiaFrame)}else{inertiaStatus.smoothEnd=true;inertiaStatus.xe=dx;inertiaStatus.ye=dy;inertiaStatus.sx=inertiaStatus.sy=0;inertiaStatus.i=reqFrame(this.boundSmoothEndFrame)}inertiaStatus.active=true;return}if(endSnap||endRestrict){this.pointerMove(pointer,event,eventTarget,curEventTarget,true)}}if(this.dragging){endEvent=new InteractEvent(this,event,"drag","end",this.element);var draggableElement=this.element,drop=this.getDrop(endEvent,event,draggableElement);this.dropTarget=drop.dropzone;this.dropElement=drop.element;var dropEvents=this.getDropEvents(event,endEvent);if(dropEvents.leave){this.prevDropTarget.fire(dropEvents.leave)}if(dropEvents.enter){this.dropTarget.fire(dropEvents.enter)}if(dropEvents.drop){this.dropTarget.fire(dropEvents.drop)}if(dropEvents.deactivate){this.fireActiveDrops(dropEvents.deactivate)}target.fire(endEvent)}else if(this.resizing){endEvent=new InteractEvent(this,event,"resize","end",this.element);target.fire(endEvent)}else if(this.gesturing){endEvent=new InteractEvent(this,event,"gesture","end",this.element);target.fire(endEvent)}this.stop(event)},collectDrops:function(element){var drops=[],elements=[],i;element=element||this.element;for(i=0;i<interactables.length;i++){if(!interactables[i].options.drop.enabled){continue}var current=interactables[i],accept=current.options.drop.accept;if(isElement(accept)&&accept!==element||isString(accept)&&!matchesSelector(element,accept)){continue}var dropElements=current.selector?current._context.querySelectorAll(current.selector):[current._element];for(var j=0,len=dropElements.length;j<len;j++){var currentElement=dropElements[j];if(currentElement===element){continue}drops.push(current);elements.push(currentElement)}}return{dropzones:drops,elements:elements}},fireActiveDrops:function(event){var i,current,currentElement,prevElement;for(i=0;i<this.activeDrops.dropzones.length;i++){current=this.activeDrops.dropzones[i];currentElement=this.activeDrops.elements[i];if(currentElement!==prevElement){event.target=currentElement;current.fire(event)}prevElement=currentElement}},setActiveDrops:function(dragElement){var possibleDrops=this.collectDrops(dragElement,true);this.activeDrops.dropzones=possibleDrops.dropzones;this.activeDrops.elements=possibleDrops.elements;this.activeDrops.rects=[];for(var i=0;i<this.activeDrops.dropzones.length;i++){this.activeDrops.rects[i]=this.activeDrops.dropzones[i].getRect(this.activeDrops.elements[i])}},getDrop:function(dragEvent,event,dragElement){var validDrops=[];if(dynamicDrop){this.setActiveDrops(dragElement)}for(var j=0;j<this.activeDrops.dropzones.length;j++){var current=this.activeDrops.dropzones[j],currentElement=this.activeDrops.elements[j],rect=this.activeDrops.rects[j];validDrops.push(current.dropCheck(dragEvent,event,this.target,dragElement,currentElement,rect)?currentElement:null)}var dropIndex=indexOfDeepestElement(validDrops),dropzone=this.activeDrops.dropzones[dropIndex]||null,element=this.activeDrops.elements[dropIndex]||null;return{dropzone:dropzone,element:element}},getDropEvents:function(pointerEvent,dragEvent){var dropEvents={enter:null,leave:null,activate:null,deactivate:null,move:null,drop:null};if(this.dropElement!==this.prevDropElement){if(this.prevDropTarget){dropEvents.leave={target:this.prevDropElement,dropzone:this.prevDropTarget,relatedTarget:dragEvent.target,draggable:dragEvent.interactable,dragEvent:dragEvent,interaction:this,timeStamp:dragEvent.timeStamp,type:"dragleave"};dragEvent.dragLeave=this.prevDropElement;dragEvent.prevDropzone=this.prevDropTarget}if(this.dropTarget){dropEvents.enter={target:this.dropElement,dropzone:this.dropTarget,relatedTarget:dragEvent.target,draggable:dragEvent.interactable,dragEvent:dragEvent,interaction:this,timeStamp:dragEvent.timeStamp,type:"dragenter"};dragEvent.dragEnter=this.dropElement;dragEvent.dropzone=this.dropTarget}}if(dragEvent.type==="dragend"&&this.dropTarget){dropEvents.drop={target:this.dropElement,dropzone:this.dropTarget,relatedTarget:dragEvent.target,draggable:dragEvent.interactable,dragEvent:dragEvent,interaction:this,timeStamp:dragEvent.timeStamp,type:"drop"};dragEvent.dropzone=this.dropTarget}if(dragEvent.type==="dragstart"){dropEvents.activate={target:null,dropzone:null,relatedTarget:dragEvent.target,draggable:dragEvent.interactable,dragEvent:dragEvent,interaction:this,timeStamp:dragEvent.timeStamp,type:"dropactivate"}}if(dragEvent.type==="dragend"){dropEvents.deactivate={target:null,dropzone:null,relatedTarget:dragEvent.target,draggable:dragEvent.interactable,dragEvent:dragEvent,interaction:this,timeStamp:dragEvent.timeStamp,type:"dropdeactivate"}}if(dragEvent.type==="dragmove"&&this.dropTarget){dropEvents.move={target:this.dropElement,dropzone:this.dropTarget,relatedTarget:dragEvent.target,draggable:dragEvent.interactable,dragEvent:dragEvent,interaction:this,dragmove:dragEvent,timeStamp:dragEvent.timeStamp,type:"dropmove"};dragEvent.dropzone=this.dropTarget}return dropEvents},currentAction:function(){return this.dragging&&"drag"||this.resizing&&"resize"||this.gesturing&&"gesture"||null},interacting:function(){return this.dragging||this.resizing||this.gesturing},clearTargets:function(){this.target=this.element=null;this.dropTarget=this.dropElement=this.prevDropTarget=this.prevDropElement=null},stop:function(event){if(this.interacting()){autoScroll.stop();this.matches=[];this.matchElements=[];var target=this.target;if(target.options.styleCursor){target._doc.documentElement.style.cursor=""}if(event&&isFunction(event.preventDefault)){this.checkAndPreventDefault(event,target,this.element)}if(this.dragging){this.activeDrops.dropzones=this.activeDrops.elements=this.activeDrops.rects=null}}this.clearTargets();this.pointerIsDown=this.snapStatus.locked=this.dragging=this.resizing=this.gesturing=false;this.prepared.name=this.prevEvent=null;this.inertiaStatus.resumeDx=this.inertiaStatus.resumeDy=0;for(var i=0;i<this.pointers.length;i++){if(indexOf(this.pointerIds,getPointerId(this.pointers[i]))===-1){this.pointers.splice(i,1)}}},inertiaFrame:function(){var inertiaStatus=this.inertiaStatus,options=this.target.options[this.prepared.name].inertia,lambda=options.resistance,t=(new Date).getTime()/1e3-inertiaStatus.t0;if(t<inertiaStatus.te){var progress=1-(Math.exp(-lambda*t)-inertiaStatus.lambda_v0)/inertiaStatus.one_ve_v0;if(inertiaStatus.modifiedXe===inertiaStatus.xe&&inertiaStatus.modifiedYe===inertiaStatus.ye){inertiaStatus.sx=inertiaStatus.xe*progress;inertiaStatus.sy=inertiaStatus.ye*progress}else{var quadPoint=getQuadraticCurvePoint(0,0,inertiaStatus.xe,inertiaStatus.ye,inertiaStatus.modifiedXe,inertiaStatus.modifiedYe,progress);inertiaStatus.sx=quadPoint.x;inertiaStatus.sy=quadPoint.y}this.pointerMove(inertiaStatus.startEvent,inertiaStatus.startEvent);inertiaStatus.i=reqFrame(this.boundInertiaFrame)}else{inertiaStatus.ending=true;inertiaStatus.sx=inertiaStatus.modifiedXe;inertiaStatus.sy=inertiaStatus.modifiedYe;this.pointerMove(inertiaStatus.startEvent,inertiaStatus.startEvent);this.pointerEnd(inertiaStatus.startEvent,inertiaStatus.startEvent);inertiaStatus.active=inertiaStatus.ending=false}},smoothEndFrame:function(){var inertiaStatus=this.inertiaStatus,t=(new Date).getTime()-inertiaStatus.t0,duration=this.target.options[this.prepared.name].inertia.smoothEndDuration;if(t<duration){inertiaStatus.sx=easeOutQuad(t,0,inertiaStatus.xe,duration);inertiaStatus.sy=easeOutQuad(t,0,inertiaStatus.ye,duration);this.pointerMove(inertiaStatus.startEvent,inertiaStatus.startEvent);inertiaStatus.i=reqFrame(this.boundSmoothEndFrame)}else{inertiaStatus.ending=true;inertiaStatus.sx=inertiaStatus.xe;inertiaStatus.sy=inertiaStatus.ye;this.pointerMove(inertiaStatus.startEvent,inertiaStatus.startEvent);this.pointerEnd(inertiaStatus.startEvent,inertiaStatus.startEvent);inertiaStatus.smoothEnd=inertiaStatus.active=inertiaStatus.ending=false}},addPointer:function(pointer){var id=getPointerId(pointer),index=this.mouse?0:indexOf(this.pointerIds,id);if(index===-1){index=this.pointerIds.length}this.pointerIds[index]=id;this.pointers[index]=pointer;return index},removePointer:function(pointer){var id=getPointerId(pointer),index=this.mouse?0:indexOf(this.pointerIds,id);if(index===-1){return}this.pointers.splice(index,1);this.pointerIds.splice(index,1);this.downTargets.splice(index,1);this.downTimes.splice(index,1);this.holdTimers.splice(index,1)},recordPointer:function(pointer){var index=this.mouse?0:indexOf(this.pointerIds,getPointerId(pointer));if(index===-1){return}this.pointers[index]=pointer},collectEventTargets:function(pointer,event,eventTarget,eventType){var pointerIndex=this.mouse?0:indexOf(this.pointerIds,getPointerId(pointer));if(eventType==="tap"&&(this.pointerWasMoved||!(this.downTargets[pointerIndex]&&this.downTargets[pointerIndex]===eventTarget))){return}var targets=[],elements=[],element=eventTarget;function collectSelectors(interactable,selector,context){var els=ie8MatchesSelector?context.querySelectorAll(selector):undefined;if(interactable._iEvents[eventType]&&isElement(element)&&inContext(interactable,element)&&!testIgnore(interactable,element,eventTarget)&&testAllow(interactable,element,eventTarget)&&matchesSelector(element,selector,els)){targets.push(interactable);elements.push(element)}}while(element){if(interact.isSet(element)&&interact(element)._iEvents[eventType]){targets.push(interact(element));elements.push(element)}interactables.forEachSelector(collectSelectors);element=parentElement(element)}if(targets.length||eventType==="tap"){this.firePointers(pointer,event,eventTarget,targets,elements,eventType)}},firePointers:function(pointer,event,eventTarget,targets,elements,eventType){var pointerIndex=this.mouse?0:indexOf(this.pointerIds,getPointerId(pointer)),pointerEvent={},i,interval,createNewDoubleTap;if(eventType==="doubletap"){pointerEvent=pointer}else{pointerExtend(pointerEvent,event);if(event!==pointer){pointerExtend(pointerEvent,pointer)}pointerEvent.preventDefault=preventOriginalDefault;pointerEvent.stopPropagation=InteractEvent.prototype.stopPropagation;pointerEvent.stopImmediatePropagation=InteractEvent.prototype.stopImmediatePropagation;pointerEvent.interaction=this;pointerEvent.timeStamp=(new Date).getTime();pointerEvent.originalEvent=event;pointerEvent.originalPointer=pointer;pointerEvent.type=eventType;pointerEvent.pointerId=getPointerId(pointer);pointerEvent.pointerType=this.mouse?"mouse":!supportsPointerEvent?"touch":isString(pointer.pointerType)?pointer.pointerType:[,,"touch","pen","mouse"][pointer.pointerType]}if(eventType==="tap"){pointerEvent.dt=pointerEvent.timeStamp-this.downTimes[pointerIndex];interval=pointerEvent.timeStamp-this.tapTime;createNewDoubleTap=!!(this.prevTap&&this.prevTap.type!=="doubletap"&&this.prevTap.target===pointerEvent.target&&interval<500);pointerEvent.double=createNewDoubleTap;this.tapTime=pointerEvent.timeStamp}for(i=0;i<targets.length;i++){pointerEvent.currentTarget=elements[i];pointerEvent.interactable=targets[i];targets[i].fire(pointerEvent);if(pointerEvent.immediatePropagationStopped||pointerEvent.propagationStopped&&elements[i+1]!==pointerEvent.currentTarget){break}}if(createNewDoubleTap){var doubleTap={};extend(doubleTap,pointerEvent);doubleTap.dt=interval;doubleTap.type="doubletap";this.collectEventTargets(doubleTap,event,eventTarget,"doubletap");this.prevTap=doubleTap}else if(eventType==="tap"){this.prevTap=pointerEvent}},validateSelector:function(pointer,event,matches,matchElements){for(var i=0,len=matches.length;i<len;i++){var match=matches[i],matchElement=matchElements[i],action=validateAction(match.getAction(pointer,event,this,matchElement),match);if(action&&withinInteractionLimit(match,matchElement,action)){this.target=match;this.element=matchElement;return action}}},setSnapping:function(pageCoords,status){var snap=this.target.options[this.prepared.name].snap,targets=[],target,page,i;status=status||this.snapStatus;if(status.useStatusXY){page={x:status.x,y:status.y}}else{var origin=getOriginXY(this.target,this.element);page=extend({},pageCoords);page.x-=origin.x;page.y-=origin.y}status.realX=page.x;status.realY=page.y;page.x=page.x-this.inertiaStatus.resumeDx;page.y=page.y-this.inertiaStatus.resumeDy;var len=snap.targets?snap.targets.length:0;for(var relIndex=0;relIndex<this.snapOffsets.length;relIndex++){var relative={x:page.x-this.snapOffsets[relIndex].x,y:page.y-this.snapOffsets[relIndex].y};for(i=0;i<len;i++){if(isFunction(snap.targets[i])){target=snap.targets[i](relative.x,relative.y,this)}else{target=snap.targets[i]}if(!target){continue}targets.push({x:isNumber(target.x)?target.x+this.snapOffsets[relIndex].x:relative.x,y:isNumber(target.y)?target.y+this.snapOffsets[relIndex].y:relative.y,range:isNumber(target.range)?target.range:snap.range})}}var closest={target:null,inRange:false,distance:0,range:0,dx:0,dy:0};for(i=0,len=targets.length;i<len;i++){target=targets[i];var range=target.range,dx=target.x-page.x,dy=target.y-page.y,distance=hypot(dx,dy),inRange=distance<=range;if(range===Infinity&&closest.inRange&&closest.range!==Infinity){inRange=false}if(!closest.target||(inRange?closest.inRange&&range!==Infinity?distance/range<closest.distance/closest.range:range===Infinity&&closest.range!==Infinity||distance<closest.distance:!closest.inRange&&distance<closest.distance)){if(range===Infinity){inRange=true}closest.target=target;closest.distance=distance;closest.range=range;closest.inRange=inRange;closest.dx=dx;closest.dy=dy;status.range=range}}var snapChanged;if(closest.target){snapChanged=status.snappedX!==closest.target.x||status.snappedY!==closest.target.y;status.snappedX=closest.target.x;status.snappedY=closest.target.y}else{snapChanged=true;status.snappedX=NaN;status.snappedY=NaN}status.dx=closest.dx;status.dy=closest.dy;status.changed=snapChanged||closest.inRange&&!status.locked;status.locked=closest.inRange;return status},setRestriction:function(pageCoords,status){var target=this.target,restrict=target&&target.options[this.prepared.name].restrict,restriction=restrict&&restrict.restriction,page;if(!restriction){return status}status=status||this.restrictStatus;page=status.useStatusXY?page={x:status.x,y:status.y}:page=extend({},pageCoords);if(status.snap&&status.snap.locked){page.x+=status.snap.dx||0;page.y+=status.snap.dy||0}page.x-=this.inertiaStatus.resumeDx;page.y-=this.inertiaStatus.resumeDy;status.dx=0;status.dy=0;status.restricted=false;var rect,restrictedX,restrictedY;if(isString(restriction)){if(restriction==="parent"){restriction=parentElement(this.element)}else if(restriction==="self"){restriction=target.getRect(this.element)}else{restriction=closest(this.element,restriction)}if(!restriction){return status}}if(isFunction(restriction)){restriction=restriction(page.x,page.y,this.element)}if(isElement(restriction)){restriction=getElementRect(restriction)}rect=restriction;if(!restriction){restrictedX=page.x;restrictedY=page.y}else if("x"in restriction&&"y"in restriction){restrictedX=Math.max(Math.min(rect.x+rect.width-this.restrictOffset.right,page.x),rect.x+this.restrictOffset.left);restrictedY=Math.max(Math.min(rect.y+rect.height-this.restrictOffset.bottom,page.y),rect.y+this.restrictOffset.top)}else{restrictedX=Math.max(Math.min(rect.right-this.restrictOffset.right,page.x),rect.left+this.restrictOffset.left);restrictedY=Math.max(Math.min(rect.bottom-this.restrictOffset.bottom,page.y),rect.top+this.restrictOffset.top)}status.dx=restrictedX-page.x;status.dy=restrictedY-page.y;status.changed=status.restrictedX!==restrictedX||status.restrictedY!==restrictedY;status.restricted=!!(status.dx||status.dy);status.restrictedX=restrictedX;status.restrictedY=restrictedY;return status},checkAndPreventDefault:function(event,interactable,element){if(!(interactable=interactable||this.target)){return}var options=interactable.options,prevent=options.preventDefault;if(prevent==="auto"&&element&&!/^(input|select|textarea)$/i.test(event.target.nodeName)){if(/down|start/i.test(event.type)&&this.prepared.name==="drag"&&options.drag.axis!=="xy"){return}if(options[this.prepared.name]&&options[this.prepared.name].manualStart&&!this.interacting()){return}event.preventDefault();return}if(prevent==="always"){event.preventDefault();return}},calcInertia:function(status){var inertiaOptions=this.target.options[this.prepared.name].inertia,lambda=inertiaOptions.resistance,inertiaDur=-Math.log(inertiaOptions.endSpeed/status.v0)/lambda;status.x0=this.prevEvent.pageX;status.y0=this.prevEvent.pageY;status.t0=status.startEvent.timeStamp/1e3;status.sx=status.sy=0;status.modifiedXe=status.xe=(status.vx0-inertiaDur)/lambda;status.modifiedYe=status.ye=(status.vy0-inertiaDur)/lambda;status.te=inertiaDur;status.lambda_v0=lambda/status.v0;status.one_ve_v0=1-inertiaOptions.endSpeed/status.v0},autoScrollMove:function(pointer){if(!(this.interacting()&&checkAutoScroll(this.target,this.prepared.name))){return}if(this.inertiaStatus.active){autoScroll.x=autoScroll.y=0;return}var top,right,bottom,left,options=this.target.options[this.prepared.name].autoScroll,container=options.container||getWindow(this.element);if(isWindow(container)){left=pointer.clientX<autoScroll.margin;top=pointer.clientY<autoScroll.margin;right=pointer.clientX>container.innerWidth-autoScroll.margin;bottom=pointer.clientY>container.innerHeight-autoScroll.margin}else{var rect=getElementClientRect(container);left=pointer.clientX<rect.left+autoScroll.margin;top=pointer.clientY<rect.top+autoScroll.margin;right=pointer.clientX>rect.right-autoScroll.margin;bottom=pointer.clientY>rect.bottom-autoScroll.margin}autoScroll.x=right?1:left?-1:0;autoScroll.y=bottom?1:top?-1:0;if(!autoScroll.isScrolling){autoScroll.margin=options.margin;autoScroll.speed=options.speed;autoScroll.start(this)}},_updateEventTargets:function(target,currentTarget){this._eventTarget=target;this._curEventTarget=currentTarget}};function getInteractionFromPointer(pointer,eventType,eventTarget){var i=0,len=interactions.length,mouseEvent=/mouse/i.test(pointer.pointerType||eventType)||pointer.pointerType===4,interaction;var id=getPointerId(pointer);if(/down|start/i.test(eventType)){for(i=0;i<len;i++){interaction=interactions[i];var element=eventTarget;if(interaction.inertiaStatus.active&&interaction.target.options[interaction.prepared.name].inertia.allowResume&&interaction.mouse===mouseEvent){while(element){if(element===interaction.element){return interaction}element=parentElement(element)}}}}if(mouseEvent||!(supportsTouch||supportsPointerEvent)){for(i=0;i<len;i++){if(interactions[i].mouse&&!interactions[i].inertiaStatus.active){return interactions[i]}}for(i=0;i<len;i++){if(interactions[i].mouse&&!(/down/.test(eventType)&&interactions[i].inertiaStatus.active)){return interaction}}interaction=new Interaction;interaction.mouse=true;return interaction}for(i=0;i<len;i++){if(contains(interactions[i].pointerIds,id)){return interactions[i]}}if(/up|end|out/i.test(eventType)){return null}for(i=0;i<len;i++){interaction=interactions[i];if((!interaction.prepared.name||interaction.target.options.gesture.enabled)&&!interaction.interacting()&&!(!mouseEvent&&interaction.mouse)){return interaction}}return new Interaction}function doOnInteractions(method){return function(event){var interaction,eventTarget=getActualElement(event.path?event.path[0]:event.target),curEventTarget=getActualElement(event.currentTarget),i;if(supportsTouch&&/touch/.test(event.type)){prevTouchTime=(new Date).getTime();for(i=0;i<event.changedTouches.length;i++){var pointer=event.changedTouches[i];interaction=getInteractionFromPointer(pointer,event.type,eventTarget);if(!interaction){
continue}interaction._updateEventTargets(eventTarget,curEventTarget);interaction[method](pointer,event,eventTarget,curEventTarget)}}else{if(!supportsPointerEvent&&/mouse/.test(event.type)){for(i=0;i<interactions.length;i++){if(!interactions[i].mouse&&interactions[i].pointerIsDown){return}}if((new Date).getTime()-prevTouchTime<500){return}}interaction=getInteractionFromPointer(event,event.type,eventTarget);if(!interaction){return}interaction._updateEventTargets(eventTarget,curEventTarget);interaction[method](event,event,eventTarget,curEventTarget)}}}function InteractEvent(interaction,event,action,phase,element,related){var client,page,target=interaction.target,snapStatus=interaction.snapStatus,restrictStatus=interaction.restrictStatus,pointers=interaction.pointers,deltaSource=(target&&target.options||defaultOptions).deltaSource,sourceX=deltaSource+"X",sourceY=deltaSource+"Y",options=target?target.options:defaultOptions,origin=getOriginXY(target,element),starting=phase==="start",ending=phase==="end",coords=starting?interaction.startCoords:interaction.curCoords;element=element||interaction.element;page=extend({},coords.page);client=extend({},coords.client);page.x-=origin.x;page.y-=origin.y;client.x-=origin.x;client.y-=origin.y;var relativePoints=options[action].snap&&options[action].snap.relativePoints;if(checkSnap(target,action)&&!(starting&&relativePoints&&relativePoints.length)){this.snap={range:snapStatus.range,locked:snapStatus.locked,x:snapStatus.snappedX,y:snapStatus.snappedY,realX:snapStatus.realX,realY:snapStatus.realY,dx:snapStatus.dx,dy:snapStatus.dy};if(snapStatus.locked){page.x+=snapStatus.dx;page.y+=snapStatus.dy;client.x+=snapStatus.dx;client.y+=snapStatus.dy}}if(checkRestrict(target,action)&&!(starting&&options[action].restrict.elementRect)&&restrictStatus.restricted){page.x+=restrictStatus.dx;page.y+=restrictStatus.dy;client.x+=restrictStatus.dx;client.y+=restrictStatus.dy;this.restrict={dx:restrictStatus.dx,dy:restrictStatus.dy}}this.pageX=page.x;this.pageY=page.y;this.clientX=client.x;this.clientY=client.y;this.x0=interaction.startCoords.page.x-origin.x;this.y0=interaction.startCoords.page.y-origin.y;this.clientX0=interaction.startCoords.client.x-origin.x;this.clientY0=interaction.startCoords.client.y-origin.y;this.ctrlKey=event.ctrlKey;this.altKey=event.altKey;this.shiftKey=event.shiftKey;this.metaKey=event.metaKey;this.button=event.button;this.buttons=event.buttons;this.target=element;this.t0=interaction.downTimes[0];this.type=action+(phase||"");this.interaction=interaction;this.interactable=target;var inertiaStatus=interaction.inertiaStatus;if(inertiaStatus.active){this.detail="inertia"}if(related){this.relatedTarget=related}if(ending){if(deltaSource==="client"){this.dx=client.x-interaction.startCoords.client.x;this.dy=client.y-interaction.startCoords.client.y}else{this.dx=page.x-interaction.startCoords.page.x;this.dy=page.y-interaction.startCoords.page.y}}else if(starting){this.dx=0;this.dy=0}else if(phase==="inertiastart"){this.dx=interaction.prevEvent.dx;this.dy=interaction.prevEvent.dy}else{if(deltaSource==="client"){this.dx=client.x-interaction.prevEvent.clientX;this.dy=client.y-interaction.prevEvent.clientY}else{this.dx=page.x-interaction.prevEvent.pageX;this.dy=page.y-interaction.prevEvent.pageY}}if(interaction.prevEvent&&interaction.prevEvent.detail==="inertia"&&!inertiaStatus.active&&options[action].inertia&&options[action].inertia.zeroResumeDelta){inertiaStatus.resumeDx+=this.dx;inertiaStatus.resumeDy+=this.dy;this.dx=this.dy=0}if(action==="resize"&&interaction.resizeAxes){if(options.resize.square){if(interaction.resizeAxes==="y"){this.dx=this.dy}else{this.dy=this.dx}this.axes="xy"}else{this.axes=interaction.resizeAxes;if(interaction.resizeAxes==="x"){this.dy=0}else if(interaction.resizeAxes==="y"){this.dx=0}}}else if(action==="gesture"){this.touches=[pointers[0],pointers[1]];if(starting){this.distance=touchDistance(pointers,deltaSource);this.box=touchBBox(pointers);this.scale=1;this.ds=0;this.angle=touchAngle(pointers,undefined,deltaSource);this.da=0}else if(ending||event instanceof InteractEvent){this.distance=interaction.prevEvent.distance;this.box=interaction.prevEvent.box;this.scale=interaction.prevEvent.scale;this.ds=this.scale-1;this.angle=interaction.prevEvent.angle;this.da=this.angle-interaction.gesture.startAngle}else{this.distance=touchDistance(pointers,deltaSource);this.box=touchBBox(pointers);this.scale=this.distance/interaction.gesture.startDistance;this.angle=touchAngle(pointers,interaction.gesture.prevAngle,deltaSource);this.ds=this.scale-interaction.gesture.prevScale;this.da=this.angle-interaction.gesture.prevAngle}}if(starting){this.timeStamp=interaction.downTimes[0];this.dt=0;this.duration=0;this.speed=0;this.velocityX=0;this.velocityY=0}else if(phase==="inertiastart"){this.timeStamp=interaction.prevEvent.timeStamp;this.dt=interaction.prevEvent.dt;this.duration=interaction.prevEvent.duration;this.speed=interaction.prevEvent.speed;this.velocityX=interaction.prevEvent.velocityX;this.velocityY=interaction.prevEvent.velocityY}else{this.timeStamp=(new Date).getTime();this.dt=this.timeStamp-interaction.prevEvent.timeStamp;this.duration=this.timeStamp-interaction.downTimes[0];if(event instanceof InteractEvent){var dx=this[sourceX]-interaction.prevEvent[sourceX],dy=this[sourceY]-interaction.prevEvent[sourceY],dt=this.dt/1e3;this.speed=hypot(dx,dy)/dt;this.velocityX=dx/dt;this.velocityY=dy/dt}else{this.speed=interaction.pointerDelta[deltaSource].speed;this.velocityX=interaction.pointerDelta[deltaSource].vx;this.velocityY=interaction.pointerDelta[deltaSource].vy}}if((ending||phase==="inertiastart")&&interaction.prevEvent.speed>600&&this.timeStamp-interaction.prevEvent.timeStamp<150){var angle=180*Math.atan2(interaction.prevEvent.velocityY,interaction.prevEvent.velocityX)/Math.PI,overlap=22.5;if(angle<0){angle+=360}var left=135-overlap<=angle&&angle<225+overlap,up=225-overlap<=angle&&angle<315+overlap,right=!left&&(315-overlap<=angle||angle<45+overlap),down=!up&&45-overlap<=angle&&angle<135+overlap;this.swipe={up:up,down:down,left:left,right:right,angle:angle,speed:interaction.prevEvent.speed,velocity:{x:interaction.prevEvent.velocityX,y:interaction.prevEvent.velocityY}}}}InteractEvent.prototype={preventDefault:blank,stopImmediatePropagation:function(){this.immediatePropagationStopped=this.propagationStopped=true},stopPropagation:function(){this.propagationStopped=true}};function preventOriginalDefault(){this.originalEvent.preventDefault()}function getActionCursor(action){var cursor="";if(action.name==="drag"){cursor=actionCursors.drag}if(action.name==="resize"){if(action.axis){cursor=actionCursors[action.name+action.axis]}else if(action.edges){var cursorKey="resize",edgeNames=["top","bottom","left","right"];for(var i=0;i<4;i++){if(action.edges[edgeNames[i]]){cursorKey+=edgeNames[i]}}cursor=actionCursors[cursorKey]}}return cursor}function checkResizeEdge(name,value,page,element,interactableElement,rect,margin){if(!value){return false}if(value===true){var width=isNumber(rect.width)?rect.width:rect.right-rect.left,height=isNumber(rect.height)?rect.height:rect.bottom-rect.top;if(width<0){if(name==="left"){name="right"}else if(name==="right"){name="left"}}if(height<0){if(name==="top"){name="bottom"}else if(name==="bottom"){name="top"}}if(name==="left"){return page.x<(width>=0?rect.left:rect.right)+margin}if(name==="top"){return page.y<(height>=0?rect.top:rect.bottom)+margin}if(name==="right"){return page.x>(width>=0?rect.right:rect.left)-margin}if(name==="bottom"){return page.y>(height>=0?rect.bottom:rect.top)-margin}}if(!isElement(element)){return false}return isElement(value)?value===element:matchesUpTo(element,value,interactableElement)}function defaultActionChecker(pointer,interaction,element){var rect=this.getRect(element),shouldResize=false,action=null,resizeAxes=null,resizeEdges,page=extend({},interaction.curCoords.page),options=this.options;if(!rect){return null}if(actionIsEnabled.resize&&options.resize.enabled){var resizeOptions=options.resize;resizeEdges={left:false,right:false,top:false,bottom:false};if(isObject(resizeOptions.edges)){for(var edge in resizeEdges){resizeEdges[edge]=checkResizeEdge(edge,resizeOptions.edges[edge],page,interaction._eventTarget,element,rect,resizeOptions.margin||margin)}resizeEdges.left=resizeEdges.left&&!resizeEdges.right;resizeEdges.top=resizeEdges.top&&!resizeEdges.bottom;shouldResize=resizeEdges.left||resizeEdges.right||resizeEdges.top||resizeEdges.bottom}else{var right=options.resize.axis!=="y"&&page.x>rect.right-margin,bottom=options.resize.axis!=="x"&&page.y>rect.bottom-margin;shouldResize=right||bottom;resizeAxes=(right?"x":"")+(bottom?"y":"")}}action=shouldResize?"resize":actionIsEnabled.drag&&options.drag.enabled?"drag":null;if(actionIsEnabled.gesture&&interaction.pointerIds.length>=2&&!(interaction.dragging||interaction.resizing)){action="gesture"}if(action){return{name:action,axis:resizeAxes,edges:resizeEdges}}return null}function validateAction(action,interactable){if(!isObject(action)){return null}var actionName=action.name,options=interactable.options;if((actionName==="resize"&&options.resize.enabled||actionName==="drag"&&options.drag.enabled||actionName==="gesture"&&options.gesture.enabled)&&actionIsEnabled[actionName]){if(actionName==="resize"||actionName==="resizeyx"){actionName="resizexy"}return action}return null}var listeners={},interactionListeners=["dragStart","dragMove","resizeStart","resizeMove","gestureStart","gestureMove","pointerOver","pointerOut","pointerHover","selectorDown","pointerDown","pointerMove","pointerUp","pointerCancel","pointerEnd","addPointer","removePointer","recordPointer","autoScrollMove"];for(var i=0,len=interactionListeners.length;i<len;i++){var name=interactionListeners[i];listeners[name]=doOnInteractions(name)}function delegateListener(event,useCapture){var fakeEvent={},delegated=delegatedEvents[event.type],eventTarget=getActualElement(event.path?event.path[0]:event.target),element=eventTarget;useCapture=useCapture?true:false;for(var prop in event){fakeEvent[prop]=event[prop]}fakeEvent.originalEvent=event;fakeEvent.preventDefault=preventOriginalDefault;while(isElement(element)){for(var i=0;i<delegated.selectors.length;i++){var selector=delegated.selectors[i],context=delegated.contexts[i];if(matchesSelector(element,selector)&&nodeContains(context,eventTarget)&&nodeContains(context,element)){var listeners=delegated.listeners[i];fakeEvent.currentTarget=element;for(var j=0;j<listeners.length;j++){if(listeners[j][1]===useCapture){listeners[j][0](fakeEvent)}}}}element=parentElement(element)}}function delegateUseCapture(event){return delegateListener.call(this,event,true)}interactables.indexOfElement=function indexOfElement(element,context){context=context||document;for(var i=0;i<this.length;i++){var interactable=this[i];if(interactable.selector===element&&interactable._context===context||!interactable.selector&&interactable._element===element){return i}}return-1};interactables.get=function interactableGet(element,options){return this[this.indexOfElement(element,options&&options.context)]};interactables.forEachSelector=function(callback){for(var i=0;i<this.length;i++){var interactable=this[i];if(!interactable.selector){continue}var ret=callback(interactable,interactable.selector,interactable._context,i,this);if(ret!==undefined){return ret}}};function interact(element,options){return interactables.get(element,options)||new Interactable(element,options)}function Interactable(element,options){this._element=element;this._iEvents=this._iEvents||{};var _window;if(trySelector(element)){this.selector=element;var context=options&&options.context;_window=context?getWindow(context):window;if(context&&(_window.Node?context instanceof _window.Node:isElement(context)||context===_window.document)){this._context=context}}else{_window=getWindow(element);if(isElement(element,_window)){if(supportsPointerEvent){events.add(this._element,pEventTypes.down,listeners.pointerDown);events.add(this._element,pEventTypes.move,listeners.pointerHover)}else{events.add(this._element,"mousedown",listeners.pointerDown);events.add(this._element,"mousemove",listeners.pointerHover);events.add(this._element,"touchstart",listeners.pointerDown);events.add(this._element,"touchmove",listeners.pointerHover)}}}this._doc=_window.document;if(!contains(documents,this._doc)){listenToDocument(this._doc)}interactables.push(this);this.set(options)}Interactable.prototype={setOnEvents:function(action,phases){if(action==="drop"){if(isFunction(phases.ondrop)){this.ondrop=phases.ondrop}if(isFunction(phases.ondropactivate)){this.ondropactivate=phases.ondropactivate}if(isFunction(phases.ondropdeactivate)){this.ondropdeactivate=phases.ondropdeactivate}if(isFunction(phases.ondragenter)){this.ondragenter=phases.ondragenter}if(isFunction(phases.ondragleave)){this.ondragleave=phases.ondragleave}if(isFunction(phases.ondropmove)){this.ondropmove=phases.ondropmove}}else{action="on"+action;if(isFunction(phases.onstart)){this[action+"start"]=phases.onstart}if(isFunction(phases.onmove)){this[action+"move"]=phases.onmove}if(isFunction(phases.onend)){this[action+"end"]=phases.onend}if(isFunction(phases.oninertiastart)){this[action+"inertiastart"]=phases.oninertiastart}}return this},draggable:function(options){if(isObject(options)){this.options.drag.enabled=options.enabled===false?false:true;this.setPerAction("drag",options);this.setOnEvents("drag",options);if(/^x$|^y$|^xy$/.test(options.axis)){this.options.drag.axis=options.axis}else if(options.axis===null){delete this.options.drag.axis}return this}if(isBool(options)){this.options.drag.enabled=options;return this}return this.options.drag},setPerAction:function(action,options){for(var option in options){if(option in defaultOptions[action]){if(isObject(options[option])){this.options[action][option]=extend(this.options[action][option]||{},options[option]);if(isObject(defaultOptions.perAction[option])&&"enabled"in defaultOptions.perAction[option]){this.options[action][option].enabled=options[option].enabled===false?false:true}}else if(isBool(options[option])&&isObject(defaultOptions.perAction[option])){this.options[action][option].enabled=options[option]}else if(options[option]!==undefined){this.options[action][option]=options[option]}}}},dropzone:function(options){if(isObject(options)){this.options.drop.enabled=options.enabled===false?false:true;this.setOnEvents("drop",options);if(/^(pointer|center)$/.test(options.overlap)){this.options.drop.overlap=options.overlap}else if(isNumber(options.overlap)){this.options.drop.overlap=Math.max(Math.min(1,options.overlap),0)}if("accept"in options){this.options.drop.accept=options.accept}if("checker"in options){this.options.drop.checker=options.checker}return this}if(isBool(options)){this.options.drop.enabled=options;return this}return this.options.drop},dropCheck:function(dragEvent,event,draggable,draggableElement,dropElement,rect){var dropped=false;if(!(rect=rect||this.getRect(dropElement))){return this.options.drop.checker?this.options.drop.checker(dragEvent,event,dropped,this,dropElement,draggable,draggableElement):false}var dropOverlap=this.options.drop.overlap;if(dropOverlap==="pointer"){var page=getPageXY(dragEvent),origin=getOriginXY(draggable,draggableElement),horizontal,vertical;page.x+=origin.x;page.y+=origin.y;horizontal=page.x>rect.left&&page.x<rect.right;vertical=page.y>rect.top&&page.y<rect.bottom;dropped=horizontal&&vertical}var dragRect=draggable.getRect(draggableElement);if(dropOverlap==="center"){var cx=dragRect.left+dragRect.width/2,cy=dragRect.top+dragRect.height/2;dropped=cx>=rect.left&&cx<=rect.right&&cy>=rect.top&&cy<=rect.bottom}if(isNumber(dropOverlap)){var overlapArea=Math.max(0,Math.min(rect.right,dragRect.right)-Math.max(rect.left,dragRect.left))*Math.max(0,Math.min(rect.bottom,dragRect.bottom)-Math.max(rect.top,dragRect.top)),overlapRatio=overlapArea/(dragRect.width*dragRect.height);dropped=overlapRatio>=dropOverlap}if(this.options.drop.checker){dropped=this.options.drop.checker(dragEvent,event,dropped,this,dropElement,draggable,draggableElement)}return dropped},dropChecker:function(checker){if(isFunction(checker)){this.options.drop.checker=checker;return this}if(checker===null){delete this.options.getRect;return this}return this.options.drop.checker},accept:function(newValue){if(isElement(newValue)){this.options.drop.accept=newValue;return this}if(trySelector(newValue)){this.options.drop.accept=newValue;return this}if(newValue===null){delete this.options.drop.accept;return this}return this.options.drop.accept},resizable:function(options){if(isObject(options)){this.options.resize.enabled=options.enabled===false?false:true;this.setPerAction("resize",options);this.setOnEvents("resize",options);if(/^x$|^y$|^xy$/.test(options.axis)){this.options.resize.axis=options.axis}else if(options.axis===null){this.options.resize.axis=defaultOptions.resize.axis}if(isBool(options.preserveAspectRatio)){this.options.resize.preserveAspectRatio=options.preserveAspectRatio}else if(isBool(options.square)){this.options.resize.square=options.square}return this}if(isBool(options)){this.options.resize.enabled=options;return this}return this.options.resize},squareResize:function(newValue){if(isBool(newValue)){this.options.resize.square=newValue;return this}if(newValue===null){delete this.options.resize.square;return this}return this.options.resize.square},gesturable:function(options){if(isObject(options)){this.options.gesture.enabled=options.enabled===false?false:true;this.setPerAction("gesture",options);this.setOnEvents("gesture",options);return this}if(isBool(options)){this.options.gesture.enabled=options;return this}return this.options.gesture},autoScroll:function(options){if(isObject(options)){options=extend({actions:["drag","resize"]},options)}else if(isBool(options)){options={actions:["drag","resize"],enabled:options}}return this.setOptions("autoScroll",options)},snap:function(options){var ret=this.setOptions("snap",options);if(ret===this){return this}return ret.drag},setOptions:function(option,options){var actions=options&&isArray(options.actions)?options.actions:["drag"];var i;if(isObject(options)||isBool(options)){for(i=0;i<actions.length;i++){var action=/resize/.test(actions[i])?"resize":actions[i];if(!isObject(this.options[action])){continue}var thisOption=this.options[action][option];if(isObject(options)){extend(thisOption,options);thisOption.enabled=options.enabled===false?false:true;if(option==="snap"){if(thisOption.mode==="grid"){thisOption.targets=[interact.createSnapGrid(extend({offset:thisOption.gridOffset||{x:0,y:0}},thisOption.grid||{}))]}else if(thisOption.mode==="anchor"){thisOption.targets=thisOption.anchors}else if(thisOption.mode==="path"){thisOption.targets=thisOption.paths}if("elementOrigin"in options){thisOption.relativePoints=[options.elementOrigin]}}}else if(isBool(options)){thisOption.enabled=options}}return this}var ret={},allActions=["drag","resize","gesture"];for(i=0;i<allActions.length;i++){if(option in defaultOptions[allActions[i]]){ret[allActions[i]]=this.options[allActions[i]][option]}}return ret},inertia:function(options){var ret=this.setOptions("inertia",options);if(ret===this){return this}return ret.drag},getAction:function(pointer,event,interaction,element){var action=this.defaultActionChecker(pointer,interaction,element);if(this.options.actionChecker){return this.options.actionChecker(pointer,event,action,this,element,interaction)}return action},defaultActionChecker:defaultActionChecker,actionChecker:function(checker){if(isFunction(checker)){this.options.actionChecker=checker;return this}if(checker===null){delete this.options.actionChecker;return this}return this.options.actionChecker},getRect:function rectCheck(element){element=element||this._element;if(this.selector&&!isElement(element)){element=this._context.querySelector(this.selector)}return getElementRect(element)},rectChecker:function(checker){if(isFunction(checker)){this.getRect=checker;return this}if(checker===null){delete this.options.getRect;return this}return this.getRect},styleCursor:function(newValue){if(isBool(newValue)){this.options.styleCursor=newValue;return this}if(newValue===null){delete this.options.styleCursor;return this}return this.options.styleCursor},preventDefault:function(newValue){if(/^(always|never|auto)$/.test(newValue)){this.options.preventDefault=newValue;return this}if(isBool(newValue)){this.options.preventDefault=newValue?"always":"never";return this}return this.options.preventDefault},origin:function(newValue){if(trySelector(newValue)){this.options.origin=newValue;return this}else if(isObject(newValue)){this.options.origin=newValue;return this}return this.options.origin},deltaSource:function(newValue){if(newValue==="page"||newValue==="client"){this.options.deltaSource=newValue;return this}return this.options.deltaSource},restrict:function(options){if(!isObject(options)){return this.setOptions("restrict",options)}var actions=["drag","resize","gesture"],ret;for(var i=0;i<actions.length;i++){var action=actions[i];if(action in options){var perAction=extend({actions:[action],restriction:options[action]},options);ret=this.setOptions("restrict",perAction)}}return ret},context:function(){return this._context},_context:document,ignoreFrom:function(newValue){if(trySelector(newValue)){this.options.ignoreFrom=newValue;return this}if(isElement(newValue)){this.options.ignoreFrom=newValue;return this}return this.options.ignoreFrom},allowFrom:function(newValue){if(trySelector(newValue)){this.options.allowFrom=newValue;return this}if(isElement(newValue)){this.options.allowFrom=newValue;return this}return this.options.allowFrom},element:function(){return this._element},fire:function(iEvent){if(!(iEvent&&iEvent.type)||!contains(eventTypes,iEvent.type)){return this}var listeners,i,len,onEvent="on"+iEvent.type,funcName="";if(iEvent.type in this._iEvents){listeners=this._iEvents[iEvent.type];for(i=0,len=listeners.length;i<len&&!iEvent.immediatePropagationStopped;i++){funcName=listeners[i].name;listeners[i](iEvent)}}if(isFunction(this[onEvent])){funcName=this[onEvent].name;this[onEvent](iEvent)}if(iEvent.type in globalEvents&&(listeners=globalEvents[iEvent.type])){for(i=0,len=listeners.length;i<len&&!iEvent.immediatePropagationStopped;i++){funcName=listeners[i].name;listeners[i](iEvent)}}return this},on:function(eventType,listener,useCapture){var i;if(isString(eventType)&&eventType.search(" ")!==-1){eventType=eventType.trim().split(/ +/)}if(isArray(eventType)){for(i=0;i<eventType.length;i++){this.on(eventType[i],listener,useCapture)}return this}if(isObject(eventType)){for(var prop in eventType){this.on(prop,eventType[prop],listener)}return this}if(eventType==="wheel"){eventType=wheelEvent}useCapture=useCapture?true:false;if(contains(eventTypes,eventType)){if(!(eventType in this._iEvents)){this._iEvents[eventType]=[listener]}else{this._iEvents[eventType].push(listener)}}else if(this.selector){if(!delegatedEvents[eventType]){delegatedEvents[eventType]={selectors:[],contexts:[],listeners:[]};for(i=0;i<documents.length;i++){events.add(documents[i],eventType,delegateListener);events.add(documents[i],eventType,delegateUseCapture,true)}}var delegated=delegatedEvents[eventType],index;for(index=delegated.selectors.length-1;index>=0;index--){if(delegated.selectors[index]===this.selector&&delegated.contexts[index]===this._context){break}}if(index===-1){index=delegated.selectors.length;delegated.selectors.push(this.selector);delegated.contexts.push(this._context);delegated.listeners.push([])}delegated.listeners[index].push([listener,useCapture])}else{events.add(this._element,eventType,listener,useCapture)}return this},off:function(eventType,listener,useCapture){var i;if(isString(eventType)&&eventType.search(" ")!==-1){eventType=eventType.trim().split(/ +/)}if(isArray(eventType)){for(i=0;i<eventType.length;i++){this.off(eventType[i],listener,useCapture)}return this}if(isObject(eventType)){for(var prop in eventType){this.off(prop,eventType[prop],listener)}return this}var eventList,index=-1;useCapture=useCapture?true:false;if(eventType==="wheel"){eventType=wheelEvent}if(contains(eventTypes,eventType)){eventList=this._iEvents[eventType];if(eventList&&(index=indexOf(eventList,listener))!==-1){this._iEvents[eventType].splice(index,1)}}else if(this.selector){var delegated=delegatedEvents[eventType],matchFound=false;if(!delegated){return this}for(index=delegated.selectors.length-1;index>=0;index--){if(delegated.selectors[index]===this.selector&&delegated.contexts[index]===this._context){var listeners=delegated.listeners[index];for(i=listeners.length-1;i>=0;i--){var fn=listeners[i][0],useCap=listeners[i][1];if(fn===listener&&useCap===useCapture){listeners.splice(i,1);if(!listeners.length){delegated.selectors.splice(index,1);delegated.contexts.splice(index,1);delegated.listeners.splice(index,1);events.remove(this._context,eventType,delegateListener);events.remove(this._context,eventType,delegateUseCapture,true);if(!delegated.selectors.length){delegatedEvents[eventType]=null}}matchFound=true;break}}if(matchFound){break}}}}else{events.remove(this._element,eventType,listener,useCapture)}return this},set:function(options){if(!isObject(options)){options={}}this.options=extend({},defaultOptions.base);var i,actions=["drag","drop","resize","gesture"],methods=["draggable","dropzone","resizable","gesturable"],perActions=extend(extend({},defaultOptions.perAction),options[action]||{});for(i=0;i<actions.length;i++){var action=actions[i];this.options[action]=extend({},defaultOptions[action]);this.setPerAction(action,perActions);this[methods[i]](options[action])}var settings=["accept","actionChecker","allowFrom","deltaSource","dropChecker","ignoreFrom","origin","preventDefault","rectChecker","styleCursor"];for(i=0,len=settings.length;i<len;i++){var setting=settings[i];this.options[setting]=defaultOptions.base[setting];if(setting in options){this[setting](options[setting])}}return this},unset:function(){events.remove(this._element,"all");if(!isString(this.selector)){events.remove(this,"all");if(this.options.styleCursor){this._element.style.cursor=""}}else{for(var type in delegatedEvents){var delegated=delegatedEvents[type];for(var i=0;i<delegated.selectors.length;i++){if(delegated.selectors[i]===this.selector&&delegated.contexts[i]===this._context){delegated.selectors.splice(i,1);delegated.contexts.splice(i,1);delegated.listeners.splice(i,1);if(!delegated.selectors.length){delegatedEvents[type]=null}}events.remove(this._context,type,delegateListener);events.remove(this._context,type,delegateUseCapture,true);break}}}this.dropzone(false);interactables.splice(indexOf(interactables,this),1);return interact}};function warnOnce(method,message){var warned=false;return function(){if(!warned){window.console.warn(message);warned=true}return method.apply(this,arguments)}}Interactable.prototype.snap=warnOnce(Interactable.prototype.snap,"Interactable#snap is deprecated. See the new documentation for snapping at http://interactjs.io/docs/snapping");Interactable.prototype.restrict=warnOnce(Interactable.prototype.restrict,"Interactable#restrict is deprecated. See the new documentation for resticting at http://interactjs.io/docs/restriction");Interactable.prototype.inertia=warnOnce(Interactable.prototype.inertia,"Interactable#inertia is deprecated. See the new documentation for inertia at http://interactjs.io/docs/inertia");Interactable.prototype.autoScroll=warnOnce(Interactable.prototype.autoScroll,"Interactable#autoScroll is deprecated. See the new documentation for autoScroll at http://interactjs.io/docs/#autoscroll");Interactable.prototype.squareResize=warnOnce(Interactable.prototype.squareResize,"Interactable#squareResize is deprecated. See http://interactjs.io/docs/#resize-square");Interactable.prototype.accept=warnOnce(Interactable.prototype.accept,"Interactable#accept is deprecated. use Interactable#dropzone({ accept: target }) instead");Interactable.prototype.dropChecker=warnOnce(Interactable.prototype.dropChecker,"Interactable#dropChecker is deprecated. use Interactable#dropzone({ dropChecker: checkerFunction }) instead");Interactable.prototype.context=warnOnce(Interactable.prototype.context,"Interactable#context as a method is deprecated. It will soon be a DOM Node instead");interact.isSet=function(element,options){return interactables.indexOfElement(element,options&&options.context)!==-1};interact.on=function(type,listener,useCapture){if(isString(type)&&type.search(" ")!==-1){type=type.trim().split(/ +/)}if(isArray(type)){for(var i=0;i<type.length;i++){interact.on(type[i],listener,useCapture)}return interact}if(isObject(type)){for(var prop in type){interact.on(prop,type[prop],listener)}return interact}if(contains(eventTypes,type)){if(!globalEvents[type]){globalEvents[type]=[listener]}else{globalEvents[type].push(listener)}}else{events.add(document,type,listener,useCapture)}return interact};interact.off=function(type,listener,useCapture){if(isString(type)&&type.search(" ")!==-1){type=type.trim().split(/ +/)}if(isArray(type)){for(var i=0;i<type.length;i++){interact.off(type[i],listener,useCapture)}return interact}if(isObject(type)){for(var prop in type){interact.off(prop,type[prop],listener)}return interact}if(!contains(eventTypes,type)){events.remove(document,type,listener,useCapture)}else{var index;if(type in globalEvents&&(index=indexOf(globalEvents[type],listener))!==-1){globalEvents[type].splice(index,1)}}return interact};interact.enableDragging=warnOnce(function(newValue){if(newValue!==null&&newValue!==undefined){actionIsEnabled.drag=newValue;return interact}return actionIsEnabled.drag},"interact.enableDragging is deprecated and will soon be removed.");interact.enableResizing=warnOnce(function(newValue){if(newValue!==null&&newValue!==undefined){actionIsEnabled.resize=newValue;return interact}return actionIsEnabled.resize},"interact.enableResizing is deprecated and will soon be removed.");interact.enableGesturing=warnOnce(function(newValue){if(newValue!==null&&newValue!==undefined){actionIsEnabled.gesture=newValue;return interact}return actionIsEnabled.gesture},"interact.enableGesturing is deprecated and will soon be removed.");interact.eventTypes=eventTypes;interact.debug=function(){var interaction=interactions[0]||new Interaction;return{interactions:interactions,target:interaction.target,dragging:interaction.dragging,resizing:interaction.resizing,gesturing:interaction.gesturing,prepared:interaction.prepared,matches:interaction.matches,matchElements:interaction.matchElements,prevCoords:interaction.prevCoords,startCoords:interaction.startCoords,pointerIds:interaction.pointerIds,pointers:interaction.pointers,addPointer:listeners.addPointer,removePointer:listeners.removePointer,recordPointer:listeners.recordPointer,snap:interaction.snapStatus,restrict:interaction.restrictStatus,inertia:interaction.inertiaStatus,downTime:interaction.downTimes[0],downEvent:interaction.downEvent,downPointer:interaction.downPointer,prevEvent:interaction.prevEvent,Interactable:Interactable,interactables:interactables,pointerIsDown:interaction.pointerIsDown,defaultOptions:defaultOptions,defaultActionChecker:defaultActionChecker,actionCursors:actionCursors,dragMove:listeners.dragMove,resizeMove:listeners.resizeMove,gestureMove:listeners.gestureMove,pointerUp:listeners.pointerUp,pointerDown:listeners.pointerDown,pointerMove:listeners.pointerMove,pointerHover:listeners.pointerHover,eventTypes:eventTypes,events:events,globalEvents:globalEvents,delegatedEvents:delegatedEvents,prefixedPropREs:prefixedPropREs}};interact.getPointerAverage=pointerAverage;interact.getTouchBBox=touchBBox;interact.getTouchDistance=touchDistance;interact.getTouchAngle=touchAngle;interact.getElementRect=getElementRect;interact.getElementClientRect=getElementClientRect;interact.matchesSelector=matchesSelector;interact.closest=closest;interact.margin=warnOnce(function(newvalue){if(isNumber(newvalue)){margin=newvalue;return interact}return margin;
},"interact.margin is deprecated. Use interact(target).resizable({ margin: number }); instead.");interact.supportsTouch=function(){return supportsTouch};interact.supportsPointerEvent=function(){return supportsPointerEvent};interact.stop=function(event){for(var i=interactions.length-1;i>=0;i--){interactions[i].stop(event)}return interact};interact.dynamicDrop=function(newValue){if(isBool(newValue)){dynamicDrop=newValue;return interact}return dynamicDrop};interact.pointerMoveTolerance=function(newValue){if(isNumber(newValue)){pointerMoveTolerance=newValue;return this}return pointerMoveTolerance};interact.maxInteractions=function(newValue){if(isNumber(newValue)){maxInteractions=newValue;return this}return maxInteractions};interact.createSnapGrid=function(grid){return function(x,y){var offsetX=0,offsetY=0;if(isObject(grid.offset)){offsetX=grid.offset.x;offsetY=grid.offset.y}var gridx=Math.round((x-offsetX)/grid.x),gridy=Math.round((y-offsetY)/grid.y),newX=gridx*grid.x+offsetX,newY=gridy*grid.y+offsetY;return{x:newX,y:newY,range:grid.range}}};function endAllInteractions(event){for(var i=0;i<interactions.length;i++){interactions[i].pointerEnd(event,event)}}function listenToDocument(doc){if(contains(documents,doc)){return}var win=doc.defaultView||doc.parentWindow;for(var eventType in delegatedEvents){events.add(doc,eventType,delegateListener);events.add(doc,eventType,delegateUseCapture,true)}if(supportsPointerEvent){if(PointerEvent===win.MSPointerEvent){pEventTypes={up:"MSPointerUp",down:"MSPointerDown",over:"mouseover",out:"mouseout",move:"MSPointerMove",cancel:"MSPointerCancel"}}else{pEventTypes={up:"pointerup",down:"pointerdown",over:"pointerover",out:"pointerout",move:"pointermove",cancel:"pointercancel"}}events.add(doc,pEventTypes.down,listeners.selectorDown);events.add(doc,pEventTypes.move,listeners.pointerMove);events.add(doc,pEventTypes.over,listeners.pointerOver);events.add(doc,pEventTypes.out,listeners.pointerOut);events.add(doc,pEventTypes.up,listeners.pointerUp);events.add(doc,pEventTypes.cancel,listeners.pointerCancel);events.add(doc,pEventTypes.move,listeners.autoScrollMove)}else{events.add(doc,"mousedown",listeners.selectorDown);events.add(doc,"mousemove",listeners.pointerMove);events.add(doc,"mouseup",listeners.pointerUp);events.add(doc,"mouseover",listeners.pointerOver);events.add(doc,"mouseout",listeners.pointerOut);events.add(doc,"touchstart",listeners.selectorDown);events.add(doc,"touchmove",listeners.pointerMove);events.add(doc,"touchend",listeners.pointerUp);events.add(doc,"touchcancel",listeners.pointerCancel);events.add(doc,"mousemove",listeners.autoScrollMove);events.add(doc,"touchmove",listeners.autoScrollMove)}events.add(win,"blur",endAllInteractions);try{if(win.frameElement){var parentDoc=win.frameElement.ownerDocument,parentWindow=parentDoc.defaultView;events.add(parentDoc,"mouseup",listeners.pointerEnd);events.add(parentDoc,"touchend",listeners.pointerEnd);events.add(parentDoc,"touchcancel",listeners.pointerEnd);events.add(parentDoc,"pointerup",listeners.pointerEnd);events.add(parentDoc,"MSPointerUp",listeners.pointerEnd);events.add(parentWindow,"blur",endAllInteractions)}}catch(error){interact.windowParentError=error}events.add(doc,"dragstart",function(event){for(var i=0;i<interactions.length;i++){var interaction=interactions[i];if(interaction.element&&(interaction.element===event.target||nodeContains(interaction.element,event.target))){interaction.checkAndPreventDefault(event,interaction.target,interaction.element);return}}});if(events.useAttachEvent){events.add(doc,"selectstart",function(event){var interaction=interactions[0];if(interaction.currentAction()){interaction.checkAndPreventDefault(event)}});events.add(doc,"dblclick",doOnInteractions("ie8Dblclick"))}documents.push(doc)}listenToDocument(document);function indexOf(array,target){for(var i=0,len=array.length;i<len;i++){if(array[i]===target){return i}}return-1}function contains(array,target){return indexOf(array,target)!==-1}function matchesSelector(element,selector,nodeList){if(ie8MatchesSelector){return ie8MatchesSelector(element,selector,nodeList)}if(window!==realWindow){selector=selector.replace(/\/deep\//g," ")}return element[prefixedMatchesSelector](selector)}function matchesUpTo(element,selector,limit){while(isElement(element)){if(matchesSelector(element,selector)){return true}element=parentElement(element);if(element===limit){return matchesSelector(element,selector)}}return false}if(!(prefixedMatchesSelector in Element.prototype)||!isFunction(Element.prototype[prefixedMatchesSelector])){ie8MatchesSelector=function(element,selector,elems){elems=elems||element.parentNode.querySelectorAll(selector);for(var i=0,len=elems.length;i<len;i++){if(elems[i]===element){return true}}return false}}(function(){var lastTime=0,vendors=["ms","moz","webkit","o"];for(var x=0;x<vendors.length&&!realWindow.requestAnimationFrame;++x){reqFrame=realWindow[vendors[x]+"RequestAnimationFrame"];cancelFrame=realWindow[vendors[x]+"CancelAnimationFrame"]||realWindow[vendors[x]+"CancelRequestAnimationFrame"]}if(!reqFrame){reqFrame=function(callback){var currTime=(new Date).getTime(),timeToCall=Math.max(0,16-(currTime-lastTime)),id=setTimeout(function(){callback(currTime+timeToCall)},timeToCall);lastTime=currTime+timeToCall;return id}}if(!cancelFrame){cancelFrame=function(id){clearTimeout(id)}}})();if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){exports=module.exports=interact}exports.interact=interact}else if(typeof define==="function"&&define.amd){define("interact",function(){return interact})}else{realWindow.interact=interact}})(typeof window==="undefined"?undefined:window);
//# sourceMappingURL=dist/interact.min.js.map

/*******************************************/

/*!
 * JavaScript Cookie v2.1.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function () {
            window.Cookies = OldCookies;
            return api;
        };
    }
}(function () {
    function extend () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[ i ];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init (converter) {
        function api (key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
                return;
            }

            // Write

            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);

                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }

                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}

                if (!converter.write) {
                    value = encodeURIComponent(String(value))
                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }

                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);

                return (document.cookie = [
                    key, '=', value,
                    attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
                    attributes.path    && '; path=' + attributes.path,
                    attributes.domain  && '; domain=' + attributes.domain,
                    attributes.secure ? '; secure' : ''
                ].join(''));
            }

            // Read

            if (!key) {
                result = {};
            }

            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()"
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var name = parts[0].replace(rdecode, decodeURIComponent);
                var cookie = parts.slice(1).join('=');

                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    cookie = converter.read ?
                        converter.read(cookie, name) : converter(cookie, name) ||
                        cookie.replace(rdecode, decodeURIComponent);

                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }

            return result;
        }

        api.set = api;
        api.get = function (key) {
            return api(key);
        };
        api.getJSON = function () {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};

        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };

        api.withConverter = init;

        return api;
    }

    return init(function () {});
}));
/* End jQuery Cookie Plugin */

/*******************************************/

var workoffline = false;
var params = parseQuery(scriptParamString);
var sitemode = Cookies.get('sitemode');
var sitesource = Cookies.get('sitesource');

var sitebasemap = "";
if (typeof(Cookies.get('sitebasemap')) != undefined) {
    sitebasemap = Cookies.get('sitebasemap'); 
}

// namespace and OOP to pass arguments from html embed through to an object. (See one.html)
// Allso allows parameters to be passed when scripts are loaded from scripts.

var moduleEmbed = moduleEmbed || (function(){
    return {
        init : function(Args) {
            
            // Adjust to retain parameters from URL.
            params = Args;
            
            // Form page settings
            if(params["sitemode"]) {
                sitemode = params["sitemode"];
            }
            if(params["sitesource"]) {
                sitesource = params["sitesource"];
            }
            if(params["sitebasemap"]) {
                sitebasemap = params["sitebasemap"];
            }
            //alert('params["showgrid"]: ' + params["showgrid"]);

            //alert(params["go"]); // Comes from index.html page.  Needs to use URL param
            //alert(param[""]);

            //initSiteObject(params["go"]); // Was param["go"]
            initSiteObject(param[""]);
            initEvents();
        },
        helloWorld : function() {
            //alert('Hello World! - ' + params["go"]);
        }
    };
}());

var scripts = document.getElementsByTagName('script');
var myScript = scripts[ scripts.length - 1 ];
var scriptParamString = myScript.src.replace(/^[^\?]+\??/,''); // Parameters on javascript include file.
//alert("scriptParamString: " + scriptParamString);
var useCookies = true;
var chkGeoPosition = true;
var priorLayer = "";
var emmersive = true;
var twosides = true;
var detailsOnLeft = false;
var previousWidth = 0;
var root = ""; // Needed for history folder and other external folders.

if (location.host == 'review.georgia.org') {
    //root = ""; // Caused error here: http://review.georgia.org/menu/wrap.html File not found: /menu/js/speech-input.js
}

var showLogin = false;
var currentAccess = 0;
if (location.host == 'localhost' || location.host == 'intranet.georgia.org' || location.host == 'review.georgia.org') {
    showLogin = true;
}
var displayOptions = [];
var layers = new Array(); // PROBABLY DELETE

/*******************************************/

function parseQuery (query) {
   var Params = new Object ();
   if ( ! query ) return Params; // return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) continue;
      var key = unescape( KeyVal[0] ).toLowerCase();
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}

function loadParams(paramStr,hashStr) {
	// Priority: 1st hash, 2nd url search, 3rd javascript include values
    var request = {};
    var pairs = paramStr.substring(paramStr.indexOf('?') + 1).split('&');
    for (var i = 0; i < pairs.length; i++) {
        if(!pairs[i])
            continue;
        var pair = pairs[i].split('=');
        request[decodeURIComponent(pair[0]).toLowerCase()] = decodeURIComponent(pair[1]);
     }
     // Next we override with the Hash for older browser that cannot update the URL from script.
     // And for embedding where URL variables may not be usable.
    var hashPairs = hashStr.substring(hashStr.indexOf('#') + 1).split('&');
    for (var i = 0; i < hashPairs.length; i++) {
        if(!hashPairs[i])
            continue;
        if (i==0 && hashPairs[i].indexOf("=") == -1) {
        	request[""] = hashPairs[i];  // Allows for initial # param without =.
        	continue;
        }
        var hashPair = hashPairs[i].split('=');
        request[decodeURIComponent(hashPair[0]).toLowerCase()] = decodeURIComponent(hashPair[1]);
     }
     return request;
}
var param = loadParams(location.search,location.hash);

function includeCSS(url) {
    var urlID = url.replace(root,"").replace("https://","").replace(/\//g,"-").replace(/\./g,"-");
    if (urlID.indexOf('?') > 0) {
        urlID = urlID.substring(0,urlID.indexOf('?')); // Remove parameter so ?v=1 is not included in id.
    }
    if (!document.getElementById(urlID)) { // Prevents multiple loads.
        var link  = document.createElement('link');
        link.id   = urlID;
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

function hideSearch(goLayer) { // Allows for use without click, so menu remains visible when no hash.
    //alert("hideSearch");
    $(".moduleBackgroundImage").removeClass("moduleBackgroundImageDarken");
    $(".siteHeaderImage").removeClass("siteHeaderImageDarken");
    
    if ($(".settingsPanel").is(':visible')) {
        $('#hideSettings').trigger("click");
        // Assume the user wants to view the search fields.
        $('.showSearchClick').trigger("click");
        return;
    }
	$(".hideSearch").hide();
    $(".hideFilters").hide();
    $(".searchModuleIconLinks").hide();
    $(".showFilters").show();
    if (typeof (goLayer) != "undefined") {
        if (goLayer.section.toLowerCase() != goLayer.item.toLowerCase()) {
            if (!$(".overviewButton").is(':visible')) {
                if (goLayer.title) {
                    if (goLayer.showLayerTitle != "0" && !goLayer.primarytitle) {
                        if (!goLayer.tabtitle) {
                            $(".layerTitleAndArrow").show();
                        }
                    }
                }
            }
        }
    }
	$(".filterPanelWidget").hide();
    updateOffsets();
}
function clearForm() {
    //$(".triggerSearch:selected").removeAttr("selected");
    //alert("deselectMenusAndTabs - before remove selected");
    $("option:selected").removeAttr("selected");
    //alert("deselectMenusAndTabs - remove selected");

    deselectLetter();
    //$('.letter').val("");
    //$('.closeAlphabetHolder').html("");
    //$('#alphabet div').removeClass("active");
}
function deselectMainTabs() {
    $("#showNews").show();
    $("#hideNews").hide();
    $(".showDirectory").show();
    $(".hideDirectory").hide();
    $("#showMap").show();
    $("#hideMap").hide();
    //if (currentAccess >= 1) $(".showDirectoryFrame").show(); // Caused tabs to appear in Contact Us.
    $(".hideDirectoryFrame").hide();
    $("#showGrid").show();
    $("#hideGrid").hide();
    //$(".showFilters").show();
    //$(".hideFilters").hide();
}
function deselectMenusAndTabs(clicked) {
    deselectMainTabs();
    $('.cid').text(""); // For showDirectory and showGrid click.

    $('.iframeHolder').hide();
    if (clicked != "filters") {
        $("#pagination").hide();
    }
    if ($(".settingsPanel").is(':visible')) {
        $('#hideSettings').trigger("click");
    }
    if ($("#hideLayers").is(':visible')) {
        //$('#hideLayers').trigger("click");
    }
    
	$('.rowDetailsArrow').removeClass("active");
	//$("#smartSideMenu").hide();
	
    //$("#heroContent").show();
	
    //$(".showLayers").show();
    //$(".hideLayers").hide();
	if ($(".hideDetails").is(':visible')) { 
		//$(".hideDetails").hide();
		//$(".showDetails").show();
		$("#showDetailsOnGrid").show();
	}
	$(".settingsPanel").hide();
    if (clicked != "filters" && $(window).width() <= 800) {
        $(".filterPanelHolder").hide();
    }
}
function hideCounties() {
    if ($(".countyList").is(':visible')) {
        $('.hideMainMenu').trigger("click");
    }
    $(".countyMapHolder").hide();
    $(".countyListHolder").hide();
    if ($(':checkbox[name=countyCB]:checked').length == 0) { // If no county checkboxes are selected.
        $(".countyText").hide();
        //$('[data-id="all"]').trigger("click"); // Not necessary once the following is activated.
        $("#filterClickLocation .filterSelected").html("Entire State");
        $('[data-id="county"]').removeClass("selected");
        $('[data-id="all"]').addClass("selected");
        //filterULSelect("all"); // Entire State, avoids query
        // Restore Layers list
    }
}

// Not in use:
function displayMobileMenu(tabObject) { // For Layer Icon on map
    var previousSet = "";
    var menuIcon = "";
    var layerCheckboxes = '<div class="hideDesktop" style="width:100%">';
    for(item in tabObject.items) {
        if (tabObject.items[item].title) {
            if (tabObject.items[item].section != previousSet && tabObject.items[item].section) {
                //layerCheckboxes += '<div class="mainMenuTitle">' + tabObject.items[item].section + '</div>';
            }
            menuIcon = "";
            if (tabObject.items[item].icon) {
                menuIcon = tabObject.items[item].icon;
            }
            layerCheckboxes += '<div class="mobileMenuItem"><div class=""><div class="iconSide" style="display:none"><input id="nav-' + tabObject.items[item].item + '" type="checkbox" name="iconCheckbox" value="' + tabObject.items[item].item + '" /></div><a href="#' + tabObject.items[item].item + '" style="position:relative">' + menuIcon + ' <span style="z-index:2">' + tabObject.items[item].title + '</span></a></div></div>';
    
            previousSet = tabObject.items[item].section;
        }
    }
    layerCheckboxes += '</div>';
    $("#mobileMenu").html(layerCheckboxes);
}

function displayHorizontalMenu(tabObject,sectionName,layerName) { // For Layer Icon on map
    // Horizontal
    previousSet = "";
    menuIcon = "";
    layerCheckboxes = '<div class="hideMobile">';
    for(item in tabObject.items) {
        if (tabObject.items[item].title) {
            if (tabObject.items[item].section != previousSet && tabObject.items[item].section) {
                //layerCheckboxes += '<div class="mainMenuTitle">' + tabObject.items[item].section + '</div>';
            }
            menuIcon = "";
            if (tabObject.items[item].icon) {
                menuIcon = tabObject.items[item].icon; // Need to add smaller size version
            }
            layerCheckboxes += '<div class="sectionTab"><a href="#' + tabObject.items[item].item + '" style="position:relative">' + tabObject.items[item].title + '</a></div>';
    
            previousSet = tabObject.items[item].section;
        }
    }
    layerCheckboxes += '</div>';
    $(".horizontalMenu").html(layerCheckboxes);
}
function displayHorizontalSectionMenu(siteObject,sectionName,layerName) { // For Layer Icon on map
    // Horizontal Section
    var previousSet = "";
    var menuIcon = "";
    var tabTitle = "";
    var activeClass = "";
    layerCheckboxes = '<div class="hideMobile">';
    for(item in siteObject.items) {
        var menuaccess = 0;
        if (siteObject.items[item].menuaccess) {
            menuaccess = siteObject.items[item].menuaccess;
        }
        if (siteObject.items[item].tabtitle && siteObject.items[item].section == sectionName && access(currentAccess,menuaccess)) {
            if (siteObject.items[item].section != previousSet && siteObject.items[item].section) {
                //layerCheckboxes += '<div class="mainMenuTitle">' + siteObject.items[item].section + '</div>';
            }
            menuIcon = "";
            if (siteObject.items[item].icon) {
                menuIcon = siteObject.items[item].icon; // Need to add smaller size version
            }
            //tabTitle = siteObject.items[item].title;
            //if (siteObject.items[item].tabtitle) {
                tabTitle = siteObject.items[item].tabtitle;
            //}
            if (layerName == siteObject.items[item].item) {
                activeClass = " active";
            } else {
                activeClass = "";
            }
            layerCheckboxes += '<div class="sectionLink' + activeClass + '"><a href="#' + siteObject.items[item].item + '" style="position:relative">' + tabTitle + '</a></div>';
    
            previousSet = siteObject.items[item].section;
        }
    }
    layerCheckboxes += '</div>';
    $(".horizontalSectionMenu").html(layerCheckboxes);

    $('.sectionLink').click(function(event) {
        //alert($(this).children("a").attr("href"));
        window.location = $(this).children("a").attr("href");
    });
}

function displayAppMenu(siteObject) { // App Boxes
    var layerCheckboxes = "";
    var previousSet = "";
    var menuIcon = "";
    //var currentAccess = 0;
    if (location.host == 'localhost' || location.host == 'intranet.georgia.org' || location.host == 'review.georgia.org') {
        //currentAccess = 4;
    }
    var itemCount = 0;
    // To Do: sort by view
    var item = ""; // Required for IE 
    for(item in siteObject.items) {

        itemCount++;
        var menuaccess = 0;
        try { // For IE error
            menuaccess = siteObject.items[item].menuaccess;
        } catch(e) {
            //console.log("no menuaccess");
        }
        if (access(currentAccess,menuaccess)) {
            
            var title = "";
            var section = "";
            try { // For IE error
                title = ((siteObject.items[item].navtitle) ? siteObject.items[item].navtitle : siteObject.items[item].title);
            } catch(e) {
                console.log("displayAppMen: missing layer title (IE error)");
                title = "---"; // If IE error.
            }
            try { // For IE error
                section = siteObject.items[item].section.toLowerCase().replace(" ","_");
            } catch(e){}

            // && section == siteObject.items[item].item
            //if (title) {
            if (siteObject.items[item].menulevel == '1') {
                menuIcon = "<i class='material-icons'>&#xE8A0;</i>";

                //if (typeof siteObject.items[item].icon != "undefined") {
                //try { // For IE error
                    if (siteObject.items[item].icon) {
                        menuIcon = siteObject.items[item].icon;
                    }
                //} catch(e){}
                if (1==1) {

                    
                    if (section != previousSet && section != "") {
                        // Reactivate to show section titles.
                        //layerCheckboxes += '<div class="mainMenuTitle">' + section + '</div>';
                    }
                    
                    
                    //layerCheckboxes += '<input type="checkbox" class="layersCB" name="layersCB" id="app-' + siteObject.items[item].item + '" value="' + siteObject.items[item].item + '"><label for="app-' + siteObject.items[item].item + '" class="">' + siteObject.items[item].title + '</label><br>';
                    title = siteObject.items[item].section;
                    layerCheckboxes += '<div class="menuRect user-' + menuaccess + '"><div class="menuRectBkgd"><div class="mainMenuTop">' + section + '</div><!-- a --><div data-layer="' + siteObject.items[item].item + '" class="menuRectLink" style="position:relative"  data-section="' + section + '"><div class="menuRectIcon"><div>' + menuIcon + '</div></div><div class="menuRectTitle"><div>' + title + '</div></div></div><!-- /a --><div class="menuRectBottom"><input id="nav-' + siteObject.items[item].item + '" type="checkbox" name="iconCheckbox" value="' + siteObject.items[item].item + '" /></div></div></div>';
                } else {

                    if (section != previousSet && section != "") {
                        layerCheckboxes += '<div class="menuRowSectionTitle user-' + menuaccess + '">' + section + '</div>';
                    }
                    
                    //more icon
                    layerCheckboxes += '<div class="menuRow user-' + menuaccess + '"><div class="menuRowButton"><i class="material-icons">&#xE5D3;</i></div><a href="#' + siteObject.items[item].item + '" style="position:relative"><div class="menuRowIcon"><div>' + menuIcon + '</div></div><div class="menuRowTitle"><div>' + title + '</div></div></a><div class="menuRectBottom"><input id="nav-' + siteObject.items[item].item + '" type="checkbox" name="iconCheckbox" value="' + siteObject.items[item].item + '" /></div></div>';
                
                }
                previousSet = section;
            }
        }
    }
    //alert("count " + itemCount); // Works. 59 for IE
    layerCheckboxes += '<div style="clear:both"></div>';
    $(".appMenuInner").append(layerCheckboxes);

    //if (goLayer.showmenu) {
        // only works here on subsequent layers, when appMenuInner is already loaded.
        //alert("showApps here")
        //$('.showApps').trigger("click");
    //}
}

function hideSectionCategories() {
	console.log("hideSectionCategories"); // bugbug gets called multiple times.

    $(".categoryMenuSet").hide();
    $("#sectionCategories").hide();

    //alert("1");
    $('#sectionCategoriesToggle').show();
    //alert("2");

    return;

    // NOT REACHED
	$("#sectionCategories").hide();
	//if ($("#secArrowDown").is(':visible')) { /* Avoids causing right arrow to remain visible on apps toggle due to display:block */
		$("#secArrowDown").hide();
		$("#secArrowRight").show(); 
	//}
	$(".sectionTitle").css('visibility', 'visible');

}
function displayDetails2(cartodb_id, data, latlng, layerName, siteObject) {
    // latlng parameter does not appear to be in use here.
    console.log("displayDetails2 " + layerName);
	$("#hideMap").hide();
	$("#showMap").show();

    mapbuttonsNeutral();

    if (detailsOnLeft) {
        $(".besideLeftHolder").addClass("besideLeft");
    }
    $(".listPanelRows").hide();
    $(".overlaysInSide").hide(); $(".showOverlays").removeClass("active");
    $(".listPanel").show();
    $('.besideLeftHolder').show();
	//TEMP $(".tabSections").show();

    $('#hideGrid').hide();
    $('#showGrid').show();

    $('.cid').text(cartodb_id); // Store for URL building.
    $('.cidTab').val(cartodb_id);
    updateTheURL(layerName); 

    console.log("Call loadGrid from displayDetails2 for " + layerName);

    $('.showDirectory').removeClass('active');
	loadGrid(cartodb_id,layerName,siteObject);

    /* */
    if ($(".moduleJS").width() <= 800) {
        $('.hideGrid').trigger("click");
    }

    // scrollTop: $('.listPanelHolder').offset().top - $('#mapBar').height()
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
    
}

function gethashArray() {
    return (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.hash.substr(1).split('&'));
}
function loadUrlValues() {

    // Also convert to use gethashArray(), but rename to getParamArray() with inut of: window.location.search
    var param = (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));

    var hash = gethashArray();

    var val = $.extend({}, param, hash); // load param and hash into val, hash overriding param.

    return val;
}
function buildLocalhostQueryString(params) {
    var currentParams = loadUrlValues(); 
    var tmpParams = $.extend({}, params);

    if (!$.isEmptyObject(currentParams) && typeof (currentParams.localhost) != "undefined" && currentParams.localhost == '1') {
        if (typeof (currentParams.s) != "undefined") {
            var sArray = currentParams.s.split('.');
            if (sArray.length == 4) {
                sArray[0] = '0'; // reset the itemid to 0 since it can be specified as part of the url
                tmpParams.s = sArray.join('.');
            }
        }

        if (typeof (currentParams.db) != "undefined") {
           tmpParams.db = currentParams.db;
        }

        tmpParams.localhost = currentParams.localhost;
    }

    var queryString = "?" + $.param(tmpParams);
    return queryString;
}
function DOMoptionsToJSArray(selector, valType) {
    var optionArray = [];
    selector.each(function () {

        if (valType == 'text') {
            optionArray.push($(this).text());
        }
        if (valType == 'val') {
            optionArray.push($(this).val());
        }

    });
    return optionArray;
}
function buildLocText(selector, type) {
    var locText = '';
    if (selector.length == 1) {
        if (selector.val() == '0' || selector.val() == '') {
            //locText = 'Search limited to ' + type.singular + '.'; // Was commented out.
        } else if (type.singular == '') {
            locText = 'Search limited to ' + selector.text() + '.';
        } else {
            locText = 'Search limited to ' + selector.text() + ' ' + type.singular + '.';
        }
    } else {

        if (type.plural == '') {
            locText = 'Search limited to ' + DOMoptionsToJSArray(selector, 'text').join(', ') + '.';
        } else {
            locText = 'Search limited to ' + DOMoptionsToJSArray(selector, 'text').join(', ') + ' ' + type.plural + '.';
        }
    }
    return locText;
}
function loadCountyModule() {
    var countyroot = "/documentation/region/";
    if (params["rootHttps"]) {
        countyroot = params["rootHttps"] + countyroot;
    }
    var countyScriptCount = 0;
    //loadScript('js/georgia.js',countyScriptCount++);
    loadScript(countyroot + 'js/ga-counties.js',countyScriptCount++);
    loadScript(countyroot + 'js/county-select.js',countyScriptCount++);
    onCountyJSLoadComplete();
    function onCountyJSLoadComplete() {
        if (countyScriptCount >= 2) {
            displayCountySelect(); return;
        }
        setTimeout(function() {
            onCountyJSLoadComplete(); //Try again
        }, 100);
    }
    function displayCountySelect() {
        console.log("displayCountySelect");
        if (typeof countiesFromGeoJson == 'function') { // Function is now available
            //if (location.host.indexOf('localhost') > -1) {
                

                //$("#mapPanel").show();

                //$('.navTop').css('min-height', '530px'); // Else only top is visible.
                //$(".countyMapHolder").insertAfter($(".navTopLeft"));

                $(".countyMapHolder").insertAfter($(".countyMiniMap"));
                $('.countyMapHolder').css('min-height', '300px', 'min-width', '200px'); // Else only top is visible.

                if (location.host.indexOf('localhost') > -1) {
                    //$(".countyMapHolder").show();

                    // Temporary until debugged.
                    $(".countyMapHolder").hide();

                } else {
                    // Temporary until debugged.
                    $(".countyMapHolder").hide();
                }

                countyMap(); // Called here so countiesData is available from ga-counties.js file.
                
            //}
            listCountyCheckboxes();
        } else {
            setTimeout(function() {
                displayCountySelect(); // Try again
            }, 100);
        }
    }
    includeCSS(countyroot + 'css/counties.css');
}
function showCounties() {
    $('[data-id="all"]').removeClass("selected");
    $('[data-id="county"]').addClass("selected");
    $("#filterClickLocation .filterSelected").html("Counties");
    $("#locationDD option[value='county']").prop("selected", true).trigger("change");

    //$('.showApps').hide();
    //$('.hideApps').show();

    $(".iframe").hide();
    $(".directoryframeNav").removeClass("active");
    $(".moduleContent").hide();
    $(".quickMenu").hide();
    $(".menuPanel").hide();
    $('.sideTopMenu div').removeClass("active");
    $('.showCounties').addClass("active");
    if ($(".countyText").val()) {
        $(".countyText").show();
    }

    $(".contentPanel").show();
    $(".countyMapHolder").show();
    $(".countyListHolder").show();
    $(".smartSideMenuHolder").show();
    $("#countyMap").show();
    //$('.smartSideMenuHolder').trigger("click");
    loadCountyModule();
    if(useCookies) {
        /*
        var cokSearchParam = Cookies.set('searchParams');
        if (typeof (cokSearchParam.county) != 'undefined') {
            console.log(cokSearchParam.county);
            $("#countyids").val(cokSearchParam.county.split(','))
        }
        */
        Cookies.set('searchParams', { 'useCurrent': '0', 'centerlat': $("#lat").val(), 'centerlon': $("#lon").val(), 'locationDD': 'county' });
    }
}
function showRegions() {
    $(".quickMenu").hide();
}
function displayLocText() {
    layerName = getCurrentLayer();

    var locText = '';
    var countyText = '';

    var $distance = $("#distance");
    var selectedSearchType = $("#locationDD").val();
    //alert("selectedSearchType: " + selectedSearchType);

    if(selectedSearchType == 'all' && $('.cid').text() == "") {
        locText = ''; // Results from entire state.
    }
    else if (selectedSearchType == 'county') {
        var commaCounties = $.map($(':checkbox[name=countyCB]:checked'), function(n, i){
              return n.value;
        }).join(', ');
        //alert("commaCounties embed.js " + commaCounties);
        //locText = buildLocText($("#countyids option:selected"), { singular: 'county', plural: 'counties' });
        
        var changeCounty = " <span class='showCounties2' style='text-decoration:underline;cursor:pointer'>View Results</span> &nbsp;";
        changeCounty += " <span class='removeCountyFilter' style='text-decoration:underline;cursor:pointer'>Remove Filter</span>";
        

        //if (currentAccess >= 3) {
        if (location.host.indexOf('localhost') > -1) {
            //changeCounty += " <span class='showOutlines textButton' style='text-decoration:underline;cursor:pointer'>View Outlines</span>";
        }
        if (commaCounties.includes(",")) {
            countyText = "Within " + commaCounties.replace(/,([^,]*)$/," and"+'$1') + " Counties. " + changeCounty;
        } else if (commaCounties) {
            countyText = "Within " + commaCounties + " County. " + changeCounty;
        } else {
            countyText = "Select a county..."; // Also search for this phase below.  Used to prevent showing county bar.
        }
    }
    else if (selectedSearchType == 'city') {
        // singular: 'City', plural: 'Cities'
        locText = buildLocText($("#cities option:selected"), {singular: '', plural: ''});
    }
    else if ((selectedSearchType == 'zip' || 
        selectedSearchType == 'custom' || 
        selectedSearchType == 'current') &&
        $distance.val() != '') {
                
        if (selectedSearchType == 'zip' && $('#zip').val() != '') {
            //locText = 'Within ' + $("#distance").val() + ' Miles of zip code ' + $('#zip').val() + '.';
            locText = 'Within zip code ' + $('#zip').val() + '.';
        }
        else if (selectedSearchType == 'current' || selectedSearchType == 'custom') {
            locText = 'Within ' + $("#distance").val() + ' Miles ';
            if ($("#lat").val() == $(".mylat").val() && $("#lon").val() == $(".mylon").val()) {
                locText += ' of your <span style="white-space:nowrap">current location.</span> <span style="white-space:nowrap"><a href="#' + layerName + '">View all</a></span>';
            } else {
                locText += ' of <span style="white-space:nowrap">' + $("#lat").val() + ' ' + $("#lon").val() + '.</span>';
            }
        }
    }
    var textOnlyLocation = $('#locText').html(locText).text();
    $('#searchText').html(locText);
    $('#searchText').show();
    if (countyText && countyText != "Select a county...") { // Bug - always county text
        $('.countyText').html(countyText);
        $('.countyText').show();
    } else {
        $('.countyText').hide();
    }
    $('.showCounties2').click(function(event) {
        hideCounties();
        $('.showLayerMenu').trigger("click");
    });
    $('.removeCountyFilter').click(function(event) {

        //hideCounties();
        $('[data-id="all"]').trigger("click");
        $('.showLayerMenu').trigger("click");
        $('.countyText').hide();
        $('.countyText').html("");
        $('.countyMapHolder').hide();
        $(".countyCB").prop('checked', false);
    });
    

    return textOnlyLocation;
}

// Moved in moduleEmbed
//initSiteObject(param["go"]); 
//initEvents();

function initSiteObject(go) {

if (params["root"]) {
    root = params["root"]; // Needed for adjacent site folder when not on localhost. Localhost is hardcoded to /site/ above.
}

var layerJson = root + "json/site.json";
if (params["layerjson"]) {
    layerJson = params["layerjson"];
}
var siteObject = (function() {
    var json = null;
    $.ajax({
        'type': 'GET',
        'async': true,
        'global': false,
        'url': layerJson,
        'jsonpCallback': 'callback',
        'dataType': "jsonp",
        'success': function (siteObject) {
            console.log("json loaded within initSiteObject. location.hash: " + location.hash);
            if (typeof go != "undefined") { // From widget.html
                layerName = go;
                updateURL(layerName); // Allows map to load initially using value within hash
            } else {
                layerName = getCurrentLayer();
            }
			function gotMapScript(layerName, siteObject,layerName) {
				actOnCartoLoaded(siteObject,layerName);
			}

			function loadMapScript(layerName, url, callback)
			{
                if (workoffline) return;
                console.log("loadMapScript");
                // Didn't work...
				//if (!document.getElementById(url)) { // Prevents multiple loads.
                if (typeof L == "undefined") {
                    console.log("loadMapScript: Script wasn't pre-loaded - " + url);
				    // Add the script tag to the head.
				    var head = document.getElementsByTagName('head')[0];
				    var script = document.createElement('script');
				    script.type = 'text/javascript';
				    script.src = url;
					script.id = url; // Used to prevent multiple loads. Might be an alternate way to check if script tag existing using the src.
				    // Then bind the event to the callback function.
				    // There are several events for cross browser compatibility.
				    script.onreadystatechange = callback; // Calls gotMapScript()
				    script.onload = callback;
				    head.appendChild(script);
				} else {
					console.log("Carto script already available.");
					//alert("Problem here: " + callback);
					//eval(callback);

					// TEMP HACK - Hardcoded
					gotMapScript(layerName, siteObject,layerName); // Needed for map button
				}
			}

			function displayDirectory(layerName,siteObject) { // loadDirectory
                console.log("displayDirectory " + layerName);
                var goLayer = getGo(siteObject.items,layerName);

                // Avoid using param["cid"] here
                if ($('.cid').text()) {
                    loadDirectory($('.cid').text(),layerName,siteObject);
                } else {
                    $(".horizontalButtons .layoutTab").removeClass("active");
                    if ($(".besideLeftHolder .listPanel").length > 0) { // Beside map
                        $(".showDirectory").addClass("active");
                    }
                    loadDirectory(0,layerName,siteObject);
                }
			}
			function displayMap(layerName,siteObject) {
                console.log("displayMap: " + layerName);

                hideLayer(layerName,siteObject); // Prevent multiple instances of same layer.
                
                // Recheck the layer because hideLayer removes check.
                $("#go-" + layerName).prop('checked', true);

                //updateURL(layerName);
                //updateURL(layerName);
                $(".showMap").hide();
				$("#mapPanel").show(); // Allows tiles to load.
                $("#gridPanel").hide();
                $(".mapbuttons").show();

				// Kicks off actOnCartoLoaded upon completion
				//loadMapScript('https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.12/cartodb.js',gotMapScript);
				loadMapScript(layerName,'https://data.georgia.org/site/js/cartodb.js',gotMapScript);
                $(".contentPanel").show();
            }
            function showDetails(layerName,siteObject,cid) {
                deselectMenusAndTabs();
                mapbuttonsNeutral();
                //$(".hideList").hide();
                $(".showList").show();
                $("#showDetails").hide();
                $(".showDetails").hide();
                $(".hideDetails").show();
                $(".listPanelRows").hide();
                $(".overlaysInSide").hide(); $(".showOverlays").removeClass("active");
                $("#showDetailsOnGrid").hide();
                $(".settingsPanel").hide();
                $("#mapPanel").show();

                console.log("Call loadGrid from showDetails for " + layerName);
                loadGrid(cid,layerName,siteObject);

                $(".listPanel").show();
                $('.besideLeftHolder').show();
                $(".detailsPanel").show();
            }
            /*
            function showFilters(layerName,siteObject) {
                deselectMenusAndTabs("filters");
                mapbuttonsNeutral();

                if ($(".moduleJS").width() <= 800) { // For narrow
                    $('html,body').animate({ scrollTop: 0 });
                    //$(".mapBarHolder").hide();
                }

                $(".layerTitleAndArrow").hide();
                $(".showFilters").hide();
                $(".hideFilters").show();
                $("#hideSearch").show();
                //$("#heroContent").show();
                //$("#filterPanel").show(); // Probably not needed.
                $('.searchHeader').show();
                $(".filterPanelHolder").show();
                $(".filterPanelWidget").show();
                $(".listPanel").show();
                $('.besideLeftHolder').show();
            }
            */
            function showDirectory(layerName,siteObject) {

                if(layerName == "main") {
                    //return;

                }
                // For "List" button click
                $('.showAllResults').hide();

                console.log("showDirectory() " + layerName);
                
                if (param["cid"]) {
                    updateTheURL(layerName); // Removes cid=
                }
                if ($(".listHeader").is(':visible')) {
                    //$('.mapBarButtonsRight').insertAfter($('.mapBarButtonsRightPosition'));
                }
                if ($(".hideGrid").is(':visible') || $(".hidePanel").is(':visible')) {
                    $("#gridPanel").hide();
                    $("#mapPanel").show();
                    //displayMap(layerName,siteObject);
                }
                deselectMenusAndTabs("directory");
                
                //if (!$(".introButton").hasClass("active")) {
                    $(".horizontalButtons .layoutTab").removeClass("active");
                    
                //}

                $(".hideDirectory").show();

                $(".listPanel").show();
                //$('.besideLeftHolder').show();
                if (detailsOnLeft) {
                    $(".besideLeftHolder").addClass("besideLeft");
                }
                if ($('.cidTab').val()) {
                    $(".hideDetails").hide();
                    $(".showDetails").show();
                } else {
                    $(".showDetails").hide();
                    $(".hideDetails").hide();
                }

                //$(".detailsPanel").hide();
                
                $('.gridListHeader').insertAfter($('.listHeaderPosition'));

                layerName = getCurrentLayer();
                updateURL(layerName);

                //layerName = getCurrentLayer();
                console.log("showDirectory calls displayMap first");

                if ($(".besideLeftHolder .listPanel").length > 0) { // Beside map
                    $(".showDirectory").addClass("active");
                    $(".besideLeftHolder").show();
                }
                displayMap(layerName,siteObject);
                displayDirectory(layerName,siteObject);

                $('.iframeHolder').show();
                
                //$("#defaultWidget").hide();
                $(".detailsPanel").hide();

                if (layerName != "main") {
                    // Assumes list is returned
                    //$(".hideList").show(); // Omitted from details
                    //$(".showList").hide();
                    $(".hideDetails").hide();
                    $(".showDetails").show();
                    //TEMP $(".tabSections").show();
                    $(".listPanelRows").show();
                    if (sitemode != "widget") {
                        $('.showSearchClick').trigger("click");
                    }

                    if (params["embed"] == "1" && !$('.showFiltersButton').hasClass('active')) {
                        //$('.showFiltersButton').trigger("click");
                    } else if (layerName == "aerospace" || layerName == "logistics") { // Quick fix
                        //$('.showFiltersButton').trigger("click");
                    }
                }

                $('html, body').animate({
                    // Was irritating when changing sections.
                    //scrollTop: $('#mapBar').offset().top
                }, 'slow');

                //if ($(".moduleJS").width() > 800) {
                if ($(".afterMap .listPanel").length > 0) {
                    $('html,body').animate({
                        scrollTop: $(".listPanel").offset().top - $("#siteHeader").height()
                    });
                }

            }
            function clearAndClose() {
                $(".whereFilter").val("");
                $(".adminTools").hide();
            }
            function hideLayer(layerName,siteObject) {
                //alert("hideLayer " + layerName);
                console.log("hideLayer " + layerName);
                var goLayer = getGo(siteObject.items,layerName);

                // Hide the layer's legends.
                if (typeof goLayer != "undefined") {

                    if (typeof goLayer.layer != "undefined") {

                        $.each(goLayer.layer.getSubLayer, function(i, element) {
                            console.log("layer " + i);
                        });

                        //goLayer.layer.each(function(i, row){
                        //    goLayer.layer.getSubLayer(i).hide(); // Hides all of layers sub layers
                        //    alert(i);
                        //});

                        // Error occurs when leaving history torque.
                        if (goLayer.layer.getSubLayer(0)) { // In case layer never loaded initially due to disconnected internet.
                            console.log("getSubLayer(0) hide");
                            goLayer.layer.getSubLayer(0).hide();
                            console.log("getSubLayer(0) hidden");
                        }
                    
                        // Error occurs here:, regardless of presense of legend.
                        //alert(goLayer.layer.getSubLayer(1));
                        
                        /*
                        if (typeof goLayer.layer.getSubLayer(1) != "undefined") {
                            console.log("getSubLayer(1) hide");
                            goLayer.layer.getSubLayer(1).hide();
                            console.log("getSubLayer(1) hidden");
                            goLayer.layer.getSubLayer(2).hide();
                            goLayer.layer.getSubLayer(3).hide();
                            goLayer.layer.getSubLayer(4).hide();
                        }
                        */

                        //goLayer.layer.bringToBack(); // Prevents blocking of subsequent layers
                        //goLayer.layer.hide();

                        map.removeLayer(goLayer.layer); // More than just hiding
                        //alert("removedLayer");

                        console.log("hideLayer complete: " + layerName);
                        console.log("-------------------");

                        //alert(".layersCB " + $(".layersCB").val());
                        // Select another active layer for header
                            //updateURL("crew");
                            //changeLayer("crew",siteObject,"");
                        // e

                    }
                    //updateURL("main");
                    //changeLayer("",siteObject,"");
                    
                } else {
                    console.log("Map layer NOT found for hiding: " + layerName);
                }

                $(".row-" + layerName + " .layerAction .layerActionIcon").removeClass('layerActionActive');
                $("#go-" + layerName).prop('checked', false);
                $("#cat-" + layerName).prop('checked', false);
                //$("#app-" + layerName).prop('checked', false);
            }

            function clearAll(siteObject) {
                //alert("priorLayer " + priorLayer);
                $('.layersCB:checked').each(function() {
                    var checkedLayer = $(this).attr("id");
                    hideLayer(checkedLayer.replace('go-',''),siteObject);
                });
                
            }

			function changeLayer(layerName,siteObject,clearAction) {

                $(".overlaysInSide").hide(); $(".showOverlays").removeClass("active");

                // Limit to section json setting or cookie.
                //$(".searchElements").insertAfter($(".searchElementsPosition"));

                console.log("Start of changeLayer hash: " + location.hash);
                $('.topButtons').hide();
                if (priorLayer != layerName) {
                    console.log("CHANGELAYER to: " + layerName + ", previous: " + priorLayer);

                    if (priorLayer != "") { // Avoid when page initially loaded
                        $('#rowsTotal').text("");
                        $('.cid').text(""); $('.cidTab').val(""); // Clear prior detail ID.
                        $('.letter').val("");
                        if ($(".moduleJS").width() <= 800) {
                            $('.hideAllSections').trigger("click");
                        }
                    }
                    if (priorLayer && clearAction == "clearall") {
                        hideLayer(priorLayer,siteObject);
                    }
                    $(".listPanelRows").hide();
                    $(".catInfo").hide();
                    $(".cartodb-tooltip").css('display', 'none'); // Hides county name
                    $(".layoutTab").removeClass("active");
                    $(".tab-" + layerName).addClass("active");
                } else {
                    console.log("CHANGELAYER (same as previous): " + layerName);
                }
				priorLayer = layerName;
				
                //$('*[data-id="current"]').trigger("click");

                $('#go-' + layerName).prop('checked', true);
                // No effect here
                //$('#cat-' + layerName).prop('checked', true); // Top sections checkbox
                
                //$('#app-' + layerName).prop('checked', true); // Left side menu icon checkbox
                //$('#nav-' + layerName).prop('checked', true); // Top tab checkbox (not in use)
                clearAndClose();

                if ($("#sitelook").val() == "default") {
                    if (layerName == "main") {
                        //toggleVideo("show","nochange");
                        $('.hideFiltersClick').trigger("click");
                        $('.moduleBackgroundImage').css('background-image', 'none');
                        $('.sectionBack').hide();
                    } else {
                        //toggleVideo("hide","nochange"); // Continue playing for background audio.
                        $('.sectionBack').show();
                    }
                }
				if ($(".showMultiselect").is(':visible')) { 
					//hideSectionCategories();

					$(".pagesCB").prop('checked', false);
				}
                
                if (layerName == '' && params["hexmenu"] == "1") { // Avoid if content page.
                    $("#honeycombPanelHolder").show();
                    $(".bar-header").hide();
                    $('.topButtons').hide();
                } else {
                    // $("#honeycombPanelHolder").hide();
                    $(".bar-header").show();
                }

                if(layerName=='') {
                    if (params["openAppMenu"] == "1" ) {
                        $('.showAppsClick').trigger("click");
                    }
                    //if (location.host.indexOf('localhost') > -1) {
                    if (params["bigThumbSection"]) {
                        displayBigThumbnails("",siteObject);
                     } else {   
                        //displayHexagonMenu("",siteObject); // Also includes sectionCategories side list
                    }
                }
                //Cookies.remove('golog');
                if (params["minaccess"] && currentAccess == 0) { // Todo: Detect multiple acccess levels.
                    if (currentAccess > 0) { // Logged in.
                        if (params["minaccess"] > currentAccess) { // Logged in, but access is too low.
                            alert("Current page is restricted to higher access levels.")
                            return;
                        }
                    }
                    Cookies.set('golog', window.location.href);
                    window.location = "/menu/login/azure";
                    return;
                }
                if (layerName == "mainX") {
                
                } else {
                    $('.navTop').removeClass("navTopOverVideo");
                    $('.layerContent').show();
                    //$('.moduleJS').css('min-height', 'initial');
                    if (layerName == "intranet") {
                        //if (Cookies.get('at_a').length < 100) {
                        if (!Cookies.get('at_a')) {
                            // Not usable with insecure iFrames.
                            //window.location = "https://data.georgia.org/menu/login/azure";
                            // Also update near top of page.
                            window.location = "http://data.georgia.org/menu/login/azure";
                            return;
                        } else {
                            // if firebase or mailchimp: 
                            //loadUserAccess(1);

                            //loadUserAccess(6);

                            //$('.user').show(); // Look at previous technique for values.

                            //alert("token " + Cookies.get('at_a'));
                        }
                    }
                    $('.video-module').hide();
                    //$('.showVideo').show(); // Omit on Recycling. Later show when sections have video.
                    $('.hideMain').show();
                    
                    $('#mapBar').show();
                    $("#sectionCategoriesToggle").show();
                    if (sitemode == "widget") {
                        $(".videoHeightHolder").hide(); // Since shown for main.
                    }
                    if (params["navbar"] == "0") {
                        // No longer used
                        //$('.navTop').hide();
                    }
                    if (params["navbar"] != "0") {
                        //$('#navTopBar').show(); // Made navTopBar reappear when clicking side nav.
                    }
                }
                $(".moduleBackgroundImage").css("opacity", "1");
                $('.filter' + layerName).show();

                /*
                if (layerName == "international") {
                    $('#mergePreview').show();
                } else {
                    $('#mergePreview').hide();
                    $("#ToSource").prop("checked", true);
                }
                */

				if ($("#smartMenu").is(':visible')) {
					$('#hideMainMenu').trigger("click");
				}
				if ($("#gridPanel").is(':visible')) {
					//$('#hideGrid').trigger("click");
				}

                $('.fieldset').hide();
                $('#tableauViz').hide();
                $('.tableauVizHolder').hide();
                $(".primaryHeader").hide();

                if ($('.cid').text() == "" && $('#keywordsTB').val() == "") {
                    $('.showAllResults').hide();
                }

                var goLayer = getGo(siteObject.items,layerName);
				if (goLayer) {
                    if (typeof goLayer.access != "undefined" && goLayer.access > 0) {
                        if (!access(currentAccess,goLayer.access)) {
                            if (1==2 && location.host.indexOf('localhost') > -1) { // Allows for port numbers
                                // Allows Khai to work in Contractor folders.
                            } else {
                                goSignin();
                            }
                        }
                    }
                    
                    //displayMobileMenu(siteObject);
                    //displayHorizontalMenu(siteObject,goLayer.section,layerName);
                    displayHorizontalSectionMenu(siteObject,goLayer.section,layerName);

                    $('#mapBar').hide();
                    if (goLayer.item != params["go"]) { // params["go"] is from SPA.
                        $(".moduleContent").hide();
                    }

                    $(".hideWhenLayerMap").hide(); // GUARD
                    $(".showSectionMenu").show();
                    
                    if (typeof goLayer.youTubeID != "undefined") {
                        $('.navTopHeight').hide();

                        // Hide header background so video shows through.
                        $('.sitemoduleBackground').hide();
                        $('.siteHeaderImage').hide();

                        // To do: make percentage of width, stet remove or float map over.
                        //$('.videoSpacer').css('min-height','500px');

                        

                        $('.video-module').show();
                        //$('.showVideo').hide(); // Might not need this here
                        $('.hideMain').hide();
                        //$('.showLayers').trigger("click");
                        //$('.navTopTitle').hide();

                        /*
                        $('#mapBar').hide();
                        $('#mapPanel').hide();
                        $('#gridPanel').hide();
                        $('.layerContent').hide();
                        */
                        $('.navTop').addClass("navTopOverVideo");
                        
                        //$('.navTopHolder').insertAfter($('.videoHeightHolder'));

                        //$('.moduleJS').css('min-height', '730px'); // Else only top is visible.
                    } else {
                        $('.sitemoduleBackground').show();
                        $('.siteHeaderImage').show();
                        $('.video-module').hide();
                        //$('.videoSpacer').css('min-height','auto');
                        //$('.showVideo').hide();

                        $('.hideMain').show();

                        //$('.navTopTitle').show(); // Shows duplicate title
                        $('.navTop').removeClass("navTopOverVideo");
                    }

                    
                    if (goLayer.section.toLowerCase() != goLayer.item.toLowerCase()) {
                        if (!$(".filterPanelWidget").is(':visible') || !$(".filterPanel").is(':visible')) {
                            // Only show top layer title when filters closed.
                            //alert('.layerTitleAndArrow show');
                            
                            if (!$(".overviewButton").is(':visible')) {
                                if (goLayer.showLayerTitle != "0") {
                                    //$('.layerTitleAndArrow').show(); // Avoid since shows on CamearaReady Counties.
                                }
                            }
                        } else {
                            //$('.layerTitleAndArrow').hide();
                        }
                    } else {
                        //alert('.layerTitleAndArrow hide');
                        $('.layerTitleAndArrow').hide();
                    }
                    if (goLayer.appStatusStyle) {
                        $('.appStatus').addClass('appStatusStyle');
                        $('.appStatus').addClass('appStatusBeta');
                    } else {
                        $('.appStatus').removeClass('appStatusStyle');
                        $('.appStatus').removeClass('appStatusBeta');
                    }

                    if (location.host == 'localhost' || location.host == 'review.georgia.org') {
                        // Display menu for selecting small business, etc.
                        $('.biz-designation').addClass('field-contractor-directory');
                    }

                    $('.field-' + goLayer.item.toLowerCase().replace(" ","-")).show(); // Display layer's search filters
                    if (typeof goLayer.section != "undefined") {
                        $('.fieldset-' + goLayer.section.toLowerCase().replace(" ","-")).show();
                    }
                    if ($(".overviewButton").is(':visible')) { // One of the tabs contained is shown for a layer.                   
                        $('.layerTitleAndArrow').hide();
                    }

                    if (typeof goLayer.tableauUrl != "undefined") {
                        $('#tableauViz').show();
                        $('#tableauViz').empty(); // No effect
                        $('#tableauViz').html('<div class="loadingIcon" style="z-index:-1"></div>');

                        initializeViz(goLayer.tableauUrl, goLayer.item.toLowerCase());
                    }

                    //if (layerName == "main") {
                    if (typeof goLayer.youTubeID != "undefined") {
                        getVideoPlayer(goLayer.youTubeID);

                        $(".fixedTopBar .threeDotNavClickFixedTopBar").addClass("coversYouTubeInfoIcon");

                        if ($(".moduleJS").width() > 800) {
                            $('.showTopicsMenu').trigger("click");
                        }
                        $('#siteHeader').addClass("absoluteVideoHeader");
                        //$('.filterPanelHolder').addClass("absoluteVideoFilter");
                        $(".filterOverVideo").append($('.filterPanelHolder'));
                        $('.showVideoHolder').hide();

                        //$('.siteHeaderSpacer').hide();
                        $('.bar-header').hide();
                        //$('.navTopHolder').hide();
                        //$('.navTop').css('overflow', 'none'); // Hide dark background that blocks video click.
                        $('.layerTitleAndArrow').hide();
                        //$('.fixedTopBarSpacer').hide(); // Blocking click to video

                    } else {
                        $('#siteHeader').removeClass("absoluteVideoHeader");
                        $(".fixedTopBar .threeDotNavClickFixedTopBar").removeClass("coversYouTubeInfoIcon");
                        //$('.filterPanelHolder').removeClass("absoluteVideoFilter");
                        
                        // Move filters to top
                        //$('.filterPanelHolder').insertAfter($(".simpleHeader"));
                        

                        $('.showVideoHolder').show();
                        //$('.navTopHolder').show();
                        //$('.navTop').css('overflow', 'auto');
                        //$('.siteHeaderSpacer').show();
                        $('.bar-header').show();
                        //$('.fixedTopBarSpacer').show();
                    }
                    console.log("gotLayer");

                    // Might move this logic down where position over video is set
                    if ($(".moduleSideNav")[0]) { // UNDO GUARD
                        console.log("move sidenav up");
                        // Move side nav back to left of map. 
                        // For sites that don't use .moduleContent to move content into index.html (GUARD)
                        $(".smartSideMenuHolderPosition").append($(".smartSideMenuHolder"));
                    }

                    /*
                    if ($(".horizontalTabs").is(':visible')) { // For CameraReady. Avoid showing Layer name since Tabs convey layer name.
                        $('.layerTitleAndArrow').hide();
                    } else {
                        $('.layerTitleAndArrow').show();
                    }
                    */

                    /* Using horizontal links instead now.
                    if (goLayer.section.toLowerCase() == layerName) {
                        if (layerName == "intranet") {
                            $('.showAppsClick').trigger("click");
                        } else {
                            // Opens side nav (for recycling, energy)
                            $('.showSectionMenu').trigger("click");
                        }
                    }
                    */

                    if (goLayer.zipfield == "none") {
                        $('[data-id="zip"]').hide();
                    } else {
                        $('[data-id="zip"]').show();
                    }
                    if (typeof goLayer.css != "undefined") {
                        $('.layerCss').remove();
                        $('head').append("<style class='layerCss'>" + goLayer.css + "</style>");
                    } else {
                        $('.layerCss').remove();
                    }
                    // To Do: Save a cookie for emmersive (or other use-image variable), replace Cookies.get('sitelook') below.
					//if ($("#sitelook").val() == "default") {
                        
                        if (params["embed"] == "1") { 
                            $('.moduleJS .navTop').css('background', '#555');
                        }
                        if (goLayer.image) {
                            if (params["embed"] != "1") { // Add params["showimage"] == "1" to override
						      //$('.moduleBackgroundImage').css('background', 'linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7))');
                              
                              var imagePath = goLayer.image;
                              // && !~params["rootHttps"].indexOf("http") // Does not contains
                              if (params["rootHttps"]) {
                                if (goLayer.image.toLowerCase().indexOf('http') < 0) {
                                    imagePath = params["rootHttps"] + goLayer.image;
                                }
                              }
                              $('.moduleBackgroundImage').css('background-image', 'url(' + imagePath + ')');
                              //$('.fixedTopBarBkgd').css('background-image', 'url(' + imagePath + ')');
                              //$('.fixedTopBarBkgd2').css('background-image', 'url(' + imagePath + ')');
                              $('.siteHeaderImage').css('background-image', 'url(' + imagePath + ')');
                              // <div class="sitemoduleBackgroundImage"></div

                              if (goLayer.imageOpacity) {
                                $(".moduleBackgroundImage").css("opacity", goLayer.imageOpacity);
                                // Reactivate
                                $('.siteHeaderImage').css("opacity", goLayer.imageOpacity - .2);
                              }
                              // For Camera-Ready FAQ image
                              //$('.moduleBackgroundImage').css('background-position', '0% -15%');

                              //$('.moduleJS').css('background', '#333');
                              
                              // Avoid setting min-height when embedded.
                              $('.moduleBackgroundImage').css('min-height', '1200px');
                              $('.panelMinHeightHolder').addClass('panelMinHeight');
                            }
                        } else {
                            if (params["embed"] != "1") {
                                $('.panelMinHeightHolder').removeClass('panelMinHeight');
                                // Default image
                                $('.moduleBackgroundImage').css('background-image', 'none');
                                //$('.moduleBackgroundImage').css('background-image', 'url(/site/img/fullnav/cycling.jpg)');
                                //$('.moduleBackgroundImage').css('min-height', '1200px');
                            }
                        }
					//} else {
                    //    $('.moduleBackgroundImage').css('background-image', 'none');
					//}

                    if (goLayer.export == "off") {
                        $(".showDownloadHolder").css('display', 'none');
                    } else {
                        $(".showDownloadHolder").css('display', 'block');
                    }

                    //$('.layerSection').hide();
                    //$('.layerSection-' + goLayer.section).show();

                    if (!(goLayer.directoryframe || goLayer.mainiframe)) {
                        $('.iframe').hide(); // Not needed here, occurs below
                    }
                    if (goLayer.feed && access(currentAccess,goLayer.feedaccess)) {
                        $('.topButtons').show();
                        $('#panelHolder').show();
                        console.log('.topButtons show');
                        $('.searchModuleIconHolder').show();
                    } else {
                        $('.topButtons').hide();
                        $('.searchModuleIconHolder').hide();
                    }
                    // || goLayer.directoryframe || goLayer.mainiframe
                    if (goLayer.feed || goLayer.table) {
                        $('.mapBarHolder').show();
                        $('.listPanel').show();
                        //$('.besideLeftHolder').show();
                    } else {
                        $('.mapBarHolder').hide();
                        $('.listPanel').hide();
                    }
                    if (goLayer.topbuttons) {
                        //$('.directoryframeNav').hide(); // No effect
                        $('.crewButtons').show();
                        $('.layoutTabHolder').show();
                    } else {
                        //$('.topButtons').hide();
                        //$('.horizontalButtons').show();
                        //$('.layoutTabHolder').hide();
                    }

                    if (goLayer.showmenu) {
                        // only works here on subsequent layers, when appMenuInner is already loaded.
                        $('.showAppsClick').trigger("click");
                    }

                    //$('#iframeHolder').load('auth/firebase/form.html');
                    //$('#iframeHolder').show();

                    //$('#iframeHolder').load('/contract-history/index.html');
                    //$('#iframeHolder').show();

                    /*
                    Might not be needed. Text was grey on recycling header.
                    if (goLayer.headericoncolor) {
                        //$(".menuTopIconCustom").attr('color', goLayer.headericoncolor); // Not working
                        $(".menuTopIcon").addClass("menuTopIconCustom");
                        $(".menuTopIconCustom").css('color', goLayer.headericoncolor);
                        $(".navTopFont").addClass("navTopFontCustom");

                    } else {
                        $(".menuTopIconCustom").css('color', "#ccc"); // Temp, requires also updating .menuTopIcon in site.css
                        $(".menuTopIcon").removeClass("menuTopIconCustom");
                        $(".navTopFont").removeClass("navTopFontCustom");
                    }
                    */

                    // Set in widget.html and widget-local.html
                    // Should these be moved outside of changeLayer?
                    if (params["showgrid"] == "0") {
                        //$(".enableGrid").css('display', 'none');
                        $(".enableGrid").hide();
                    } else {
                        $(".enableGrid").show();
                    }
                    if (params["showButtons"] == "0") {
                        $(".showSettingsHolder").hide();
                    } else {
                        //$(".showSettingsHolder").show();
                    }

                    if (params["showfilters"] == "1") {
                        $("#filterPanel").show();
                    }

                    // To do: Move to where messages are added.
                    $(".searchTextHolder").css('border-left','none');
                    //border-left: 1px solid #ccc;

                    if (goLayer.contentarea) {
                        $(".contentarea").html(goLayer.contentarea);
                        $(".fieldsLeft").css('float', 'left');
                    } else {
                        $(".contentarea").html("");
                        $(".fieldsLeft").css('float', 'none'); // Prevents filters from falling to multiple lines below contentarea.
                    }
                    if (goLayer.cognitoform || goLayer.addlisting) {
                        $(".showFormEnable").css('display', 'block');
                    } else {
                        $(".showFormEnable").css('display', 'none');
                    }
                    $('.cognitoformid').val(goLayer.cognitoformid);
                    $('.cognitoformlink').val(goLayer.cognitoformlink);

                    if (goLayer.cognitoexpanded) {
                        $('.showForm').trigger("click");
                    } else {
                        $(".formHolder").hide();
                    }
            
					$('#sectionProvider').show();
                    if (goLayer.provider != "") {
                        //$(".layerSection-" + goLayer.section).clone().appendTo('.navClone');
                        //$('.navClone').html($("#layerBox .layerSection-" + goLayer.section).clone());


                        if (goLayer.provider.toLowerCase() == goLayer.item) {
                            if (goLayer.table) { // Layer has data
                                $('.showFilters').trigger("click"); // Unintensionally hid recycling side nav. Okay for now since recycling has no carto data.
                            }
                            //$('.fieldsLeft').hide(); // This hid on defense page
                            // HIDE OTHERS
                            if (goLayer.section.toLowerCase() != layerName) {
                                // Otherwise hides the current section, which may need to be open for recycling, etc.
                                $(".layerCheckboxes .layerSection").hide();
                                $(".layerCheckboxes .layerSection-" + goLayer.section).show();
                            }
                        } else {
                            // MOVE
                            //$(".layerCheckboxes").appendTo('.navClone');
                            $('.fieldsLeft').show();
                        }
                        //$(".navClone .layerSection").hide();
                        //$(".navClone .layerSection-" + goLayer.section).show();

                        
						if (goLayer.provider == "") {
							$('#secArrowRight').hide();
						} else {
							$('#secArrowRight').show();
						}
					} else {
						//$('#sectionProvider').hide();
					}
                  
                    $('.sectionTitleText').text(goLayer.primarytitle ? goLayer.primarytitle : goLayer.section);
                    $('.navTopTitleText').text(goLayer.section);
					$('.sectionTitle').text(goLayer.title);
                    $('.layerTitleText').text(goLayer.title);
                    $('.layerTitleMapBar').text(goLayer.title);

                    var layertitleText = (goLayer.title ? goLayer.title : goLayer.navtitle);
                    if (goLayer.section || goLayer.title) {
                        $(".showSectionMenu").show();
                    } else {
                        $(".showSectionMenu").hide();
                    }
                    if (goLayer.primarytitle) {
                        $(".layerTitleAndArrow").hide();
                    } else {
                        // Was
                        //$(".layerTitleAndArrow").show();
                    }

                    if (goLayer.tabtitle || goLayer.primarytitle) {
                        $(".layerTitleAndArrow").hide();
                    } else {
                        // For backing up. There might be circumstances where this should remain hidden.
                        $(".layerTitleAndArrow").show();
                    }

                    if ($(".horizontalTabs").is(':visible')) {
                        $(".layerTitleAndArrow").hide();
                    }
                    // Not sure if this is best place, used for dxchange
                    // Need to adjust fo other pages.
                    if (goLayer.primarytitle) {
                        //$(".sectionTitleText").addClass("primaryTitle");
                    } else {
                        //$(".sectionTitleText").removeClass("primaryTitle");
                    }

                    var theLayer = goLayer.item;
                    var theSection = goLayer.section;
                    if (typeof param["section"] != "undefined") {
                        theSection = param["section"];
                        //theLayer = ""; // Might need to change for section:layer combos
                    }

                    displaySectionMenu(theLayer, theSection, siteObject);

                    var siteName = 'Georgia Directory';
                    if (params["siteName"]) {
                        siteName = params["siteName"];
                    } 

                    if (goLayer.primarytitle) {
                        document.title = goLayer.primarytitle;
                    } else if (theLayer != "" && theLayer != "mainX") {
                        // Limit to one title at top
                        $("#sectionCategories").hide();
                        $("#sectionCategoriesToggle").show();
                        // 
                        document.title = siteName + ' - ' + goLayer.title;
                    } else {
                        document.title = siteName;
                    }
                    
                    if (goLayer.feed) {
                        
                    } else {
                        if ($("#hideMap").is(':visible')) {
                            //$('.showDirectoryTrigger').trigger("click"); // Show the directory if layer does not have map feed.
                            // Use this instead since '.showDirectoryTrigger' button was removed.
                            showDirectory(layerName,siteObject);
                        }
                        //$('.overviewButton').hide();
                    }

                    if (goLayer.table) {
                        $('.directoryButton').show();
                        $('.gridButton').show();
                        //$('.showList').show(); // Causes button to appear briefly on initial coi load.
                        //$('.hideList').hide();
                        $('.showDetails').show(); $('.hideDetails').hide();
                    } else {
                        $('.directoryButton').hide();
                        $('.gridButton').hide();
                    }
                    if (goLayer.directoryframe) { // Give emphasis to crossdomain content

                        //alert("currentAccess " + currentAccess + " " + goLayer.directorylinkaccess);
                        if (goLayer.directorylinkaccess && access(currentAccess,goLayer.directorylinkaccess)) {
                            $(".directoryframelink").show();
                            $(".showDirectoryFrame").show();
                        }
                        if (goLayer.feed && access(currentAccess,goLayer.feedaccess)) {
                            $(".directoryframeNav").removeClass("active");
                            $(".showFiltersButton").show();
                            $(".overviewMapButton").show(); // Toggle back to Carto map.
                            if (params["embed"] == "1") {
                                $(".showFiltersButton").show();
                            }
                            if ($('.filterPanelWidget').is(':visible') && $('#filterPanel').is(':visible')) {
                                $(".showFiltersButton").addClass("active");
                            } else {
                                if (goLayer.intro) {
                                    $(".introButton").addClass("active");
                                } else {
                                    $(".overviewMapButton").addClass("active");
                                }
                            }
                        }
                        if (currentAccess >= 1) $(".showDirectoryFrame").show();
                    } else {
                        $(".showDirectoryFrame").hide();
                        if (params["embed"] == "1") {
                            $(".showFiltersButton").show();
                        }
                        $(".overviewMapButton").show();
                        
                    }

                    if (!$('.smartSideMenuHolder').is(':visible')) {
                        $(".showOverlays").show();
                    }


                    if (goLayer.directoryframe || goLayer.topbuttons || goLayer.feed) {
                        $('.layoutTabHolder').show();
                    } else {
                        $('.layoutTabHolder').hide();
                    }

                    if (goLayer.intro) {
                        $(".introButton").show();
                        $(".introButton").addClass("active");

                        $('.layerIntro').html(goLayer.intro + " ");
                        $('.layerIntro').show();
                        /*
                            if (goLayer.intro && params["embed"] != "1") {
                            
                            
                            //$('.introButton').show();
                            $('.introElementButton').show();
                        } else {
                            $('.layerIntro').html("");
                            $('.layerIntro').hide();
                            $('.introButton').hide();
                            $('.introElementButton').hide();
                        }
                        */
                    }
                    
                    if (goLayer.note) {
                        $('.layerNote').html(goLayer.note + " ");
                        $('.layerNote').show();
                    } else {
                        $('.layerNote').html("");
                        $('.layerNote').hide();
                    }
                    if (goLayer.filternote && $('.cid').text() == "") {
                        $('.filterNote').html(goLayer.filternote);
                        $('.filterNote').show();
                    } else {
                        $('.filterNote').html("");
                        $('.filterNote').hide();
                    }
                    if (goLayer.sidetop) {
                        $('.sidetop').html(goLayer.sidetop + " ");
                        $('.sidetop').show();
                    } else {
                        $('.sidetop').html("");
                        $('.sidetop').hide();
                    }

                    if (goLayer.firebasePost) {
                        $('.googDocEmbed').show();
                    } else {
                        $('.googDocEmbed').hide();
                    }

                    if ((goLayer.intro && params["embed"] != "1") || goLayer.note || goLayer.filternote) {
                        $('.introElementButton').show();
                        //$('.introButton').show();
                        $('.searchTextHolder').show();
                        $('#mapBar').show();
                        $(".horizontalButtons .layoutTab").removeClass("active");
                        $(".introButton").addClass("active");
                    }

                    hideCounties();
                    if (goLayer.countyfield) {
                        //$(".filterUL li")
                        $('[data-id="county"]').show();
                        $('.showCounties').show();
                        if (goLayer.countyMapPosition) {
                            if (goLayer.countyMapPosition == "leftnav") {
                                //$('.showCounties').trigger("click");
                            } else if (goLayer.countyMapPosition == "rightheader") {
                                //$('.showCounties').trigger("click");
                                $(".countyMapHolder").insertAfter($(".headerRight"));
                                //$("#locationDD option[value='county']").prop("selected", true).trigger("change");
                                //alert("bbb");
                            }
                        }
                    } else {
                        $('[data-id="county"]').hide();
                        if (location.host.indexOf('localhost') > -1) {
                            $('.showCountiesMenu').hide();
                        } else {
                            $('.showCounties').hide();
                        }
                    }

                    $('.iframe').hide();
                    //alert('param["display"]: ' + param["display"]);
                    if ($('.cid').text()) {
                        //alert("$('.cidTab').val() " + $('.cidTab').val());
                        displayMap(layerName,siteObject);
                        //$('.showDetails').trigger("click");
                        showDetails(layerName,siteObject,$('.cid').text());

                    //if ((goLayer.mainiframe || goLayer.directoryframe) && !goLayer.feed) {
                    // && ($(".sitesource").val() == "directory" || goLayer.section == "Defense Exchange")
                    } else if (goLayer.show != "list" && (goLayer.mainiframe || goLayer.directoryframe)) {
                        //alert('goLayer.directoryframe');

                            // Might only hide when no feed
                            //$('#panelHolder').hide(); // For Defense
                            //$('#mapBar').hide();

                        $('#mapPanel').hide();
                        $('.hideMap').trigger("click");
                        $('.hideFiltersClick').trigger("click");
                        $('.listPanel').hide();
                        $('.hideGrid').trigger("click");
                        $('.filterPanelWidget').hide();
                        console.log("loadFrame");
                        if (goLayer.mainiframe) {
                            loadFrame(layerName + "Iframe",goLayer.mainiframe, goLayer.iframeheight);
                        } else if (goLayer.directoryframe) {
                            loadFrame(layerName + "Iframe",goLayer.directoryframe, goLayer.iframeheight);
                            // Show Atlas button

                            if (goLayer.directorytitle) {
                                $(".showDirectoryFrame span").text(goLayer.directorytitle);
                            } else {
                                //$(".showDirectoryFrame span").text("Directory");
                            }
                            $(".horizontalButtons .layoutTab").removeClass("active");
                            $(".showDirectoryFrame").addClass("active");
                        }
                    } else if (goLayer.directoryframe && $('showDirectoryFrame').hasClass('active')) {
                        // Previously viewing directory, stick with it.
                        loadFrame(layerName + "Iframe",goLayer.directoryframe, goLayer.iframeheight);
                    }


                    else if (goLayer.directoryframe && $(".sitesource").val() == "directory") {
                        displayIFrame(layerName,goLayer);

                    } else if (param["display"] == "map") {
                        $('#showMap').hide();
                        $('#hideMap').show();
                        console.log("displayMap called from changeLayer.");
                        displayMap(layerName,siteObject);
                    } else if (param["display"] == "directory") {
                        showDirectory(layerName,siteObject); // Also loads map. Triggering showDirectory click here did not work here with top checkboxes.
                    } else if (param["display"] == "grid") {
                        //$('#showGrid').hide();
                        //$('#hideGrid').show();
                        //$('#pagination').show();
                        $('#showGrid').trigger("click");
                    } else if (param["display"] == "form") {
                        $('.formHolder').show();
                    } else if ($('#hideMap').is(':visible')) {
                        console.log("displayMap since Map button is visible.");
                        displayMap(layerName,siteObject);
                    } else { // if (param["display"] == "undefined") 
                        // Caused double loading.
                        //console.log(".showDirectory since no display param.");
                        if (goLayer.feed || goLayer.table) {
                            showDirectory(layerName,siteObject);
                        }
                    }

                    setSharePaths(layerName,siteObject);

                    // After buttons are set
                    //updateURL(layerName); // For display change and new filters

                    /*
                    // Create a copy of the params for the history so the history version can be customized while
                    // leaving the params unchanged.
                    var historyParams = $.extend({}, params);
                    var querystring = '';
                    //if (location.host.indexOf('localhost') > -1) {
                    //    queryString = buildLocalhostQueryString(historyParams);
                    //}
                    //else {
                        queryString = "#" + $.param(historyParams);
                    //}
                    console.log("queryString: " + queryString);
                    */

                    // loadBackground
                    if (!layerName) {
                        // Might not be reaching this
                        layerName = "main"; // Default layer

                        $('#sectionCategoriesToggle').show(); // then next line hides.
                        $('.showCats').trigger("click");
                    }
                    //alert("layerName for getGo1 " + layerName);
                    //alert("layerName: " + layerName);

                    if (typeof goLayer.primarytitle != "undefined") {
                        //alert("goLayer.primarytitle " + goLayer.primarytitle);
                        $(".primaryTitle").html(goLayer.primarytitle);
                        //alert(goLayer.section);
                        if (goLayer.item == goLayer.section.toLowerCase().replace(" ","-")) {
                            if (params["embed"] != "1") {
                                $(".primaryHeader").show(); // Contains stats
                            }
                        }
                        $(".primaryTitle").show();
                        //$(".showSectionMenu").hide();
                        
                        //$('.hideMainMenu').trigger("click"); // Avoid because hides on main
                        $('.hideFiltersClick').trigger("click");
                        

                    } else {
                        // PrimmaryHeader is hidden above, for pages without layers.
                    }

                    // || params["bigThumbSection"] // This would block map display when choosing other layers when $('.layerContent').hide() invoked.
                    if (typeof goLayer.bigThumbSection != "undefined") {
                        displayBigThumbnails(goLayer.bigThumbSection,siteObject);
                    
                        //$('.layerContentHide').show(); // Need to avoid showing on mobile.

                        // Inefficient - change to avoid loading initially.
                        $('.layerContent').hide();
                     } else {   
                        //displayHexagonMenu("",siteObject); // Also includes sectionCategories side list
                    
                        //$('#sectionCategories').hide();
                        $("#honeycombPanelHolder").hide();
                    }
                    if (goLayer.showLayerTitle == "0") {
                        $('.layerTitleAndArrow').hide();
                    }

                    if (goLayer.showlist == "0") {
                        //$(".layerContent").hide();
                        //$('#mapPosition').insertAfter($('.moduleBackground'));
                        //$('#mapPosition').addClass('mapPositionLowerRight');



                        //$('#panelHolder').css('width', '400px');
                        //$('#panelHolder').css('float', 'right');
                        //$('.listPanel').hide();
                        //$('.mapBarButtonsRight').hide();

                        //$('#panelHolder').hide();

                        //$('.moduleJS').append($('#panelHolder'));
                    }
                    if (param["showappicon"] == "0" || params["showappicon"] == "0") {
                        $('.showApps').hide(); $('.showAppsTopBar').hide();
                        $('.hideApps').hide(); $('.showAppsTopBar').hide();
                    }
                    if (param["showvideoicon"] == "0" || params["showvideoicon"] == "0") {
                        $('.showVideo').hide();
                    }

				} else {
                    $(".moduleContent").show();
                    $('.mapBarHolder').hide();
                    $('#mapPanel').hide();
                    $(".showSectionMenu").hide();
                    hideList();
                    $('.showList').hide();
                    //$('.hideList').hide();
                    $('.showDetails').hide();
                    $('.hideDetails').hide();
                    $('.showLegend').hide();
                    $('.hideLegend').hide();
                    $(".hideWhenLayerMap").show(); // GUARD
                    //$('.layerContent').hide();

                    if (params["embed"] != "1") {
                        // Default image
                        //alert("default image");

                        $('.moduleBackgroundImage').css('background-image', 'url(' + root + '/img/hero/main.jpg)');
                        $('.moduleBackgroundImage').css('min-height', '1200px');
                    }
                    if (params["fullnav"]) {
                        if (params["embed"] != "1") { // Add params["showimage"] == "1" to override
                          //$('.moduleBackgroundImage').css('background', 'linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7))');
                          
                          var heroPath = params["fullnav"];
                          if (params["rootHttps"]) {
                            // Changes will be needed for defense when activating:
                            //heroPath = params["rootHttps"] + params["fullnav"];
                          }
                          $('.moduleBackgroundImage').css('background-image', 'url(' + heroPath + ')');
                          $('.moduleBackgroundImage').css('min-height', '1200px');

                          if (params["heroOpacity"]) {
                            $(".moduleBackgroundImage").css("opacity", params["heroOpacity"]);
                          }
                          
                        }
                    }
                    if (params["showButtons"] != "1") {
                        // temporary. Search and video not working here: http://localhost/documentation/
                        //$('.navTopRight').hide();
                    }
                    if ($(".moduleSideNav")[0]) { // GUARD
                        // Move side nav into third-party .moduleSideNav. 
                        // For sites that don't use .moduleContent to move content into index.html (GUARD)
                        $(".moduleSideNav").append($(".smartSideMenuHolder"));
                        //$('.showAppsClick').trigger("click");
                        $('.showActionMenu').trigger("click");
                        $(".navTop").prepend($(".hideApps"));
                        $(".leftTopItem").addClass("leftTopItemLeftPadding");
                    }
                }
				if(layerName != "mainX") {
                    $('#hideMenu').trigger("click");
                    if (goLayer) {
                        $("#listName").text(goLayer.title + " Directory");
                    } else {
                        $("#listName").text("");
                    }
                    //$('.filterPanelWidget').show(); // Avoid, this displays when mainiframe.
				} else {
                    $('.filterPanelWidget').hide();
                }
                updateOffsets(); // Allows for change back to main with video.

                // Added for recycling. Menu was not appearing here:
                // http://localhost#recycling
                $(".layerSection-" + layerName.toLowerCase()).show();
                //alert(layerName);
                $(".row-" + layerName + " .layerActionIcon").addClass('layerActionActive');

                if (!$(".topButtons").is(':visible')) {
                    $('.showSettingsInNavTop').append($('.showSettingsHolder'));
                } else {
                    $('.showSettingsInTopButtons').append($('.showSettingsHolder'));
                }

                // Not currently in use
                if ($(".primaryHeader").is(':visible') && params["filterInPrimaryHeader"] == "1") { 
                    // Menus would need to overlay bottom of header div
                    $(".filterPanelInPrimaryHeader").append($(".fieldsLeft"));
                    $('.showFiltersButton').hide();
                }
                console.log("End of changeLayer hash: " + location.hash);

                if(layerName == "defense-exchange") { // Temp hack for /defense folder.
                    
                    $("#upperRightIcons").hide();
                    $(".showSectionMenu").css("padding-left","20px");
                    $("#layerBox").css("background-color","rgba(33, 33, 33, 0.95)");
                    $("#topiconContactUs").hide(); // Contact Us icon appeared behind menu.
                    
                    //$(".navRightPosition").append($(".threeDotNav"));

                    //$(".fixedTopBarBkgd").prepend($(".smartSideMenuHolder"));
                    //$(".smartSideMenuHolder").addClass("smartSideMenuHolderAbsolute");
                    //$(".appMenuInner").css("background-color","rgba(33, 33, 33, 0.98)");

                } else {
                    //$(".smartSideMenuHolder").insertAfter($(".smartSideMenuHolderPosition"));
                    //$(".smartSideMenuHolder").removeClass("smartSideMenuHolderAbsolute");
                }

                $(".appMenuInner").css("background-color","rgba(33, 33, 33, 0.98)");
                $(".fixedTopBarBkgd").prepend($(".smartSideMenuHolder"));
                $(".smartSideMenuHolder").addClass("smartSideMenuHolderAbsolute");

                if ($('.video-module').is(":visible")) {
                //if (typeof goLayer.youTubeID != "undefined") {
                    $('.menuOverVideo').append($('.smartSideMenuHolder'));
                }

                // Temporary HACK because this line had no effect in side menu click.
                //alert('.hideMetaMenu');
                //console.log('.hideMetaMenu');
                //$('.hideMainMenu').trigger("click");

                if ($(".navTopLeft").height() > 50) {
                    //$(".regularLogo").show(); // May have caused double logos on /d
                    $(".horizontalLogo").hide();
                } else if (layerName != "main") { // Omit main to large logo floats above background.
                    $(".regularLogo").hide();
                    $(".horizontalLogo").show();
                }
			}


			function displayLayerCheckboxes(siteObject) { // For Layer Icon on map - Master
                console.log("displayLayerCheckboxes start location.hash: " + location.hash);
                var layerCheckboxes = "";
                var overlayList = ""; // CLicking selects checkbox in layerCheckboxes list
                var previousSet = "";
                var closeLayerSet = false;
  
                // To Do: sort by view
                var item = ""; // Required for IE
                var layerSectionDisplay = "";
                var topTabs = "";
                var menulevel = 1;
                for(item in siteObject.items) {
                    var menuaccess = 10; // no one
                    try { // For IE error
                        if (typeof(siteObject.items[item].menuaccess) === "undefined") {
                            menuaccess = 0;
                        } else {
                            menuaccess = siteObject.items[item].menuaccess;
                        }
                    } catch(e) {
                        console.log("displayLayerCheckboxes: no menuaccess");
                    }
                    // location.host == 'localhost' || 
                    if (location.host == 'localhost' || location.host == 'review.georgia.org') {
                        //currentAccess = 9; // Or 7
                    }
                    // && siteObject.items[item].section.toLowerCase() != siteObject.items[item].item
                    if (access(currentAccess,menuaccess)) {
                        var title = "";
                        try { // For IE error
                            title = ((siteObject.items[item].navtitle) ? siteObject.items[item].navtitle : siteObject.items[item].title);
                        } catch(e) {
                            console.log("displayLayerCheckboxes: no layer title");
                            title = "----";
                        }
                        if (title) {
                            if (siteObject.items[item].section != previousSet && siteObject.items[item].section) {
                                // siteObject.items[item].item ==  || 
                                layerSectionDisplay = '';
                                menulevel = 1;
                                if (siteObject.items[item].menulevel) {
                                    menulevel = siteObject.items[item].menulevel;
                                }
                                if ((siteObject.items[item].menulevel == "3" || siteObject.items[item].menulevel == "4")) {
                                    layerSectionDisplay = ' style="display:none"';
                                }
                                if (previousSet != "") {
                                    layerCheckboxes += '</div>'; // For columnizer
                                    overlayList += '</div>'; // For columnizer
                                }
                                closeLayerSet = true;
                                // First div is for columnizer
                                var sectionIcon = '<i class="material-icons menuTopIcon topHeaderIcon">&#xE53B;</i>';
                                if (siteObject.items[item].sectionicon) {
                                    //sectionIcon = siteObject.items[item].sectionicon;
                                }
                                // sectionIcon + 
                                layerCheckboxes += '<div ' + layerSectionDisplay + ' class="dontsplit layerSection layerSection-' + siteObject.items[item].section.toLowerCase().replace(" ","_") + ' user-' + menuaccess + '" menulevel="' + menulevel + '"><div style="clear:both" class="layerSectionTitle layerSectionTitleFormat"><div class="sectionArrowHolder"><div class="leftArrow"></div></div>' + siteObject.items[item].section + '</div>';
                                if (siteObject.items[item].feed) {
                                    overlayList += '<div ' + layerSectionDisplay + ' class="dontsplit layerSection layerSection-' + siteObject.items[item].section.toLowerCase().replace(" ","_") + ' user-' + menuaccess + '" menulevel="' + menulevel + '"><div style="clear:both" class="layerSectionTitle layerSectionTitleFormat"><div class="sectionArrowHolder"><div class="leftArrow"></div></div>' + siteObject.items[item].section + '</div>';
                                }
                            } // Check circle // Was around title: <label for="go-' + siteObject.items[item].item + '" style="width:100%; overflow:auto">
                            // <i class="material-icons" style="float:right;color:#ccc">&#xE86C;</i>
                            var directlink = "";
                            if (siteObject.items[item].directlink) {
                                directlink = siteObject.items[item].directlink;

                            }

                            layerCheckboxes += '<div class="layerCbRow row-' + siteObject.items[item].item + ' user-' + menuaccess + '"><div class="layerAction" data-link="' + directlink + '">';
                            
                            if (siteObject.items[item].feed) {
                                layerCheckboxes += '<div class="layerActionIcon"></div>';
                                overlayList += '<div class="layerCbRow user-' + menuaccess + '" data-trigger="go-' + siteObject.items[item].item + '"><div class="overlayAction" data-link="' + directlink + '">';
                                
                                //overlayList += '<div class="layerActionIcon"></div>';
                                
                                //overlayList += '</div><div class="layerCbTitle"><input type="checkbox" class="layersCB" name="layersCB" id="go-' + siteObject.items[item].item + '" value="' + siteObject.items[item].item + '">' + title + '</div></div><div style="clear:both"></div>';
                                overlayList += '</div><div class="layerCbTitle">' + title + '</div></div><div style="clear:both"></div>';
                            
                            } else {
                                layerCheckboxes += '<div class="layerActionIcon layerActionIconNoFeed"></div>';
                                //overlayList += '<div class="layerActionIcon layerActionIconNoFeed"></div>';
                                
                            }

                            layerCheckboxes += '</div><div class="layerCbTitle"><input type="checkbox" class="layersCB" name="layersCB" id="go-' + siteObject.items[item].item + '" value="' + siteObject.items[item].item + '">' + title + '</div></div><div style="clear:both"></div>';
                            previousSet = siteObject.items[item].section;
                        }
                    }
                    if (siteObject.items[item].directoryframe) {
                        topTabs += '<div>' + siteObject.items[item].title + '</div>';
                    }
                }
                if (closeLayerSet) {
                    layerCheckboxes += '</div>\n'; // For columnizer
                    overlayList += '</div>\n'; // For columnizer
                }
                // Double div prevents prior layerSectionTitle from being unchecked.
                //layerCheckboxes += '<div><div class="showAllLayers dontsplit layerSectionTitleFormat" style="display:none">More</div></div>\n';

                //$(document).ready(function () { // For IE
                    //alert("test in progress: " + layerCheckboxes);

                    if (location.host == 'localhost') {
                        //$(".siteTopTabs").append(topTabs);
                    }
                    $(".layerCheckboxes").append(layerCheckboxes);

                    $(".overlaysInSide").append(overlayList);
                    
                    // json loaded within initSiteObject. location.hash:
                    console.log("displayLayerCheckboxes location.hash: " + location.hash);
                    console.log("displayLayerCheckboxes - Layer Icon on map, stores active layers without map load");

                    //$('.layerCheckboxes').columnize({ columns: 2 }); // Also called later since this won't have an effect when not visible.

                    // APP MENU ACTIONS
                    $('.menuRectLink').click(function () {
                        console.log('.menuRectLink click');
                        
                        $('.showLayerMenu').trigger("click");

                        $('.layerSection').hide();

                        $('.layerSection-' + $(this).attr("data-section").toLowerCase()).show();
                        //$('.layerSection-showAllLayers').show();
                        
                        if ($('.layerSection-' + $(this).attr("data-section").toLowerCase()).find('.leftArrow').length) {
                            // Only click if closed.
                            $('.layerSection-' + $(this).attr("data-section").toLowerCase() + ' > .layerSectionTitle').trigger("click");
                            $('.showAllLayers').show();
                        }
                        //alert( $(this).attr("data-layer").toLowerCase());

                        // ToDo: Figure out when to avoid changing url and layer until secondary navigation is selected.  Add logic to limit the following.

                        //  Might limit instant change to sections that have a landing page.
                        clearAll(siteObject); // Clear all layers
                        if ($(".moduleJS").width() > 800) {
                            //updateTheURL($(this).attr("data-layer").toLowerCase());
                            //changeLayer($(this).attr("data-layer").toLowerCase(),siteObject,"clearall");
                        }
                        event.stopPropagation();
                    });

                    // CHECKBOX ACTIONS
                    $('.layerActionIcon').click(function () {
                        $(this).addClass('layerActionActive');
                        console.log("Trigger hidden checkbox click from icon.");
                        $(this).parent().parent().find('.layersCB').trigger('click');
                        event.stopPropagation();
                    });
                    $('.layerAction').click(function () {
                        // Clear all layers
                        clearAll(siteObject);
                        //alert('.layerAction');

                        if($(this).attr("data-link")) {
                            window.location = $(this).attr("data-link");
                            return;
                        }
                        console.log("Trigger hidden checkbox click from nav.");
                        $(this).parent().find('.layersCB').trigger('click');
                        $(this).parent().find('.layerActionIcon').addClass('layerActionActive');

                        if ($(".moduleJS").width() <= 800) { // Narrow
                            $('.hideLocationsMenu').trigger("click");
                        }
                            
                        event.stopPropagation();
                    });
                    
                    // , .overlaysInSide .layerCbTitle
                    $('.overlaysInSide .layerCbRow').click(function () {
                        $(".overlaysInSide").hide(); $(".showOverlays").removeClass("active");
                        $('#' + $(this).attr("data-trigger")).trigger("click"); // Triggers changeLayer.
                    });

                    $('.showAllLayers').click(function () {
                        $('.layerCbRow').hide();
                        $('.sideTip').hide();
                        $('.layerSectionTitle').find('.downArrow').addClass('leftArrow').removeClass('downArrow');
                        // Make all arrows point right.

                        $('.showLayerMenu').trigger("click");
                        $('.showAllLayers').hide();
                    });
                    $('.layerSectionTitle').click(function () {
                        //alert("layerSectionTitle click");
                        $('.listPanelHolder').show();
                        
                        $(this).parent().find('.layerCbRow').toggle();
                        if ($(this).find('.leftArrow').length) {
                            $(this).find('.leftArrow').addClass('downArrow').removeClass('leftArrow');
                            // If any layers in the current section are feeds, show 3-dots tip.
                            if ($(this).parent().find('.layerActionIcon').length) {
                                //$(this).parent().append($('.sideTip'));
                                $('.sideTip').show();
                                setTimeout(function() {
                                    $(".sideTip").slideUp('slow')
                                }, 4000);
                            } else {
                                $('.sideTip').hide();
                            }
                        } else {
                            $(this).find('.downArrow').addClass('leftArrow').removeClass('downArrow');
                        }
                        event.stopPropagation();
                    });

                    $('.layerCheckboxes :checkbox').change(function () {


                        if($(this).is(":checked")) { // Show Layer
                            //$(this).parent().parent().find('.layerAction .layerActionIcon').css('color', '#3B99FC');
                            $(this).parent().parent().find('.layerAction .layerActionIcon').addClass('layerActionActive');

                            // Update hash without triggering listener
                            //updateURL($(this).prop('value'));
                            // History.pushState(historyParams, searchTitle, queryString);

                            clearConsole();
                            console.log("CHECKED " + $(this).prop('value'));
                            console.log("changeLayer called from .layerCheckboxes :checkbox");
                            $('.layerContent').show(); // Since may be hidden on bigThumb page.

                            $('.cid').text("");
                            $('.cidTab').val("");
                            updateTheURL($(this).prop('value'));
                            var checkedCount = $('.layersCB:checked').length;
                            if (checkedCount == 1) {
                                console.log("TO DO: Clearall - Currently clearall only clears the previous layer.");
                                changeLayer($(this).prop('value'),siteObject,"clearall");
                            } else {
                                changeLayer($(this).prop('value'),siteObject,"keepexisting");
                            }
                            // Limit to one title at top
                            $("#sectionCategories").hide();
                            $("#sectionCategoriesToggle").show();
                            $('#cat-' + $(this).prop('value')).prop("checked", true);

                            /* Hiding below now instead.
                            if ($(".moduleJS").width() <= 800) { // Narrow
                                $('.hideMetaMenu').trigger("click");
                            } else if ($('.appMenuPosition').is(":visible")) {
                                $('.hideMetaMenu').trigger("click");
                            }
                            */
                            //$('.hideMainMenu').trigger("click"); // Has to reside after lines above.

                            closeMenu();
                        } else { // Hide Layer
                            //$(this).parent().parent().find('.layerAction .layerActionIcon').css('color', '#ccc');
                            $(this).parent().parent().find('.layerAction .layerActionIcon').removeClass('layerActionActive');
                            console.log("hideLayer: " + $(this).prop('value'));
                            $('.cid').text("");
                            $('.cidTab').val("");
                            $('#cat-' + $(this).prop('value')).prop("checked", false);
                            hideLayer($(this).prop('value'),siteObject);
                        }

                        $(".besideLeftHolder").hide();
                    });

                    $('.showList').click(function(event) {
                        var moduleWidth = $(".moduleJS").width();
                        mapbuttonsNeutral();
                        $('.listPanelRows').show();
                        $('.listPanel').show();
                        $('.listPanelHolder').show();
                        if ($(".besideLeftHolder .listPanel").length > 0) { // Beside map
                            $('.besideLeftHolder').show();
                        }
                        if ($(".moduleJS").width() > 800) { // Because scolling down on mobile.
                            $('.showList').hide();
                            $('.hideList').show();
                        }
                        $('.moveListBelow').show();
                        //$('.moveListBeside').show();
                        $('.detailsPanel').hide();
                        $('#hideDetails').show();
                        $('.layerNav .showMap').show(); // For COI mobile
                        //alert(".layerNav .showMap");
                        $('.showDetails').hide();
                        $('.hideDetails').show();
                        $('.letter').text(""); // No effect
                        $('.cid').text("");
                        
                        // Might limit scroll to when list is below map
                        $('html,body').animate({
                            scrollTop: $(".listPanel").offset().top - $("#siteHeader").height()
                        });
                        //$('.showDirectoryTrigger').trigger("click"); // Triggers map too!
                        //showDirectory(layerName,siteObject); // Not defined here.

                        // BugBug Test if needed here
                        layerName = getLayerName();
                        updateTheURL(layerName); // Cid removed

                        if ($(".listTable").text().length <= 0) {
                            // Limit to when list is blank, when cid loaded initially.
                            console.log("Call loadGrid from .showList for " + layerName);
                            loadDirectory(0,layerName,siteObject);
                        }
                    });
                //});
            }
            function displayIFrame(layerName,goLayer) {
                deselectMenusAndTabs();
                $(".horizontalButtons .layoutTab").removeClass("active");
                $(".showDirectoryFrame").addClass("active");
                $(".directoryframeNav").show();
                
                if (goLayer) {

                    //if (goLayer.directoryframe) {
                        loadFrame(layerName + "Iframe",goLayer.directoryframe);
                    //    return;
                    //} else {
                    //    $('.iframe').hide();
                    //}
                }
                $('.iframeHolder').show();
                $(".detailsPanel").hide();
                $(".besideLeftHolder").hide();
                $(".contentPanel").hide();
                
                //$('.showSearchClick').trigger("click");
            }
            function getCurrentSection() {
                //Sample - #companies:aerospace:runways returns companies
                if (param[""]) {
                    var theTab = param[""];
                    if (theTab.indexOf(":") >= 0) {
                        var splitParam = param[""].split(":");
                        theTab = splitParam[0];
                    }
                    return theTab;
                } else {
                    return "";
                }
            }


            
            function setSiteSource(sitesource) {
                if ($(".sitesource").val() == "directory") {
                    //$('.navTopHolder').hide();
                    $('.navTopInner').hide();
                    if (params["embed"] != "1") { // Settings would become hidden if embedded.
                        $('.topButtons').hide();
                    }
                    $('.mapBarHolder').hide();
                } else {
                    $('.navTopInner').show();
                    $('.navTopHolder').show();
                    //$('.topButtons').show(); // Showed in dd
                    $('.mapBarHolder').show();
                }
            }
            function undohorizontalFilter() {
                $(".filterLabel").show();

                // Might use later
                //$(".customFilters").insertAfter($(".customFiltersPosition"));
                //$(".searchElements").insertAfter($(".searchElementsPosition"));
                //$(".searchField").insertAfter($(".searchFieldPosition"));
            }
            function setSiteLook(siteLook,layerName) {
                console.log("setSiteLook: " + sitelook);
                
                // Force the brower to reload by changing version number. Avoid on localhost for in-browser editing. If else.
                var forceReload = (location.host == 'localhost' ? "" : "?v=3");
                if (siteLook == "dark" || layerName == "main") {
                    $('.sitebasemap').val("dark").change();
                    //toggleVideo("show","nochange");
                    includeCSS(root + 'css/site-dark.css' + forceReload);
                    $("#css-site-dark-css").removeAttr('disabled');
                    $("#css-site-green-css").attr("disabled", "disabled");
                    $("#css-site-plain-css").attr("disabled", "disabled");
                    undohorizontalFilter();
                    $('.searchTextHolder').append($('.searchTextMove'));
                } else if (siteLook == "gc" && layerName != "main") {
                    $('.sitebasemap').val("osm").change();
                    //toggleVideo("hide","pauseVideo");
                    includeCSS(root + 'css/site-green.css' + forceReload);
                    $("#css-site-green-css").removeAttr('disabled');
                    $("#css-site-dark-css").attr("disabled", "disabled");
                    $("#css-site-plain-css").attr("disabled", "disabled");
                    if (layerName != "main") {
                        $('.showSearchClick').trigger("click");
                    }
                    undohorizontalFilter();
                    $('.searchTextHolder').append($('.searchTextMove'));
                } else if (siteLook == "default") {
                    $('.sitebasemap').val("osm").change();
                    $("#css-site-green-css").removeAttr('disabled');
                    $("#css-site-dark-css").attr("disabled", "disabled");
                    $("#css-site-plain-css").attr("disabled", "disabled");
                    if (layerName != "main") {
                        //$('.showSearchClick').trigger("click");
                    }
                    //undohorizontalFilter();
                    //$('.searchTextHolder').append($('.searchTextMove'));
                } else { // Light
                    $('.sitebasemap').val("positron_light_nolabels").change();
                    includeCSS(root + 'css/site-plain.css' + forceReload);
                    $("#css-site-plain-css").removeAttr('disabled');
                    $("#css-site-dark-css").attr("disabled", "disabled");
                    $("#css-site-green-css").attr("disabled", "disabled");

                    //$("#sectionCategoriesToggle").hide();
                    //$("#sectionNavigation").append($(".customFilters"));

                    //$('#sectionNavigation').append($('.searchTextMove'));
                    //$(".filterPanelHolder").show(); // Might need for COI
                    $(".layoutTabHolder").show();
                }
                setTimeout(function(){ updateOffsets(); }, 200); // Allows time for css file to load.
                setTimeout(function(){ updateOffsets(); }, 4000);
                console.log("setSiteLook Done");
            }

			$(document).ready(function () {
                console.log("Document ready inside siteObject: " + layerName + " location.hash: " + location.hash);
                
                //console.log("changeLayer from siteObject json load after document ready - BUG");
                // BUGBUG - this is not placing shapes on map (for cycling).  Only legend appears
                // Same thing occurs when loaded only by hash.
                //changeLayer(layerName,siteObject); // Would load twice sometimes, but needed because hash change is not consistant
             

                // Places green tabs at top.
                // Possible starting point for personal tabs set by user's cookie.

                if (location.host == 'localhost' || window.location.protocol == "https:") {
                    $('*[data-id="current"]').removeClass("hideFilter"); // Show Nearby location option
                    if(!inIframe()) { // iFrame does not allow geoposition lookup
                        $('.showMyPosition').removeClass("hideFilter"); // Show Nearby location icon
                    }
                }
                if (location.host == 'localhost' || location.host == 'review') {
                    $('*[data-id="custom"]').removeClass("hideFilter"); // Show Lat/Lng option
                }

                displayAppMenu(siteObject);
                displayLayerCheckboxes(siteObject);

				$('a').click(function(event) {
					var requestedHash = $(this).prop("hash");
					var requestNoHash = $(this).attr('href').replace(requestedHash,'');
					if (requestNoHash.substr(0,2) == "./") {
                        // BUGBUG - Allow for ./ to be within a second level subdirectory.
                        // Append full path to relative link for comparison.
                        //alert(requestNoHash);
                        //alert("-" + requestNoHash.substr(1,requestNoHash.length));
                        // BUGBUG - automatically fetch full path for "/site" here:
                        requestNoHash = location.protocol + '//' + location.host + "/site/" + requestNoHash.substr(2);
                    } else if (requestNoHash.substr(0,1) == "/") {
						// Append full path to relative link for comparison.
						requestNoHash = location.protocol + '//' + location.host + requestNoHash;
					} else if (requestNoHash == '') { // Link is just a hash.
						requestNoHash = location.href.replace(location.hash,'');
					}
					//else if (requestedPath.substr(0,1) == "#") {
					//	requestedPath = location.href.substr(0,location.href.indexOf('#')) + requestedPath;
					//}
					// Compare without hash to see if leaving current page.
					//alert(location.hash);
					var currentLocation = location + '';
					var locationNoHash = currentLocation.replace(location.hash,'');
                    //alert("locationNoHash.length: " + locationNoHash.length);
                    if (locationNoHash.length > 0) {
                        if (locationNoHash.substr(locationNoHash.length-1,1) == "?") { // Ends with ?
                            locationNoHash = locationNoHash.substr(0,locationNoHash.length-1);
                        }
                    }
					//Remove this following observation
					console.log("requestNoHash: " + requestNoHash + "&nbsp; locationNoHash: " + locationNoHash);
                        
					if (requestNoHash != locationNoHash) {
						console.log("Leaving page: " + requestNoHash + "&nbsp; Destination: " + locationNoHash);
						return;
					}
					if (location.hash == requestedHash) {
						// Hash remains the same, so just scroll to top with default UI for layer.
						//var layerName = requestedHash.replace('#','');
						
						console.log("layerName for getGo " + layerName);
						var goLayer = getGo(siteObject.items,layerName);
						//$(".sectionProviderTitle").text(goLayer.provider);
                        if (typeof goLayer != "undefined") {
						  $(".sectionTitle").text(goLayer.title);
                        }
						$('#hideMenu').trigger("click");
					}
				});

                // For actions that are not map-dependent
                $('.showMyPosition').click(function(event) {
                    //chkGeoPosition = true;
                    layerName = getCurrentLayer();
                    var goLayer = getGo(siteObject.items,layerName);
                    if (goLayer.mainiframe) {
                        //alert("Map above mainiframe.");
                        // Might reduce height of map
                    }
                    activateMyLocation();
                    $('.showMyPosition').hide();
                    $('.hideMyPosition').show();
                });
                $('.hideMyPosition').click(function(event) {
                    $('.hideMyPosition').hide();
                    $('.showMyPosition').show();
                });

                $('.sectionBackLinkIntercept').click(function(event) {
                   //History.pushState('', '', '#main');
                   $('.sectionBack').hide();
                   console.log("Remove hash");
                   //alert("Remove hash"); // Temporary
                   // Remove the hash entirely. Title is required.
                   History.pushState("", document.title, window.location.pathname + window.location.search);

                    // Not using, better to remain in current environ.
                    //$('.moduleBackgroundImage').css('background-image', 'none');

                   if (Cookies.get('sitelook') == "default") {
                        //toggleVideo("show","nochange");
                   }
                   $('#hideSearch').trigger("click");

                   displaySectionMenu('main','',siteObject); // Main menu
                   $("#sectionCategoriesToggle").hide();
                   $("#sectionCategories").show();
                   event.preventDefault(); // Intercept href ./ click to prevent page reload.
                });


                /*
                $(".showSectionMenu").hover(
                      function() {
                        //$(".showSectionMenu").hide();
                        //$(".hideLeftPop").show();
                        //$(".leftPop").show();

                        //$('.showLayers').trigger("click");
                      }, function() {
                        //$(".leftPop").hide();
                      }
                );
                $(".hideLeftPop").hover(
                      function() {
                        $(".leftPop").show();
                      }, function() {
                        $(".hideLeftPop").hide();
                        $(".showSectionMenu").show();
                        $(".leftPop").hide();
                      }
                );
                $(".leftPop").hover(
                      function() {
                        $(".showSectionMenu").hide();
                        $(".hideLeftPop").show();
                        $(".leftPop").show();
                      }, function() {
                        $(".leftPop").hide();

                        // If cursor is not over .hideLeftPop - prevents flicker
                        if (!$('.hideLeftPop').is(":hover")) {
                            $(".hideLeftPop").hide();
                            $(".showSectionMenu").show();
                        }
                      }
                );
                */

                $(".hideLeftPop").click(function(event) {
                    $('.showLayers').trigger("click");
                });
                $("#sectionNavigation").hover(
                      function() {
                        $(".sectionBackLink").show();
                        //$("#hideSectionCategories").show();
                      }, function() {
                        $(".sectionBackLink").hide();
                        //$("#hideSectionCategories").hide();
                      }
                );

				$('.showCats').click(function(event) {

                    $('.showLayers').trigger("click");
                    return;

                    // NOT USED:
                    $("#sectionCategories").show(); // Avoid .slideDown else height is not available for updateOffsets().
                    $("#secArrowRight").hide();
					//$("#sectionCategoriesToggle").hide();
					$("#secArrowDown").show();
					$("#defaultWidget").show();
                    $("#sectionCategoriesToggle").hide();
                    $("#sectionNavigation").show();
                    updateOffsets();
				});

                /*
				$('.hideCats').click(function(event) {
					alert("getGo hideCats" + currentLayer);
					var goLayer = getGo(siteObject.items,layerName);
					if (goLayer.provider != "") {
						$("#secArrowRight").show();
					}
                    updateOffsets();
					hideSectionCategories();
                    event.stopPropagation();
				});
				*/

                $(".showHero").click(function(event) {
                    $(".showHero").hide();
                    $(".hideHero").show();
                    emmersive = true; // Loads images and sets fullnav height taller.
                    console.log("changeLayer from showHero click");
                    // BUGBUG - don't reload map here
                    changeLayer(layerName,siteObject,"clearall"); // Display background image
                    includeCSS('css/site-dark.css');
                    $("#css-site-dark-css").removeAttr('disabled');
                    $('#hideSettings').trigger("click");
                });
                $(".hideHero").click(function(event) {
                    $(".hideHero").hide();
                    $(".showHero").show();
                    $('.moduleBackgroundImage').css('background-image', 'none');
                    emmersive = false;
                    $("#heroContent").css('min-height', '172px'); // Undo setting from changeLayer.
                    //$("#heroContent").hide();
                    $("#css-site-dark-css").attr("disabled", "disabled");
                    $('#hideSettings').trigger("click");
                });

                function showSearchClick() {

                    //if () {
                        //$('.').trigger("click");
                        //return;
                    //}
                    
                    //$(".moduleBackgroundImage").addClass("moduleBackgroundImageDarken"); // Not needed since filters are not over image.
                    //$(".siteHeaderImage").addClass("siteHeaderImageDarken"); // Not needed since filters are not over image.

                    $(".layerContent").show(); // For main page, over video.

                    //$(".showFilters").hide(); // Avoid hiding because title jumps.
                    //$(".hideFilters").show();

                    // Coming soon - Select if searching Georgia.org or Georgia.gov
                    //$(".searchModuleIconLinks").show();
                    $(".hideWhenFilters").hide();

                    $(".filterPanelHolder").show();
                    $(".filterPanelWidget").show();
                    $("#filterPanel").show(); // Don't use "normal", causes overflow:hidden.
                    $(".searchHeader").show();
                    $(".detailsPanelXXX").show();
                    $(".contentPanel").show();
                    //$(".hideSearch").show();
                    //$(".showSearchClick").hide();
                    $(".showFiltersClick").hide();

                    //$(".showFilters").hide();

                    // Would remove active from Overview Map
                    $(".horizontalButtons .layoutTab").removeClass("active");
                    $(".showFiltersButton").addClass("active");

                    $(".hideSearch").show();
                    //$(".hideFilters").show(); // X not needed since magnifying glass remains visible now.
                    //$("#hideSearch").show();
                    if ($(".settingsPanel").is(':visible')) {
                        $('#hideSettings').trigger("click");
                    }
                    if ($("#menuHolder").is(':visible')) {
                        $('.hideMetaMenu').trigger("click");
                    }
                    updateOffsets();
                    //updateHeaderOffset();

                    // Hide because map is displayed, causing overlap.
                    // Could be adjusted to reside left of search filters.
                    $(".quickMenu").hide();
                }
				$('.showSearchClick').click(function(event) {
					showSearchClick();
                    //alert('.showSearchClick');
				});
                $('.layoutTab').click(function(event) {
                    //$('.layerContent').show(); // Caused topButtons to appear on d page.
                    $('.quickMenu').hide();
                });
                $('.hideMainMenu, #hideMenu, .hideLocationsMenu').click(function(event) {
                    updateOffsets();
                });
				$('.hideSearch').click(function(event) {
                    //hideSearch("normal");
                    console.log('.hideSearch click. layerName: ' + layerName);
                    hideSearch(getGo(siteObject.items,layerName));
                    event.stopPropagation();
				});
                $('#filterPanel').click(function(event) {
                    event.stopPropagation(); // Prevents any click within overlapping filters from clicking through to video.
                });
				$('#showNews').click(function(event) {
					deselectMenusAndTabs();
					$("#showNews").hide();
					$("#hideNews").show();
					$("#mapPanel").hide();
					$("#gridPanel").hide();

					$("#defaultWidget").show();
				});
				$('#hideNews').click(function(event) {
					$("#hideNews").hide();
					$("#showNews").show();
					$("#defaultWidget").hide();
				});

                $('.showDirectory').click(function(event) {
                    if ($(".showDirectory").hasClass("active")) {
                        $(".horizontalButtons .layoutTab").removeClass("active");
                        $('.hideDetailsClose').trigger("click");
                        event.stopPropagation();
                        return;
                    } else {
                        $('.cid').text("");
                        $('.overlaysInSide').hide();
                        showDirectory(layerName,siteObject);
                        updateURL(layerName); // Follows setting of buttons by showDirectory
                    }
                });

				$('.directoryBackLink').click(function(event) { // Details back arrow           
                    $('.cid').text("");
                    showDirectory(layerName,siteObject);
                    updateURL(layerName); // Follows setting of buttons by showDirectory
				});
				$('.hideDirectory').click(function(event) {
					$(".hideDirectory").hide();
					$(".showDirectory").show();
                    $(".listPanel").hide();
					//$(".tabSections").hide();
					//$("#alphabet").hide();
                    $('.mapBarRight').append($('.mapBarButtonsRight'));
					if ($("#mapPanel").is(':visible')) {
						$('#showMap').hide();
						$('#hideMap').show();
					}
				});

                $('.showFilters').click(function(event) { // Details back arrow
                    console.log(".showFilters click");       
                    //showFilters(layerName,siteObject);

                    if ($(".filterPanelHolder").is(':visible')) { // Already visible
                        $(".horizontalButtons .layoutTab").removeClass("active");
                        $('.hideFilters').trigger("click");
                        return;
                    }
                    if (params["embed"] == "1") { 
                        $('.topButtons').after($('.filterPanelHolder'));
                    }
                    overviewMapTab(".showFiltersButton");
                    showSearchClick();
                    
                    if ($(".moduleJS").width() <= 800) { // Narrow

                        /*
                        $('html,body').animate({ 
                            scrollTop: $("#panelHolder").offset().top
                        });
                        */
                    }
                    
                });
                $('.hideFilters').click(function(event) {
                    $('.videoHeightHolder').show();
                    $(".hideFilters").hide();
                    $(".showFilters").show();
                    //alert("show .showFilters button");
                    $(".filterPanelHolder").hide();
                    $('#hideSearch').trigger("click");
                });
                $('.hideCounties').click(function(event) {
                    hideCounties();
                });

                $('.introButton').click(function(event) {
                    if ($('.showOverlays').hasClass('active')) {
                        $('.showOverlays').trigger("click");
                    }
                    if ($('.showDirectory').hasClass('active')) {
                        $('.showDirectory').trigger("click");
                    }
                    if ($('.introButton').hasClass('active')) {
                        $('.introButton').removeClass('active');
                        $(".introElement").hide();
                    } else {
                        overviewMapTab(".introButton");
                        $(".introElement").show();
                        $('.hideFiltersClick').trigger("click");
                    }
                });

                function overviewMapTab(whichTab) {
                    //alert('overviewMapTab');
                    $(".horizontalButtons .layoutTab").removeClass("active");
                    $(whichTab).addClass("active");

                    // This hides recycling iFrame
                    //$('.iframeHolder').hide();

                    //$(".detailsPanel").show();
                    $(".contentPanel").show();
                }
                $('.overviewMapButton').click(function(event) {
                    $(".introElement").hide();
                    $('.hideFiltersClick').trigger("click");
                    $('.hideDetailsClose').trigger("click");
                    if (!$('#mapPanel').is(':visible')) {
                        $("#mapPanel").show();
                        displayMap(layerName,siteObject);
                    } else {
                        map.invalidateSize(); // Force Leaflet map to resize when list is removed - Add tiles when more of map becomes visible.
                    }
                    overviewMapTab(".overviewMapButton");
                });
                $('.showFiltersButton').click(function(event) {
                    console.log('.showFiltersButton click');
                    if ($('.filterPanelHolder').is(':visible') && $('.filterPanelWidget').is(':visible') && $('#filterPanel').is(':visible')) {
                        $(".horizontalButtons .layoutTab").removeClass("active");
                        $('.hideFilters').trigger("click");
                    } else {
                        //$(".introElement").hide();
                        $('.showFiltersClick').trigger("click");
                    }
                });
                
                // Directory top button. May later be used for multiple buttons
                $('.showDirectoryFrame').click(function(event) {
                    layerName = getCurrentLayer();
                    var goLayer = getGo(siteObject.items,layerName);
                    displayIFrame(layerName,goLayer);
                });
                $('.hidePanel').click(function(event) {
                    $(".hideDirectoryFrame").hide();
                    if (currentAccess >= 1) $(".showDirectoryFrame").show();
                    $('.iframe').hide();
                    $(".tabSections").hide();
                });

                $('#alphabet div').click(function(){
                    $('.cid').text("");
                    if ($(this).hasClass('active')) {
                        $('#alphabet div').removeClass("active");
                    } else {
                        $('.letter').val($(this).text().toLowerCase());
                        $('#alphabet div').removeClass("active");
                        $(this).addClass("active");
                    }
                    layerName = getLayerName();
                    updateTheURL(layerName);
                    displayDirectory(layerName,siteObject);
                    displayMap(layerName,siteObject);
                });

                $('.showForm').click(function(event) {

                    layerName = getCurrentLayer();
                    var goLayer = getGo(siteObject.items,layerName);
                    if (goLayer.addlisting) {
                        url = goLayer.addlisting;
                        var win = window.open(url, '_blank');
                        win.focus();
                        return;
                    }
                    // If reactivating, look up Cognito response to Loren's StackOverflow post to avoid having to hit refresh:

                    // Rather than deleting the form from the page, try hiding the form, and using the following code to re-initialize the entry:
                    // ExoWeb.Observer.setValue(Cognito.Forms.model, 'entry', new Cognito.Forms.FormEntry.GDECD1.GeorgiaDirectory({Form:Cognito.deserialize(Cognito.Forms.FormRef,{Id:"36",InternalName:"GeorgiaDirectory",Name:"Georgia Directory"})}));
                    // Response from Bobby
                    // http://blog.bitovi.com/distributable-javascript-component/#try-it

                    $(".showForm").hide();
                    $(".hideForm").show();
                    //$(".cognito").html("");
                    //if (!Cognito) c-forms-form
                    
                    $(".formHolder").show();
                    $('.filterPanelWidget').hide();
                    $('.listPanelHolder').hide();
                    $('.footerContent').hide();
                    $('#mapBar').hide();
                    //$('.hideFiltersClick').trigger("click"); // Avoid. Hides list too.

                    // Not used here yet, applied in cognitoScriptLoaded instead:
                    var formID = $('.cognitoformid').val();
                    var entryObj = {};

                    //alert("load cognito");
                    lazyLoadCognito('https://services.cognitoforms.com/s/cileRMJMNEWcb6ZO8yEtXg', cognitoScriptLoaded, formID, entryObj);

                    //if (!$(".c-forms-form").is(':visible')) // Prevents form from being cleared.
                    {
                        //var formID = $('.cognitoformid').val();
                        
                        //var entryObj = {"Name": name, "ContactName": { "First": "", "Last": "" }, "Address": { "City":"","State":"Georgia", "PostalCode": "","Country":"United States" }};
                        //Cognito.load("forms", { id: formID, entry: entryObj }, function() {
                            ////alert("done");
                            ////$(".loadingIcon").addClass("hidden"); // Fade out
                        //});
                        
                    }
                    $('html,body').animate({ 
                        scrollTop: $(".formHolder").offset().top
                    });
                });
                $('.hideForm').click(function(event) {
                    //$(".hideForm").hide(); // Occurs twice in page.
                    $(".showForm").show();
                    $('.filterPanelWidget').show();
                    $('.listPanelHolder').show();
                    $('.footerContent').show();
                    $('#mapBar').show();
                    $(".formHolder").hide();
                });

                $('.shareThis').click(function(event) {
                    // Open in new tab
                    var win = window.open("https://www.addthis.com/bookmark.php?v=250&amp;pub=xa-4a9818987bca104e", '_blank');
                    win.focus();            
                });
                $('.showMapQuick').click(function(event) {

                    // Unless video is visible.
                    $('.quickMenu').hide();

                    $('html,body').animate({
                       scrollTop: $("#panelHolder").offset().top
                   });
                });
				$('.showMap, .showMapQuick').click(function(event) {
                    $(".showMap").hide();
                    //$(".showList").show(); // For COI mobile
                    //$(".hideMap").show();
					showMap();
                    $(".gridButton #hideGrid").show();
                    $(".gridButton #showGrid").show();
				});
                $('.hideMap, .hideMapMobile').click(function(event) {
                    $(".hideMap").hide();
                    $(".showMap").show();
                    //$(".contentPanel").hide(); // Would also hide iFrame and list!
                    $("#mapPanel").hide();

                    //$('#showDirectory').trigger("click");
                });
                function showMap() {
                    console.log("SHOW MAP");
                    //$(".tabSections").hide();
                    layerName = getLayerName();
                    deselectMenusAndTabs();
                    //$(".listPanel").hide();
                    //$(".listPanelRows").hide();

                    $("#showMap").hide();
                    $("#hideMap").show();
                    //$(".hideMap").show();
                    mapbuttonsNeutral();
                    $(".mapbuttons").show();
                    
                    $(".detailsPanel").hide();

                    // To consider: Rather than hiding and showing, move div for faster response (either from offscreen left or from below grid).           
                    $("#mapPanel").show();
                    $("#gridPanel").hide(); // Could move below map.
                    //$(".mapBarHolder").hide();
                    //$("#defaultWidget").hide();
                    $("#mapRightPanels").show();
                    //$(".cartodb-legend-stack").show();
                    $(".leaflet-control-mContainer").show();
                    $(".layerContent").show();
                    //$("#panelHolder").show();
                    $(".settingsPanel").hide();
                    $('.showSearchClick').trigger("click");
                    //alert('hideGrid'); // Not reaching here
                    $('.hideGrid').trigger("click");

                    layerName = getLayerName();
                    updateTheURL(layerName);
                    console.log("#showMap " + layerName);

                    displayMap(layerName,siteObject);
                    // Avoid placing script after line above.  Sometimes actOnCartoLoaded function does not existed.
                }
				$('#showMap').click(function(event) {
                    showMap();
				});
                $('.refreshMap').click(function(event) {
                    location.reload(true)
                });
                
                $('.updateInfoField').change(function(event) {
                    //alert($(this).find('option:selected').data("info"));
                    var infoText = $(this).find('option:selected').data("info");
                    if (infoText) {
                        $('.catInfo').text(infoText);
                        $('.catInfo').show();
                    } else {
                        $('.catInfo').text("");
                        $('.catInfo').hide();
                    }
                });
				$('.triggerSearch').change(function(event) {
                    $('.goSearch').trigger("click");
                });
				$(".goSearch").click(function(event) {
                    console.log(".goSearch click");
                    $(".listOptions .showAll").show();
                    $('#searchText').html("");
                    deselectLetter();
                    $('#keywordsTB').val($('#keywordsTB').val().trim());

					$("#cartodb_table").find("tr:gt(0)").remove(); // Clear previous
                    
                    $('#panelHolder').show();
                    layerName = getLayerName();
                    var goLayer = getGo(siteObject.items,layerName);


                    var searchNewsUrl = "http://www.georgia.org/newsroom/search/?searchterms=" + $('#keywordsTB').val();
                    var searchSiteUrl = "http://www.georgia.org?s=" + $('#keywordsTB').val();
                    //searchSiteUrl = "#dod";

                    if (!layerName) {
                        window.location = searchSiteUrl;
                    } else if (!goLayer.feed) { // Contractor Directories redirect to Georgia.org since no feed.
                        // Use site search
                        window.location = searchSiteUrl;
                    } else {
                        updateTheURL(layerName);

                        $('.iframe').hide(); // Hide existing
                        if ($('#keywordsTB').val() && $('#findNews').prop('checked')) {
                            // BUG BUG - All are getting checked
                            //loadFrame(layerName + "Iframe-news", searchNewsUrl, "1000px");
                        }
                        if ($('#keywordsTB').val() && $('#findContent').prop('checked')) {
                            //loadFrame(layerName + "Iframe" + $('#keywordsTB').val().replace(" ","-"), searchSiteUrl, "1000px");
                            loadFrame(layerName + "Iframe-content", searchSiteUrl, "1000px", true);
                        }
                        //if ($(".hideGrid").is(':visible')) {
                        if ($("#gridPanel").is(':visible')) {
                            console.log("Click #showGrid from .goSearch");
                            $('#showGrid').trigger("click");
                            
                        } else {
                            // Why does this close -cat checkboxes?
    					   //$('.showDirectoryTrigger').trigger("click");

                           showDirectory(layerName,siteObject);
                        }
                        if (params["embed"] != "1") { // Omit for COI because Filter button does not appear
                            if ($(".moduleJS").width() <= 400) { // Mobile narrow
                                $('.hideFiltersClick').trigger("click");
                            }
                        }
                        
                        if ($(window).width() < 400) {
    					   $('html,body').animate({ 
    					       scrollTop: $("#mapBar").offset().top
    					   });
                        }
                    }

                    adjustPrimaryHeader();
                    $(".layerContent").show();
				});

                $(".goRide").click(function(event) {
                    $('.showFilters').trigger("click");
                });

				function hideMapBoxes() {
					$("#mapRightPanels").hide();
					//$(".cartodb-legend-stack").hide();
				}
				$('#hideMap').click(function(event) {
					$("#hideMap").hide();
					$("#showMap").show();

					//hideMapBoxes();
					$("#mapPanel").hide();
				});
                
                $('.showDownload').click(function(event) {
                    //alert('.showDownload');
                    $("#rowsIcons").show();
                    event.stopPropagation();
                });
				$('.showGrid').click(function(event) {
					deselectMenusAndTabs();

                    //$(".showDirectory").hide();
                    $(".hideDirectory").show();
                    $('#hideDetails').show();
					$("#showGrid").hide();
					$("#hideGrid").show();
                    $(".hideGrid").show();
                    hideList();
                    $(".hideMap").hide();
                    $(".showMap").show();
                    

                    $(".listPanel").hide();
                    if (detailsOnLeft) {
                        $(".besideLeftHolder").removeClass("besideLeft");
                    }

                    $(".mapbuttons").hide();
                    $('#pagination').show();
                    $('.gridListHeader').insertAfter($('.gridHeaderPosition'));
                    $('.mapBarRight').append($('.mapBarButtonsRight'));

					$("#gridPanel").show();
					//$("#mapPanel").show(); // Else tiles will not load.

					$('#secArrowDown').trigger("click"); // hideCats

					// To do: Rather than hiding and showing, move div for faster response (either from offscreen left or from below grid).
					//displayMap(layerName,siteObject);

                    layerName = getLayerName();
                    updateTheURL(layerName); // Cid removed
                    console.log("Call loadGrid from .showGrid for " + layerName);
					loadGrid(0,layerName,siteObject);
                    

					//$("#defaultWidget").hide();

					// Why does this hault display of gird?
					//alert("showGrid2"); // Not reached on first click after showMap
					
					//Has to follow display of map for tiles
					//$("#mapPanel").hide(); // To Do: Move below Grid since hiding causes brief delay to show when clicking showMap button.
					
					//$(".tabSections").hide();

                    //$('.hideLayersClick').trigger("click");

                    //$(".showLayers").show();

                    //$(".hideLayers").hide();

					$('.showSearchClick').trigger("click");
                    $('html, body').animate({
                        scrollTop: $('#mapBar').offset().top
                    }, 'slow');
				});
				$('.hideGrid').click(function(event) {
                    $("#hideGrid").hide();
                    $(".hideGrid").hide();
					$("#showGrid").show();
                    $('.directoryButton').show();
                    $('.directoryButton .showDirectory').show();

					$("#gridPanel").hide();
                    $(".showMap").hide(); // For mobile - Avoid because map will appear above iFrame.

                    // Alternative to above.
                    $('.gridListHeader').insertAfter($('.listHeaderPosition'));
                    layerName = getLayerName();
                    
                    // Avoid because map will appear above iFrame.
                    // displayMap(layerName,siteObject); // Could check if map already displayed.
                    updateURL(layerName);
				});

                $( ".sitemode" ).change(function() {
                    if ($(".sitemode").val() == "fullnav" && $('#siteHeader').is(':empty')) { // #siteHeader exists. This will likely need to be changed later.
                        layerName = getLayerName();
                        window.location = "./#" + layerName;
                    }
                    sitemode = $(".sitemode").val();
                    setSiteMode($(".sitemode").val());
                    $('#hideSettings').trigger("click");
                    Cookies.set('sitemode', $(".sitemode").val());
                    updateURL(getCurrentLayer());
                    $('.hideSettings').trigger("click");
                    if ($(".sitemode").val() == "fullnav") {
                        $('.showSearchClick').trigger("click");
                    }
                });
                $( ".sitesource" ).change(function() {
                    sitesource = $(".sitesource").val();
                    Cookies.set('sitesource', $(".sitesource").val());
                    setSiteSource($(".sitesource").val());
                });
                $( "#sitelook" ).change(function() { // default, coi, gc
                    Cookies.set('sitelook', $("#sitelook").val());
                    changeSiteLook();
                });
                $( ".sitebasemap" ).change(function() {
                    sitebasemap = $(".sitebasemap").val();
                    Cookies.set('sitebasemap', $(".sitebasemap").val());
                    setSiteSource($(".sitebasemap").val());
                });
                function changeSiteLook() {
                    layerName = getLayerName();
                    console.log("changeSiteLook: " + $("#sitelook").val());
                    setSiteLook($("#sitelook").val(),layerName);
                    $('.hideSettings').trigger("click");
                    changeLayer(layerName,siteObject,"clearall"); // To load header image
                }
				$('#review-radiobuttons :radio').change(function () {
					$('.hideDetails').trigger("click");
                    console.log("Call loadGrid from review-radiobuttons for " + layerName);
					loadGrid(0,layerName,siteObject);
				});

                $('.showOverlays').click(function(event) {
                    if ($('.showOverlays').hasClass('active')) {
                        $('.showOverlays').removeClass('active');
                        $('.besideLeftHolder').hide(); // To do: add variable to display list if previously open.
                        $('.overlaysInSide').hide();
                        //displayMap(layerName,siteObject); // Otherwise blank space sometimes appears to right of map. Might add logic to check width of map.
                    } else {
                        //$('.layerPanel').clone().addClass('layerPanelClone').removeClass('layerPanel').appendTo('.overlaysInSide');

                        if (!$(".mapPanel").is(':visible')) {
                            //displayMap();
                            displayMap(layerName,siteObject); 
                        }

                        $('.listPanel').hide();
                        $('.overlaysInSide').show();
                        $('.besideLeftHolder').show();
                        //$('.showLayerMenu').trigger("click");
                        $(".horizontalButtons .layoutTab").removeClass("active");
                        $('.showOverlays').addClass('active');
                    }
                });
                $('.showLayerMenu').click(function(event) {

                    //
                    $('.hideFiltersClick').trigger("click");
                    if($('.layerPanel').is(":visible")) {
                        // If layers menu already visible, hide side menu.
                        // To do: change to toggle between full layer section list and subcategory list.

                        //if($('.appMenuInner').not(":visible")) { // not working

                            // Revise to toggle instead:
                            //$('.smartSideMenuHolderXXX').hide(); // Hide first so hideMainMenu() closes.
                            //hideMainMenu();
                            //return;
                        //}
                        
                    }

                    //$('.showSectionMenu').hide();
                    //$('.showSectionMenu').css("margin-left", "20px");
                    var currentLayer = getCurrentLayer();
                    var goLayer = getGo(siteObject.items,currentLayer);

                    hideCounties();
                    //$('.showOverlays').hide();

                    $('.navTopLeft').addClass('navTopLeftMargin');

                    //if .byMap contains .tabSections, For coi embed where layers reside byMap
                    if ($(".byMap .tabSections").length > 0){ 
                        $('.tabSections').show();
                    } else {
                        $('.layerSectionTitle').find('.downArrow').addClass('leftArrow').removeClass('downArrow');
                        //$('.showAppsClick').hide();
                        //$('.hideApps').show();
                        $('.quickMenu').hide();
                        $('.appMenuInner').hide();
                        $('.actionMenu').hide();
                        $('.showLayerMenuButton').hide();
                        $('.hideLayerMenuButton').show();
                        $('.hideAllSections').show();
                        $('.layerSideNavHolder').show();
                        $('.navClone').hide();
                        //$('#locationsMain').hide(); // App menu
                        $(".menuPanel").hide();
                        $('.layerSideNavHolder').show();
                        $('.smartSideMenuHolder').show();
                        $('.sideTopMenu div').removeClass("active");
                        // Avoid here because list remains open
                        //$(".horizontalButtons .layoutTab").removeClass("active");
                        $('.showLayerMenu').addClass("active");

                        // MOVE BACK
                        //$(".layerCheckboxes").appendTo('.layerPanel');
                        $(".layerCheckboxes .layerSectionTitle").show();
                        $(".layerCheckboxes .layerSection").show(); // Show all
                        $(".layerCheckboxes .layerSection .layerCbRow").hide(); // Hide second level
                        
                        //$(".layerCheckboxes .layerSection.[menulevel='3']").hide(); // Hide lower levels

                        $('[menulevel="3"]').hide();

                        $('.layerSection-showAllLayers').hide();
                        //$('.showLayers').trigger("click"); // This hides .layerSideNavHolder

                    }

                    event.stopPropagation();
                });
                $('.hideOverlays').click(function(event) {
                    $('.hideOverlays').hide();
                    $('.showOverlays').show();
                    //$('.tabSections').hide();
                    $('.hideLocationsMenu').trigger("click");
                    event.stopPropagation();
                });
                $('.showActionMenu').click(function(event) {
                    $('.sideTopMenu div').removeClass("active");
                    $('.showActionMenu').addClass("active");
                    //$('.appMenuInner').hide();
                    $('.layerSideNavHolder').hide();
                    $(".menuPanel").hide();
                    $('.hideLayerMenuButton').hide();
                    $('.showLayerMenuButton').show();
                    //$('.actionMenu').load('/econdev/action/menu.html');
                    $('.actionMenu').load('sidemenu.html'); // Resides in same folder as calling page.
                    $('.actionMenu').show();
                    $('.smartSideMenuHolder').show();
                });
                $('.overlayToggle').click(function(event) {
                    $('.listOptions').hide();
                    $('.showLayerMenu').trigger("click");
                });  
                $('.hideAllSections').click(function(event) {
                    $('.showSectionMenu').show();
                    $('.navClone').hide();
                    $('.hideAllSections').hide();
                    $('.layerSideNavHolder').hide();
                    //$(".layerCheckboxes .layerSection").hide();
                    $('.showLayerMenuButton').show(); $('.showSectionMenu').css("margin-left", "0px");
                    $('.hideLayerMenuButton').hide();
                    // MOVE
                    //$(".layerCheckboxes").appendTo('.navClone');


                    //$(".layerCheckboxes .layerSection").show();
                    //$('.navClone').show();

                    if ($(".layerMenu").length) { // Move into mainContent
                        // Probably not in use.
                        //moveIntoMain();
                    }
                    event.stopPropagation();
                });

                
                $('.showMenu').click(function(event) {
                    showAppPanel();
                    $(".showAppsClick").trigger("click");
                });

                $('.showSection').click(function(event) {
                    $('.showSectionMenu').trigger("click");
                });
                $('.showAppLayers').click(function(event) {
                    //$('.menuPanel').show(); // Show first to avoid defaulting to current section's menu/
                    //$('.appMenuInner').show();
                    
                    //alert('.showAppLayers');
                    showAppLayers();
                    //displayHexagonMenu("",siteObject);
                });

                // .showTopicsMenu, #showMenu, .showMetaMenu
                $('.showAppsClick').click(function(event) {

                    //hidePageRegions();
                    $('.showAppsClick').hide();
                    $('.showOverlays').hide();
                    if($('.appMenuInner').is(":visible")) {
                        // If apps already active menu, hide.
                        $(".hideLocationsMenu").trigger("click");
                        event.stopPropagation(); // No effect, delete
                        return;
                    }

                    //if (!$('.menuPanel').is(":visible")) {
                    //    // When not yet open, default to current section.
                    //    $('.showSectionMenu').trigger("click");
                    //    event.stopPropagation(); // No effect, delete
                    //    return;
                    //}
                    showAppLayers();
                });
                function showAppLayers() {
                    //hideRightList();

                    // Allows for cleaner look
                    // If reactivating, toggle .directoryframeNav tabs to .overviewMapButton when directory Details is not visible.
                    //$('.filterPanelWidget').hide();

                    //$('.layerPanelHolder').prepend($('.layerPanel')); // Move back from beside map.

                    $(".hideFilters").hide();
                    $(".showFilters").show();
                    //$('#sectionProvider').hide();
                    //$('#smartFooter').hide();
                    $('.contentPanelHolder').hide();
                    $('.hideLayers').hide();
                    $('.showLayers').show();

                    //$('.showAppsTopBar').hide();

                    $('.hideLayerMenuButton').hide();
                    $('.showLayerMenuButton').show();
                    
                    $('.quickMenu').hide();
                    //$('.showApps').hide();
                    //$('.hideApps').show();

                    //if($('.smartSideMenuHolder').is(":visible") && !$('.appMenuInner').is(":visible")) {
                        showAppPanel();
                        $('.hideLocationsMenu').show();
                        //$('.hideApps').show();
                        $(".leftPop").hide();
                        $("#showMenu").hide();
                        $("#hideMenu").show();
                        $(".showMetaMenu").hide();
                        $("#globalMenu").show();

                        $("#directoryMenuLink").addClass('active');
                        $("#smartNavSideTD").addClass('smartSideMenuOpen');
                        //$("#hideLocationsMenu").addClass('smartSideMenuOpen');
                        
                        if($('#hideFilters').is(":visible")) {
                            $('#locationsMain').insertAfter($('#locationsMainPosition')); // Move back from filters
                        }
                        $("#hideLocationsMenu").show();
                        $(".topMenu").removeClass('active');
                        $("#hideLocationsMenu").addClass('active');
                        if (location.host.indexOf('localhost') > -1) {
                            $("#smartSideMenu").show();
                        }
                        $("#menuHolder").show();

                        //$("#menuHolder").css({'display':'inline-block'});
                        if (!$('.CommunitiesTab').length) {
                            $("#smartMenu").show(); // smartMenu disabled
                            $("#sideMenuHolder").show();
                        }
                        $("#hideSettings").trigger("click");
                        $('#hideSearch').trigger("click");
                        
                        if ($(".moduleJS").width() <= 800) { // Narrow
                            // Only move for narrow screens...
                            //$("#filterPanelInner").insertAfter("#filterPanelInsert");
                        }
                    //}

                    $('.smartSideMenuHolder').show();

                    event.stopPropagation(); // No effect, delete
                }
                $('.hideApps').click(function(event) {
                    hideMainMenu();
                });
                $('.hideLocationsMenu').click(function(event) {
                    $('.smartSideMenuHolder').hide(); // Allows hideMainMenu() to avoid showAppPanel().
                    $('.listPanelHolder').show();
                    $('.showOverlays').show();
                    $('.showOverlays').removeClass("active");
                    if($('.listPanel').is(":visible")) {
                        $('.showList').hide();
                        $('.hideList').show();
                    }
                    hideMainMenu();
                    //alert('.hideLocationsMenu');
                });
                $('.hideMainMenu').click(function(event) {
                    $('.smartSideMenuHolder').hide();
                    hideMainMenu();
                });
                $('#hideMenu, .hideMetaMenu, #hideLocationsMenu').click(function(event) {
                    hideMainMenu();
                });
                
                function moveIntoMain() {
                    var currentLayer = getCurrentLayer();
                    var goLayer = getGo(siteObject.items,currentLayer);
                    $('.showLayerMenuButton').show(); $('.showSectionMenu').css("margin-left", "0px");
                    $('.hideLayerMenuButton').hide();
                    $('.hideAllSections').hide();
                    $('.layerSideNavHolder').hide();
                    $(".layerCheckboxes").appendTo('.layerMenu'); // MOVE
                    $(".layerSection").hide(); // Hide all

                    $(".layerSection-" + goLayer.section + " .layerCbRow").show(); // Not sure why these are hidden
                    $(".layerSection-" + goLayer.section).show(); // Show current

                    //$(".layerSection-" + goLayer.section + " .layerSectionTitle").trigger("click"); // Open sub-nav - bug, this can toggle hidden
                    $(".layerSection-" + goLayer.section + " .layerSectionTitle").hide(); // Hide section title
                }
                $('.showSectionMenu').click(function(event) {

                    console.log("Clicked .showSectionMenu- Opens side menu, limits to current");
                    //$('.leftPop').show();

                    if($(".showSection").hasClass("active") && $('.layerSideNavHolder').is(":visible")) { // Toggle off
                        $(".hideMainMenu").trigger("click");
                        return;
                    }

                    var currentLayer = getCurrentLayer();
                    var goLayer = getGo(siteObject.items,currentLayer);

                    $('.showLayerMenu').trigger("click");
                    if (typeof goLayer == "undefined") {
                        return;
                    }
                    /*
                    if (goLayer.item == "main") {
                        $('.showSection').hide();
                        $('.showAppsClick').trigger("click");
                        return;
                    }
                    */
                    if (goLayer.sectionhome) {
                        window.location.hash = goLayer.sectionhome; // Link to section home page.
                        return;
                    }

                    //$('.showSectionMenu').css("margin-left", "20px");

                    //if ($(".layerMenu").length) { // Move into mainContent (need to limit to recycling)
                    //if (currentLayer == "recycling" && !$(".layerMenu .layerCheckboxes").is(':visible')) { // Temp
                    //    moveIntoMain();
                    //} else 

                    //if ($(".navClone").is(':visible')) { 
                    //    $('.navClone').hide();
                    //} else 

                    /*
                    if ($(".searchHeader").is(':visible') && !$(".layerMenu").is(':visible')) { // Full Header open
                        $('.hideAllSections').hide();
                        $('.showLayerMenuButton').show();
                        $('.hideLayerMenuButton').hide();
                        $(".layerCheckboxes .layerSection").hide();
                        $(".layerCheckboxes .layerSection-" + goLayer.section.toLowerCase()).show();

                        
                    } else {
                    */
                        $(".sideTopMenu div").removeClass("active");
                        $(".showSection").addClass("active");

                        $(".layerSection").hide();

                        $(".layerSection-" + goLayer.section.toLowerCase()).show();
                        $(".showAllLayers").show();

                        $('.showLayerMenuButton').hide();
                        $('.hideLayerMenuButton').show();
                        //$('.showSectionMenu').hide();
                        $('.hideAllSections').show();
                        //$(".layerCheckboxes .layerSection").show();
                        //$(".layerCheckboxes").appendTo('.layerPanel'); // Move to tall side column
                        $(".layerCheckboxes .layerSection-" + goLayer.section).prependTo('.layerCheckboxes'); // Move the current section to the top.
                        $(".layerSideNavHolder").show();
                        $('.smartSideMenuHolder').show();
                        
                        $(".layerCheckboxes .layerSection-" + goLayer.section.toLowerCase().replace(" ","_")).show();
                        if ($(".layerSection-" + goLayer.section.toLowerCase().replace(" ","_") + " .leftArrow").is(':visible')) {
                            // Reactivate this
                            $(".layerSection-" + goLayer.section.toLowerCase().replace(" ","_") + " .layerSectionTitle").trigger("click"); // Open sub-nav
                        }
                        $(".layerCheckboxes .layerSection .layerCbRow").show();
                        $(".layerSectionTitle").show(); // Since section is hidden in .layerMenu

                        //$('.showApps').hide();
                        //$('.hideApps').show();
                        
                    //}
                    $('html,body').animate({ // Since menu might be out of view.
                        scrollTop: -$(".smartSideMenuHolder").offset().top + ($(".siteHeader").height())
                    });

                    event.stopPropagation();
                });

                function firebaseLoaded() {
                    alert("firebaseLoaded");
                    setTimeout(function(){ // Page is already loaded, wait for browser
                        //firebase.auth().signOut();

                        var googleAuth = gapi.auth2.getAuthInstance();
                        googleAuth.signOut().then(function() {
                            firebase.auth().signOut();
                        });

                    }, 2000);
                }
                $('.accountSignout').click(function(event) {
                    $('.logoutAccount').trigger("click");
                    var currentLayer = getCurrentLayer();
                    var goLayer = getGo(siteObject.items,currentLayer);
                    var gologout = "";
                    if (currentLayer == "intranet") {
                        gologout = "/site/"; // Get off the Intranet page. Will proably change to stay on current page.
                    }
                    if (goLayer.gologout) {
                        gologout = goLayer.gologout;
                    }
                    Cookies.remove('at_a');
                    loadUserAccess(0);

                    if (Cookies.get('at_f')) {
                        
                        // To do: add logic that fires after both files are loaded.
                        loadScript("auth/firebase/js/app.js", '');
                        loadScript("https://www.gstatic.com/firebasejs/3.7.1/firebase.js", '');

                        // HACK - wait 4 seconds
                        setTimeout(function(){ firebase.auth().signOut(); }, 4000);

                        Cookies.remove('at_f');

                        // Alternative - redirect to logot page - flashes logon fields.
                        //Cookies.set('gologout',gologout);
                        //window.location = "auth/firebase/?action=signout";
                    } else if (gologout.length) {
                        window.location = gologout;
                    }
                    if (showLogin) {
                        $(".showAccountTools").show();
                    }
                    event.stopPropagation();
                });
                $('.accountSignin').click(function(event) {
                    goSignin();
                });

				// INIT INIT INIT

                applyHash();
                
                
                // Note the first one is params with s. Might need to override params with #
                // http://localhost/site/widget.html?#manufacturing&display=map

                /* now occurs in changeLayer
				if (params["display"] == "map") {
                    $('#showMap').trigger("click");
                } else if (param["display"] == "grid") {
					$('#showGrid').trigger("click");
				} else if (param["display"] == "directory") {
                    //alert("display directory");
                    $('.showDirectoryTrigger').trigger("click");
                } else {
					//$('.showDirectoryTrigger').trigger("click");
				}
                */
                //if (location.host == 'data.georgia.org' || location.host == 'recycling.georgia.org' || location.host == 'intranet.georgia.org') {
                if (location.host == 'data.georgia.org') {
                    $(".showActionMenu").hide();
                    $(".shareThis").hide(); // Until ? is available instead of #.

                    // Google Analytics - Source: https://developers.google.com/analytics/devguides/collection/analyticsjs/
                    // Requires: <script async src='https://www.google-analytics.com/analytics.js'></script>
                    console.log("Google Analytics UA-2425428-1");
                    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                    ga('create', 'UA-2425428-1', 'auto');
                    ga('send', 'pageview');
                }

                if (location.host.indexOf('localhost') > -1) {
                    if (params["showvideo"] != "0") {
                        $(".showVideo").show();
                    }

                    // To do:
                    //$(".moduleJS #siteHeader").css("position","fixed");

                    $(".staffSignin").attr("href", "/menu/login/azure/"); // Remain local when signing in.
                    //if ($('.filterPanel').css('display') == 'none') {
                    if (layerName == "defense-exchange") {
                        //$('.quickMenu').show();
                    }
                }
                if (param["letter"]) {
                    var letter = param["letter"].toUpperCase() + '';
                    $('#alphabet div:contains("' + letter + '")').addClass("active");
                }
                //if (params["showtopics"] == "0") {
                //    $(".showTopicsMenu").hide();
                //}
                var sitemode = Cookies.get('sitemode');
                if (param["sitemode"]) { // From URL
                    sitemode = param["sitemode"]; 
                    Cookies.set('sitemode', sitemode);
                    $(".sitemode").val(sitemode);
                } else if (params["sitemode"]) { // From index.html
                    sitemode = params["sitemode"];
                    $(".sitemode").val(sitemode);
                    console.log("Set sitemode from index.html: " + sitemode);

                    //Cookies.set('sitemode', sitemode); // Needed for /defense.  Aiming to revise.
                }
                setSiteMode(sitemode); // Hides fullnav. Did

                var sitesource = Cookies.get('sitesource');
                $(document).ready(function () {
                    $(".moduleContent").insertAfter($(".moduleContentPosition")); // .moduleContent resides in menu/wrap.html
                    $(".smartHolderInsert").append($(".smartHolder")); // Used by dod

                    //setSiteMode(sitemode); // Gets set by updateOffsets during initial load.
                    setSiteSource(sitesource);
                    if(layerName == "main") {
                        $(".videoHeightHolder").show();
                    }
                    if (workoffline) {
                        $(".iconText").show();
                    }
                    if(!$('#expandPanel').is(":visible")) {
                        if(inIframe()) { 
                            $(".expandFromWidget").show();
                        }
                    }
                    if (params["logo"]) {
                        $( "#siteHeader" ).append( "<a href='/'><img src='" + params["logo"] + "' style='" + params["logostyle"] + "' /></a>" );
                    }
                    if (params["headerElement"]) {
                        $( "#siteHeader" ).append( params["headerElement"] );
                    }
                    if ($(".sitemode").val() != "fullnav") {
                        // Never fix the navTop, always fix the siteHeader
                        //$('#siteHeader').css("position","fixed");
                        //$('.moduleBackgroundImage').css("position","fixed");
                        // What about offset here?
                    }
                });
                if (Cookies.get('sitemode')) {
                    $(".sitemode").val(Cookies.get('sitemode'));
                }
                if (Cookies.get('sitesource')) {
                    $(".sitesource").val(Cookies.get('sitesource'));
                }
                if (Cookies.get('sitebasemap')) {
                    $(".sitebasemap").val(Cookies.get('sitebasemap'));
                }

                var sitelook = Cookies.get('sitelook');
                if (!$("#sitelook").is(':visible')) {
                    sitelook = "default"; // For now, filterPanel background is always an image.
                }

                if (param["sitelook"]) { // From URL
                    sitelook = param["sitelook"]; 
                    //Cookies.set('sitelook', sitelook);
                } else if (params["sitelook"]) { // From widget
                    sitelook = params["sitelook"]; 
                    // Prevent video from appearing when going to menu. Cookies probably need to be specific to domain.
                    //Cookies.set('sitelook', sitelook);
                } else if (Cookies.get('sitelook')) {
                    sitelook = Cookies.get('sitelook');
                }
                console.log("sitelook init: " + sitelook);
                setSiteLook(sitelook,layerName);
                $("#sitelook").val(Cookies.get('sitelook'));

                // EMBED VERSION
                if (params["embed"] == "1") { // Set in widget.html and COI pages embeds.

                    $(".smartMainHolder").css("margin","0px");
                    $(".filterPanelHolder").prepend($(".navTopBarIcons"));
                    $(".fixedTopBarBkgd").css("background","transparent");
                }


                // Move map into HTML layout
                $("#mapPosition").append($("#map"));


                setButtonDisplay(Cookies.get('bt'));
                $("#bt").val(Cookies.get('bt'));

                // Adjust fullnav size after .2, 1 and 3 second delay to catch late loaders.
                setTimeout(function(){ updateOffsets(); }, 200);
                setTimeout(function(){ updateOffsets(); }, 1000);
                //setTimeout(function(){ updateOffsets(); }, 3000);
                setTimeout(function(){ console.log("-------------------------------------------------"); }, 1100);

                $('.layerContentHide').click(function(event) {
                    $('.layerContent').hide();

                    $('.filterPanelHolder').show();
                    //$('.contentPanel').hide();

                    //$('.quickMenu').show(); // Overlaps iframe
                    $(".horizontalTabs .layoutTab").removeClass("active");
                });
				$('#showDetails, #showDetailsOnGrid, .showDetails').click(function(event) {
                    var cidTab = $('.cidTab').val();
                    layerName = getLayerName();
					showDetails(layerName,siteObject,cidTab);
				});
				$('.hideDetails, .hideDetailsClose').click(function(event) {
                    if (!$("#gridPanel").is(':visible')) {
                        $('.hideDetailsButton').hide();
                    }
                    $(".hideDirectory").hide();
                    $(".showDirectory").show();
                    $(".hideDetails").hide();
                    $(".showDetails").show();
					$("#showDetailsOnGrid").show();
                    $('.hideList').hide();
                    $('.showList').show();
                    $(".horizontalButtons .layoutTab").removeClass("active");

                    if ($("#gridPanel").is(':visible')) {
                        $('#showGrid').hide();
                        $('#hideGrid').show();
                        $('#pagination').show();
                    }
                    $('.listPanel').hide();
                    $('.besideLeftHolder').hide();
                    if (detailsOnLeft) {
                        $(".besideLeftHolder").removeClass("besideLeft");
                    }

                    if ($(".detailsPanel").is(':visible')) {
                        $('.detailsPanel').hide();
                    } else if ($("#gridPanel").is(':visible')) {
                        //$('.showMap').trigger("click"); // Causes grid to close when closing detail over grid
                        $('#hideDetails').hide();
                    }
                    $('.cid').text("");

                    // Map isn't loaded here in sites with grid priority.
                    //map.invalidateSize(); // Force Leaflet map to resize when list is removed - Add tiles when more of map becomes visible.
                        
                    layerName = getLayerName();
                    updateURL(layerName);
				});
				
				$('#hideRightPanel').click(function(event) {
					//$(".tabSections").hide("slow");
					$(".showDirectory").show();
					$(".hideDirectory").hide();
					if ($("#mapPanel").is(':visible')) {
						$('#showMap').hide();
						$('#hideMap').show();
					}
				});
                
                // Fix for browser.msie with JQuery 1.12.4
                jQuery.browser = {};
                (function () {
                    jQuery.browser.msie = false;
                    jQuery.browser.version = 0;
                    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
                        jQuery.browser.msie = true;
                        jQuery.browser.version = RegExp.$1;
                    }
                })();

                // Also see $(window).on('hashchange' above.

                // Placing within document ready disables on initial pass. Avoids duplicate call.
                if (("onhashchange" in window) && !($.browser.msie)) {

                    //modern browsers
                    // Probably includes IE11 because it does not have the MSIE token in the userAgent string.
                    $(window).bind('hashchange', function() {
                        //console.log("Hash changed.");
                        //var hash = window.location.hash.replace(/^#/,'');
                        //var layerName = hash;
                        //param = loadParams(location.search,location.hash); // Reload Params
                        
                        console.log("changeLayer - called from hash change");
                        currentLayer = getCurrentLayer();
                        clearForm();
                        deselectMenusAndTabs();
                        applyHash();
                        // Needed for menu item clicks - currently calls twice.
                        changeLayer(currentLayer,siteObject,"clearall");
                        console.log("End onhashchange hash: " + location.hash);
                    });
                } else {
                    //Older IE and browsers that don't support hashchange
                    $('a.hash-changer').bind('click', function() {
                        //var hash = $(this).attr('href').replace(/^#/,'');
                        //var layerName = hash;
                        //param = loadParams(location.search,location.hash); // Reload Params
                        
                        console.log("changeLayer - from IE hash change");
                        currentLayer = getCurrentLayer();
                        clearForm();
                        deselectMenusAndTabs();
                        applyHash();
                        changeLayer(currentLayer,siteObject,"clearall");
                    });
                }

                if (location.host == 'recycling.georgia.org' && layerName == '') {
                    //alert('recycling site');
                    layerName = "recycling";
                }
                // This was needed to check box in footer. Also closes gap between header and map.
                console.log("changeLayer from inside siteObject - layerName: " + layerName);

                changeLayer(layerName,siteObject,"clearall");
                   
			});
            //return siteObject; // Probably not needed, didn't work.
        },
	    error: function (req, status, err) {
	        console.log('Error fetching siteObject json: ', status, err);
	    }
    });
})(); // end siteObject
} // end initSiteObject

$( window ).resize(function() {
  updateOffsets();
});
function applyHash() {
    if (param["keywords"]) {
        $("#keywordsTB").val(param["keywords"].replace(/\+/g, " "));
    }
    //alert('param["cid"] ' + param["cid"]);
    $('.cid').text(param["cid"]);
    if (param["sitemode"]) { $(".sitemode").val(param["sitemode"]) }
    if (param["sitesource"]) { $(".sitesource").val(param["sitesource"]) }
    if (param["sitelook"]) { $("#sitelook").val(param["sitelook"]) }
    $(".settingsPanel").hide();

    if (param["cid"]) { // CartoID
        $('.cid').text(param["cid"]);
        $('.cidTab').val(param["cid"]);
    } else if (param["letter"]) {
        $('.letter').val(param["letter"]);
    }
    if (param["preview"] == "insert") {
        $("#ToInsert").prop("checked", true);
    }
}

function positionRightIcons() {
    if($('.appMenuPosition').is(":visible")) {
        return;
    }
    $(document).ready(function () {
        //if ($("#upperRightIcons").length) { // Exists
            // $(".navTopRight").prependTo('#upperRightIcons'); // Exuma
            $(".rightTopItem").prependTo('#upperRightIcons');
            $('#upperRightIcons').hide();
            $(".threeDotNavClick").insertAfter('#upperRightIcons');
            
            //$(".navTopRight").css("float","left");
            $("#upperRightIcons").addClass("rightIconsLarge");
            $("#topiconContactUs").hide();
        //}
    });
}
function updateHeaderOffset() {

    // This runs too soon.
    //$('.siteHeaderSpacer').css("height",$('#siteHeader').height());
    //$('.siteHeaderImage').css("height",$('#siteHeader').height()); // Prevents image from extending beyond bottom of siteHeader area.
    //$('.sitemoduleBackground').css("height",$('#siteHeader').height());

    //alert($('#siteHeader').height());
}

function showAppPanel() {
    $('.menuPanel').hide();
    $('.sideTopMenu div').removeClass("active");
    $('.showTopicsMenu').addClass("active");
    $('.appMenuInner').show(); 
}
function hideMainMenu() {
    if($('.smartSideMenuHolder').is(":visible") && !$('.appMenuInner').is(":visible")) {
        showAppPanel();
    } else {
        closeMenu();
    }
}
function closeMenu() {
    // Leaves selected menu section open but hidden - Topics, Layers, Counties, etc.
    $('.showOverlays').show();
    $("#filterPanelInner").insertAfter("#filterPanelPosition");
    $('.smartSideMenuHolder').hide("slow");
    $('.navTopLeft').show();
    $('.videoHeightHolder').show();
    $('.showOverlays').removeClass("active");
    if ($('.filterPanel').css('display') != 'none') {
        // Restore filter view, which is hidden during side menu viewing for cleaner UI.
        /*
        $('.layerTitleAndArrow').hide();
        $('.filterPanelWidget').show();
        $('.showFilters').hide();
        $('.hideFilters').show();
        $('.layerTitle').hide();
        */
    }
    var layerName = getLayerName();
    //if ($('.filterPanel').css('display') == 'none' || layerName == "main") {
    if ($('.quickMenuHolder').is(":visible")) {
        if ($('.moduleJS .navTop').height() >= 250) {
            $('.quickMenu').show();
        }
    }
    
    $('#smartFooter').show();
    //$('#mapBar').show(); // Avoid. Cause "display:flex" to be replaced with "display:block"

    $('#sectionProvider').show();
    $('.navTopRight').show();
    if ($(".layerTitleText").val()) { // Prevents arrow from showing when no current layerTitle.
        $(".navTopTitle").show();
    }
    $("#menuHolder").hide();
    $("#smartMenu").hide();
    $("#sideMenuHolder").hide();
    $("#globalMenu").hide();
    //$("#hideLocationsMenu").hide();

    $(".navTopLeft").removeClass('navTopLeftMargin');

    //$('.gridPanelHolder').show();
    $('.contentPanelHolder').show();
    $("#smartNavSideTD").removeClass('smartSideMenuOpen');
    //$("#hideLocationsMenu").removeClass('smartSideMenuOpen');
    $("#topMenuBar").show();
    //$("#heroContent").show(); // Would display above widget layout
    $("#smartSideMenu").hide();
    //$(".mapBarHolder").show(); // Displayed when no layer.  Expands apps, then click x here: http://localhost/site/
    //$(".listPanelHolder").show(); // Avoid because covers mobile map.
    $("#panelHolder").show();
    
    $("#smartFooter").show();
    $("#hideMenu").hide();
    $("#showMenu").show();
    //$(".hideMetaMenu").hide();
    //$(".hideLocationsMenu").hide();
    //$(".hideApps").hide();
    $(".showApps").show();
    $(".showMetaMenu").show();
    $(".showLayerMenuButton").show();
}
function setSiteMode(sitemode) {
    //alert("setSiteMode: " + sitemode)
    if (sitemode == "fullnav" && $(".moduleJS").width() > 800) { // Full Header - With Navigation
        $(".sitemode").val("fullnav");
        $(".hideWithFull").show();
        $(".imageHeaderLogo").hide();
        //$("#navTopFromTop").removeClass("headerHeightShort");

        $(".fixedTopBarBkgd").addClass("fixedTopBarBkgdColor");
        //$(".fixedTopBarSpacer").hide();
        $("#navTopFromTop").show(); 
        $("#headerHolder").show();

        $('.navTopTitle').hide();
        $('.sectionTitle').show();
        if ($('.filterPanelWidget').is(':visible') && $('#filterPanel').is(':visible')) {
            $('.layerTitleAndArrow').hide();
        }
        $('.layerTitleLine').hide();
        $('.searchHeader').show();
        
        // Avoid, causes two clicks to display after initial load.
        //$('.navTopRight .showFilters').hide();
        //$('.navTopRight .hideFilters').show();

        $('#heroContent').show();
        $(".videoHeightHolder").show();
        $('#filterPanel').removeClass('filterPanelAbsolute');

        // Also hides dialpad, may want to move dialpad external sometimes.
        $(".fixedTopBar").hide();

        positionRightIcons();

        $(".fullnavRightIcons").append($(".threeDotNav"));

        // This causes title to be overlapped when switching from image header to fullnav:
        //$('#siteHeader').css("height",$('#headerHolder').height() + $('.navTop').height());
        
        // siteHeaderSpacer height is set below.
        $(".navTopAlignment").addClass("navTopAlignmentFull");
    } else { // BASIC NAVIGATIONN
        var headerOffset = 90;
        $('.fixedTopBarBkgd2').css('background-position-y', -headerOffset);
        $(".fixedTopBarBkgd").removeClass("fixedTopBarBkgdColor");
        //$(".fixedTopBarSpacer").show();
        //$(".sitemode").val("widget"); // Avoid here because sliding narrow uses this, then returns to fullnav.
        $("#headerHolder").hide();
        $(".hideWithFull").hide();
        if (params["embed"] != "1") { 
            $(".imageHeaderLogo").show();
        }
        $(".fixedTopBarSpacer").show();
        $(".fixedTopBar").show();
        //$("#navTopFromTop").addClass("headerHeightShort");
        $("#navTopFromTop").hide(); // Since full header is not displayed from menu/js
        // To Do: Omit for layer main.
        //if (params["embed"] == "1") { // REACTIVATE MAYBE
            
            // To do: eliminate the content, or move.
            $("#smartPanel1").hide();
            //$(".layerTitleAndArrow").hide();
            
            // Display filters on one line
            
            /* TO DO - Reactivate and Revise */
            if (params["embed"] == "1") {
                /*
                $(".horizontalFilters").append($(".customFilters"));
                $(".horizontalFilters").append($(".searchElements"));
                $(".horizontalFilters").append($(".searchField"));
                */
            }
        //}
        $('.showSearchClick').show();
        if (params["embed"] == "1") {
            if (inIframe()) {
                // No longer needed. If using, needs title added. Appears in 3 dot menu.
                //$('.expandFromIFrame').show();
            } else if ($(".moduleJS").width() < $(window).width() || $(window).width() > 800) { // Need actual screen width here to truely omit on mobile.
                // Concept might be appropriate elsewhere (when not in an iFrame), but here it continues to show icon once expanded and icon spawns new tab.
                //$('.expandFromIFrame').show();
            }
            $(".filterLabelMain").hide();
            //$('.navTopRight').hide(); // For COI
            $('.contentarea').hide(); // Hide Recycling logos
            $('.sectionTitle').hide(); // For COI
            $('.showSearchClick').trigger("click"); // For COI
            $('.searchHeader').show(); // For COI
            $('.hideEmbed').hide();
            //if (location.host == 'localhost' || location.host == 'review.georgia.org') {
            if (params["navbymap"] == "1") {
                //$('.showLayersMapBarHolder').show();

                $('.tabSections').hide();
                $('.byMap').prepend($('.tabSections'));

                //$('.showLayers').trigger("click");
            }
        } else {
            //$('.searchHeader').hide();
            $('.layerTitleLine').show();
            $('.navTopRight .hideFilters').hide();

            //$('.navTopRight .showFilters').show();
            $('.showFilters').show();

            $('.filterPanel').hide(); // No effect
        }
        
        
        
        /*
        $('#heroContent').hide();
        $(".videoHeightHolder").hide();
        $('.filterPanelWidget').css('background-color', '#eee');
        $('.filterLabel').css('color', '#333');
        $('.fieldsLeft').insertAfter($('.searchTextHolder'));
        $('#filterPanel').addClass('filterPanelAbsolute');
        $("#filterPanel").insertAfter($(".searchFilterAbs"));
        */

        //$(".layerNav").show();
        //$('.filterPanelWidget').prepend($('#filterPanel'));

        if (params["embed"] != "1") { // Otherwise retain in mapBar.
            $(".threeDotNavPosition").prepend($(".threeDotNav"));
        }
        positionRightIcons();

        $(".navTopAlignment").removeClass("navTopAlignmentFull");
        //$('#siteHeader').css("height",$('.fixedTopBarBkgd').height() + $('.navTop').height());
    }

    updateHeaderOffset();
    // Apply for all modes

}



function updateOffsets() {
    
    //This will be used when video is visible.

    // Video resides behind the header
    // Video resides above the grid by forcing it down with the height of .videoSpacer.
    $(document).ready(function () {
        
        var greatestHeight = 0; // 188; // 275;
        if ($(".video-module").is(':visible')) {
            var heightConsoleMessage = "updateOffsets - defaultHeight: " + greatestHeight + "; ";
            if ($(".video-module").is(':visible')) {
                if ($(".video-module").height() > greatestHeight) {
                    greatestHeight = $(".video-module").height() - $("#siteHeader").height() - $(".navTopLeft").height();
                    heightConsoleMessage += "videoHeight: " + greatestHeight + "; ";
                }
            }
            console.log(heightConsoleMessage);

            if ($(".moduleJS").width() <= 800) { // Narrow
                greatestHeight = $("#headerHolder").height() + $("#mapBar").height() - 124;
            }
        }
        $(".videoHeightHolder").css("min-height", greatestHeight);

        var moduleWidth = $(".moduleJS").width();
        if (previousWidth == 0 || (previousWidth <= 800 && moduleWidth > 800) || (previousWidth > 800 && moduleWidth <= 800)) {
            // Runs only when threshold crossed
            if (moduleWidth <= 800) {
                if(sitemode == "fullnav") {
                    setSiteMode("widget");
                }

                    //$(".fixedOnMobile").css("position","fixed");

                if (params["embed"] != "1") {
                    //$("#siteHeader").append($(".mapBarRight"));
                    //$(".navTop").before($(".showAppsTopBar"));
                }
                

                //alert('moduleWidth <= 800');
                // root +    // Appending root breaks "disable" because includeCSS associates the full path as the element name.
                includeCSS(root + 'css/site-narrow.css'); /* since media query does not work cross domain without cors */
                $(".navTopLeftWidth").removeClass('navTopLeftWidthWide');
                $("#css-site-narrow-css").removeAttr('disabled');
                //$('#mapBar').prepend($('.mapBarLeft'));

                //$('.horizontalLogo').show();
                $('.listPanelHolder').hide(); // Otherwise covers map
                $("#filterPanelHolder").css("width", "100%");
                $("#filterPanelInner").css("width", "100%");
                //$('.mapBarTop').append($('#mapBar'));

                //$("#mapBar").removeClass("row");
                //$(".mapBarLeft").css("flex", "initial");
                $('.globalMenuMobilePosition').append($('#globalMenu'));
                $("#filterPanelHolder").hide();
                //$(".listPanelContent").css("max-height", "none");  /* Also adjust .listPanel so list can be scrolled to bottom. */
                $('.scrollToList').show(); // Button to scroll down to list.

                //$('.sitemode').val('widget').change(); // Convert to mobile layout.

                //$('#headerHolder').append($('.navTopRight')); // Exuma
                $(".horizontalFilters").insertAfter($("#mapBar"));

                $(".moveListBelow").trigger("click"); // Place below map
                //$('.mapBarRight').append($('.mapBarButtonsRight'));
                $('.rightTopMenu').prepend($('.mapBarButtonsRight'));

                $('.hideMap').hide();
                $('.showMobile').show();
                $('.hideList').hide();
                $('.showList').show();

                // TOO TALL HERE - what's up?
                //alert('.siteHeader' + $('#siteHeader').height());
                $('.siteHeaderSpacer').css("height",$('#siteHeader').height());
                //$('.siteHeaderImage').css("height",$('#siteHeader').height()); // Same for both. Setting size prevents image from exceeding siteHeader. Not need now since absoute within SiteHeader.
                
                //$('.sitemoduleBackground').css("height",$('#siteHeader').height());
            } else { // > 800
                if(sitemode == "fullnav" && $(".sitemode").val() == "fullnav") { // Restore to dropdown value.
                    setSiteMode("fullnav");
                }
                //$(".fixedOnMobile").css("position","fixed");

                //alert("greatestHeight " + greatestHeight);

                //$('.horizontalLogo').hide();
                $("#filterPanelHolder").css("width", "365px");
                
                $("#css-site-narrow-css").attr("disabled", "disabled");

                //$('.mapBarRightHolder').append($('.paginationControls'));
                
                //alert("$('#filterPanelHolder').width(): " + $("#filterPanelHolder").width());
                //$(".mapBarRight").css("width", $("#filterPanelHolder").width());
                //$(".mapBarRight").css("min-width", $("#filterPanelHolder").width());
                
                //$('.mapBarLeft').insertAfter($('.mapBarRight'));
                //$('.mapBarHolder').append($('#mapBar'));
                //$("#mapBar").addClass("row");
                //$('.navTopRightPosition').append($('.navTopRight')); // Exuma
                $('.globalMenuPosition').append($('#globalMenu'));
                //$("#filterPanelHolder").show(); // Blank on main.

                //$(".listPanelContent").css("max-height", $("#mapPanel").height());
                $(".layoutTabSm").removeClass("layoutTabMobile");

                $(".horizontalFilters").insertAfter($(".horizontalFiltersPosition"));
                $('.mapBarRight ').prepend($('.mapBarButtonsRight'));
                $(".listPanelPercent").append($(".listPanel"));
                $('.listPanelHolder').show();
                $('.showMobile').hide();
            }
        }
        previousWidth = moduleWidth;


        // Set width of top filters to match widest: #filterPanelHolder or .contentPanelbelow.
        //var rightWidth = $("#filterPanelInner").width();
        var rightWidth = $("#filterPanelHolder").width();
        if (moduleWidth <= 800) {
            rightWidth = moduleWidth;
        }
        if ($(".listPanel").width() > rightWidth) {
            // TOO wide when expanding from narrow
            //rightWidth = $(".listPanel").width();
            //alert(".listPanel rightWidth: " + rightWidth);
        }
        if (rightWidth < 365 && $(window).width() >= 365) {
            rightWidth = 365;
        }

        //rightWidth = 400;
        //$(".listPanelPercent").css("width", rightWidth);
        //$(".listPanelPercent").css("max-width", rightWidth);


        // $(".layoutTabHolder").css("top", ($(".videoHeightHolder").height() - $(".layoutTabHolder").height() + 20) + 'px');

        //$(".metaMenuWidth").css("width", $("#panelHolder").width() - rightWidth);

    });
}

function hideRightList() {
    $('.listPanelHolder').hide();
    $('.showList').show();
    $('.hideList').hide();
    $('#countyMap').hide();
}
function hideList() {
    $(".horizontalButtons .showDirectory").removeClass("active");
    $('.listPanel').hide();
    $('.showList').show();
    $('.hideList').hide();
    $('#countyMap').hide();

}
function hideAllOtherLayers(layerName,siteObject) {
    console.log("hideAllOtherLayers. Retain " + layerName);
     $(".layersCB").each(function () {
        var id = $(this).attr("id");
        console.log("Not active (hideAllOtherLayer): " + id);
        //$('.layersCB:checked').trigger('click'); // Desect all checked layers
    });
}
function deselectLetter() {
    $('.letter').val("");
    $('.closeAlphabetHolder').hide();
    //$('.closeAlphabetHolder').html("");
    $('#alphabet div').removeClass("active");
}

function setSharePaths(layerName,siteObject) {

}
function showMobileText(mobileTitle) {
    $('#mobileTitle').text(mobileTitle);
    //if ($(window).width() <= 800) {
        //$("#hideMenu").trigger("click");
        //$('#mobileTitle').show();
    //}
}
function access(minlevel,alevel) {
    var level = 0;
    if (alevel) { level = parseInt(alevel) }
    if (minlevel >= level) {
        //console.log("TRUE minlevel " + minlevel + " level " + level);
        return true;
    } else {
        //console.log("FALSE minlevel " + minlevel + " level " + level);
        return false;
    }
}
function goSignin() {
    //var gologon = window.location.pathname.split('/').pop(); // Current relative URL - doesn't work
    //alert('window.location.pathname: ' + window.location.pathname);
    //alert('gologon: ' + gologon); // Nothing
    Cookies.set('gologon',window.location.pathname);
    window.location = "auth/firebase/?action=signin";
    //window.location = "auth/firebase/previous.html?action=signin";
}
function displaySectionMenu(layerName, section, siteObject) {
    // Populate sectionProviderTitle elsewhere before eliminating this function.

    if (!siteObject) {
        return;
    }
    console.log("displaySectionMenu section: " + section + "; layer: " + layerName);
    $("#categoryMenu > div").hide(); // Hide saved divs, which contain checkbox selections.
    $('.topMenu').removeClass("active");
    var theSection = section;
    
    var thelayers = siteObject.items;
    var categoryMenu = "";
    //if ((layerName  == "main" || section == "main" || typeof param["section"] === "undefined") && (layerName  == "main" || typeof layerName  === "undefined")) {
    if (layerName  == "main" && section.length == 0) {
        // Main - List of all Sections
        //alert("Main - List of all Sections");
        $(".sectionBackVisibility").hide();
        if ($(".sectionCatMains").length <= 0) {
            console.log(".sectionCatMains: " + theSection);
            var dupes = {};
            var singles = [];
            $.each(thelayers, function(i, element) {
                if (!dupes[element.section]) {
                    dupes[element.section] = true;
                    singles.push(element);
                }
            });

            categoryMenu += '<div class="sectionCatMains">';
                for(layer in singles) {
                    var layerTitleAndArrow = singles[layer].section;
                    if (layerTitleAndArrow && layerTitleAndArrow.toLowerCase() != "main" && singles[layer].section != "" && layerTitleAndArrow.toLowerCase() != "admin") {
                        var providertitle = layerTitleAndArrow;
                        if (singles[layer].provider.length) {
                            providertitle = singles[layer].provider;
                        }
                        categoryMenu += '<div class="sectionCat"><label id="section-' + singles[layer].section.toLowerCase() + '">' + providertitle + '</label></div>';
                    }
                }
            categoryMenu += '</div>';
            
            $("#sectionCategoriesToggle").hide();
            $("#sectionCategories").show();

            $("#categoryMenu").append(categoryMenu);

            // This could reside elsewhere by using parent div
            $('.sectionCat').click(function (event) {
            //$('#section-' + theSection.toLowerCase()).click(function (event) {
                if (event.target.id.substring(0,7).toLowerCase() == "section") {
                    var section = event.target.id.replace("section-","");
                    console.log('.sectionCat ' + section);
                    
                    // BUGBUG - Ether approach loses # width section=companies and section=properties links
                    // Does not occur in other browser.

                    //alert(".sectionCat A");
                    window.location = "#section=" + section;
                    //alert(".sectionCat B");

                    /*
                    var layerName = "";
                    var layerTitleAndArrow = "";
                    displaySectionMenu(layerName, section, siteObject);
                    event.stopPropagation();

                    var historyParams = { foo: "bar" };
                    var searchTitle = section;
                    var queryString = "./#section=" + section;
                    alert(".sectionCat 1");
                    // No visile effect with Vivaldi, until clicking in URL field.
                    // Same Vivaldi issue (no hash appearing) occurs when using window.location = "#section=" + section;
                    History.pushState(historyParams, searchTitle, queryString);
                    alert(".sectionCat 2");
                    */
                }
            });

        } else {
            $(".sectionCatMains").show();
        }
        $(".sectionProviderTitle").hide();
        $(".sectionProviderTitleSm").hide();

        
    } else if (theSection) {
        // Sets of Layers
        $(".sectionBackVisibility").show();
        theSection = theSection.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });

        console.log("Set of layers for section: " + theSection);
        
        $('#' + theSection.toLowerCase() + '-tab').addClass("active");
        $('#smartMenu').hide();

        if (typeof layerTitleAndArrow  === "undefined") {
            showMobileText(theSection); // Dup of showMobileTitle in controls.js
        } else {
            showMobileText(theSection + " > " + layerTitleAndArrow);
        }
        $(".sectionProviderTitle").text(theSection);
        //$(".sectionProviderTitleSm").text(theSection);
        $(".sectionProviderTitle").show();
        $(".sectionProviderTitleSm").show();

        if ($("#categoryMenu-" + theSection.toLowerCase()).length > 0)  {
            $("#categoryMenu-" + theSection.toLowerCase()).show();
            //updateOffsets();
            $("#sectionCategoriesToggle").hide();
            return; // EXIT, existing checked boxes are displayed.
        }

        // BUGBUG Gets called twice when hitting refresh.
        console.log("displaySectionMenu " + theSection + " - may get called twice when hitting refresh.");

        categoryMenu += '<div class="categoryMenuSet" id=\"categoryMenu-' + theSection.toLowerCase() + '\">';
            categoryMenu += '<div style="">';
                var layerprovider = "";
                var layerproviderPrepended = false;
                categoryMenu += '<div style="margin-bottom:10px; position:relative">';
                for(layer in thelayers) {
                    var layerTitleAndArrow = (thelayers[layer].title ? thelayers[layer].title : thelayers[layer].navtitle);
                    
                    var layersection = "";
                    if (typeof thelayers[layer].section != "undefined") {
                        layersection = thelayers[layer].section;
                    }
                    if (layersection.toLowerCase() == theSection.toLowerCase()) {

                        layerprovider = (thelayers[layer].provider ? thelayers[layer].provider : thelayers[layer].section);
                    
                        if (layerprovider && !layerproviderPrepended) {
                            categoryMenu += '<div class="sectionProviderTitleSm" style="float:left;">' + layerprovider + '</div>';
                            categoryMenu += '<i class="hideCats material-icons" style="position:absolute; right:0; cursor:pointer; padding-right:4px">&#xE5CD;</i>';
                            categoryMenu += '<div style="clear:both"></div>';
                            layerproviderPrepended = true;
                        }
                        var minAccess = 4;
                        if (location.host == 'localhost' || location.host == 'review.georgia.org') {
                            minAccess = 3;

                        }
                        if (access(minAccess,thelayers[layer].menuaccess)) {
                            categoryMenu += '<div class="sectionCat"><input id="cat-' + thelayers[layer].item + '" type="checkbox" name="sectionCheckbox" value="' + thelayers[layer].item + '" /><label for="cat-' + thelayers[layer].item + '"><div>' + layerTitleAndArrow + '</div></label></div>';
                            //iconMenu += '<div class="menuRect"><div class="menuRectBkgd"><div class="iconSide"><input id="nav-' + thelayers[layer].item + '" type="checkbox" name="iconCheckbox" value="' + thelayers[layer].item + '" /></div><a href="#' + thelayers[layer].item + '" style="position:relative">' + icon + ' <span style="z-index:2">' + layerTitleAndArrow + '</span></a></div></div>';
                        }
                    }
                }
                categoryMenu += '</div>';
                
                //categoryMenu += '<div class="hideMultiselect filterTab buttonUnderCategories">Hide Multiselect</div>';
                //categoryMenu += '<div class="showMultiselect filterTab buttonUnderCategories" style="display:none;">Multiselect</div>';

                //if (theSection.toLowerCase() == "companies") {
                    // Temp. Add this to JSON.
                    //categoryMenu += '<div id="allCompanies" class="filterTab buttonUnderCategories">More Industries</div>';
                //}
            categoryMenu += '</div>';

        categoryMenu += '</div>';

        $("#categoryMenu").append(categoryMenu);
        $("#sectionCategoriesToggle").hide();
        $("#sectionCategories").show();

        /*
        $('#hideSectionCategories').click(function(event) {
            hideSectionCategories();
        });
        */
        $('.hideCats').click(function(event) {
            //alert(".hideCats");
            hideSectionCategories();
            var layerName = getLayerName();
            //alert(layerName);
            //$("#sectionCategoriesToggle").hide();
        });

        //$('#cat-' + layerName).prop('checked', true);
    }

    // TO DO - loop through lower checkboxes to set multiple in newly added upper.
    console.log("TO DO - loop through lower checkboxes to set multiple in newly added upper.");

    console.log("#cat-" + layerName);
    $("#cat-" + layerName).prop('checked', true);

    updateOffsets();

// Moved

    /*
    alert("height " + $("#categoryMenu").height());

    alert("height " + $("#categoryMenu").height());

    if ($("#categoryMenu").height() > 0) {
        var heroMin = $("#categoryMenu").height();
        alert("heroMin " + heroMin);
        $("#heroContent").css("min-height", heroMin + 30);
    }
    */
    

    // The title area navigation
    // CHECKBOX ACTIONS Same as layerCheckboxes
    $('.sectionCat :checkbox').change(function () {
        if($(this).is(":checked")) {
            console.log("sectionCat check " + $(this).prop('value'));

            // uncheck all
            $('.sectionCat input').removeAttr('checked');
            $('.layersCB').removeAttr('checked');
          
            $('#sectionNavigation').hide(); // Could reside in event triggered by following line:
            $('#go-' + $(this).prop('value')).trigger("click"); // Triggers change layer.
        } else {
            console.log("sectionCat uncheck");

            // uncheck all
            $('.sectionCat input').removeAttr('checked');
            //$('.layersCB').removeAttr('checked');

            $('#go-' + $(this).prop('value')).trigger("click"); // Unchecks via $('.layerCheckboxes :checkbox')
        }
        event.stopPropagation(); // No effect here
    });
}

function getLayerName() {
    console.log("getLayerName location.hash: " + location.hash);
    // To do: fetch from embed.js?go=
    //if (!location.hash) return "main";

    return getCurrentLayer();
}
function getCurrentLayer() {
    //Sample - #companies:aerospace:runways returns companies
    param = loadParams(location.search,location.hash);
    //console.log('getCurrentLayer() param[""] ' + param[""]);
    
    if (param[""]) {
        //alert('getCurrentLayer() param[""]: ' + param[""]);
        var theLayer = param[""];
        if (theLayer.indexOf(":") >= 0) {
            var splitParam = param[""].split(":");
            theLayer = splitParam[1];
        }
        console.log("getCurrentLayer(): " + theLayer);
        return theLayer;
    } else {
        if (params["go"]) {
            return(params["go"]); // Set within calling page.
        }
        //return "main"; // Jan 2017

        // This will be changed sice it prevents a use of header without layer showing.
        if (location.host == 'recycling.georgia.org') {
            return "recycling";
        }
        return "";
    }
}
function loadUserAccess(userAccess) {
    currentAccess = userAccess;
    // For group access version, see /core/item/scripts/util.js
    $('.user-0').show(); // Shows for all. Allows div to be hidden until access is fetched.
    //alert("userAccess " + userAccess);
    if (userAccess >= 1) {
        $('.user-0').hide(); // show elements for anonymous users
        
        for (var i = 1; i <= 9; i++) {
            if (userAccess >= i) {
                $('.user-' + i).show();
            }
            if (userAccess == i) {
                $('.onlyuser-' + i + '-only').show();
            }
        }
    }
    else {
        for (var i = 1; i <= 9; i++) {
            $('.user-' + i).hide();
        }
        //$('.user-0-only').show(); // User user-0 instead.
    }
    for (var i = 1; i <= 9; i++) {
        if (userAccess <= i) {
            $('.user-' + i + '-andbelow').show();
        }
    }
}
function displayBigThumbnails(layerName,siteObject) {
    $(".bigThumbMenu").html("");

    $("#honeycombPanelHolder").show(); // Might have to alter when this occurs.
    $("#honeycombPanel").show();
    var thelayers = siteObject.items;
    var sectionMenu = "";
    var categoryMenu = "";
    var iconMenu = "";
    var bigThumbSection = params["bigThumbSection"]; // Might flip these.
    if (!bigThumbSection) {
        bigThumbSection = layerName;
    }

    for(layer in thelayers) {

        var menuaccess = 10; // no one
        try { // For IE error. Might not be necessary.
            if (typeof(siteObject.items[layer].menuaccess) === "undefined") {
                menuaccess = 0;
            } else {
                menuaccess = siteObject.items[layer].menuaccess;
            }
        } catch(e) {
            console.log("displayLayerCheckboxes: no menuaccess");
        }
        

        if (bigThumbSection) {
            if (access(currentAccess,menuaccess)) {
                if (siteObject.items[layer].section == bigThumbSection && siteObject.items[layer].showthumb != '0' && bigThumbSection.replace(" ","-").toLowerCase() != thelayers[layer].item) {
                    var thumbTitle = (thelayers[layer].navtitle ? thelayers[layer].navtitle : thelayers[layer].title);


                    var icon = (thelayers[layer].icon ? thelayers[layer].icon : '<i class="material-icons">&#xE880;</i>');
                   if (thelayers[layer].item != "main" && thelayers[layer].section != "Admin" && thelayers[layer].title != "") {
                        // <h1 class='honeyTitle'>" + thelayers[layer].provider + "</h1>
                        //var thumbTitle = thelayers[layer].title;
                        var bkgdUrl = thelayers[layer].image;
                        if (thelayers[layer].bigthumb) {
                            bkgdUrl = thelayers[layer].bigthumb;
                        }
                        var hrefLink = "";

                        if (thelayers[layer].directlink) {
                            hrefLink = "href='" + thelayers[layer].directlink + "'";
                        }
                        sectionMenu += "<li class='widthPercent'><div class='bigThumb' style='background-image:url(" + bkgdUrl + ");'><a class='' " + hrefLink + " href='#" + thelayers[layer].item + "'><div class='bigThumbText'>" + thumbTitle + "</div></a></div></li>";
                    }
                }
            }
        }
    }
    //alert(sectionMenu);
    $(".bigThumbMenu").append("<ul class='bigThumbUl'>" + sectionMenu + "</ul>");
    //$("#honeycombMenu").append("<ul class='bigThumbUl'>" + sectionMenu + "</ul>");
    
    $("#iconMenu").append(iconMenu);
    $("#honeyMenuHolder").show();
}
function displayHexagonMenu(layerName,siteObject) {
    console.log("Display HEXAGON MENU");
    $("#honeycombPanel").show();
	var thelayers = siteObject.items;
	var sectionMenu = "";
	var categoryMenu = "";
	var iconMenu = "";
	for(layer in thelayers) {

        var menuaccess = 10; // no one
        try { // For IE error. Might not be necessary.
            if (typeof(siteObject.items[layer].menuaccess) === "undefined") {
                menuaccess = 0;
            } else {
                menuaccess = siteObject.items[layer].menuaccess;
            }
        } catch(e) {
            console.log("displayLayerCheckboxes: no menuaccess");
        }
        if (access(currentAccess,menuaccess)) {
            if (siteObject.items[layer].menulevel == "1") {
        		//var layerTitleAndArrow = (thelayers[layer].navtitle ? thelayers[layer].navtitle : thelayers[layer].title);
        		var layerTitleAndArrow = thelayers[layer].section;
                var icon = (thelayers[layer].icon ? thelayers[layer].icon : '<i class="material-icons">&#xE880;</i>');
        	   if (thelayers[layer].item != "main" && thelayers[layer].section != "Admin" && thelayers[layer].title != "") {
        	   		// <h1 class='honeyTitle'>" + thelayers[layer].provider + "</h1>
        	   		sectionMenu += "<li class='hex'><a class='hexIn hash-changer' href='#" + thelayers[layer].item + "'><img src='" + thelayers[layer].image + "' alt='' /> <p class='honeySubtitle'>" + layerTitleAndArrow + "</p></a></li>";
        		}
            }
        }
	}
	//alert(sectionMenu);
	$("#honeycombMenu").append("<ul id='hexGrid'>" + sectionMenu + "</ul>");
	
	$("#iconMenu").append(iconMenu);
    $("#honeyMenuHolder").show();
}
function addToHash(hashKey,hashValue) {
	// Modifing hash also triggers hash listener, so apply all changes at once.
	var tag = hashValue;
	if (param[""] && $(".hideMultiselect").is(':visible')) {
		var split_str = param[""].split(",");
	
		if (split_str.indexOf(hashValue) == -1) {
		    tag = hashValue + ',' + param[""];
		} else {
			tag = param[""];
		}
	}
	if (tag != param[""]) {
        console.log("addToHash: " + tag);
		window.location.hash = tag; // To Do: Append the rest of existing hash.
	}
}
/*
function removeFromHash(hashKey,hashValue) {
	var hashStart = removeValue(param[""],hashValue);

	// Modifing hash also triggers hash listener, so apply all changes at once.
    window.location.hash = hashStart; // Also triggers closure of search box.
	if (hashStart == "") {
        console.log("removeFromHash hashValue: " + hashValue);
		document.location.href = String(document.location.href).replace( "#", "" );
	}
}
*/
var removeValue = function(list, value) {
    if (typeof list == "undefined") {
        return "";
    }
    list = list.replace(/\, /g,",");
    var values = list.split(",");
    for(var i = 0 ; i < values.length ; i++) {
      	if(values[i] == value) {
            values.splice(i, 1);
        }
    }
      return values.join(",");
}

function getGo(source, id) {
	if (!id) {
		//id = "main";
        //alert("param: " + params["go"]);
	}
	for (var i = 0; i < source.length; i++) {
		if (source[i].item === id) {
			return source[i];
		}
	}
    return; // Return empty to avoid trapping null elsewhere.
	//throw "Couldn't find object with id: " + id;
}

function checkRequestedPoint(lat,lon) {
    // Use lat/lon, if within Georgia.
    if ((lat > 30.516 && lat < 35) && (lon > -85.883 && lon < -81)) {

    } else {
        alert("The center of your search is outside Georgia.");
        $('#whereMessage').text("Search center is outside Georgia.<br>");
    }
}

var mapLoaded = 0;
var map;
var polygon; // Map marker. Reset when new point or polygon clicked.
var current_position, current_accuracy;
function actOnCartoLoaded(siteObject,layerName) {
    // alert("actOnCartoLoaded layerName " + layerName);

    if (typeof L == "undefined") {
        console.log("Error: no L");
    }
	
    var goLayer = getGo(siteObject.items,layerName);

	// DISPLAY MAP
    //With zoom 8, center: [33, -83],
    // Georgia
    var zoom = 7;
    if (params["mapzoom"]) {
        zoom = params["mapzoom"];
    }
    if (goLayer.zoom) {
        zoom = goLayer.zoom;
    }
    var lat = 32.2;
    var lon = -81.2;
    if (params["maplat"]) {
        lat = params["maplat"];
    }
    if (goLayer.maplon) {
        lon = goLayer.maplon;
    }
    if (goLayer.maplat) {
        lat = goLayer.maplat;
    }
    if (params["maplon"]) {
        lon = params["maplon"];
    }

    if ($(".moduleJS").width() <= 800) {
        lon = -83;
    }
    checkRequestedPoint(lat,lon);
    
    //alert("loadMap");
    console.log("actOnCartoLoaded map = L.map");
    if (mapLoaded != 1) {
    	map = L.map('map', { 
              zoomControl: true,
              center: [lat, lon],
              drawControl: false,
              zoom: zoom
            }
        );
        map.scrollWheelZoom.disable();
    }


    // dark with labels
    // https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f 
    var basemaps = {
        'positron_light_nolabels' : L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
          attributionX: 'positron_lite_rainbow'
        }),
        'litegreen' : L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
            attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }),
        'esri' : L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }),
        'dark' : L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
            attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
        }),
        'osm' : L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        }),
        'green' : L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }),
        'firemap' : L.tileLayer('http://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
    }

    var cityNamesLight = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png');
    var cityNamesDark = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png');
    
    // INSIDE BOUNDARY ONLY
    // If using, fix error here: http://localhost/site/widget-local.html#aerospace by loading 
    //var cityNamesLight = L.TileLayer.boundaryCanvas('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {boundary: statesData});
    //var cityNamesDark = L.TileLayer.boundaryCanvas('http://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png', {boundary: statesData});



    loadCartoMap(layerName, siteObject);

    if (mapLoaded == 1) { // Map was loaded previously

        // MOVE FONTS ABOVE NEW LAYER
        var basemap = sitebasemap;
        if (typeof(basemap) == undefined) { // Inital visit, before cookie set
            basemap = $('#basemapSelector').val();
        }
        if (basemap == basemaps['dark'] || basemap == basemaps['esri']) {
            cityNamesDark.bringToFront();
        } else if (basemap == basemaps['positron_light_nolabels'] || basemap == basemaps['osm']) {
            cityNamesLight.bringToFront();
        }

        // EXIT actOnCartoLoaded
        return; // Prevents duplicate init of .hideMyPosition click
        // but something below is needed to prevent error on bringToFront:
        // cartodb.js:8 Uncaught TypeError: Cannot read property '_panes' of undefined(…)
    }
    mapLoaded = 1;

    /////// FUNCTIONS AND CLICKS - DECLARED ONCE THANKS TO EXIT ABOVE

    function onLocationFound(e) {
      //alert("onLocationFound");

      // shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
      var greenIcon = L.icon({
            iconUrl: '/site/img/icons/current.png',

            iconSize:     [40, 40], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -20] // point from which the popup should open relative to the iconAnchor
        });

      // if position defined, then remove the existing position marker and accuracy circle from the map
      if (current_position) {
          map.removeLayer(current_position);
          map.removeLayer(current_accuracy);
      }
      var radius = e.accuracy / 2;

      current_position = L.marker(e.latlng, {icon: greenIcon}).addTo(map).bindPopup("You are within " + radius + " meters from this point"); // .openPopup()
      //marker.valueOf()._icon.style.backgroundColor = 'green';

      // 
      if (radius > 100) { // Only display if inaccurate
        current_accuracy = L.circle(e.latlng, radius).addTo(map);
      } else {
        current_accuracy = "";
      }
    }
    function onLocationError(e) {
      console.log("onLocationError: " + e.message);
    }
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);


    // wrap map.locate in a function    
    function zoomToCurrent() {
      //map.locate({setView: true});

      map.locate({setView: true, maxZoom: 13}); // User browser lat/lon.
    }
    // Zoom to position every 5 seconds
    var myPositionIntervalID = 0;
    $('.showMyPosition').click(function(event) {
        // First time, set location menu to Nearby.

        //$("#locationDD option[value='current']").prop("selected", true).trigger("change");
        //$("#locationDD option[value='current']").trigger("click");
        
        //alert('this .showMyPosition');
        // call locate every 5 seconds... forever.
        myPositionIntervalID = setInterval(zoomToCurrent, 5000);
    });
    $('.hideMyPosition').click(function(event) {
        clearInterval(myPositionIntervalID);
        //map.stopLocate();
    });

    // When .showMyPosition is clicked before map load, such as on an iFrame layer.
    if ($('.hideMyPosition').is(':visible')) {
        // Show a loading icon here.

        $('.showMyPosition').trigger("click");
    }

    map.on('dragstart', function() {
      clearInterval(myPositionIntervalID);
      // show button to turn back on position auto-update.

    })
    map.on('zoomstart', function() {
        // Turn off recurring zoom to current position.
        // BUGBUG - this also occurs on initial zoom when clicking showMyPosition.
        //alert("turm off position tracking update.");
        clearInterval(myPositionIntervalID);
        // show button to turn back on position auto-update.

    })
    // To investigate: Not sure why clicking grid and then map does not get here.
    //alert("loading actOnCartoLoaded B");

    // loadCartoMap was here.



	// BASEMAP

    // Add a request here for baseMapSelector revision.
    // http://gis.stackexchange.com/questions/170594/toggle-basemaps-with-cartodb-js-createlayer/174998#174998
	
    function setBasemap(basemap) {

        // cropMap requires the following include for statesData
        // Applies Georgia Mask on county map. Used for region module instead.

        var cropMap = false; 
        // To do: cropMap = true requires the folllowing 3:
        // http://leaflet-extras.github.io/leaflet-providers/leaflet-providers.js"></script>
        // /documentation/region/js/boundary-canvas.js
        // /documentation/region/js/georgia.js

        //setBasemapMasked(basemap);

        if (currentBasemap) {
            map.removeLayer(currentBasemap);
        }
        //currentBasemap = basemap;


        if (cropMap) {
            currentBasemap = L.TileLayer.boundaryCanvas(basemap._url, {
                boundary: statesData
            }).addTo(map);
        } else {
            currentBasemap = basemap;
            map.addLayer(basemap);
            basemap.bringToBack();
        }

        currentBasemap.bringToBack();


        //Add the top layers of roads, bring it to the front.
        if (basemap == basemaps['dark'] || basemap == basemaps['esri']) {
            map.addLayer(cityNamesDark);
            cityNamesDark.bringToFront();
            map.removeLayer(cityNamesLight);
        } else if (basemap == basemaps['positron_light_nolabels'] || basemap == basemaps['osm']) {
            map.addLayer(cityNamesLight);
            cityNamesLight.bringToFront();
            map.removeLayer(cityNamesDark);
        } else {
            map.removeLayer(cityNamesLight);
            map.removeLayer(cityNamesDark);
        }
        //addStateMask(map);
        
    }

    // DELETE
    function setBasemapMasked(basemap) {
        //alert(objToString(basemap._url));

        var osm = L.TileLayer.boundaryCanvas(basemap._url, {
            boundary: statesData
        }).addTo(map);

        // , 
        // attribution: osmAttribution
        return;


        var withBoundary = function(providerName) {
            return L.TileLayer.BoundaryCanvas.createFromLayer(
                L.tileLayer(basemap._url),
                {boundary: statesData, trackAttribution: true}
            )
        }
        
        L.control.layers({
            'OpenStreetMap': withBoundary('OpenStreetMap.HOT'),
            'Watercolor': withBoundary('Stamen.Watercolor'),
            'testLayer': withBoundary('Esri.WorldStreetMap').addTo(map),
            'World Imagery': withBoundary('Esri.WorldImagery')
        }, null, {collapsed: false}).addTo(map);

    }

    var currentBasemap = basemaps['positron_light_nolabels']; // default map
    if (typeof(sitebasemap) != "undefined" && sitebasemap.length >= 0) {
        currentBasemap = basemaps[sitebasemap];
    }
    //alert("sitebasemap: " + sitebasemap);
        
    setBasemap(currentBasemap); // Init

    // To do: rework to loop until map loads, or trigger on map load.
    setTimeout(function(){
        // Since not all maps include the cityNamesLight nor cityNamesDark layers.

        //Couldn't get this working because cityNamesLight exists. Error relates to _pane
        //objToString(cityNamesLight);
        //if (!jQuery.isEmptyObject(cityNamesLight)) {
  		try {
            cityNamesLight.bringToFront();
        } catch (e) {}
        try {
            cityNamesDark.bringToFront();
        } catch (e) {}
	}, 500); // Half second so initial map points have loaded.
    setTimeout(function(){
        //if (!jQuery.isEmptyObject(cityNamesLight)) {
        try {
  		    cityNamesLight.bringToFront();
        } catch (e) {}
        try {
            cityNamesDark.bringToFront();
        } catch (e) {}
	}, 3000); // 3 second in case initial load was slow.

    function addCursorInteraction(layer) {
        var hovers = [];

        layer.bind('featureOver', function(e, latlon, pxPos, data, layer) {
          hovers[layer] = 1;
          if(_.any(hovers)) {
            $('#map').css('cursor', 'pointer');
          }
        });

        layer.bind('featureOut', function(m, layer) {
          hovers[layer] = 0;
          if(!_.any(hovers)) {
            $('#map').css('cursor', 'auto');
          }
        });
    }

    function loadCartoMap(layerName, siteObject) {
    	//$("#go-" + layerName).prop('checked', true);
        if (layerName === undefined) {
            console.log("loadCartoMap canceled - layerName undefined");
            return;
        }
        var goLayer = getGo(siteObject.items,layerName);

        if (typeof goLayer == "undefined") {
        //if (!goLayer.feed) {
            console.log("loadCartoMap canceled - no feed in json layers file");
            return;
        }

        if (typeof goLayer != "undefined") {
            console.log("loadCartoMap NEEDS TO BE canceled - found existing map: " + layerName);
            
            // No effect
            //goLayer.layer.show();
            //goLayer.layer.bringToFront();
            //goLayer.layer.setZIndex(99999);

            // Also need to allow for letter and keyword search, which redraw existing map.
             //return;
        }
        console.log("loadCartoMap " + layerName);

        if (!goLayer.feed) {
            return; // Occurs for main in explore. Blank map appears.
        }
    	// Modify to load unique image
    	$(".moduleBackgroundImage").addClass("moduleBackgroundImageFull"); // BUGBUG - Should this reside in changeLayer?

    	// Not working
    	//$('.moduleBackgroundImage').css("background-image", goLayer.image); 

    	/* Showing existing does not work because new legends have overlapped prior in .cartodb-legend-stack div. */
    	/*
    	if (goLayer.layer) {
    		
    		//goLayer.layer.getSubLayer(0).bringToFront(); // Error not a Function
    		//goLayer.layer.setZIndex(0);
    		goLayer.layer.show();
    		goLayer.layer.bringToFront();

    		// No effect if layer is not most recent revealed.
    		// Reveals sublayer, but not legend
    		goLayer.layer.getSubLayer(0).show();
    		goLayer.layer.getSubLayer(1).show();
    		goLayer.layer.getSubLayer(2).show();
    		goLayer.layer.getSubLayer(3).show();
    		goLayer.layer.getSubLayer(4).show();
    		

    		//goLayer.layer.bringToFront(); // Brings layer's mappoints to front, but not legend.
    		return;
    	}
    	*/
 

    	var vizjson = goLayer.feed;
		// CartoDB parameters:
		// http://docs.cartodb.com/cartodb-platform/cartodb-js/api-methods/

		//cartodb.createVis("map", vizjson, {
		//	cartodb_logo: false,
		//	layer_selector: false
		//})

        //console.log("cartodb.createLayer");

        $(".loadingMap").show();
        $(".loadingMap").removeClass("hidden");

        //  Set infowindow: false  , 
		cartodb.createLayer(map, vizjson, {zoom: 5, cartodb_logo: false, layer_selector: true, infowindow: false, drawControl: true,

				//sublayers: [{
				    //change your sql below
				    // No effect
				    //sql: "SELECT e.cartodb_id, e.area, w.subregion, w.un, e.the_geom, e.the_geom_webmercator FROM european_countries_e e LEFT JOIN world_borders w ON e.iso_2_code = w.iso2"
				 // }]
			})
			.addTo(map)
			/* This is for createVis
			.done(function(vis, layers) {
	          // layer 0 is the base layer, layer 1 is cartodb layer
	          // setInteraction is disabled by default
	          layers[0].setInteraction(true);
	          layers[1].on('featureOver', function(e, latlng, pos, data) {
	            cartodb.log.log(e, latlng, pos, data);
	          });
	          // you can get the native map to work with it
	          var map = vis.getNativeMap();
	          // now, perform any operations you need
	          // map.setZoom(3);
	          // map.panTo([50.5, 30.5]);
	        })
			*/
			.on('done', function(layer) {
				$(".loadingMap").addClass("hidden"); // Fade out

                //if ($(".cartodb-legend-stack").is(':visible')) {
                if ($(".cartodb-legend").is(':visible')) {
                    //$(".cartodb-legend-stack").hide();
                    $('.hideLegend').hide();
                    // Not using since legend initially appears lowerleft.
                    //$('.showLegend').show();
                    //$("div.cartodb-legend-stack").addClass("cartodb-legend-stack-move");
                    //$('div.cartodb-legend-stack').insertAfter($('#cartodb-legend-stack-position'));
                } else {
                    $('.showLegend').hide();
                    $('.hideLegend').hide();
                }
				//alert("on done");
				// Test for adding infowindow
				

			   goLayer.layer = layer; // Store the layer in a variable for access outside this function. Might be getting overwritten.
               console.log("loadCartoMap - stored map layer in variable."); // 'removeChild' error avoided 


               //BUGBUG - Following error only occurs when this area of code is NOT reached.
               // cartodb.js:16 Uncaught TypeError: Cannot read property 'removeChild' of null


               //goLayer.sublayer0 = layer.getSubLayer(0);
			   //layer.getSubLayer(0).hide();


			  
			   		// This line breaks display of roadways:
			   		// Also creates a second infowindow
					// cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['cartodb_id', 'address1', 'city']);
				

			   // get sublayer 0 and set the infowindow template (Add Rambo Image to first layer)
			   // var sublayer = layer.getSubLayer(0);
			   // sublayer.infowindow.set('template', $('#infowindow_template').html());


			   var queryWhere = getWhere(siteObject, layerName, goLayer.namefield, goLayer.descriptionfield, goLayer.addressfield, goLayer.cityfield, goLayer.table);
               console.log("loadCartoMap queryWhere: " + queryWhere); 
               //alert("queryWhere: " + queryWhere);
               if (queryWhere) {
                    var filteredQuery = "SELECT * FROM " + goLayer.table + " WHERE 1=1 " + queryWhere;
                    console.log("filteredQuery: " + filteredQuery);
                    layer.getSubLayer(0).setSQL(filteredQuery);
               }
			   
			   //layer.getSubLayer(0).setSQL("SELECT * FROM airports WHERE city_name = 'Atlanta'");

			   //layer.getSubLayer(0).setSQL("SELECT * FROM public_use_airports_medium_scale where state_name = 'GEORGIA' AND city_name = 'ATLANTA'");

			   //layer.getSubLayer(1).setSQL("SELECT * FROM public_use_airports_medium_scale where state_name = 'GEORGIA' AND city_name = 'ATLANTA'");


                //layer.getSubLayer(0).setInteraction(true); // No apparent effect (until using torque map), but came from the same page as the following line:
                addCursorInteraction(layer); // Sets cursor:pointer when pop-over off via "infowindow: false" above.

                if (layer.getSubLayer) { // Prevents error with torque
    				layer.getSubLayer(0).on('featureClick', function(e, latlng, pos, data, content) {
                        $(".detailsPanel").hide();

                        //alert('featureClick data: ' + objToString(data));
                        //alert('featureClick data.content: ' + objToString(data.content));
                        //alert('featureClick e: ' + objToString(e));
                        //alert('featureClick e.target: ' + objToString(e.target));
                        //alert('featureClick e.target._layer: ' + objToString(e.target._layer));

                        console.log('featureClick latlng: ' + latlng);
                        console.log('featureClick pos: ' + pos);

    					

    					//latlng = new map.LatLng(data.lat, data.lon);
    					//latlng = new google.maps.LatLng(data.lat, data.lon);
    					var detailsText = "";
    					//var n = $('<tr id="' + r['id'] + '"></tr>');
    					
    					//for (i in data.fields) {
    			        //	detailsText += i + " " + content.fields[i] + "<br>";
    			        //}
    			        //$(".layerCheckboxes").append(layerCheckboxes);
    			        
    			        //alert(data.rows[0].city);
    			        //alert(detailsText);
                        console.log("featureClick calls displayDetails");

                        // Not essential here because we have map.panTo in displayDetails.
                        // Zoom to click
                        //map.fitBounds(e.target.getBounds());
                        //map.fitBounds(e.target._layer.LatLngBounds());

                        //map.fitBounds(e.layer.getBounds());

                        // TO DO:
                        // But we need to highlight the selected polygon - for counties.

                        // Centers map:

    			    	displayDetails(data.cartodb_id,data,latlng,layerName, siteObject);

                        // Runs twice if here. Delete this line:
                        //showFeature(data.cartodb_id, latlng, layer); // Also returns error: user should be provided

    			        e.stopPropagation(); // Prevents click through to multiple layers. Doesn't work.
    			    });
                }

				//layer.getSubLayer(0).infowindow.set('template', $('#infowindow_template').html());
				
				setTimeout(function(){
                    // Causes error: Uncaught TypeError: Cannot read property 'bringToFront' of undefined(…)
                    // Error occurs when clicking .showMyPosition
			  		//cityNamesLight.bringToFront();
				}, 500); // Half second so initial map points layer has loaded.

			}).on('error', function() {
                $(".loadingMap").hide();
			    console.log("createLayer error occurred");
		});
		//map.scrollWheelZoom.disable();

		//if (idInURL) {
		//$(".detailsPanel").show(); // After tiles load.
        //$(".listPanel").show();
		//}

		//alert("Done loadCartoMap");

        map.on('click', function(e) {
            // Anywhere on map
            //tempLatitude = e.latlng.lat;
            //tempLongitude = e.latlng.lng;
        });

        
    }
	$('#basemapSelector').change(function(event) {
		setBasemap(basemaps[$(this).val()]);
	});

    // Map point click
	function displayDetails(cartodb_id,data,latlng, layerName, siteObject) {
        //$(".cartodb-infowindow").hide();
		//$("#hideMap").hide();
		//$("#showMap").show();
        deselectMenusAndTabs();
        //$(".hideList").hide();
        $(".showList").show();
        $(".hideList").hide();
		$(".showDetails").hide();
		$(".hideDetails").show();
        $(".listPanelRows").hide();
        $(".overlaysInSide").hide(); $(".showOverlays").removeClass("active");
        //alert('displayDetails $(".listPanelRows").hide();');
		
        $('.hideLocationsMenu').trigger("click");
		$(".listPanel").show();
        if ($(".besideLeftHolder .listPanel").length > 0) { // Beside map
            $('.besideLeftHolder').show();
        }
        $(".listPanelHolder").show();

        //$(".listPanelHolder").show(); // Avoid on mobile, covers map


        //$(".showDirectory").hide();
        $(".hideDirectory").show();

        $('.cid').text(cartodb_id);
        $('.cidTab').val(cartodb_id);
        updateTheURL(layerName);

        console.log("Call loadGrid from displayDetails. layerName: " + layerName);
		loadGrid(cartodb_id,layerName,siteObject);

        
		//map.panTo(latlng); // BUGBUG - this causes map to jump when dragging after zooming.
        // panTo also causes tiles to fail loading when zooming and/or panning around.

        // setZoom is not usable without panTo
        //map.setZoom(8); // Zoom 8 = 1 step closer. 7 is the default size for state.

        // Maybe try a newer version of Leaflet?

        // Calculate the offset
        var offset = map.getSize().x*0.20;
        console.log("Map size x: " + map.getSize().x);
        // Then move/center the map
        //map.panBy(new L.Point(offset, 0), {animate: true});
        //alert("displayDetails done");
	}
    console.log("----------------");
}

 // CartoDB script loaded. Waiting to load avoids CartoDB not defined error, but...
 // To Do: Wait for CartoDB in aerospace.js instead. Thereby move outside this function so load is async.
 //	loadScript('/maps/js/aerospace.js',temp2); // To do: load based on "go" value in URL.

if (params["root"]) {
    root = params["root"]; // Needed for adjacent site folder when not on localhost. Localhost is hardcoded to /site/ above.
    alert("root: " + root);
}

//var temp2 = function() {
 // aerospace.js is now loaded
//};

// To Do: Make this absolute when not localhost.
//includeCSS(root + 'css/site.css');
//includeCSS(root + '../menu/css/global.temp.css');
includeCSS('https://fonts.googleapis.com/icon?family=Material+Icons');

// Layer icons in app menu
includeCSS('//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css');

// To Do: Lazy Load
//includeCSS('https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/themes/css/cartodb.css');
// This css file is new than the 3.15 .js in use.  If an error occurs, track down 3.15 css.
includeCSS(root + 'css/cartodb.css');
loadScript(root + 'js/speech-input.js');
if (!workoffline) {
    loadScript('https://cdn.firebase.com/js/client/2.2.3/firebase.js');
}
/*
// Differs for each map:
var cognitoFile = loadScript("https://services.cognitoforms.com/s/cileRMJMNEWcb6ZO8yEtXg");

var gotCognito = $.when(cognitoFile);    // and $.when groups several Deferreds

// example usage - you can do the same for the individual files
gotCognito.done(function () {
    //$("#indexHolder").append(getIndexHtml()); // Within index.js

    // Called when cognitor file successfully loaded
    setTimeout(function(){ 
        Cognito.load("forms", { id: "36" }); 
    }, 1000);
});
gotCognito.fail(function () {
  console.log("gotCognito fail");
});

gotCognito.always(function () {
  // Call regardless of completion - to hide loading icons.
});
*/


function StartSearchEnter(event1) {
    var kCode = String.fromCharCode(event1.keyCode);
    if (kCode == "\n" || kCode == "\r") {
        var locLookup = "http://104.236.40.30:3000/api/geo?searchString=" + encodeURIComponent($("#keywordsTB2").val());

        /*
        $.ajax({
        'type': 'GET',
        'async': true,
        'global': false,
        'url': locLookup,
        'jsonpCallback': 'callback',
        'dataType': "jsonp",
        'success': function (siteObject) {
            alert("fetched locLookup");

        },
        error: function (req, status, err) {
            //alert('Error fetching locLookup: ', status, err);
        }
        });
        return false;
        */
        $("#lat").val("33.778");
        $("#lon").val("-84.390");
    }
}

function SearchEnter(event1) {
	var kCode = String.fromCharCode(event1.keyCode);
	if (kCode == "\n" || kCode == "\r") {
        $("#goSearch").click();
		return false;
	}
}
function SearchFormTextCheck(t, dirn) {
	if (dirn == 1 && t.value == "Search") t.value = "";
}

function initEvents() { // Once included file1 is loaded.
$(document).ready(function () {
    Cookies.remove('access_token'); // temp
    Cookies.remove('a_access_token'); // temp
    Cookies.remove('p_access_token'); // temp
    Cookies.remove('mode'); // temp
    if (Cookies.get('at_a')) {
        //alert(Cookies.get('at_a'));
        loadUserAccess(7); // This will be reduced to 6.  7 will be used under review.georgia.org.
    } else if (Cookies.get('at_f')) {
        loadUserAccess(1);
    } else {
        loadUserAccess(0);
    }
    if (showLogin) {
        $(".showAccountTools").show();
    }
	// https://www.mapbox.com/mapbox.js/example/v1.0.0/layers/
	//addLayer(L.mapbox.tileLayer('mapbox.streets'), 'Base Map', 1);
	//addLayer(L.mapbox.tileLayer('examples.bike-lanes'), 'Bike Lanes', 2);
	//addLayer(L.mapbox.tileLayer('examples.bike-locations'), 'Bike Stations', 3);

	function addLayer(layer, name, zIndex) {
		 layer
			.setZIndex(zIndex)
			.addTo(map);

		// Create a simple layer switcher that toggles layers on and off.
		var link = document.createElement('a');
			link.href = '#';
			link.className = 'active';
			link.innerHTML = name;

		link.onclick = function(e) {
			e.preventDefault();
			e.stopPropagation();

			if (map.hasLayer(layer)) {
				map.removeLayer(layer);
				this.className = '';
			} else {
				map.addLayer(layer);
				this.className = 'active';
			}
		};

		layers.appendChild(link);
 	}

    var consoleTime = null;
    function timeStamp() {
        var mydate = new Date();
        if (consoleTime == null) {
            consoleTime = mydate;
        }
        
        var m = mydate.getMinutes() - consoleTime.getMinutes(),
            s = mydate.getSeconds() - consoleTime.getSeconds();
            //ms = mydate.getMilliseconds() - consoleTime.getMilliseconds();
            
        return (Math.abs(m) > 0 ? Math.abs(m) + ':' : '') + Math.abs(s) + ':' + Math.abs(mydate.getMilliseconds()) + ' - ';
        //return (mydate.getMinutes() + ':' + mydate.getSeconds() + ':' + mydate.getMilliseconds() + ' - ');
        
    }
    function writeConsole(text) {
        return; // Deactivated until $widgetContainer added.

        if (typeof (console) != "undefined") {
            if(typeof(text) == 'string') {
                console.log(timeStamp() + text);
            }
            else {
                console.log(timeStamp() + 'Logging an object:');
                console.log(text); // not a string value
            }
        }
        //if (location.host == 'localhost' && typeof(text) == 'string') {
            //$('#showMessage').show();
            var html = timeStamp() + text + '<br>';
            var $selector = $('.adminMessage', $widgetContainer);
            if($selector.length != 0) {
                $selector.append(html);
                return;
            }
            $selector = $('.smartSearch', $widgetContainer)
            if($selector.length != 0) {
                $('<div class="adminMessage"></div>').append(html).prependTo($selector);
            }
            else {
                $('<div class="adminMessage"></div>').append(html).prependTo($widgetContainer);
            }
        //}
    }
 	function geoSelected() {
    	//$('#distanceField').insertAfter($('#distanceInNear'));
    }
    
    function filterULSelect(locationFilter) {
        // This function could eventually replace $(".filterUL li").click(function(e)

        $(".filterUL li").removeClass("selected");
        //$(this).addClass("selected");

        //$("#filterClickLocation .filterSelected").html($(this).text()).data('selected', $(this).data('id'));

        // Might not be in use anymore
        //$("#locationDD option[value='" + locationFilter + "']").prop("selected", true).trigger("change");
    }

 	function locationFilterChange(selectedValue) {
	    $("#distanceField").hide();
	    //$("#coordFields").hide(); // TEMP
	    $("#zipFields").hide();
	    $(".countyListHolder").hide();
        //hideCounties();
	    $("#cityFields").hide();

	    console.log("locationFilterChange: " + selectedValue);

	    if (selectedValue == 'all') { // its entire state
	        if(useCookies) {
	            //Cookies.set('searchParams', { 'useCurrent': null, 'locationDD': 'all' });
                Cookies.set('searchParams', { 'useCurrent': null, 'locationDD': 'all' });
	        }
	        //activateEntireState();
	        $("#zip").val('');
            $('.goSearch').trigger("click");
	    }

	    if (selectedValue == 'current') { // its My Current location, set cookie useCurrent=1
            $("#distanceField").show();
	        activateMyLocation();
	        if(useCookies) {
	            Cookies.set('searchParams', { 'useCurrent': '1', 'centerlat': $(".mylat").val(), 'centerlon': $(".mylon").val(), 'locationDD': selectedValue });
	        }
	        geoSelected();
	    }

	    if (selectedValue == 'custom') { // its other location, set cookie useCurrent=0
	        $("#coordFields").show();
            $("#distanceField").show();
	        //$('#latLonFields').show();
	        if(useCookies) {
	            Cookies.set('searchParams', { 'useCurrent': '0', 'centerlat': $("#lat").val(), 'centerlon': $("#lon").val(), 'locationDD': selectedValue });
	        }
	        geoSelected();
	    }

	    if (selectedValue == 'zip') {
	    	//$("#distanceField").show();
	        $("#zipFields").show();
	        if(useCookies) {
	            var cokSearchParam = Cookies.set('searchParams');
	            if (typeof (cokSearchParam) != 'undefined' && typeof (cokSearchParam.zip) != 'undefined') {
	                $("#zip").val(cokSearchParam.zip);
	            }
	            Cookies.set('searchParams', { 'useCurrent': '0', 'centerlat': $("#lat").val(), 'centerlon': $("#lon").val(), 'locationDD': 'zip' });
	        }
	    }
	    if (selectedValue == 'county') {
            showCounties();
	    }
	    if (selectedValue == 'city') {
	        $("#cityFields").show();
	        if(useCookies) {
	            //var cokSearchParam = Cookies.set('searchParams');
                var cokSearchParam = Cookies.get('searchParams');
	            if (typeof (cokSearchParam.city) != 'undefined') {
	                console.log(cokSearchParam.city);
	                $("#cities").val(cokSearchParam.city.split(','))
	            }
	            //Cookies.set('searchParams', { 'useCurrent': '0', 'centerlat': $("#lat").val(), 'centerlon': $("#lon").val(), 'locationDD': 'city' });
	           Cookies.set('searchParams', { 'useCurrent': '0', 'centerlat': $("#lat").val(), 'centerlon': $("#lon").val(), 'locationDD': 'city' });
            }
	    }
	}

	// EVENT HANDLERS - BUTTON CLICKS

	$('#keywordsTB').click(function(event) {
        $("#filterClickLocation .filterBubbleHolder").hide();
		$("#showAdvanced").hide();
		$("#hideAdvanced").show();
		$(".fieldSelector").show();
	});
    function hideFieldSelector() {
        $("#hideAdvanced").hide();
        $("#showAdvanced").show();
        $(".fieldSelector").hide();
    }
	$('#hideAdvanced').click(function(event) {
		hideFieldSelector();
	});

    $('.expandFromIFrame').click(function(event) {
        //window.parent.location.href = window.location.href;

        // Open in new tab
        var win = window.open(window.location.href, '_blank');
        win.focus();
    });
     
	$('#keywordsTB').click(function(event) {
		if ($("#showAdvanced").is(':visible')) {

			//$("#showAdvanced").hide();
			//$("#hideAdvanced").show();
			//$(".fieldSelector").show();
		}
		event.stopPropagation(); // Prevent advanced from closing
	});
    $('.logisticsCat').click(function(event) {
        if (location.host == 'localhost' || location.host == 'review.georgia.org') {
            //$('.logisticsCat').hide();
            //$('.catDisplay').show();
        }
    });
    if (location.host == 'localhost' || location.host == 'review.georgia.org') {
        $('.catDisplayField').show();
        $('.categoriesLogistics').hide();
    }
    if (location.host == 'localhost' || location.host == 'review.georgia.org') {
        $('.sitesourceHolder').show();
    }
    if (location.host == 'localhost' || location.host == 'review.georgia.org' || location.host == 'intranet.georgia.org') {
        if (params["embed"] != "1") {
            $('.layerContentHide').show();
        }
    }
    if (params["embed"] == "1") {
        $(".mapBarButtonsRight").append($(".threeDotNav"));
        $(".threeDotNavClick").addClass("topButton");
        $(".threeDotNavClick").removeClass("threeDotNavClickFixedTopBar");
        $(".threeDotNav").css("float","right");

        $(".fixedTopBar").hide();
        $("#siteHeader").hide();
        $(".siteHeaderSpacer").hide();
        $(".primaryHeader").hide();
    } else {
        $('.sitemodeHolder').show();
    }
	$('#hideHoneycomb').click(function(event) {
		$("#honeycombPanel").hide();
	});

	//$("input[name='findWhat']").change(function(){
	$('#findLocation').click(function(event) {
	    if($('#findLocation').prop('checked')){
	    	$("#findLocationWith").show();
	    } else {
	    	$("#findLocationWith").hide();
	    }
	});
    $('.threeDotNavClick').click(function(event) {
        //hideOtherPopOuts();
        $('#upperRightIcons').show();
        $(".navTopRight").show();
        $(".rightTopMenu").show();
        event.stopPropagation();
    });

    $('.contactUs').click(function(event) {
        //window.location = "http://www.georgia.org/about-us/contact-us/";
        window.open('http://www.georgia.org/about-us/contact-us/','_blank');
        event.stopPropagation();
    });
    $('.addthis_button').click(function(event) {
        window.location = "https://www.addthis.com/bookmark.php?v=250&amp;pub=xa-4a9818987bca104e";
        event.stopPropagation();
    });

    function hideOtherPopOuts() {
        $('.accountPanelClose').trigger("click");
        hideSettings();
    }
    $('.showSettings').click(function(event) {
        //$('.hideMetaMenuClick').trigger("click"); // Caused .mapBarLeft to appear.
        
        hideOtherPopOuts();
        $("#showSettings").hide();
        $(".showSettings").hide(); // If used, would need to redisplay after changning Style > Header Images
        $(".showSettingsClick").hide();
        $(".hideSettings").show();
        //$('#hideLocationsMenu').trigger("click"); // Causes left side navigation menu to appear.
        $(".settingsPanel").show();
        //alert("showSettings Done");
    });
    function hideSettings() {
        $(".hideSettings").hide();
        $(".showSettings").show();
        $(".showSettings").show();
        $(".showSettingsClick").show();
        $(".settingsPanel").hide();
    }
    $('.hideSettings').click(function(event) {
        hideSettings();
    });

    $('.showAccount, .logoutAccount').click(function(event) {
        if ($(".moduleJS").width() <= 800) { // Narrow
            $('.hideApps').trigger("click"); // For mobile
        }
        $('.hideSettings').trigger("click");
        $(".smartPanel").show(); // Not sure why this is hidden. Wasn't occuring on localhost.
        $(".showAccount").hide();
        //$(".hideAccount").show(); // hideAccount can be eliminated.
        $(".accountPanel").show();
    });
    $('.accountPanelClose').click(function(event) {
        //$(".hideAccount").hide();
        //$(".showAccount").show(); // Bug, this caused menu item to appear when closing settings.
        $(".accountPanel").hide();
    });

	$('#toggleDirectory').click(function(event) {
		toggleDirectory(); /* Resides in /maps */
	});

    $('.zoom-in').click(function(event) {
        alert("zoom-in");
        $('.leaflet-control-zoom-in').hide();
        $('.leaflet-control-zoom-in').trigger("click");
    });
    $('.zoom-out').click(function(event) {
        alert("zoom-out");
        $('.leaflet-control-zoom-out').trigger("click");
    });

    $('.hideList, .hideLegend, .hideLayers').click(function(event) {
        $("#mapTabsPanel").removeClass("rightPercent");
        hideList();
    });

    $('.hideList').click(function(event) {
        //$('.listPanelRows').hide();
        //$('.listHeader').hide();
        //$('.hideList').hide(); // When deleting this line, also delete .hideList show lines.
        $('.showList').show(); // Button
        $('.hideGrid').trigger("click");
        $('.hideDirectory').trigger("click");
    });
    $('.toggleListOptions').click(function(event) {
        if ($('.toggleListOptions').hasClass("expand")) {
            $('.toggleListOptions').removeClass("expand");
            $('.listOptions').hide();
        } else {
            $('.toggleListOptions').addClass("expand");
            if ($(".listPanel").is(':visible')) {
                $('.listOptions .hideList').show();
            } else {
                $('.listOptions .hideList').hide();
            }
            $('.listOptions').show();
        }
        event.stopPropagation();
    });
    $('.toggleListFormats').click(function(event) {
        if ($('.toggleListFormats').hasClass("expand")) {
            $('.toggleListFormats').removeClass("expand");
            $('.listFormats').hide();
        } else {
            $('.toggleListFormats').addClass("expand");
            $('.listFormats').show();
        }
        event.stopPropagation();
    });
    $('.moveListBelow').click(function(event) {
        //$('.besideLeftHolder').insertAfter($('#mapPosition'));
        //$('.afterMap').append($('.besideLeftHolder'));
        $('.afterMap').append($('.listPanel'));

        //$('.listPanelPercent').hide();
        //$('.besideLeftHolder').css('min-width','100%');
        $('.primaryRows').css('max-height','auto');

        //$('.listPanelPercent').addClass('listPanelPercentMax');

        $('.listPanel').show();
        //$('.besideLeftHolder').show();
        $('.moveListBelow').hide();
        $('.moveListBeside').show();
        $('.besideLeftHolder').hide();

        // Close
        $('.toggleListFormats').removeClass("expand");
        $('.listFormats').hide();

        $('.showList').hide();
        $('.hideList').show();
        $('.showDirectory').removeClass("active");
        if ($(".moduleJS").width() > 800) {
            $('html,body').animate({
                scrollTop: $(".listPanel").offset().top - $("#siteHeader").height()
            });
        }
        map.invalidateSize(); // Force Leaflet map to resize when list is removed - Add tiles when more of map becomes visible.

        event.stopPropagation();
    });
    $('.moveListBeside').click(function(event) {
        $('.listPanel').insertAfter($('.listPanelPosition'));


        $('.listPanelPercent').show();
        $('.listPanel').show();
        $('.besideLeftHolder').show();
        $('.listPanelHolder').show();
        $('.moveListBeside').hide();
        $('.moveListBelow').show();
        $('.showList').hide();
        $('.hideList').show();
        $('.toggleListFormats').trigger("click");
        event.stopPropagation();
    });

    $('.showCounties').click(function(event) { // Not available to countyText click
        showCounties();
    });
    $('.showOutlines').click(function(event) {
        $('.showOutlines').hide();
        $('.hideOutlines').show();
        countyMap();
    });

    $('.showLegend').click(function(event) {

        deselectMenusAndTabs();
        mapbuttonsNeutral();
        $('.showLegend').hide();
        $('.hideLegend').show();
        $('.hideLayers').hide();
        $('.showLayersTab').show();

        // BUGBUG - Need to check for map to load

        // Move legend into tabs
        //$("div.cartodb-legend-stack").addClass("cartodb-legend-stack-move");
        //$('div.cartodb-legend-stack').insertAfter($('#cartodb-legend-stack-position'));
        
        //$('div.cartodb-legend-stack').show();

    });


    $('.expandFromWidget').click(function(event) {
        $('.expandFromWidget').hide();
        // Same as expandFromIFrame()
        // Open in new tab
        var win = window.open(window.location.href.replace("/widget.html","/one.html").replace("/widget-local.html","/one.html"), '_blank');
        win.focus();       
    });

    $('.showVideo').click(function(event) {
        setTimeout(function(){ // After shown by changeLayer
            //$('.hideLayers').trigger("click");
        }, 100);
        event.stopPropagation();
    });
    $('.showLayersMapBar').click(function(event) {
        $('.showLayersMapBar').hide();
        $('.hideLayersMapBar').show();

        // Added
        $('.showOverlays').trigger("click");
        
        return;


        // No longer functioning in widget-local - delete the rest
        if (params["navbymap"] == "1") {
            $('.tabSections').show();
        } else {
            $('.showLayerMenu').trigger("click");
        }
    });
    $('.hideLayersMapBar').click(function(event) {
        $('.hideLayersMapBar').hide();
        $('.showLayersMapBar').show();

        $('.hideMainMenu').trigger("click");

        return;

        //$('.tabSections').hide();
    });
    $('.showLayers, .sectionTitle, .showLayersTab, .navTopTitle, .forwardArrowInBar').click(function(event) {
        
        if ($(".tabSections").is(':visible')) {
            $('.hideLayersMapBar').trigger("click");
        } else {
            $('.showLayersMapBar').trigger("click"); // Avoiding .showSectionMenu since appears above in widget-local.html
        }
        return;




        // No longer used
        console.log("show layers");
        if ($("#layerBox").is(':visible')) { // .layerTitleAndArrow toggle
            $('.hideLayers').trigger("click");
            return;
        }
        //$(".layerContent").css('overflow', 'auto');

        $('.hideMetaMenuClick').trigger("click");
        mapbuttonsNeutral();
        $('.showLayers').hide();
        $('.showLayersMapBar').hide();
        $('.leftPop').hide();
        
        $('.showLayersTab').hide();

        //$(".rightPanelBucket").hide();
        $('.tabSections').show(); // For widget-local.html
        $('#layerBox').show();
        $('.navTopExtras').show();

        //$(".mapbuttons").css('float', 'left');

        if ($(".cartodb-legend").is(':visible')) { 
           //$('.showLegend').show();
        }
        if (!$("#layerBoxInner").is(':visible')) { // Only columize once
            //alert("columize");
            $("#layerBoxInner").show();
        }
        //$(".cartodb-legend-stack").hide();
        updateOffsets();

        if ($(".moduleJS").width() > 800) {
            //$(".navTopLeftWidth").addClass('navTopLeftWidthWide');
        }
        $(".navTopTitleText").css("padding-left","18px");
        $('.showSearchClick').trigger("click");
        //alert('.showSearchClick');
    });

    $('.sectionProviderTitle').click(function(event) {
        //might be used to load layer list into header.
        
       
    });
    $('.hideLayers').click(function(event) { // X on layers box.
        $('.hideLayers').hide();
        $('.hideAllSections').hide();
        $('.showLayerMenuButton').show(); $('.showSectionMenu').css("margin-left", "0px");
        $('.hideLayerMenuButton').hide();
        $('.showLayers').show();
        $('.leftPop').hide();
        $('.showLegend').hide();
        $(".navTopLeftWidth").removeClass('navTopLeftWidthWide');
        $(".layerSideNavHolder").hide();
        $('.showLayersMapBar').show();
        //$('div.cartodb-legend-stack').insertAfter($('.cartodb-tooltip'));
        //$('div.cartodb-legend-stack').removeClass("cartodb-legend-stack-move");
        //$('.cartodb-legend-stack').show();
        //$(".layerContent").css('overflow', 'visible');
        $(".navTopTitleText").css("padding-left","3px")
    });


	$('#addLayer').click(function(event) {
		alert("Not yet implemented.");
	});

	function hideExtrasPanel() {

	}

	 // EVENT HANDLERS - FILTERS
	$("#filterClickCategory").click(function(event) {
		$("#filterClickLocation .filterBubbleHolder").hide();
		$("#filterClickCategory .filterBubbleHolder").toggle();
		event.stopPropagation();
	});
	$("#filterClickLocation").click(function(event) {
        //$('.hideMetaMenuClick').trigger("click"); // Otherwise covers location popup. Problem: hides hideLayers/hideLocationsMenu.
		if ($("#showLocations").is(':visible')) {
            hideFieldSelector();
			$("#showLocations").hide();
			$("#hideLocations").show();
		} else {
            $("#showLocations").show();
			$("#hideLocations").hide();
		}
		$("#filterClickLocation .filterBubbleHolder").toggle();

		//$("#filterClickCategory .filterBubbleHolder").hide();
		
		event.stopPropagation();
	});

	$(".filterBubbleHolder").click(function(e) {
		e.stopPropagation(); // Prevent bubble from closing
	 });
    
	$(".filterUL li").click(function(e) {
		$(".filterBubbleHolder").hide();
		e.preventDefault();
		$(".filterUL li").removeClass("selected");
		$(this).addClass("selected");
		//$(".filterSelected").html($(this).text() + '<i class="entypo-down-open" style="font-size:13pt"></i>');
		$("#filterClickLocation .filterSelected").html($(this).text()).data('selected', $(this).data('id'));
		$("#locationDD option[value='" + $(this).data('id') + "']").prop("selected", true).trigger("change");
		
		$("#locationStatus").hide();

		locationFilterChange($(this).data('id'));
		e.stopPropagation(); // Prevents click on containing #filterClickLocation.
	 });

	$(".showMultiselect").click(function(event) {
		$(".showMultiselect").hide();
		$(".hideMultiselect").show();
		$(".iconCheckbox").show();
        $('.showCats').trigger("click");
		$("#sectionCategories .sectionCat input").show();
        event.stopPropagation();
	});
	$(".hideMultiselect").click(function(event) {
		$(".hideMultiselect").hide();
		$(".showMultiselect").show();
		$(".iconCheckbox").hide();
        $('.showCats').trigger("click");
		$("#sectionCategories .sectionCat input").hide();
        event.stopPropagation();
	});
    $(".showEmbedTag").click(function(event) {
        var win = window.open('widget.html#aerospace', 'widget_window');
        if(win){
            //Browser has allowed it to be opened
            win.focus();
        }else{
            //Broswer has blocked it
            alert('Please allow popups for this site.');
        }
        return;
        if (!$(".embedTag").is(':visible')) {
            $(".embedTag").show();
        } else {
            $(".embedTag").hide();
        }
    });
	$("#sectionCategories").click(function(event) {
		event.stopPropagation();
	});

    $( "#bt" ).change(function() {
        setButtonDisplay($("#bt").val());
        Cookies.set('bt', $("#bt").val());
    });

	// Click anywhere, click off
	$(document).click(function () { 
		$(".filterBubbleHolder").hide();
        //$(".accountPanel").hide();
        //$(".settingsPanel").hide();
        $(".floatBox").hide();
        $(".listOptions").hide(); $('.toggleListOptions').removeClass("expand");
        $(".listFormats").hide(); $('.toggleListFormats').removeClass("expand");
        $(".leftPop").hide();
        //$(".catDisplay li ul").hide(); // This caused logistics menu to hide when clicking item with no children.

        $("#upperRightIcons").hide();
        //$(".smartSideMenuHolder").hide(); // BugBug - hides when initially clicking showApps
        $(".rightTopMenu").hide(); 
        $('.threeDotNavClick').show();

        $("#rowsIcons").hide();
	});
    $("#filterPanel").click(function () { // Since clickThrough is blocked to prevent clicking video.

          //hideFieldSelector();
          $(".filterBubbleHolder").hide();
        
    });
	$(window).on('hashchange', function() { // Refresh param values when user changes URL after #.
		param = loadParams(location.search,location.hash);	  
	});
});
}

function activateMyLocation() {
    $('#latLonFields').show();
    getLatLonFromBrowser();
}
function getLatLonFromBrowser() {
    // For when Leafet/Carto map is not in use.
    console.log("Refresh Latitude and Longitude");
    //if (chkGeoPosition) {
        // Get latitude and longitude
        $("#currentButtons").hide();
        if (navigator.geolocation) { // Browser supports lookup
            //Show loading icon
            $("#loadingLatLon").html('<div style="overflow:auto;margin-right:10px"><img src="img/ajax-loader.gif" alt="Geo Loading" title="Geo Loading" style="width: 18px;float:left;margin:6px 6px 0 0" /><div style="float:left;line-height:40px">Loading GeoLocation</div></div>');
            $("#loadingLatLon").show();

            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position.coords.latitude.toFixed(3));
                $("#lat").val(position.coords.latitude.toFixed(3));
                $("#lon").val(position.coords.longitude.toFixed(3));
                $(".mylat").val(position.coords.latitude.toFixed(3));
                $(".mylon").val(position.coords.longitude.toFixed(3));
                distanceSearchType = 'latlon';

                $("#loadingLatLon").hide();
                $("#currentButtons").show();
                $('#searchText').show();
                $('.goSearch').trigger("click");
            }, function (error) {
                console.log(error);
                writeConsole('geolocation error occurred. Error code: ' + error.code);
                $("#loadingLatLon").html('Unable to fetch your geolocation.');
                $('#searchText').hide();

                // error.code 2 occured when disconnected.
                //alert(error.code);
                //loadPageAsync(jsonFile);       
            });
            //alert('Break page'); // CAUTION - Putting an alert here breaks page.
        }
        if (!$("#lat").val()) {
            //alert("Approve geocoding at the top of your browser.");
        }
        //chkGeoPosition = false;
    //}
}

function mapbuttonsNeutral() {
    if ($(".hideList").is(':visible') || $(".showList").is(':visible')) {
        //$('.hideList').hide(); // Commented out because hides X within listHeader handle.
        if (!$(".listPanelRows").is(':visible')) {
            $('.showList').show();
        }
    }
    if ($(".hideDetails").is(':visible') || $(".showDetails").is(':visible')) {
        $('.hideDetails').hide();
        $('.showDetails').show();
    }
    //if ($(".cartodb-legend-stack").is(':visible')) {
    if ($(".cartodb-legend").is(':visible')) { 
        $('.hideLegend').hide();
        //$('.showLegend').show();
    }
    $('.hideLayers').hide();
    $('.showLayers').show();
    // Activate if show legend in tabs
    //$("div.cartodb-legend-stack").hide();
    //$(".tabSections").show();
}

function pushWithoutDup(theArray, theAddition) {

    // Works
    //if ($.inArray(theAddition,theArray)==-1) {
    //    theArray.push(theAddition);
    //}

    // Temp - clear, then push so display= is only one value.
    displayOptions = [];
    displayOptions.push(theAddition);
}

function updateURL(layerName) {
    // Delete all the calls to updateURL. Now using updateTheURL with goSearch and side nav change.
}
function updateTheURL(layerName) {
    if (layerName == "") {
        layerName = getLayerName();
    }
    console.log("updateTheURL " + layerName + " location.hash: " + location.hash);
    //alert("updateTheURL " + layerName + " location.hash: " + location.hash);

    var fieldValue = '';
    var index = 0;
    //var params = null;

    var hashOut = gethashArray(); // Include all existing
    //var hashOut = {};

    // pageLoadParams: url params to use for the initial page load. If not defined,
    // pull from search fields and cookies
    if(typeof(pageLoadParams) == 'undefined') {

        /*
        params = loadUrlValues();

        // Clear any values from the querystring so that they aren't included in the updated search.
        for(var key in params) {
           //if(key != 's' && key != 'db' && key != 'localhost') {
              delete params[key];
           //}
        }
        */

        if (layerName != "") {
            hashOut.section = null; // Omit section when layer exists
        }

        // ID uses div with display:none
        if ($('.cid').text()) {
            //alert("cid text exists, include in hash " + $('.cid').text());
            hashOut.cid = $('.cid').text();
        } else {
            hashOut.cid = null;
        }
        // Letter uses hidden input field
        if ($('.letter').val() && !$('.cid').text()) {
            hashOut.letter = $('.letter').val();
        } else {
            hashOut.letter = null;
        }
        var selectedSearchType = $("#locationDD").val();
        hashOut.lat = "";
        hashOut.lon = "";
        hashOut.distance = "";
        switch(selectedSearchType) {
            case 'zip':
                //if (distanceSearchType == 'zip') {
                    hashOut.zip = $('#zip').val();
                    //hashOut.distance = $("#distance").val();
                //}
                break;

            case 'current':
            case 'custom':
                // Occurs when "nearby" selected

                //if (distanceSearchType == 'latlon') {
                    //hashOut.lat = Number($("#lat").val()).toFixed(3).toString();
                    //hashOut.lon = Number($("#lon").val()).toFixed(3).toString();
                    if (selectedSearchType == 'custom') {
                        if ($.trim($("#lat").val()) == '' || $.trim($("#lon").val()) == '') {
                            $("#lat").val('34.397');
                            $("#lon").val('-83.644');
                        }
                    }
                    hashOut.lat = $("#lat").val();
                    hashOut.lon = $("#lon").val();
                    hashOut.distance = $("#distance").val();
                //}
                break;

            case 'county':
                if ($("#countyids option:selected").length > 1) {
                    $("#countyids option:first").prop("selected", false);
                }
                fieldValue = $('#countyids').val(); // multi-select
                if (fieldValue != null) {
                    index = fieldValue.indexOf("0");
                    if (index >= 0) {
                        fieldValue.splice(index, 1); // remove the default value if selected
                    }
                    if (fieldValue.length > 0) {
                        hashOut.countyids = fieldValue.join(',');
                    }
                    if(useCookies) {
                        var cokSearchParam = Cookies.set('searchParams');
                        cokSearchParam.county = hashOut.countyids;
                        Cookies.set('searchParams', cokSearchParam);
                    }
                }
                break;

            case 'city':
                if ($("#cities option:selected").length > 1) {
                    $("#cities option:first").prop("selected", false);
                }
                fieldValue = $('#cities').val(); // multi-select
                if (fieldValue != null) {
                    index = fieldValue.indexOf("");
                    if (index >= 0) {
                        fieldValue.splice(index, 1); // remove the default value if selected
                    }
                    if (fieldValue.length > 0) {
                        hashOut.cities = fieldValue.join(',');
                    }
                    if(useCookies) {
                        var cokSearchParam = Cookies.set('searchParams');
                        cokSearchParam.city = hashOut.cities;
                        Cookies.set('searchParams', cokSearchParam);
                    }
                }
                break;

            default:

        } // end locationSearchType switch

        if ($('#latLonOnlyCB').prop('checked')) {
            hashOut.latlononly = '1';
        }

        if ($('#propertiesCB').prop('checked')) {
            fieldValue = $('#minsize').val();
            if (fieldValue != '') {
                hashOut.minsize = fieldValue;
            }
            fieldValue = $('#maxsize').val();
            if (fieldValue != '') {
                hashOut.maxsize = fieldValue;
            }
            fieldValue = $('#ceiling').val();
            if (fieldValue != '') {
                hashOut.ceiling = fieldValue;
            }
        }

        if ($('#companiesCB').prop('checked') || $('#internationalCB').prop('checked')) {
            $('#sectionManufacturers input[type="checkbox"]:checked').each(function (index, item) {
                if (typeof (hashOut.naics) == 'undefined') {
                    hashOut.naics = '';
                }
                hashOut.naics += $(this).val() + ',';
            });
            if(typeof(hashOut.naics) != 'undefined' && hashOut.naics.length > 1) {
                hashOut.naics = hashOut.naics.substr(0, hashOut.naics.length - 1); // remove trailing comma
            }
        }

        fieldValue = $('#keywordsTB').val();
        if (fieldValue == 'Search') {
            fieldValue = '';
        }
        if (fieldValue != '') {
            hashOut.keywords = fieldValue;
            console.log("fieldValue " + fieldValue);
        } else {
            hashOut.keywords = '';
        }
        
        

        var searchTitle = displayLocText();

        // Create a copy of the params so the history version can be customized while leaving the params unchanged.
        var historyParams = $.extend({}, params);

        /*
        if(typeof(historyParams.tid) != 'undefined' && historyParams.tid.indexOf(',') == -1) {
            var go = '';
            switch(historyParams.tid) {
                case '16470':
                    go = 'shovel-ready';
                    break;
                case '16400':
                    go = 'buildings';
                    break;
                case '31030':
                    go = 'manufacturers';
                    break;
                case '30080':
                    go = 'international';
                    break;
            }
            if(go.length > 0) {
                historyParams.item = go;
                delete historyParams.tid;
            }
        }
        */

        // Later we may allow for comma seperted by removing "else" from if's below.
        if ($("#hideMap").is(':visible')) {
            pushWithoutDup(displayOptions, "map");
        }
        // No longer reliable
        //else if ($(".hideGrid").is(':visible')) {
        //    pushWithoutDup(displayOptions, "grid");
        //}
        else if ($(".hideDirectory").is(':visible')) {
            //pushWithoutDup(displayOptions, "directory");
            pushWithoutDup(displayOptions, ""); // Omit by default
        }
        
        hashOut.display = displayOptions.join(",");

        hashOut.categories = $('.' + layerName + 'Cat').val();
        hashOut.designation = $('.' + layerName + 'Designation').val();

        //hashOut.sitelook = $('#sitelook').val();

        // Remove blank attributes
        for (var i in hashOut) {
          if (hashOut[i] === null || hashOut[i] === undefined || hashOut[i] === '') {
          // hashOut[i] === undefined is probably not very useful here
            delete hashOut[i];
          }
        }
        var historyHash = "";

        // HACK, needs different process for changing hash values.
        //if (window.location.hash.indexOf("&") >= 0) {
            // "&" in the hash, so user has requested other than the layer name.
            historyHash = $.param(hashOut);
            // This will need more work because user may be seeking other alternative hash value.
            // BugBug - Hash editing is otherwise currently ignored.
        //}
        

        var queryString = '';

        //if (location.host.indexOf('localhost') > -1) {
        //    queryString = buildLocalhostQueryString(historyParams);
        //}
        //else {
            if ($.param(historyParams)) {
                //queryString = "?" + $.param(historyParams);
            }
        //}

        // Append the current hash value
        // Carry forward the #hash vale

        //alert("historyHash: " + historyHash);

        if (layerName && layerName != "main" && historyHash) {
            queryString += "#" + layerName + "&" + historyHash;
        } else if (layerName && layerName != "main") {
            queryString += "#" + layerName;
        } else if (historyHash) {
            queryString += "#" + historyHash;
        }

        //alert("queryString: " + queryString);
        if ($.param(historyParams)) {
            //queryString += "" + $.param(historyParams);
        }

        
        console.log("Existing URL: " + window.location.pathname + window.location.search + window.location.hash)

        if (window.location.search + window.location.hash != queryString) {
            ignoreHistoryStateChange = true;
            // Set URL variable. Note that pushState() won't cause a hashchange event to be fired, even if the new URL differs from the old URL only in its hash.
            var pathname = window.location.pathname;
            if (window.location.pathname.length > 1) {
                pathname = "/site/"; // Exits separate single page apps.
            }
            console.log("Yes, updateURL to: " + pathname + queryString);
            // Problem - Won't update hash if already visited in history.
            //History.pushState("", searchTitle, window.location.pathname + queryString);

            // history.replaceState('data to be passed', 'Title of the page', 'http://stackoverflow.com/test');

            // WORKS - but change is not triggered from backing up from hash to no hask.  But backup issue might be fixable by detecting when has emptied and running changeLayer using "go" from page's parameters.
            window.history.pushState("", searchTitle, pathname + queryString);

            // Attempt to support backing up to page without hash. No luck.
            //alert();
            //window.history.pushState(, searchTitle, pathname + queryString);

            //console.log("Hash after history.pushState: " + location.hash);

            //History.pushState(historyParams, searchTitle, queryString); // Uses history.js
            ignoreHistoryStateChange = false;
        }
    } // end if - pageLoadParams is undefined
    else {
       params = pageLoadParams; // url params from the initial page load
       displayLocText();
    }

    /*
    var feeds = [];
    var feed = null;

    feed = getLocationAndBuildingFeed(params);
    if (feed != null) {
        feeds.push(feed);
    }

    if (typeof(sliderValues) != 'undefined' && sliderValues.fbPlace == 'on') {
        feed = getFacebookFeed(params);
        if (feed != null) {
            feeds.push(feed);
        }
    }
    */

}
// End SubmitPage

function adjustPrimaryHeader() {
    $('.primaryHeader').css("min-height", "0px");
    $('.primaryHeader').css("padding-bottom", "50px");
    $(".primaryStats").hide();
}

function setButtonDisplay(buttons) {
    if (buttons == "12") { // Overview first
 
    } else if (buttons == "21") { // Directory first
        $(".layoutTabHolder").append($(".directoryButton"));
                
    } else if (buttons == "01") { // Overview only
        $("#iframeHolder").hide();
    } else if (buttons == "02") { // Directory only
        
    }
}

function gridMenu() {
    var obj = {"ircEvent": "PRIVMSG", "method": "newURI", "regex": "^http://.*"};
    for (var key in obj) { // ECMAScript 3+ for older browsers.
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var val = obj[key];
            // use val
            alert(val);
        }
    }
}
function loadDirectory(cartodb_id,currentLayer,siteObject) {
    var layout = "directory";
    if (cartodb_id > 0) {
        layout = ""; // Details
    }
    console.log("Call loadGrid for directory from loadDirectory for " + currentLayer + " id: " + cartodb_id);
    loadGrid(cartodb_id,currentLayer,siteObject,layout);
}

function hotelList() {
            
    var showData = $('#show-data');
    var html = "";
    // location=47.6063889,-122.3308333&radius=5km
    // dates=2016-05-19,2016-05-22& // Must be current
    var theData = "http://terminal2.expedia.com/x/hotels?location=33.7490,-84.3880&radius=5km&apikey=VwR0wnXC7trA3L6iPxYvZBi254YyGM4v";

    $.getJSON(theData, function (data) {
      //console.log(data);
      console.log(data.HotelInfoList);

      /*
      var json_obj = $.parseJSON(data);//parse JSON
        
        var output="<ul>";
        for (var i in json_obj) 
        {
            console.log('ok';
            output+="<li>" + json_obj[i].Language + ",  " + json_obj[i].ID + "</li>";
        }
        output+="</ul>";
        
        $('#show-data').html(output);
        */

        var links = data.HotelInfoList.HotelInfo;
        
        for(var key in links) {

                var hotel = links[key];

                html += '<div style="width:205px;float:left;padding-left:12px;margin-top:7px;">';
                if (hotel.ThumbnailUrl) {
                    html += '<img src="' + hotel.ThumbnailUrl.replace("_t.jpg","_l.jpg") + '" style="width:180px;margin-bottom:16px" />'; 
                } else {
                    html += '&nbsp;';
                }
                html += '</div>';
                html += '<div style="overflow:auto;padding-right:10px;margin-top:7px;margin-bottom:14px;font-size:10pt">';

                    html += (parseInt(key) + 1) + '. ';
                    

                    html += '<a href="' + hotel.DetailsUrl + '" target="_blank">' + hotel.Name + '</a><br />'; 
                    

                    html += hotel.Location.StreetAddress + ' ' + hotel.Location.City + ', ' + hotel.Location.Province + ' ' + hotel.Location.Country + '<br />';

                    html += "Star Rating: " + hotel.StarRating + ' &nbsp;';
                    html += "Guest Rating: " + hotel.GuestRating + ' &nbsp;';
                    //html += hotel.GuestReviewCount + ' Reviews'; 
                    html += '<br />'; 

                    html += '<div style="margin-top:7px">' + hotel.Description + '</div>'; 

                    for(var location in hotel.Location) {
                        //html += location + ': ' + hotel.Location[location] + '<br />';
                        
                    }

                    
                    // Latitude and Longitude
                    for(var geo in hotel.Location.GeoLocation) {
                        //html += geo + ': ' + hotel.Location.GeoLocation[geo] + '<br />'; 
                    }

                    // MORE DETAILS
                    /*
                    html += '<br />';
                    for(var detail in hotel) {
                        html += detail + ': ' + hotel[detail] + '<br />'; 
                    }
                    */
                html += '</div><hr style="clear:both; margin-bottom: 7px" />';
        }
       

        
        

      //var items = data.items.map(function (item) {
        /*
          var items = data.HotelInfoList.HotelInfo(function (item) {
            return item.key + ': ' + item.value;
          });

          showData.empty();

          if (items.length) {
            var content = '<li>' + items.join('</li><li>') + '</li>';
            var list = $('<ul />').html(content);
            showData.append(list);
          }
        */

        $('.listTable').html(html);
        $('.listPanelRows').show();
    });
}
function getWhere(siteObject,layerName,namefield,descriptionfield,addressfield,cityfield,table) {
    var goLayer = getGo(siteObject.items,layerName);
    if (typeof namefield === 'undefined') {
        namefield = 'name'; // For properties data
    }

    var queryWhereKeyword = "";
    if ($("#keywordsTB").length && $("#keywordsTB").val().trim().length > 0) {
        if (namefield) {
            queryWhereKeyword += " OR " + namefield + " iLIKE '%" + $("#keywordsTB").val() + "%'";
        }
        if (descriptionfield) {
            queryWhereKeyword += " OR " + descriptionfield + " iLIKE '%" + $("#keywordsTB").val() + "%'";
        }
        if (addressfield) {
            queryWhereKeyword += " OR " + addreesfield + " iLIKE '%" + $("#keywordsTB").val() + "%'";
        }
        if (cityfield) {
            queryWhereKeyword += " OR " + cityfield + " iLIKE '%" + $("#keywordsTB").val() + "%'";
        }
    }

    var queryWhere = "";
    if (queryWhereKeyword) {
        // To do: trim off OR instead.
        queryWhere = " AND (1=2" + queryWhereKeyword + ")" + queryWhere;
    }

    if ($('.letter').length && $('.letter').val()) {
        if (namefield) {
            queryWhere += " AND " + namefield + " iLIKE '" + $('.letter').val()+ "%'";
        }
    }
    if ($('#CompanyCountry').length) {
        if ($('#CompanyCountry').val()) {
            queryWhere += " AND custom4 iLIKE '%" + $('#CompanyCountry').val() + "%'";
        }
    }
    if ($('.' + layerName + 'Cat').length) {
        if ($('.' + layerName + 'Cat').val()) {
            queryWhere += " AND categories iLIKE '%" + $('.' + layerName + 'Cat').val() + "%'";
        }
    }

    if ($('.'+layerName+'-cat').length && $.trim( $('.'+layerName+'-cat').text() ).length ) { // Logistics categories
        var str_array = $('.'+layerName+'-cat').text().split(/\s*,\s*/); // loop through commas
        var catWhere = "";
        for(var i = 0; i < str_array.length; i++) {
            if (i > 0) {
                catWhere += ' OR ';
            }
            //catWhere += str_array[i];
            catWhere += " cat iLIKE '%" + str_array[i].replace(/\'/g,"").replace("Logistics Providers: ","") + "%'";
        }
        //alert(catWhere);

        queryWhere += " AND (" + catWhere + ")";
        //alert($('.' + layerName + '-cat').text());
    }
    if ($('.' + layerName + 'Designation').length) {
        if ($('.' + layerName + 'Designation').val()) {
            //queryWhere += " AND designation iLIKE '%" + $('.' + layerName + 'Designation').val() + "%'";
            queryWhere += " AND " + $('.' + layerName + 'Designation').val() + " = true";
        }
    }
    
    if ($('#zip').val() && $("#locationDD").val() == 'zip') {
        var startingPercent = "%";
        var zipfield = '';
        if (goLayer.zipfield) {
            zipfield = goLayer.zipfield;
        } else {
            startingPercent = "";
            zipfield = "zip";
        }
        if (zipfield != "none") {
            queryWhere += " AND " + table + "." + zipfield + " iLike '" + startingPercent + $('#zip').val() + "%'";
        }
    } else if ($(':checkbox[name=countyCB]:checked').length > 0 && $("#locationDD").val() == 'county') {
        var commaCounties = $.map($(':checkbox[name=countyCB]:checked'), function(n, i){
              return n.value;
        }).join(','); 
        // Values are wrapped with '' for IN statement. 
        // Caution, this will not work correctly if value already contains a comma.
        queryWhere += " AND " + goLayer.countyfield + " IN ('" + commaCounties.replace(/,/g, "','") + "')";
    } else if ($('#lat').length && $('#lon').length) {
        if ($('#lat').val() && $('#lon').val()) {
            //var lat = "33.778";
            //var lon = "-84.389";
            var lat = $('#lat').val();
            var lon = $('#lon').val();
            checkRequestedPoint(lat,lon);
            //var meters = "5000";
            if (layerName != "international") {
                var meters = $("#distance").val() * 1609.34;
                if (meters != 0) {
                    queryWhere += " AND ST_DWithin(" + table + ".the_geom::geography, ST_GeomFromText('POINT(" + lon + " " + lat + ")', 4326)::geography, " + meters + ")";
                }
            }
        }
    }

    if (queryWhere.length > 10) {
        // This will be moved up in this function to only appear when filter creates a subset of total.
        $('.showAllResults').show(); // "Show All" button.
    }

    if ($(".whereFilter").length && $(".whereFilter").val().trim().length > 0) {
        queryWhere += " AND (" + $(".whereFilter").val() + ")";
    }

    return queryWhere;
}
var loadGridAttempts = 0;
function loadGrid(cartodb_id,currentLayer,siteObject,layout) {
    loadGridAttempts++;
    if (loadGridAttempts > 8) {
        if (workoffline) return;
        var retVal = confirm("Unable to load map javascript.\nPlease check your connection.\n\nClick OK to reload the page.");
        if( retVal == true ){
          console.log("User clicked OK to reload after map javascript did not load.");
          window.location.reload();
          //return true;
        }
        else{
          console.log("User canceled when prompted to reload.");
          //return false;
        }
        return;
    }
    if (cartodb_id > 0) {
        $('.showAllResults').show(); // "Show All" button.
        //$(".rowCounts").text("");
        $("#pagination").hide(); // Since click does not advance details.
        $(".showList").show();
        //$("#hideGrid").show();
        $("#showGrid").show();
    } else {
        // Clear prior
        $("#rowsTotal").html("");
        $("#rowsIcons").html("");
        $("#rowsWrench").html("");
        $("#whereMesssage").html("");
    }
    if (currentLayer == "hotels" && cartodb_id <= 0) {
        hotelList();
        return;
    }
    console.log("loadGrid " + currentLayer + " / Layout: " + layout);
    // Fetch from JSON layers array.
    //alert("siteObject.items " + siteObject.items.length);
    var goLayer = getGo(siteObject.items,currentLayer);

    if (!goLayer.username) {
        console.log("LoadGrid canceled - No layer username.");
        return;
    }

       

    //gridMenu();
    //updateURL(currentLayer);
    //console.log("loadGrid " + cartodb_id);
	$("#gridMessage").html("<div style='padding:20px;font-size:15px'>LOADING GRID...</div>");
	if (typeof cartodb == 'undefined') {
		// Wait one second and try again.
		setTimeout(
		  function() 
		  {
		    //Try again
            console.log("Call loadGrid from loadGrid for " + currentLayer);
		    loadGrid(cartodb_id,currentLayer,siteObject)
		  }, 1000);
		if (location.host.indexOf('localhost') > -1) {
			console.log("No cartoDB yet. Wait 1 sec on loadGrid (localhost)");
		}
		return;
	}
    if (layout != "directory") { // Since displayMap also calls updateURL
        //updateURL(currentLayer); // Adds display=grid to URL
    }

	var username = goLayer.username;

	var table = "";
	var sql = cartodb.SQL({ user: username });

	var headers = [];
	var types = [];
	
    var page_len = 100;
    var cur_off = 0;
    var rows_tot = 0;

    var skips = ['cartodb_id', 'id', 'notes', 'the_geom', 'the_geom_webmercator', 'cartodb_georef_status', 'providerid', 'locationid', 'statusdesc'];

	var querySelect = "SELECT *";
	var querySelects = querySelect;
	var queryFroms = "";
	var queryFrom = " FROM " + currentLayer;
	var dbTable = currentLayer;
	var queryWhere = " WHERE 1=1";
	var queryOrder = " "; // Starts with ORDER BY
	if (goLayer.namefield) {
        queryOrder = " ORDER BY " + goLayer.namefield;
    }
    //queryOrder = " order by to_timestamp(created, 'MM/DD/YY HH:MI:SS') DESC";
	if (currentLayer == "nvarchar") {
		queryOrder = " order by to_timestamp(updated, 'MM/DD/YY HH:MI:SS') DESC";
	}
	
	if (goLayer.table){
		queryFrom = " FROM " + goLayer.table;
		dbTable = goLayer.table;
	}
	if (goLayer.where){
		queryWhere = " WHERE (" + goLayer.where + ")";
	}

    if (goLayer.orderby){
        queryOrder = " ORDER BY " + goLayer.orderby;
    }

	if (currentLayer == "international") {
		dbTable = "i";
		// i.the_geom_webmercator, i.cartodb_id, 
		// initcap(i.trade_styl || ' -- ' || i.line_bus) AS description
		// ORDER BY c1.updated DESC LIMIT 1
		var findMatch = "(SELECT MAX(c1.id) FROM companies1 c1 WHERE c1.name IS NOT NULL AND initcap(i.company) = c1.name) AS possibleAtlasID, ";
		findMatch = "";
        // For import
        // custom1 = international_title
        // custom2 = international_address
        // custom3 = international_city
        // custom4 = country
        // custom5 = international_zip_code
        // custom13 = foreign_company 'true'

        // Not including in international import.  CEO is available, but CEO is probably not saved as the contact for non-international Hoovers.
        // custom11 = contact_name
        // custom12 = job_title

        // Add back if companies1 contains these:
        //  
        // country
        // Did not work with ST_DWithin on map, but works when pasted in Carto.  companies1.the_geom_webmercator is needed.
        querySelects = "SELECT i.cartodb_id, i.duns_num databankid, companies1.databankid databankid_existing, companies1.id, " + findMatch + "initcap(i.company) AS name, initcap(i.trade_styl) trade_styl, replace(replace(replace(replace(replace(replace(replace(replace(initcap(i.line_bus),' And ',' and '),' Or ',' or '),' Of ',' of '), ' Except ', ' except '), ', Nsk',''), ', Nec',''), ', Ns',''), ', N','') AS description, i.line_bus, naics2012.description description_From_Naics, companies1.description old_atlas_description, initcap(i.addr) address1, i.addr_2 address2, initcap(i.city) city, i.state, i.zip, i.phone, initcap(i.u_company) custom1, companies1.custom1 old_atlas_international_title, initcap(i.u_addr) custom2, companies1.custom2 old_atlas_international_address, initcap(i.u_city) custom3, companies1.custom3 old_atlas_international_city, replace(replace(replace(replace(initcap(i.u_country),'Usa','USA'),'England','United Kingdom'),'Scotland','United Kingdom'),'Korea Rep Of','Korea') country, replace(replace(replace(replace(initcap(i.u_country),'Usa','USA'),'England','United Kingdom'),'Scotland','United Kingdom'),'Korea Rep Of','Korea') custom4, companies1.custom4 old_atlas_country, i.u_zip custom5, i.u_zip international_zip_code, companies1.custom5 old_atlas_international_zip_code, 'true' custom13, i.latitude lat, i.longitude lon, companies1.lat old_atlas_lat, companies1.lon old_atlas_lon, i.emp_here locationemploymentsize, companies1.locationemploymentsize old_atlas_locationemp, i.naicsprim naics, companies1.naics old_atlas_naics, companies1.created old_atlas_Created, companies1.createdBy old_atlas_CreatedBy, companies1.updated old_atlas_updated, companies1.updatedBy old_atlas_updatedBy, companies1.updatedBy, users_combo.username, overrideimport";
        queryFrom = "FROM international i LEFT JOIN companies1 ON i.duns_num::varchar(255) = companies1.databankid";
        queryFrom += " LEFT JOIN Naics2012 ON i.naicsprim = naics2012.naicsid";
        queryFrom += " LEFT JOIN users_combo ON companies1.updatedby = users_combo.userid";

		//alert(querySelects + " " + queryFrom);
    } else if (currentLayer == "dups") {
        dbTable = "c";
        queryFrom = "FROM companies1 c";
        // Dups

        queryWhere = " WHERE c.databankid IN (SELECT co.databankid from companies1 co GROUP BY co.databankID HAVING count(*) > 1) AND c.databankid != ''";
        queryOrder = " ORDER BY c.databankid, c.id";

        //queryWhere = " AND c.id IN (SELECT com.id FROM companies1 com WHERE com.databankid = c.databankid LIMIT 1 ORDER BY com.id)";
        
        // Did not work with count - Might have worked with alias after count
        //queryWhere = " WHERE c.databankid IN (SELECT com.databankid FROM companies1 com WHERE com.databankid = c.databankid AND com.databankid is not null AND com.databankid != '' order by com.id LIMIT 1) ";

        // http://stackoverflow.com/questions/3800551/select-first-row-in-each-group-by-group
        // -- change to MAX if you want the highest
        //queryWhere = " WHERE c.id IN (SELECT MIN(x.id) FROM companies1 x JOIN (SELECT p.databankid FROM companies1 p GROUP BY p.databankid) y ON y.databankid = x.databankid GROUP BY x.databankid, x.id)";

        // Worked with count, but retuned just one with grid.
        //querySelects = " SELECT c.* ";
        //queryWhere = " JOIN companies1 d on c.databankid = d.databankid AND c.databankid IS NOT NULL AND c.databankid != '' AND c.id > d.id";

        // Try this

        //queryOrder = " ORDER BY c.databankid, c.id";

        //$("#heroContent").css('min-height', '280px');

	}

	// Append space to end of select statement.
	querySelects = querySelects + " ";

	var queryFroms = queryFrom;

	

	//queryWhere += " AND companies1.updated IS NOT NULL AND companies1.updated != 'NULL'";
	//queryWhere += " AND (companies1.updated = 'NULL' OR companies1.updatedby = '6716' OR companies1.updatedby = '7170')";

	// Limits from 2082 to to 14 not edited
	//queryWhere += " AND companies1.updatedby != '6716'";
	//queryWhere += " AND companies1.updatedby != '7170'";

    if (cartodb_id > 0) {
		// i is TEMP, might parse query for first table in SELECT statement
		//queryWhere += " AND " + dbTable + ".cartodb_id = " + cartodb_id;
    } else if (currentLayer == "properties" || currentLayer == "propertiesold") {

        if ($('#FromXceligent').is(':checked')) {
            queryWhere += " AND (updatedby = '-1')";
            whereMesssage = "Listings from Xceligent.";
        } else if ($('#FromTVA').is(':checked')) {
            queryWhere += " AND (databankid iLIKE 'TVA%')";
            whereMesssage = "Listings from TVA.";
        } else if ($('#FromOthers').is(':checked')) {
            queryWhere += " AND (updatedby != '-1')";
            whereMesssage = "Listings from partners.";
        }

	} else if (currentLayer == "international") {

		var whereMesssage = "";
        // Returns 2438 rather than 1950
        // 6716 appears to be GeorgiaFacts import 10/14/2015 - contains ????.  7170 is Loren from user spreadsheet
		//var machineEdited = "SELECT c.databankid FROM companies1 c WHERE (c.updated != 'NULL' AND c.updatedby != '6716' AND c.updatedby != '7170')";
		
        // Returns 2474 rather than 1950 (before final fix by Ben)
        //var machineEdited = "SELECT c.databankid FROM companies1 c WHERE (c.updated IS NULL)";
        // 6311 CS Global Admin - New International Loren added 3/22/2016 (331 total) - both createby and updateby - plus one addional updateby
        // Add 6716 for other rows from origianl GeorgiaFacts import
        var machineEdited = "SELECT c.databankid FROM companies1 c WHERE (c.updated = '' OR c.updatedby = '6311')";

        // Use this instead: Returns 1950
        //var machineEdited = "SELECT c.databankid FROM companies1 c WHERE (c.updatedby = '0' OR c.updatedby = '00:00.0')";
		
        // Temp - IMPORTANT remove once companies1 includes valid update info
        // This incorrectly returns 299 rather than 1950.
        //machineEdited = "SELECT c.databankid FROM companies1 c WHERE (c.updatedby IS NOT NULL)";
        
        if ($('#ToOverwrite').is(':checked')) {
            queryWhere += " AND (overrideimport IS NULL OR overrideimport = '')";
            whereMesssage = "international companies to be overwritten.";
		} else if ($('#ToNotOverwrite').is(':checked')) {
            queryWhere += " AND (overrideimport IS NOT NULL AND overrideimport != '')";
            whereMesssage = "international companies will not be overwritten on import.";
        } else if ($('#ToInsert').is(':checked')) {
			// TO INSERT - These will have description inserted
			queryWhere += " AND companies1.cartodb_id IS NULL";
			whereMesssage = "international companies do not have a DUNS number in Atlas.";
		} else if ($('#ToUpdate').is(':checked')) {
			// TO UPDATE
			queryWhere += " AND companies1.cartodb_id IS NOT NULL";
			// User 7170 = Loren
			// User 6716 - Assume this is Atlas running the International Importer - Not in user spreadsheets.
			queryWhere += " AND i.duns_num::varchar(255) IN (" + machineEdited + ")";
			whereMesssage = "companies have NOT been edited in Atlas.";
		} else if ($('#ToOmit').is(':checked')) {
			queryWhere += " AND companies1.cartodb_id IS NOT NULL";
			queryWhere += " AND i.duns_num::varchar(255) NOT IN (" + machineEdited + ")";
			whereMesssage = "companies have been edited in Atlas.";
		} else {
			// Limit to intranet users
			//whereMesssage = "international companies from Hoovers reside in <a href='https://georgia-map.cartodb.com/viz/fc837e44-b557-11e5-a5c6-0e5db1731f59/public_map' target='carto_international'>CartoDB</a>.";
		
            //queryWhere = " WHERE (c.databankid = '' OR c.databankid = 'NULL')"; // Companies2 used NULL, companies1 used ''
        
            // 1814 created by, with no updated by - as of Feb 2016
            // queryWhere = " WHERE c.createdby = '7131' OR c.updatedby = '7131'";

            // Might be Ursula
            // 30 created by, 71 Updated by - as of Feb 2016
            //queryWhere = " WHERE c.createdby = '8254' OR c.updatedby = '8254'";

            // No Created by, 2737 Updated by - as of Feb 2016
            //queryWhere = " WHERE c.createdby = '6716' OR c.updatedby = '6716'";

            // Edited - 3703 - as of Feb 2016
            //queryWhere = " WHERE c.updatedby != '0'";

            // ???
            //queryWhere = " WHERE c.custom1 ilike '%?%' OR c.custom2 ilike '%?%' OR c.custom3 ilike '%?%'";
        }

        if ($('#FromUrsula').is(':checked')) {
            queryWhere += " AND companies1.createdby = 8254";
            whereMesssage += "companies added by Ursula.";
        } else if ($('#FromNonUrsula').is(':checked')) {
            queryWhere += " AND (companies1.createdby IS NULL OR companies1.createdby != 8254)";
            whereMesssage += "companies were NOT added by Ursula.";
        }

        if ($('#ByDavid').is(':checked')) {
            queryWhere += " AND companies1.updatedby = 8360";
            whereMesssage += "companies were updated by David Denison.";
        } else if ($('#ByUrsula').is(':checked')) {
            queryWhere += " AND companies1.updatedby = 8254";
            whereMesssage += "companies were updated by Ursula.";
        } else if ($('#ByNonUrsula').is(':checked')) {
            queryWhere += " AND (companies1.updatedby IS NULL OR companies1.updatedby != 8254)";
            whereMesssage += "companies were NOT updated by Ursula.";
        }
	}

    if (goLayer.skips) {
        skips += "," + goLayer.skips;
    }

    var namefield = "name";
    if (goLayer.namefield) {
        namefield = goLayer.namefield;
    }
   
    var formWhere = queryWhere.trim().replace("WHERE 1=1","");
    if (formWhere.indexOf("WHERE ") == 0) {
        formWhere = formWhere.replace("WHERE ","");
    }
    if (formWhere.indexOf("AND ") == 0) {
        formWhere = formWhere.replace("AND ",""); // Only start
    }
    // replace "WHERE " and "AND " only at the beginning
    //formWhere = formWhere.replace(/^WHERE/,"");
    //formWhere = formWhere.replace(/^AND/,"");
    //alert(formWhere);
    $(".whereFilter").val(formWhere);

    

    // Add more, after whereFilter field is populated:
    //alert("queryWhere: " + queryWhere);
    // Avoid += here because .whereFilter will append fromWhere
    queryWhere = " WHERE 1=1 " + getWhere(siteObject, currentLayer, namefield, goLayer.descriptionfield, goLayer.addressfield, goLayer.cityfield, goLayer.table);
    //alert("queryWhere: " + queryWhere);
    function numberWithCommas(x) {
        return x.toLocaleString();
        // Faster, but not international
        //return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }   
    //if (cartodb_id == 0) {
        
        // DISPLAY COUNT
	    //$('#mapBar').show("fast"); // Avoid. This add overflow:hidden which prevents download popup from overlapping.
        $('.mapBarHolder').show();

		//$("#cartodb_table").text("");
        // Clear prior
        $("#rowsTotal").html("");
        $("#rowsIcons").html("");
        $("#rowsWrench").html("");

		console.log("SELECT count(*) count " + queryFroms + queryWhere);
		sql.execute("SELECT count(*) count " + queryFroms + queryWhere).done(function(data) {
			rows_tot = data.rows[0].count;
            if (rows_tot <= 1000) {
                page_len = rows_tot;
                $(".listNav").hide();
                $("#pagination").hide();
            } else {
                if (cartodb_id == 0) {
                    $("#pagination").show();
                    $("#pagination #next").show();
                    $(".listNav").show();
                }
            }
            //alert("rows_tot " + rows_tot);
            //if (rows_tot > 1) { $('.paginationControls').show(); 
            //} else { $('.paginationControls').hide(); }

            console.log("rows_tot " + currentLayer + ": " + rows_tot);

            var prepend = "";
            if ($('.letter').val()) {
                prepend = "<div class='letterTitle'>" + $('.letter').val().toUpperCase() + "</div>";
            }
            if (prepend) {
                $(".closeAlphabetHolder").html('<div style="float:left">' + prepend + '</div><div style="float:left"><a href="#' + currentLayer + '"><i class="material-icons closeAlphabet">&#xE5CD;</i></a></div>');
                $(".closeAlphabetHolder").show();
            } else {
                $(".closeAlphabetHolder").hide();
            }
            $('.closeAlphabetHolder').click(function(event) {
                $('#alphabet div').removeClass("active");
                $('.letter').val("");
                $('.goSearch').trigger("click");
            });
            function clearFilters() {
                $('#alphabet div').removeClass("active");
                $('.letter').val("");
                //$('.cid').val("");
                $('#keywordsTB').val("");
                $(".listOptions .showAll").hide();
            }
            $('.showAll').click(function(event) {
                $('.showAllResults').hide();
                clearFilters();
                document.location.href = "#" + currentLayer;
            });

			if (rows_tot > 0) {
                
                //if (cartodb_id == 0) {
                    // Catch click through
				    $("#rowsTotal").html('<div style="pointer-events: auto;">Total: ' + numberWithCommas(rows_tot) + '</div>');
				//}
                if (whereMesssage) {
					//$("#whereMesssage").html("The following " + rows_tot + " " + whereMesssage);
                    $("#whereMesssage").html(whereMesssage);
				}
				// Download Icon and Wrench
                var rowIcons = '<div class="filterBubble" style="right:0;top:36px;min-width:155px">';
    				if (currentLayer != "co" && currentLayer != "companies") {
                        rowIcons += '';
                        rowIcons += '<div style="float:left; margin-bottom:12px">Download</div><div class="hideDownload" style="float:right;margin-top:-8px;margin-right:-8px"><i class="material-icons" style="font-size:16px;">&#xE5CD;</i></div>';
                        if (goLayer.googlesheet) {
                            rowIcons += '<div class="menuItem"><a href="' + goLayer.googlesheet + '" target="_blank" style="color:#777;font-size:14pt"><i class="material-icons" style="font-size:23px">&#xE2C4;</i> Google</a></div>';
                        }
                        var obj = {
                          "CSV": "CSV File",
                          "KML": "KML File",
                          "SHP": "SHP File",
                          "SVG": "SVG Image",
                          "GeoJSON": "GeoJSON",
                          "SpatiaLite": "SpatiaLite"
                        };
                        $.each( obj, function( key, value ) {
                          var dLink = "http://" + username + ".cartodb.com/api/v2/sql?q=" + encodeURIComponent(querySelects + queryFroms + queryWhere + queryOrder + " LIMIT 200000") + "&format=" + key;
                          //alert( key + ": " + value );
                          rowIcons += '<div class="menuItem"><a href="' + dLink + '" style="color:#777;font-size:14pt"><i class="material-icons" style="font-size:23px">&#xE2C4;</i> ' + value + '</a></div>';
                        
                        });
                    }
                rowIcons += "</div>";
                $("#rowsIcons").html(rowIcons);

                //$(document).ready( function () 
                //{
                    $('#rowsIcons').click(function(event) {
                        $("#rowsIcons").hide();
                    });
                //});

                if (goLayer.where) {
                    // build icon (wrench) - for modifing where clause
                    $("#rowsWrench").append('<div class="showWhere" style="line-height:12px;float:left"><i class="material-icons">&#xE869;</i></div>');
                }
            }
			if (rows_tot == 0) {
                $("#rowsTotal").html('<div style="font-weight:bold">No Results &nbsp;</div>');
                //$('.listPanelRows').hide(); // Avoid hiding so alphabet remains accessible.
                if (param["letter"]) {
                    $('.listTable').html('<div style="margin:20px">No results found starting with ' + param["letter"].toUpperCase() + '.</div>'); // Clear prior.
                } else {
                    $('.listTable').html('<div style="margin:20px">No results found.</div>'); // Clear prior.
                }
				$('#pagination').hide();
                if ($('#keywordsTB').val()) {
				    $("#smartQuery").text("No matching results found for: " + $('#keywordsTB').val());
                } else if ($('#CompanyCountry').val()) {
                    $("#smartQuery").text("No matching results found for: " + $('#CompanyCountry').val());
                }
                $("#gridMessage").html('<div style="padding:20px;font-size:15px">NO MATCHING ROWS</div>');
			}

            if (cartodb_id <= 0) {
    			// Clear prior table to clear header
    			//$("#cartodb_table").find("th").remove();
    			//$("#cartodb_table thead").text("");
                $("#cartodb_table tbody").text("");
                $("#cartodb_table thead").text(""); // Placing lowered seemed to cause thead to reside after body.
            }
            
            if (rows_tot > 1 && cartodb_id == 0) {
                $('#pagination').show(); // Not used when cartodb_id
            }
            if (cartodb_id > 0) {
                
                // Append after total count is fetched.
                queryWhere += " AND " + dbTable + ".cartodb_id = " + cartodb_id;
            }

            if (cartodb_id > 0 || layout == "directory") {
                console.log("fillTable cartodb_id > 0 || layout");
                fillTable(false,currentLayer,siteObject,cartodb_id,layout);

                // || currentLayer == "dups"
                // Count not woring with dups query.  This might: http://stackoverflow.com/questions/3800551/select-first-row-in-each-group-by-group

            }

            // TABLE HEADER
            //alert(layout);
            if (cartodb_id <= 0 && rows_tot > 0 && layout != "count" && layout != "directory") {
				
                $("#gridPanel").show();

				// If table thead already exists, only remove tbody.
                // BUGBUG - Need to check if currentlayer or request has changed before retaining header.
				//if (!$("#cartodb_table thead").length) {

					sql.execute(querySelects + queryFroms + " LIMIT 0").done(function(data) {
						// DISPLAY TABLE HEADER
						// To Do: Avoid re-querying table header on search
						//alert("DISPLAY TABLE HEADER");
					    var n = $('<thead><tr></tr></thead>');
                        n.append($('<th style="position:relative"></th>').html('<div class="rowCountHeader"></div>')); // Above count column
					    for (i in data.fields){
					      if (skips.indexOf(i) == -1) {
					        headers.push(i);
					        types.push(data.fields[i].type); // Not currently used
					        n.append($('<th></th>').html('<div>' + i + '</div>'));
					      }
					    }
					    n.append($('<th style="border-right:0px"></th>').html("<div class='gridScroll'><!--i class='material-icons'>&#xE315;</i--></div><div class='gridScrollLeft' style='display:none'><i class='material-icons'>&#xE314;</i></div>")); // Append an empty td - for arrow space on far right.
					    $('#cartodb_table').append(n);
					});

				//}
                //var cid = $('.cid').text();
				fillTable(false,currentLayer,siteObject,cartodb_id,layout);
			}
            $('.showWhere').click(function(event) {
                $(".adminTools").show();
                $("#rowsWrench").hide();
            });
            $('.hideWhere').click(function(event) {
                $(".adminTools").hide();
                $("#rowsWrench").show();
            });

		});
	//}

    function isHTML(str) {
      return /<|>/.test(str);
    }
    function getOne(r,ones) {
        var array = ones.split(",");
        for (i=0;i<array.length;i++){
             if (r[array[i]] != undefined) {
                return(r[array[i]]);
             }
        }
        return "";
    }
    function include(strname,str,skips) {
        var skips = "," + skips + ",";
        if (!str) { return false}
        if (skips.indexOf("," + strname + ",") >= 0) {
            return false;
        } else { return true; }
    }
    function formatLoc(loc,skips) {
        var rowHTML = "";
        
        if (include("contact",loc.contact,skips)) {
            rowHTML += '<b>' + loc.contact + '</b><br>';
        }
        if (include("firstname",loc.firstname,skips) && include("lastname",loc.lastname,skips)) {
            rowHTML += '<b>' + loc.firstname + ' ' + loc.lastname + '</b><br>';
        } else if (include("firstname",loc.firstname,skips)) {
            rowHTML += '<b>' + loc.firstname + '</b><br>';
        } else if (include("lastname",loc.lastname,skips)) {
            rowHTML += '<b>' + loc.lastname + '</b><br>';
        }


        if (loc.edit) {
            //alert(loc.edit);
            loc.edit = loc.edit.replace('=HYPERLINK("','').replace('","Edit")','');

            // Temp
            //loc.edit = "http://partner.exploregeorgia.org/";

            $(".detailsEdit").html('<a href="' + loc.edit + '" target="_blank" class="detailbutton" style="float:right; color:#fff; background:#3B99FC; border:#3B99FC">Update</a>');
        } else {
            $(".detailsEdit").html('<div class="editRow detailbutton" style="display:none;float:right; color:#fff; background:#3B99FC; border:#3B99FC">Update</div>');
        }
        if (loc.title) {
            rowHTML += '<b>' + loc.title + '</b><br>';
        }
        if (loc.organization) {
            rowHTML += loc.organization + '<br>';
        }
        if (loc.locationname) {
            rowHTML += loc.locationname + '<br>';
        }
        if (loc.description) {
            rowHTML += '<div class="detailsBit">' + loc.description + '</div>';
        }
        if (loc.address1) {
            rowHTML += loc.address1 + '<br>';
        }
        if (loc.address2 && !loc.address1.includes(loc.address2)) {
            rowHTML += loc.address2 + '<br>';
        }
        if (loc.city) {
            rowHTML += loc.city + ', ';
        }
        if (loc.state) {
            rowHTML += loc.state;
        }
        if (loc.zip) {
            if (loc.city || loc.state) {
                rowHTML += ' ';
            }
            rowHTML += loc.zip + '<br>';
        }
        if (loc.county) {
            rowHTML += loc.county + ' County<br>';
        }
        if (loc.region) {
            rowHTML += loc.region + '<br>';
        }
        //rowHTML += '<br>';

        if (loc.phone) {
            rowHTML += 'phone: ' + loc.phone + ' &nbsp;';
        }
        if (loc.fax) {
            rowHTML += 'fax: ' + loc.fax;
        }
        if (loc.phone || loc.fax) {
            rowHTML += '<br>';
        }

        if (loc.publicphone) {
            rowHTML += loc.publicphone + '<br>';
        }
        if (loc.locpublicphone && loc.publicphone != loc.locpublicphone) {
            rowHTML += loc.locpublicphone + '<br>';
        }
        if (loc.email) {
            rowHTML += loc.email + '<br>';
        }
        if (loc.dod_related_awards) { // Top 20 defense
            rowHTML += loc.dod_related_awards + '<br>';
        }

        if (rowHTML) {
            rowHTML = '<div class="detailsBit">' + rowHTML + '</div>';
        }
        return rowHTML;
    }
    function formatCategory(cat) {
        var rowHTML = "";
        if (cat.categories) {
            rowHTML += '<div class="categoryKey">category</div><div class="categoryValue">' + cat.categories + '</div>';
        }
        if (rowHTML) {
            rowHTML = '<div class="detailsBit">' + rowHTML + '</div>';
        }
        return rowHTML;
    }
    function formatAdditional(cat) {
        var rowHTML = "";
        if (additional.key) {
            rowHTML += '<div class="categoryKey">' + cat.key + ':</div><div class="categoryValue">' + cat.value + '</div>';
        }
        if (rowHTML) {
            //rowHTML = '<div class="detailsBit">' + rowHTML + '</div>';
        }
        return rowHTML;
    }
    function formatLink(goLayer,link) {
        var rowHTML = "";
        if (link.url) {
            var href = 'http://' + link.url;
            if (link.url.toLowerCase().substring(0, 4) == "http") {
                href = link.url;
            }
            rowHTML += '<div class="categoryKey">website</div><div class="categoryValue"><a href="' + href + '" target="' + link.url + '">' + link.url + '</a></div>';
        }
        if (goLayer.section == "Camera Ready" && link.latitude && link.longitude) {
            rowHTML += '<div class="categoryKey">area hotels</div><div class="categoryValue"><a href="https://www.google.com/maps/search/Hotels/@' + link.latitude + ',' + link.longitude + ',13z" target="_blank">View Hotels</a></div>';
            rowHTML += '<div class="categoryKey">area restaurants</div><div class="categoryValue"><a href="https://www.google.com/maps/search/Restaurants/@' + link.latitude + ',' + link.longitude + ',13z" target="_blank">View Restaurants</a></div>';
        }
        if (rowHTML) {
            //rowHTML = '<tr><td>Contact:</td><td>' + rowHTML + '</td></tr>';
            rowHTML = '<div class="detailsBit">' + rowHTML + '</div>';
        }
        return rowHTML;
    }
    
    function rowCheck(layerName){
        if ($('.cid').text() != "") {
            // Bug: Not clearing cid!
            $('.cid').text(""); $('.cidTab').val(""); // Clear prior detail ID.
            $('.hideDetails').trigger("click");
            //updateURL(layerName);
        }
        if(rows_tot < page_len+cur_off){
          $('.listNext').addClass('disable');
        } else {
          $('.listNext').removeClass('disable');
        }
        if(cur_off <= 0){
          $('.listPrev').addClass('disable');
        } else {
          $('.listPrev').removeClass('disable');
          $('.paginationControls').show();
        }
    }

    if (cartodb_id <= 0) {
        $('.listNext').unbind('click');
        $('.listNext').click(function(){
            cur_off+=page_len;
            fillTable(true,layerName,siteObject,cartodb_id,layout);
            rowCheck(layerName);
        });
        $('.listPrev').unbind('click');
        $('.listPrev').click(function(){
            cur_off-=page_len;
            fillTable(true,layerName,siteObject,cartodb_id,layout);
            rowCheck(layerName);
        });
    }
    function fillTable(remove,layerName,siteObject,cid,layout){
        var goLayer = getGo(siteObject.items,layerName);
        var cartodb_id = cid;

        //headers = ["cartodb_id", "name"];
        
        // Not in use
        //headers = ["id", "updated", "name", "point", "port", "portpoint1", "distancePort", "port2", "portpoint2", "distancePort2", "port3", "portpoint3", "distancePort2", "airport", "airport2", "airport3"];

        //var query = "SELECT " + headers.join() + " FROM " + table + " WHERE cartodb_id <= 100";

        // Convert date string format for sort
        // UPDATE georgiaexport SET updated = to_timestamp(updated, 'MM/DD/YY HH:MI:SS')
        // Not needed if using:  order by to_timestamp(updated, 'MM/DD/YY HH:MI:SS') DESC

        if (cartodb_id == 0 && layout != "directory") {
            $("#cartodb_table tbody").remove();
        }

        $('#hideGridOnGrid').click(function(event) {
            $("#hideGrid").hide();
            $("#showGrid").show();
            $("#gridPanel").hide();
            $(".mapBarHolder").hide();
            $("#mapPanel").hide();
        });
        if (rows_tot == 0) {
            return;
        }

        if (cartodb_id > 0) {
            $(".detailsPanel").show();
            $(".detailsPanelLoading").show();
            //alert("word"); // Loading image is not showing here yet.
        }
        var queryEnd = "";
        queryEnd = " LIMIT " + page_len + " OFFSET " + cur_off;
        if (cartodb_id == 0) {
            var to = cur_off + page_len;
            if (rows_tot < to) { to = rows_tot;}
            if (rows_tot != to) {
                $("#pagination").show();
                $(".rowCounts").text((cur_off + 1) + " to " + (to));
            } else {
                $("#pagination").hide();
                $(".rowCounts").text("");
            }
        } else {
            // Rendered before detail query for quicker display.
            showFeature(cartodb_id, "", goLayer);
        }
        var queryFull = querySelects + queryFroms + queryWhere + queryOrder;

        // DISPLAY QUERY
        $("#smartQuery").text(""); // Delete prior query

        //$("#smartQuery").append("<strong>My Query:</strong> &nbsp;" + queryFull + queryEnd);
        console.log('fillTable - ' + layout + ' Query: ' + queryFull + queryEnd);

        var rowCount = 0;
        
        sql.execute(queryFull + queryEnd).done(function(data) {

            // GRID
            if (cartodb_id == 0 && layout != "directory") {
                //if(remove){ // Remove the prior grid display - Occurs on next and back arrow clicks.
                  //$("#cartodb_table").find("tr:gt(0)").remove();
                  //$("#cartodb_table tbody").text("");
                //}
                $('#cartodb_table').append("<tbody id='cartodb_table_body'></tbody>");
            
                data.rows.map(function(r) {
                    rowCount++;
                    var n = $('<tr id="' + r['cartodb_id'] + '" class="gridRow" style="position:relative"></tr>');
                    n.append($('<td class="rowCountTD"></td>').html('<div class="rowCount">' + (rowCount + cur_off) + '</div>'));
                    for (i in data.fields) {
                        if (skips.indexOf(i) == -1) {
                          if (r[i] == null ) {
                            n.append($('<td></td>').html(""));
                          } else if (i == "name" && i != "null") {
                            n.append($('<td></td>').html('<b>' + r['name'] + '</b>'));
                          } else if (r[i].length > 50) {
                            if (isHTML(r[i])) { // Avoids splitting HTML tag midway.
                                n.append($('<td></td>').html('<div class="rowMore">view</div><div class="rowMoreText" style="min-width:250px">' + r[i] + '</div>'));
                            } else if (r[i].length > 100) {
                                n.append($('<td style="min-width:250px"></td>').html(r[i].substring(0,99) + ' - <div class="rowMore"> more</div><div class="rowMoreText">' + r[i].substring(100,r[i].length) + '</div>'));
                            } else {
                                n.append($('<td style="min-width:250px"></td>').html(r[i]));
                            }
                          } else if (r[i].length > 25) {
                            n.append($('<td style="min-width:150px"></td>').html(r[i]));
                          } else {
                            n.append($('<td></td>').html(r[i]));
                          }
                        }
                    }
                    // Holds arrow that floats over right side.
                    n.append($('<td class="rowDetailsTD"></td>').html('<div class="rowDetailsButton"><i class="material-icons" style="margin-top:2px;color:#888">&#xE5D4;</i></div>'));
                    
                    // Limit to headers array
                    //for (h in headers){
                      //n.append($('<td></td>').text(r[headers[h]]));
                    //}
                    $("#gridMessage").html(""); // Hide Loading Grid text
                    $('#cartodb_table_body').append(n);
                });
                console.log("filltable grid done - " + rowCount + " rows");

                $('.gridRow, .rowDetailsButton').click(function(){
                    $('.rowDetailsArrow').removeClass("active");
                    $(this).find('.rowDetailsArrow').addClass("active");
                    console.log(".gridRow item click");
                    displayDetails2($(this).closest('tr').attr('id'), data, "latlng", layerName, siteObject);
                });
            }

            // DIRECTORY AND DETAILS
            if ((cartodb_id > 0 || layout == "directory")) {
                //alert("goLayer.namefield " + goLayer.namefield)
                if(typeof goLayer.namefield == "undefined") {
                    console.log("fillTable - No namefield defined in json file. Directory list needs name.");
                }
                
                if (layout == "directory") {
                    $(".listTable").text(""); // Delete prior 
                } else {
                    $(".detailsLink").text("");
                    $("#listingImage").text("");
                    $(".detailsTable").text(""); // Delete prior buttons and text area.
                }
                //$(".detailsTable").text(""); // Delete prior buttons and text area.

                //console.log("cartodb_id " + r['cartodb_id']);
                
                $(".listPanel").show();
                if (cartodb_id > 0) {
                    $('.besideLeftHolder').show();
                }
                var top = $('<div class="detailsText"></div>');
                //var n = $('<table id="' + cartodb_id + 'Table" style="width:100%"></table>');
                var n = $('<div class="listScroll"></div>');

                if (goLayer.skipdetails) {
                    skips += "," + goLayer.skipdetails;
                }

                var assetPath = "https://georgia-directory.firebaseapp.com/assets/";
                    //if (layerName == "logistics") {
                    if (/logistics/i.test(layerName)) { // Case in-sensitive
                        assetPath = "https://georgia-directory.firebaseapp.com/assets/";
                    }
                    
                // DIRECTORY
                if (layout == "directory") {
                    //$("#detailsName").text(goLayer.title);
                    $("#detailsNameHolder").hide();
                    if ($(".moduleJS").width() > 800) {
                        $(".showList").hide();
                    }

                    $(".listOptions").hide();
                    if ($(".moduleJS").width() > 800) {
                        $(".hideList").show(); // Avoid when narrow since list is not visible below map.
                    }
                    $('.moveListBelow').show();
                    $(".listPanelRows").show();
                    
                    $(".directoryBackLink").hide();
                    if (!goLayer.namefield) {
                        goLayer.namefield = "name";
                    }
                    data.rows.map(function(r) {
                        rowCount++;
                        // DIRECTORY
                        if (rowCount==1) {
                            $('.cidTab').val(r['cartodb_id']); // Stored for Details tab.
                        }
                        var countDisplay = 0;
                        for (i in data.fields) { // For each column
                            //console.log("rowCount: " + rowCount + ": i: " + i + " value: " + r[i]);
                            skips = skips + ''; // Prevents "skips.split is not a function" error for some
                            if ($.inArray(i, skips.split(',')) == -1) { // If column name is not in skips.
                                //alert("skips " + skips);
                                //if (r[i] == "" || i == "cartodb_id") {
                                    //console.log("rowCountA " + rowCount + "<br>");
                                //} else 
                                //if (i == goLayer.namefield || i == "name") { // companyname is from temporary aerospace data. company_name is from recycling data.
                                if (i == goLayer.namefield) { // companyname is from temporary aerospace data. company_name is from recycling data.
                                    // Occurs once per row, if row has a column with name goLayer.namefield.
                            
                                    var rowHTML = '';
                                    // BUGBUG - listings have image1 but no thumbnail
                                    if (r['thumbnail']) {
                                        rowHTML += '<img style="float:right; margin-left:10px; max-width:84px" src="' + r['thumbnail'] + '">';
                                    } else if (r['image1']) {
                                        rowHTML += '<img style="float:right; margin-left:10px; max-width:84px" src="' + r['image1'] + '">';
                                    } else if (r['photo1']) {
                                        var photoLink = r['photo1'];
                                        //var photoLink = r['photo1'].replace("gadataengine.milesmedia.com","partner.exploregeorgia.org");
                                        rowHTML += '<img style="float:right; margin-left:10px; max-width:84px" src="' + photoLink + '">';
                                    } else if (r['logo']) { // Was logoimg
                                        // Appends Aerospace or Logistics.
                                        var logopath = assetPath + r["source"] + "/" + r['logo'];
                                        if (r['logo'].toLowerCase().match("^http")) {
                                            logopath = r['logo'];
                                        }
                                        rowHTML += '<img style="float:right; margin:0 18px 0 10px; max-width:84px" src="' + logopath + '">';
                                    }
                                    var name = r[i];
                                    if (goLayer.nameappend && goLayer.nameappendomit && name.indexOf(goLayer.nameappendomit) == -1) {
                                        name = name + goLayer.nameappend;
                                    }
                                    countDisplay = cur_off + rowCount;
                                    if (r['rank']) {
                                        countDisplay = r['rank'];
                                    }
                                    rowHTML += '<div class="rowDetailsCount">' + countDisplay + '</div>';
                                    rowHTML += '<div style="overflow:auto">';
                                        rowHTML += '<div class="rowDetailsTitle">' + name + '</div>';
                                        if (r['contact_name']) { // For Camera Ready Contacts
                                            rowHTML += r['contact_name'] + '<br>';
                                        }

                                        if (r['organization']) {
                                            rowHTML += r['organization'] + '<br>';
                                        }
                                        if (r['address']) {
                                            rowHTML += r['address'] + '<br>';
                                        } else if (r['address1']) {
                                            rowHTML += r['address1'] + '<br>';
                                        }
                                        if (r['address2']) {
                                            rowHTML += r['address2'] + '<br>';
                                        }
                                        if (r['city']) {
                                            rowHTML += r['city'] + ', ';
                                        }
                                        if (r['state']) {
                                            rowHTML += r['state'];
                                        }
                                        if (r['zip']) {
                                            if (r['city'] || r['state']) {
                                                rowHTML += ' ';
                                            }
                                            rowHTML += r['zip'] + '<br>';
                                        }
                                        /*
                                        else if (r['zipcode']) { // Previously for aerospace and logistics.
                                            if (r['city'] || r['state']) {
                                                rowHTML += ' ';
                                            }
                                            rowHTML += r['zipcode'] + '<br>';
                                        }
                                        */

                                        // To Do: Update site.json to include listdisplay with parameters to show on list.
                                        if (r['business_phone']) { // Camera Ready Contacts
                                            rowHTML += r['business_phone'] + '<br>';
                                        }
                                        if (r['productorservicecode']) { // Defense
                                            rowHTML += r['productorservicecode'] + '<br>';
                                        }
                                        if (r['dollarsobligated']) { // Defense
                                            rowHTML += "$" + r['dollarsobligated'] + '<br>';
                                        }
                                        if (r['dod_related_awards']) { // Top 20 Defense
                                            rowHTML += "DoD-Related Awards $" + r["dod_related_awards"]+ ' Million<br>';
                                        }
                                        if (r['total_awards']) { // Top 20 Defense
                                            rowHTML += "Total Awards $" + r["total_awards"]+ ' Million<br>';
                                        }
                                        if (r['_2016totalawardamount']) {
                                            rowHTML += "2016 Total Awards: $" + r["_2016totalawardamount"].toLocaleString() + '<br>';
                                        }
                                    rowHTML += '</div>';
                                    //console.log('rowHTML ' + rowHTML);
                                    n.append('<div class="rowDetailsLink leftPadding" id="' + r['cartodb_id'] + '">' + rowHTML + '</div>');
                                    //n.append('<div>123</div>');
                                }
                            }
                        }
                    });
                    //alert("test: " + n);
                    $(".listTable").append(n);
                    console.log("filltable .listTable - " + rowCount + " rows");
                } else {
                    // DETAILS PAGE
                    $(".showDirectory").show();
                    $(".hideDirectory").hide();
                    $(".showDetails").hide();
                    $(".hideDetails").show();

                    $(".listPanel").show();
                    if ($(".besideLeftHolder .listPanel").length > 0) { // Beside map
                        $('.besideLeftHolder').show();
                    } else {
                        $('.besideLeftHolder').hide();
                    }
                    $(".directoryBackLink").show();

                    if ($(window).width() > 800) {
                        /*
                        $('html, body').animate({
                            scrollTop: $('#mapBar').offset().top
                        }, 'slow');
                        */
                        //alert("here");
                    }

                    data.rows.map(function(r) {
                        //$(".directoryBackLink").show();
                        $('.cid').text(r["cartodb_id"]); // Store for URL building.
                        $('.cidTab').val(r["cartodb_id"]);
                        updateURL(layerName);
                        //alert("set cidTab");

                        if (typeof r["latitude"] != "undefined" && typeof r["longitude"] != "undefined") {
                            var latlng = r["latitude"] + "," + r["longitude"];
                            //alert("latlng: " + latlng); // Still show point when 0 if row has polygon. Only used for zooming map to point. Maybe zoom to polygon instead?
                            // Sample: http://localhost/site/widget-local.html#aerospace&cid=337
                            //showFeature(r["cartodb_id"], latlng, goLayer);
                        }
                        loc = {};
                        loc.contact = getOne(r,"contact_name"); // contact_name Camera Ready
                        loc.firstname = getOne(r,"contactfirst"); // contactfirst coi
                        loc.lastname = getOne(r,"contactlast"); // contactlast coi
                        loc.title = r["title"]; // Camera Ready
                        loc.locationname = r["locationname"]; // COI
                        loc.organization = r["organization"];
                        loc.description = r["description"];
                        loc.address1 = getOne(r,"address1,address_1,addressline1,address");
                        loc.address2 = getOne(r,"address2,address_2,addressline2");
                        loc.city = getOne(r,"city,addresscity");
                        loc.state = getOne(r,"state,addressstate");
                        
                        loc.zip = getOne(r,"zip,zipcode,postalcode,addresspostalcode");
                        loc.county = r["county"];
                        loc.country = getOne(r,"country,custom4"); //Need to test that custom4 is needed for Atlas international

                        //loc.region = r["region"]; // Not currently displayed for COI
                        loc.phone = getOne(r,"phone,business_phone"); // business_phone Camera Ready, contactphone omitted for privacy
                        loc.publicphone = r["publicphone"]; // COI
                        loc.locpublicphone = r["locpublicphone"]; // COI
                        loc.fax = r["fax"]; // Crew
                        loc.edit = r["edit"]; // Crew
                        loc.email = getOne(r,"publicemail,email");

                        top.append(formatLoc(loc,skips));

                        category = {};
                        // Set to blank if undefined since split is applied.
                        category.categories = (typeof r["categories"] === 'undefined') ? "" : r["categories"]; // COI
                        category.cat = (typeof r["cat"] === 'undefined') ? "" : r["cat"]; // COI - Logistics
                        category.source = (typeof r["source"] === 'undefined') ? "" : r["source"]; // COI
                        n.append(formatCategory(category));

                        link = {};
                        link.url = r["url"]; // COI
                        link.latitude = r["latitude"]; // Camera Ready
                        link.longitude = r["longitude"]; // Camera Ready
                        n.append(formatLink(goLayer,link));

                        if (typeof r["specialties"] != "undefined" && r["specialties"].length > 2) {
                            if (r["specialties"].substring(0,2) == ", ") {
                                r["specialties"] = r["specialties"].substring(2,r["specialties"].length);
                            }
                            additional = {};
                            additional.key = "Specialties";
                            additional.value = r["specialties"]; // COI
                            n.append(formatAdditional(additional));
                        }

                        // Before removal of skips
                        for (i in data.fields) {
                            if (i == goLayer.namefield || i == "name") {
                                var name = r[i];
                                if (goLayer.nameprepend && goLayer.nameappend) {
                                    name = goLayer.nameprepend + ' ' + r[i] + ' ' + goLayer.nameappend;
                                } else if (goLayer.nameprepend) {
                                    name = goLayer.nameprepend + ' ' + r[i];
                                } else if (goLayer.nameappend) {
                                    name = r[i] + ' ' + goLayer.nameappend;
                                }
                                $("#detailsName").html(name);
                                $("#detailsNameHolder").show();
                                var detailsLink = "";
                                if (goLayer.link1) {
                                    detailsLink += '<div style="font-weight:bold; padding:10px 0 4px 0">Reel Scout</div>';
                                }
                                if (goLayer.link1) {
                                  detailsLink += '<a class="dButton" href="' + goLayer.path1 + r[i] + '" target="' + r[i] + '">' + goLayer.link1 + '</a>';
                                }
                                if (goLayer.link2) {
                                  detailsLink += '<a class="dButton" href="' + goLayer.path2 + r[i] + '" target="' + r[i] + '">' + goLayer.link2 + '</a>';
                                }
                                if (goLayer.link3) {
                                  //detailsLink += '<a class="dButton" href="' + goLayer.path3 + r[i] + '">' + goLayer.link3 + '</a><br>';
                                }
                                $(".detailsLink").html(detailsLink);
                            }
                        }

                        // Temp for camera ready: address_1, address_2
                        skips += ",organization,description,contact,contact_name,title,locationname,address,address1,address_1,addressline1,address2,address_2,city,addresscity,state,addressstate,zip,zipcode,postalcode,addresspostalcode,county,region";
                        skips += ",contactfirst,contactlast,phone,publicphone,locpublicphone,business_phone,contactphone,fax,publicemail,email,categories,url,specialties";

                        skips = "," + skips + ",";
                        for (i in data.fields) {
                            if (r[i] != null && skips.indexOf("," + i + ",") == -1) {
                                if (r[i] == "" || i == "cartodb_id" || i == "id" || i == "databankid") {
                                } else if (i == goLayer.namefield || i == "name") {
                                    // Displayed above since skips values are used for county, etc.

                                // Removed1

                                } else if (i == "image1" || i == "photo1" || i == "photo2" || i == "photo3") {
                                    var listingImage = '<img src="' + r[i] + '" target="' + '" style="width:100%" alt="" />';
                                    $("#listingImage").append(listingImage);
                                } else if (i == "logo") { // Wad logoimg
                                    // Appends Aerospace or Logistics.
                                    var logopath = assetPath + r["source"] + "/" + r[i];
                                    if (r[i].toLowerCase().match("^http")) {
                                        logopath = r[i];
                                    }
                                    var listingImage = '<img src="' + logopath + '" target="' + '" style="width:auto;height:auto;max-width:100%;max-height:100%;" alt="" />';
                                    $("#listingImage").html(listingImage);
                                } else if (i == "pdffn") {
                                    // Appends Aerospace or Logistics.
                                    var pdfpath = assetPath + r["source"] + "/" + r[i];
                                    var pdfpathname = r[i];
                                    if (r[i].toLowerCase().match("^http")) {
                                        pdfpath = r[i];
                                        pdfpathname = "Download PDF";
                                    }
                                    n.append($('<div class="categoryKey">PDF</div><div class="categoryValue"><a href="' + pdfpath + '" target="_blank">' + pdfpathname + '</a></div>'));
                                } else if (i == "videoscript") {
                                    if (r[i].toLowerCase().match("^<iframe")) {
                                        // TO DO: Send to video module display.
                                        n.append($('<div class="categoryValue">' + r[i] + '</div>'));
                                    } else {
                                        n.append($('<div class="categoryKey">VIDEO</div><div class="categoryValue"><a href="' + r[i] + '" target="_blank">Watch Video</a></div>'));
                                    }
                                } else if (i == "dollarsobligated" || i == "activeandnonpay" || i == "civilianpay" || i == "totalpay" || i == "undefinedpay") { // Defense, Military Bases
                                    n.append('<div class="categoryKey">' + i + '</div><div class="categoryValue">$' + r[i] + '</div>');
                                } else if (i == "dod_related_awards") { // Top 20 Defense
                                    n.append('<div class="categoryKey">DoD-Related Awards</div><div class="categoryValue">$' + r["dod_related_awards"] + ' Million</div>');
                                } else if (i == "total_awards") { // Top 20 Defense
                                    n.append('<div class="categoryKey">Total Awards</div><div class="categoryValue">$' + r["total_awards"] + ' Million</div>');
                                } else if (i == "total_awards") { // Top 20 Defense
                                    n.append("Total Awards $" + r["total_awards"] + " Million<br>");
                                } else if (i == "_2016totalawardamount") { // 
                                    n.append("Total Awards: $" + r["_2016totalawardamount"].toLocaleString() + "<br><br>");
                                } else if (r[i] != null) {
                                    //n.append($('<tr><td>' + i.split('_').join(' ') + ':</td><td>' + r[i] + '</td></tr>'));
                                    n.append($('<div class="categoryKey">' + i.split('_').join(' ') + '</div><div class="categoryValue">' + r[i] + '</div>'));
                                }
                            }
                        }

                        //$(".detailsPanel").show();
                        $(".detailsPanelLoading").hide();

                        // Populate a hidden field for Cognito form loading.  Oddly, these need to be capitalized even if not capitalized in Cognito.
                        if (loc.state == "GA") {
                            loc.state = "Georgia";
                        }
                        if (loc.country == "") {
                            loc.country = "United States";
                        }
                        // Name is the CompanyName or PropertyName (not a person's name)
                        // Go:Re-Certification for #certification
                        // For Cognito
                        $('.formValuesHidden').val('{"Name": "' + name + '", "Go": "Re-Certification", "URL": "' + link.url + '", "County": "' + loc.county + '", "Cartodbid": "' + r["cartodb_id"] + '", "ContactName": { "First": "' + loc.firstname + '", "Last": "' + loc.lastname + '" }, "Address": { "Line1":"' + loc.address1 + '","Line2":"' + loc.address2 + '","City":"' + loc.city + '","State":"' + loc.state + '", "PostalCode": "' + loc.zip + '","Country":"' + loc.country + '" }, "Categories":"' + category.categories.split(",") + '", "CatLogistics":"' + category.cat.split(",") + '", "CatAerospace":"' + category.cat.split(",") + '", "Source":"{' + category.source + '}", "Industries":"{' + category.source + '}" }');

                        //alert($('.formValuesHidden').val());
                        function populateForm() {
                            alert(name);
                        }
                    });
                    $(".detailsTable").prepend(top);
                    $(".detailsTable").append(n);
                    //$('html,body').animate({ scrollTop: 0 });
                    console.log("filltable .detailsTable (" + layerName + ": " + cartodb_id + ")");
                    //alert("filltable .detailsTable (" + layerName + ": " + cartodb_id + ")");

                    // To do: add D&B link
                    if (goLayer.cognitoform) {
                        $(".editRow").show();
                    }

                    $('.editRow').click(function(){
                        var formLink = $('.cognitoformlink').val();

                        if (formLink) {
                            // Open in new tab
                            var win = window.open(formLink, '_blank');
                            win.focus();
                        } else {
                            showEmbeddedForm();
                        }
                    });
                    function showEmbeddedForm() {
                        //populateForm();
                        $('.formHolder').show();
                        $('.listPanelHolder').hide();
                        $('.footerContent').hide();
                        $('.showForm').hide();
                        $('#mapBar').hide();
                        //$('.hideFiltersClick').trigger("click"); // Avoid. Hides list too.
                        //if (!$(".c-forms-form").is(':visible'))
                        {
                            // Edit existing Atlas data

                            // These are not passed forward here. Called by cognitoScriptLoadedExisting instead.
                            var formID = $('.cognitoformid').val();
                            var entryObj = $('.formValuesHidden').val(); //retrieve object from hidden
                            entryObj = JSON.parse(entryObj);

                            lazyLoadCognito('https://services.cognitoforms.com/s/cileRMJMNEWcb6ZO8yEtXg', cognitoScriptLoadedExisting, formID, entryObj);

                            //Cognito.load("forms", { id: formID, entry: entryObj });
                        }
                        $('html,body').animate({ 
                            scrollTop: $(".formHolder").offset().top
                        });
                    }
                }
                // Limit to headers array
                //for (h in headers){
                  //n.append($('<td></td>').text(r[headers[h]]));
                //}

                

                $('.rowDetailsLink').click(function(){
                    //alert(".rowDetailsArrow" + $(this).closest('tr').attr('id'));

                    //$('.rowDetailsArrow').removeClass("active");
                    //$(this).find('.rowDetailsArrow').addClass("active");
                    displayDetails2($(this).attr('id'), data, "latlng", layerName, siteObject);
                });
                $('.rowMore').click(function(){
                    $(this).css('display', 'none');
                    $(this).next().css('display', 'inline-block');
                });
                updateOffsets();
            }
            /*
            $('.gridScroll').click(function(){
                var scrollAmount = $('#scrollGrid').width();
                $('#scrollGrid').animate({scrollLeft: scrollAmount},1000);
                setTimeout(function(){ 
                    $(".gridScroll").hide();
                    $(".gridScrollLeft").show();
                }, 1000);
            });
            $('.gridScrollLeft').click(function(){
                var scrollAmount = $('#scrollGrid').width();
                $('#scrollGrid').animate({scrollLeft: -scrollAmount},1000);
                setTimeout(function(){ 
                    $(".gridScrollLeft").hide();
                    $(".gridScroll").show();
                }, 1000);
            });
            */
        });

    } // End Filltable



    loadGridAttempts = 0;
}

// DOCUMENT SCROLL
/*
siteHeader overlaps using second instance of background image to cover scrolling content.
#siteHeader - purple
siteHeaderImage - red
siteHeaderSpacer - blue
moduleBackground
moduleBackgroundImage
*/

var recentHeaderStatus = "fullnavOn";
var currentHeaderStatus = "fullnavOn";
$(document).ready(function() {
    //alert($('#siteHeader').css("position"));

    var navTopFromBar = 0;

    // This value will be incorrect because something else changes the DOM.
    // Error also occurs in Azure login: Cannot read property 'top' of undefined
    //var navTopFromTop = $('.navTop').offset().top; // $('.navTop').offset().top; // 120;

    var navTopFromTop = 0;

    //alert("navTopFromTop " + navTopFromTop);

    //alert("fixedTopBarBkgd: " + $('.fixedTopBarBkgd').height() + " navTop: " + $('.navTop').height() );

    //navTopFromTop = 0;
    //navTopFromTop = 117; // Temp

    //if ($('#siteHeader').css("position") == "static") {
        //alert($('#siteHeader').height());
        //alert('#siteHeader ' + $('#siteHeader').height()); // Why too high? 253px!
        //$('.siteHeaderSpacer').css("height",$('#siteHeader').height());
        //$('.siteHeaderSpacer').show();
    //}
    

    //alert("navTopFromBar: " + navTopFromBar);

/*
    var navTopOffset = 0;
    if ($('.navTop') { // Might need adjustment
        navTopOffset = $('.navTop').offset().top;
    }
    navTopFromBar = $('.fixedTopBarBkgd').height() - navTopOffset + 1;
    if (navTopFromBar == 0) {
        //$('.navTop').css("position","fixed");
        //$('.moduleBackgroundImage').css("position","fixed");
        //return;
    }
*/


    // Refresh. Initial navTop height might be too short due to change as font loads.

    /*
    $('.siteHeaderSpacer').css("height",$('#siteHeader').height());
    //alert("fixedTopBarBkgd: " + $('.fixedTopBarBkgd').height() + " navTop: " + $('.navTop').height() );

    $('#headerHeight').hide(); // #headerHeight is hidden because header itself defines space.
    $('#headerHeight').css("height",0);
    */

    // TEMP - Disabbled
    //$('.fixedTopBarBkgd').css('background','none');
    //$('.moduleBackground').css("position","static");
    
        // For fullnav
        //$('.fixedTopBar').css("position","absolute");
    //$('.navTop').css("position","static");

    //alert($(".sitemode").val());
    //if ($(".sitemode").val() == "fullnav") { // Not always available


    if (Cookies.get('sitemode') == 'fullnav') { 
        //$(".sitemoduleBackground").hide();
        //$(".siteHeaderImage").hide();
        //return; // Until nav reappears when scrolling back down.
    }

    if (params["embed"] != "1" && $(".moduleJS").width() <= 800) { // Narrow
        $("#siteHeader").append($(".topButtons")); // Move top buttons into header so they remain fixed when scrolling.
        
        $("#siteHeader").css("position","fixed");

        // BUG BUG - too tall here
        //$('#siteHeader').css("height","94px");
        //alert('.siteHeaderSpacer ' + $('#siteHeader').height());
        
        $('.siteHeaderSpacer').css("height",$('#siteHeader').height());

        //$('.siteHeaderSpacer').css("height","94px");

        $('.siteHeaderSpacer').show();
    }
    setHeaderOnScroll(recentHeaderStatus); // Initial init
    $(document).scroll(function () { // Whenever user scrolls browser up or down.
        if ($(".sitemode").val() != "fullnav") {
            // BugBug - Browser scroll gets triggered on map zoom click.
            // Disabled with fullnav because top of controls go completely off screen.
            // https://github.com/Leaflet/Leaflet/issues/4125
            setHeaderOnScroll(recentHeaderStatus);
        }
    });
});

function setHeaderOnScroll(recentHeaderStatus) {
    //console.log("setHeaderOnScroll");
    if ($('.navTop').length <= 0) {
        // Prevents error with $('.navTop').offset().top when not yet available.
        //return;
    }
    if ($('#siteHeader').hasClass("absoluteVideoHeader")) {
        return; // Avoid setting when video is displayed because navTop containing title will not be included in height.
    }

    //stick nav to top of page. Offset scroll.
    var amountOffScreen = $(this).scrollTop();

    var navTopFromTop = 0;
    if ($('.navTop').length) {
        navTopFromTop = $('.navTop').offset().top; 
    }
    if (navTopFromTop == 0) {
        // Is this needed here?  maybe move up?
        //$('#siteHeader').css('background-position-y', -$('.navTop').offset().top);
    }
    
    if (navTopFromTop == 0 && $(".sitemode").val() != "fullnav") { // Fixed topnav without fullnav, so no scrolling.
        //console.log("EXIT - always fixed " + $(".sitemode").val());
        //return; // Prevents initial movement when #siteHeader is always fixed.
    }

    if (amountOffScreen == 0) {
        //console.log("amountOffScreen == 0. currentHeaderStatus: " + currentHeaderStatus + ".  recentHeaderStatus: " + recentHeaderStatus + ".");
        currentHeaderStatus = "fullnavOn";
    } else if (amountOffScreen >= navTopFromTop) {
        currentHeaderStatus = "fullnavOff";
    } else {
        currentHeaderStatus = "fullnavOn";
    }
    if (currentHeaderStatus == recentHeaderStatus && amountOffScreen != 0) {
        //return;
    }

    if (currentHeaderStatus == "fullnavOff" && amountOffScreen != 0) { 

        // SCROLLED FAR ENOUGH TO LOCK HEADER IN PLACE.  FULL NAVIGATION NOW RESIDES "OFF SCREEN"
        //console.log("Full Nav OFFscreen - amountOffScreen: " + amountOffScreen + ", siteHeaderSpacer: " + $('.siteHeaderSpacer').height() + ", siteHeader: " + $('#siteHeader').height() + ", navTop: " + $('.navTop').height() + ", navTopFromTop: " + navTopFromTop);
        //alert("fullnavOff");

        $('.hideOnScroll').hide();
        $('.showOnScroll').show();

        $('#headerHolder').hide(); $('#navTopFromTop').hide(); // Hide full header from menu folder

        if ($(".sitemode").val() == "fullnav") { // Full navigation
            // Could add logo here, and top bar.
        }
        // May 19 comment out and replace with .siteHeader height below.
        //$('.siteHeaderSpacer').css("height",$('.navTop').height() + $('.fixedTopBarBkgd').height());
        
        if (!$(".leftedge").is(':visible')) { // For any future left side icons, etc.
            $('#siteHeader').css("position","fixed");
            $('#siteHeader').css("top","0px");
            $('.siteHeaderSpacer').css("height",$('#siteHeader').height());
            
            //$('.siteHeaderSpacer').show(); // Show when fixed.
            
        }

        $('.moduleBackgroundImage').css("position","fixed");

        if ($("#siteHeader").is(':visible')) { // Keeps hidden in embed display.
            $('.siteHeaderSpacer').show();
        }
        recentHeaderStatus = "fullnavOff";
    } else {
        //alert("fullnavOn");
        //console.log("Full Nav BACK ONscreen: " + amountOffScreen + ", siteHeaderSpacer: " + $('.siteHeaderSpacer').height() + ", siteHeader: " + $('#siteHeader').height() + ", navTop: " + $('.navTop').height() + ", navTopFromTop: " + navTopFromTop);
        
        $('.showOnScroll').hide();
        $('.hideOnScroll').show();

        //$('.showSectionMenu').addClass('showSectionMenuLg'); // Need to adjust, add alternative
        //$('.sectionTitleText').addClass('primaryTitle'); // Probably need alternative

        
        if ($(".sitemode").val() == "fullnav") { // Full navigation
            //alert("scroll back down");

            $('.moduleBackgroundImage').css("position","relative");
            $('.siteHeaderSpacer').hide();
            $('#siteHeader').css("position","relative"); // Un-fixed. Avoid setting to static because contained absolute background will overlap static.

            $('#headerHolder').show(); $('#navTopFromTop').show(); // Show full header from menu folder
        } else {
            //$('.siteHeaderSpacer').show(); // Added for mobile, so top of map is not covered.
        }

        recentHeaderStatus = "fullnavOn";
    }
    //$('.siteHeaderImage').css("height",$('#siteHeader').height()); // Same for both. Setting size prevents image from exceeding siteHeader. Not needed now since absolute within relative SiteHeader.
    //$('.sitemoduleBackground').css("height",$('#siteHeader').height());

}
function showFeature(cartodb_id, latlng, goLayer) {
    // Returns either a polygon or a blue map point.
    // This approach is too slow for the blue map point.
    //alert("latlng " + latlng);
    var table = goLayer.table;
    if (!table) {
        table = goLayer.item;
    }
    var tableSql = "select the_geom from " + table + " where cartodb_id =";
    if (goLayer.item == "crew") {
        // otherwise cid would not match....
        tableSql = "select counties.the_geom FROM counties JOIN export_contacts ON counties.county = export_contacts.county WHERE export_contacts.cartodb_id = "; // Contains the_geom with valid latlon.
    }
    var sql = new cartodb.SQL({ user: goLayer.username, format: 'geojson' });
    // ST_Simplify(the_geom, 0.1) as 
      sql.execute(tableSql + " {{cartodb_id}}", {cartodb_id: cartodb_id} ).done(function(geojson) {
        if (polygon) {
          map.removeLayer(polygon);
        }
        polygon = L.geoJson(geojson, { 
          style: {
            color: "#000",
            fillColor: "#fff",
            weight: 2,
            opacity: 0.65
          }
        }).addTo(map);

        /*
        Remove:
        ,
          onEachFeature: onEachFeature
        */

        if (latlng != "0,0" && latlng != "") {
            //alert("123");
            // Map is moving without this
            //map.setView(latlng, 9); // Was 9

            //map.panTo(latlng, 4); // Already panning without it.
            
            //alert("latlng " + latlng);
        }

        /*
        L.marker([latlng]).addTo(map)
        .bindPopup('A CSS3 popup.<br> Easily customizable.')
        .openPopup();
        */

      });
}
// Remove this, and ", onEachFeature: onEachFeature" above
/*
function onEachFeature(feature, layer) {
    console.log("onEachFeature");
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
*/
function clearConsole() {
    console.API;
    if (typeof console._commandLineAPI !== 'undefined') {
        console.API = console._commandLineAPI; //chrome
    } else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
        console.API = console._inspectorCommandLineAPI; //Safari
    } else if (typeof console.clear !== 'undefined') {
        console.API = console;
    }
    console.API.clear();
}
function lazyLoadCognito(url, callback, formID, entryOby)
{
    if (document.getElementById(url)) {

        //$(".cognito").html("");
        //$(document.getElementById(url)).attr("disabled", "disabled");

        $('.cognito').html(''); // Clear prior
        alert("Please hit refresh before starting a new form.");
        $('.hideFormClick').trigger("click");
        return;
    }

    

    //if (!document.getElementById(url)) { // Prevents multiple loads.

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = url; // Used to prevent multiple loads.
        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = callback;
        script.onload = callback;
        //$(document).ready(function () { // Only needed if appending to body
           var head = document.getElementsByTagName('head')[0];
           head.appendChild(script);
        //});           
    //} else {
    //    console.log("Script already available. Callback NOT used.");
    //}
}
function cognitoScriptLoaded() {
    var formID = $('.cognitoformid').val();
    // Name is the CompanyName or PropertyName (not a person's name)
    var entryObj = {"Name": name, "ContactName": { "First": "", "Last": "" }, "Address": { "City":"","State":"Georgia", "PostalCode": "","Country":"United States" }};
    
    
    Cognito.load("forms", { id: formID, entry: entryObj });
    //cognitoHtmlWaitLoop();
}
function cognitoScriptLoadedExisting() { // For "Update" button
    var formID = $('.cognitoformid').val();
    var entryObj = $('.formValuesHidden').val(); //retrieve object from hidden
    entryObj = JSON.parse(entryObj);

    Cognito.load("forms", { id: formID, entry: entryObj });
    //cognitoHtmlWaitLoop();
}

function getVideoPlayer(videoToken) {
    $(document).ready(function() {
        $('.video-player-holder').show();
        $('.video-player-' + videoToken).show();
        if(!$('.video-player-' + videoToken).length) {
            $('.video-player-holder').append("<div class='video-player-" + videoToken + "' data-id='" + videoToken + "'></div>");
            
            // HiRez image is loaded. Saves 500K by not preloading video.
            //(function() {
                var v = document.getElementsByClassName("video-player-" + videoToken);
                //var v = document.getElementsByClassName("video-player");
                for (var n = 0; n < v.length; n++) {
                    try { /* Prevent IE null reference error */
                        var p = document.createElement("div");
                        
                        p.innerHTML = videoThumb(videoToken);
                        //p.innerHTML = videoThumb(v[n].dataset.id); // data-id set on .video-player div
                        p.onclick = videoIframe;
                        v[n].appendChild(p);
                    } catch (e) {}
                }

                $('.play-button, .video-thumb, .video-player-holder').click(function(){
                    closeMenu();
                    $(".showVideo").show(); // Navbar icon so user can return to main layer and stop playing video.
                    
                    // No effect, here or when applied after .threeDotNavClick is inserted in header.
                    $(".threeDotNavClick").hide();
                    //alert("play-button");
                });


                //$(document).ready(function() {
                    // .video-player
                    $(".video-player-holder").hover(
                      function() {
                        //alert(".video-player hover");
                        //$( this ).append( $( "<span> ***</span>" ) );
                        $(".play-button").hide();
                        $(".play-button-hover").show();
                      }, function() {
                        //alert(".video-player hover exit");
                        //$( this ).find( "span:last" ).remove();
                        $(".play-button-hover").hide();
                        $(".play-button").show();
                        
                      }
                    );
                //});
            //})();
        }
    });
}

function videoThumb(id) {
    // Sharp image with overlapping button.
    return '<img class="video-thumb" src="//i.ytimg.com/vi/' + id + '/maxresdefault.jpg"><div class="play-button"></div><div class="play-button-hover"></div>';
}

function videoIframe() {
    var iframe = document.createElement("iframe");
    // &controls=0
    iframe.setAttribute("src", "//www.youtube.com/embed/" + this.parentNode.dataset.id + "?rel=0&list=PLcM79Nv2uVZAGECHfE4nTZAP-rdMuL2_S&autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&showinfo=0");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("id", "video-iframe");
    this.parentNode.replaceChild(iframe, this);
}
// End YouTube

// Resides outside layer fetch for preloading js files.
function loadScriptXXX(url)
{
	alert("loadScript " + url);
	if (!document.getElementById(url)) { // Prevents multiple loads.
		// Add the script tag to the head.
	    var head = document.getElementsByTagName('head')[0];
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = url;
		script.id = url; // Used to prevent multiple loads. Might be an alternate way to check if script tag existing using the src.
	    head.appendChild(script);
	}
}
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
		console.log("Script already available: " + url);
	}
}
function loadFrame(iframeID, iframeLink, iframeHeight, retainExistingIframes) {
    //alert(iframeLink + ' ' + iframeLink.indexOf("http:"));
    if (iframeLink.indexOf("http:") >= 0 && window.location.protocol == "https:") { // If a secure iFrame is not available, redirect off https to avoid error.
        location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
    }

    $('.hideFiltersClick').trigger("click");
    //if ($(".showDirectory").is(':visible')) {
    //    return;
    //}
    if (!document.getElementById(iframeID)) {
        if ($("#bts").val() != "01") {
            // iframeHolder allows all iframes to be hidden, while keeping most recently selected open within holder.
            // Height was 880. 1500 optimal for GP Sites page.
            if (!iframeHeight) {
                iframeHeight = "1500";
            }
            $("#iframeHolder").append('<div class="iframeHolder"><iframe class="iframe" id="' + iframeID + '" name="directoryframe" width="100%" height="' + iframeHeight + '" frameborder="0" src="' + iframeLink + '" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe></div>');
        }
    }
    if (retainExistingIframes == true) {
        //$('.iframe').hide();
    }
    $('#' + iframeID).show();
    $('#iframeHolder').show();
    $('.iframeHolder').show();
}
function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

$(document).ready(function() {

    // http://interactjs.io/
    
    interact('.contentPanel')
      .draggable({
        
        // enable inertial throwing
        inertia: true,
 
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener
      })
      .allowFrom('.dragContent')
      ;
    
    interact('.listPanel')
      .draggable({
        
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
          restriction: "body",
          endOnly: true,
          elementRect: { left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener
      })
      .allowFrom('.dragListContent, .dragListContent2')
      ;

    function dragMoveListener (event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
        target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    // this is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;




    // ALLOW HERO CLICK TO REACH VIDEO / SLIDESHOW

    //$('.clickThrough').on('mousemove click', function(e) {
    /*
    DELETE
    $("#heroContentXXX").click(function(event) {
        alert("clickThrough " + $(this).attr('id') + ' ' + event.type + ' ' + event.pageX + ", " + event.pageY);
        
        $("#testVclick").trigger(event);

        //$(this).next().trigger(event); // needed for Opera
        // Firefox/Webkit needs CSS pointer-events:none; which is set by .clickThrough in sites.css
    });
    */
   

	// INIT
	//$(window).load(function() { // Also waits for images to load.
	
			// Load CartoDB script so it's ready and waiting for search click.
			////loadScript('https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.12/cartodb.js');

            // Moved into index.html.  Doing so prevented 'removeChild' error.
			//loadScript('https://data.georgia.org/site/js/cartodb.js');
	
	//});

    //loadScript(root + 'js/leaflet.draw.js'); // Needs to be called when cartodb.js is loaded. Moved to html frontend instead.
    
    //alert("init");
    //document.getElementById("keywordsTB").focus();
});
//function doNothingYet() {
	// Catches callback from pre-loading of CartoDB script.
//}

$(document).ready(function () {
    // FIREBASE CMS
    //create firebase reference
    if (typeof Firebase !== 'undefined') {
        var dbRef = new Firebase("https://georgia-firebase.firebaseio.com/");
        var contactsRef = dbRef.child('cameraready-content')

        //load older conatcts as well as any newly added one...
        contactsRef.on("child_added", function(snap) {
          console.log("added", snap.key(), snap.val());
          document.querySelector('#contacts').innerHTML += (contactHtmlFromObject(snap.val()));
        });

        //prepare conatct object's HTML
        function contactHtmlFromObject(contact){
          console.log( contact );
          var html = '';
          html += '<li class="list-group-item contact">';
            html += '<div>';
              //html += '<p class="lead">'+contact.name+'</p>';
              //html += '<p>'+contact.email+'</p>';
              html += '<p>'+contact.description+'</p>';
              //html += '<p><small title="'+contact.location.zip+'">'+contact.location.city+', '+contact.location.state+'</small></p>';
            html += '</div>';
          html += '</li>';
          return html;
        }
    }
    // END FIREBASE
});

// TABLEAU
function initializeViz(tableauUrl,currentLayer) {
    $(document).ready(function () {
      if (typeof viz != "undefined") {
        //viz.dispose();
      }

      if ($(".tableauViz-" + currentLayer).length) {
        //alert("found");
        $(".tableauViz-" + currentLayer).show();
        return;
      }
      $(".tableauVizHolder").append("<div class='.tableauViz-" + currentLayer + "'></div>");

      //alert(".tableauVizHolder");
      $(".tableauVizHolder").show();

      if ($(".tableauViz-" + currentLayer)) {
        //alert("found .tableauViz-" + currentLayer);
      }

      //var placeholderDiv = document.getElementById("tableauViz-" + currentLayer);
      //var placeholderDiv = $(".tableauViz-" + currentLayer); // Might not work because Tableau javascript probably looks for Div on it's initial load.
      var placeholderDiv = $(".tableauViz");

      //var url = "http://public.tableau.com/views/WorldIndicators/GDPpercapita";
      var url = tableauUrl;
      var options = {
        width: placeholderDiv.offsetWidth,
        height: placeholderDiv.offsetHeight,
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: function () {
          workbook = viz.getWorkbook();
          activeSheet = workbook.getActiveSheet();
        }
      };
      viz = new tableau.Viz(placeholderDiv, url, options);
    });
}
// END TABLEAU

function addStateMask(whichMap) {

//L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpbG10dnA3NzY3OTZ0dmtwejN2ZnUycjYifQ.1W5oTOnWXQ9R1w8u3Oo1yA';
  //var map = L.mapbox.map('map', 'mapbox.streets')
    //.setView([32.6, -82.9001], 7);

  // First: choose our state. You could also load your own data.
  // The important part is that what you get out is a GeoJSON Feature
  // object, or something you turn into one.
  var theState = statesData.features[0];
  //alert(objToString(theState));

  // Coordinate rings in geojson fit inside of each other: the donut
  // and then the hole, let's make the outer donut everything and the
  // inner donut the state.
  theState.geometry.coordinates = [
      // the world
      [
          [-180, -90],
          [-180, 90],
          [180, 90],
          [180, -90],
          [-180, -90]
      ],
      // the state
      theState.geometry.coordinates[0]
  ];

  // statesData comes from 'georgia.js' script included on counties.html and regions.html.
  var statesLayer = L.geoJson(theState, {
    fillOpacity: 1,
    fillColor: 'rgba(255,0,0,0.0)',
    weight: 0
  }).addTo(whichMap);
}

$(document).ready(function () {
	if (document.createElement('input').webkitSpeech === undefined) {
	    // Not supported
	    //alert("Speech input not supported.");
	} else {
	    // Supported!
	    //alert("Speech input supported.");
	}
});

function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}



// Previously resided in controls.js
$(document).ready(function () {
    // Full Screen - Also supports embed.js.  May need to move into common file or duplicate.
    // Also expandFromWidget in embed.js.
    $('#expandPanel, .expandFullScreen').click(function(event) {
        if(inIframe()) { 
            var win = window.open(window.location.href.replace("/widget.html","/one.html").replace("/widget-local.html","/one.html"), '_blank');
            win.focus();
            return;
        }
        toggleFullScreen();
        $(".shortHeaderLogo").hide();
        $(".hideWithFull").hide();
        //$("#expandPanel").hide(); // Hitting ESCAPE would need another method to hide.
        $("#shrinkPanel").show();
        $("#fullscreenLogo").show();
        // z-index prevents black background.

        $("#headerBackground").css({'z-index':'0','background-size':'100%','position':'fixed'});

        $("#topMenuHolder").show();
        //$("#topMenuHolder").css({'background': '#333','opacity': '0.85', 'position':'fixed', 'left':'0', 'right':'0', 'top':'0', 'z-index':'99999'});
        
        $(".container").css({'width':'100%'});

        //$("#headerHeight").css({'height':'46px'});

        //$("#topMenuBar").hide();
        $("#rightIcons").hide();
        //$("#navTopBar").hide();
        //$("#sectionCategoriesToggle").hide();
        $('.hideSearch').trigger("click");
        
        $('.fixedTopBar').show();
          
    });
    $('#shrinkPanel').click(function(event) {
        toggleFullScreen();

        $(".shortHeaderLogo").show();
        $(".hideWithFull").show();
        $("#shrinkPanel").hide();
        $("#expandPanel").show();
        $("#fullscreenLogo").hide();
        $("#headerBackground").css({'background-size':'1170px'});
        //$("#headerHeight").css({'height':'121px'});
        $("#topMenuHolder").hide();
        $("#topMenuBar").show();
        $("#rightIcons").show();
        $("#navTopBar").show();
        $("#sectionCategoriesToggle").show();
        //$('.showSearch').trigger("click");
        // 'background-size':'auto',
        $("#headerBackground").css({'z-index':'-1','position':'absolute'});
        $(".container").css({'width':'1170px'});
    });
    function toggleFullScreen() {
      if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
       (!document.mozFullScreen && !document.webkitIsFullScreen)) {

        // Only if video is not visible. Otherwise become black.
        $('.moduleBackground').css({'z-index':'0'});   
        $('.expandFullScreen span').text("Shrink");

        // To do: Change icon to &#xE5D1;

        if (document.documentElement.requestFullScreen) {  
          document.documentElement.requestFullScreen();  
        } else if (document.documentElement.mozRequestFullScreen) {  
          document.documentElement.mozRequestFullScreen();  
        } else if (document.documentElement.webkitRequestFullScreen) {  
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
        }  
      } else {
        // alert("toggleFullScreen off");

        $('.moduleBackground').css({'z-index':'-1'}); // Allows video to overlap.
        $('.expandFullScreen span').text("Expand");

        if (document.cancelFullScreen) {  
          document.cancelFullScreen();  
        } else if (document.mozCancelFullScreen) {  
          document.mozCancelFullScreen();  
        } else if (document.webkitCancelFullScreen) {  
          document.webkitCancelFullScreen();  
        }  
      }  
    }
});