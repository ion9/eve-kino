(function(e){"use strict";var t=function(){this.gamepads=[];this.listeners={};this.platform=null;this.deadzone=.03;this.maximizeThreshold=.97};t.Platform={UNSUPPORTED:"unsupported",WEBKIT:"webkit",FIREFOX:"firefox"};t.Type={PLAYSTATION:"playstation",LOGITECH:"logitech",XBOX:"xbox",UNSUPPORTED:"unsupported"};t.Event={CONNECTED:"connected",DISCONNECTED:"disconnected",TICK:"tick",UNSUPPORTED:"unsupported",BUTTON_DOWN:"button-down",BUTTON_UP:"button-up",AXIS_CHANGED:"axis-changed"};t.Mapping={PLAYSTATION_FIREFOX:{buttons:{CROSS:14,CIRCLE:13,SQUARE:15,TRIANGLE:12,LB1:10,RB1:11,LEFT_STICK:1,RIGHT_STICK:2,START:3,SELECT:0,HOME:16,DPAD_UP:4,DPAD_DOWN:6,DPAD_LEFT:7,DPAD_RIGHT:5},axes:{LEFT_STICK_X:0,LEFT_STICK_Y:1,RIGHT_STICK_X:2,RIGHT_STICK_Y:3}},PLAYSTATION_WEBKIT:{buttons:{CROSS:0,CIRCLE:1,SQUARE:2,TRIANGLE:3,LB1:4,RB1:5,LB2:6,RB2:7,LEFT_STICK:10,RIGHT_STICK:11,START:9,SELECT:8,HOME:16,DPAD_UP:12,DPAD_DOWN:13,DPAD_LEFT:14,DPAD_RIGHT:15},axes:{LEFT_STICK_X:0,LEFT_STICK_Y:1,RIGHT_STICK_X:2,RIGHT_STICK_Y:3}},LOGITECH_FIREFOX:{buttons:{A:0,B:1,X:2,Y:3,LB:4,RB:5,LEFT_STICK:8,RIGHT_STICK:9,START:7,BACK:6,HOME:10,DPAD_UP:11,DPAD_DOWN:12,DPAD_LEFT:13,DPAD_RIGHT:14},axes:{LEFT_STICK_X:0,LEFT_STICK_Y:1,RIGHT_STICK_X:3,RIGHT_STICK_Y:4,LEFT_TRIGGER:function(e,t){if(e.axes[2]>0){return t._applyDeadzoneMaximize(e.axes[2])}else{return 0}},RIGHT_TRIGGER:function(e,t){if(e.axes[2]<0){return t._applyDeadzoneMaximize(e.axes[2]*-1)}else{return 0}}}},LOGITECH_WEBKIT:{buttons:{A:1,B:2,X:0,Y:3,LB:4,RB:5,LEFT_TRIGGER:6,RIGHT_TRIGGER:7,LEFT_STICK:10,RIGHT_STICK:11,START:9,BACK:8,HOME:10,DPAD_UP:11,DPAD_DOWN:12,DPAD_LEFT:13,DPAD_RIGHT:14},axes:{LEFT_STICK_X:0,LEFT_STICK_Y:1,RIGHT_STICK_X:2,RIGHT_STICK_Y:3}},XBOX:{buttons:{A:0,B:1,X:2,Y:3,LB:4,RB:5,LEFT_TRIGGER:6,RIGHT_TRIGGER:7,LEFT_STICK:10,RIGHT_STICK:11,START:9,BACK:8,DPAD_UP:12,DPAD_DOWN:13,DPAD_LEFT:14,DPAD_RIGHT:15,HOME:16},axes:{LEFT_STICK_X:0,LEFT_STICK_Y:1,RIGHT_STICK_X:2,RIGHT_STICK_Y:3}}};t.prototype.init=function(){this.platform=this._resolvePlatform();switch(this.platform){case t.Platform.WEBKIT:this._setupWebkit();break;case t.Platform.FIREFOX:this._setupFirefox();break;case t.Platform.UNSUPPORTED:return false}if(typeof e.requestAnimationFrame==="undefined"){e.requestAnimationFrame=e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame}this._update();return true};t.prototype.bind=function(e,t){if(typeof this.listeners[e]==="undefined"){this.listeners[e]=[]}this.listeners[e].push(t);return this};t.prototype.unbind=function(e,t){if(typeof e==="undefined"){this.listeners={};return}if(typeof t==="undefined"){this.listeners[e]=[];return}if(typeof this.listeners[e]==="undefined"){return false}for(var n=0;n<this.listeners[e].length;n++){if(this.listeners[e][n]===t){this.listeners[e].splice(n,1);return true}}return false};t.prototype.count=function(){return this.gamepads.length};t.prototype._fire=function(e,t){if(typeof this.listeners[e]==="undefined"){return}for(var n=0;n<this.listeners[e].length;n++){this.listeners[e][n].apply(this.listeners[e][n],[t])}};t.prototype._resolvePlatform=function(){if(typeof e.navigator.webkitGamepads!=="undefined"||typeof e.navigator.webkitGetGamepads!=="undefined"){return t.Platform.WEBKIT}else{return t.Platform.FIREFOX}};t.prototype._setupWebkit=function(){};t.prototype._setupFirefox=function(){var t=this;e.addEventListener("MozGamepadConnected",function(e){t._connect(e.gamepad)});e.addEventListener("MozGamepadDisconnected",function(e){t._disconnect(e.gamepad)})};t.prototype._getMapping=function(e){switch(e){case t.Type.PLAYSTATION:if(this.platform===t.Platform.FIREFOX){return t.Mapping.PLAYSTATION_FIREFOX}else if(this.platform===t.Platform.WEBKIT){return t.Mapping.PLAYSTATION_WEBKIT}else{return null}break;case t.Type.LOGITECH:if(this.platform===t.Platform.FIREFOX){return t.Mapping.LOGITECH_FIREFOX}else if(this.platform===t.Platform.WEBKIT){return t.Mapping.LOGITECH_WEBKIT}else{return null}break;case t.Type.XBOX:return t.Mapping.XBOX}return null};t.prototype._connect=function(e){e.type=this._resolveControllerType(e.id);if(e.type===t.Type.UNSUPPORTED){this._fire(t.Event.UNSUPPORTED,e);return false}e.mapping=this._getMapping(e.type);if(e.mapping===null){this._fire(t.Event.UNSUPPORTED,e);return false}e.state={};e.lastState={};e.downButtons=[];var n,r;for(n in e.mapping.buttons){e.state[n]=0;e.lastState[n]=0}for(r in e.mapping.axes){e.state[r]=0;e.lastState[r]=0}this.gamepads[e.index]=e;this._fire(t.Event.CONNECTED,e);return true};t.prototype._disconnect=function(e){var n=[],r;if(typeof this.gamepads[e.index]!=="undefined"){delete this.gamepads[e.index]}for(r=0;r<this.gamepads.length;r++){if(typeof this.gamepads[r]!=="undefined"){n[r]=this.gamepads[r]}}this.gamepads=n;this._fire(t.Event.DISCONNECTED,e)};t.prototype._resolveControllerType=function(e){e=e.toLowerCase();if(e.indexOf("playstation")!==-1){return t.Type.PLAYSTATION}else if(e.indexOf("logitech")!==-1||e.indexOf("wireless gamepad")!==-1){return t.Type.LOGITECH}else if(e.indexOf("xbox")!==-1||e.indexOf("360")!==-1){return t.Type.XBOX}else{return t.Type.UNSUPPORTED}};t.prototype._update=function(){var n=this,r,i,s,o,u,a,f,l;switch(this.platform){case t.Platform.WEBKIT:this._updateWebkit();break;case t.Platform.FIREFOX:this._updateFirefox();break}for(f=0;f<this.gamepads.length;f++){if(typeof this.gamepads[f]==="undefined"){continue}for(r in this.gamepads[f].mapping.buttons){u=this.gamepads[f].mapping.buttons[r];if(typeof u==="function"){a=u(this.gamepads[f],this)}else{a=this.gamepads[f].buttons[u]}i=a>.5?true:false;s=false;for(l=0;l<this.gamepads[f].downButtons.length;l++){if(this.gamepads[f].downButtons[l]===r){s=true;o=f;break}}this.gamepads[f].state[r]=a;if(i!==s){if(a>.5){this._fire(t.Event.BUTTON_DOWN,{gamepad:this.gamepads[f],mapping:u,control:r});this.gamepads[f].downButtons.push(r)}else if(a<.5){this._fire(t.Event.BUTTON_UP,{gamepad:this.gamepads[f],mapping:u,control:r});this.gamepads[f].downButtons.splice(o,1)}}if(a!==0&&a!==1&&a!==this.gamepads[f].lastState[r]){this._fire(t.Event.AXIS_CHANGED,{gamepad:this.gamepads[f],mapping:u,axis:r,value:a})}this.gamepads[f].lastState[r]=a}for(r in this.gamepads[f].mapping.axes){u=this.gamepads[f].mapping.axes[r];if(typeof u==="function"){a=u(this.gamepads[f],this)}else{a=this._applyDeadzoneMaximize(this.gamepads[f].axes[u])}this.gamepads[f].state[r]=a;if(a!==this.gamepads[f].lastState[r]){this._fire(t.Event.AXIS_CHANGED,{gamepad:this.gamepads[f],mapping:u,axis:r,value:a})}this.gamepads[f].lastState[r]=a}}if(this.gamepads.length>0){this._fire(t.Event.TICK,this.gamepads)}e.requestAnimationFrame(function(){n._update()})};t.prototype._updateWebkit=function(){var t;if(typeof e.navigator.webkitGamepads==="object"){t=e.navigator.webkitGamepads}else if(typeof e.navigator.webkitGetGamepads==="function"){t=e.navigator.webkitGetGamepads()}else{return}if(t.length!==this.gamepads.length){var n,r;for(r=0;r<t.length;r++){n=t[r];if(n!==null&&typeof n!=="undefined"&&typeof this.gamepads[n.index]==="undefined"){this._connect(n)}}for(r=0;r<this.gamepads.length;r++){if(this.gamepads[r]!==null&&typeof this.gamepads[r]!=="undefined"&&typeof t[r]==="undefined"){this._disconnect(this.gamepads[r])}}}};t.prototype._updateFirefox=function(){};t.prototype._applyDeadzoneMaximize=function(e,t,n){t=typeof t!=="undefined"?t:this.deadzone;n=typeof n!=="undefined"?n:this.maximizeThreshold;if(e>=0){if(e<t){e=0}else if(e>n){e=1}}else{if(e>-t){e=0}else if(e<-n){e=-1}}return e};e.Gamepad=t})(window)