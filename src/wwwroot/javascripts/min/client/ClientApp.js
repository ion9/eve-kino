define("Defaults",[],function(){var t={inputsByAction:{}},e=function(e,n){t.inputsByAction[e]=n};return e("yawLeft","RIGHT_STICK_X_NEG"),e("yawRight","RIGHT_STICK_X_POS"),e("pitchUp","RIGHT_STICK_Y_POS"),e("pitchDown","RIGHT_STICK_Y_NEG"),e("rollClockwise","LEFT_STICK_X_POS"),e("rollCounter","LEFT_STICK_X_NEG"),e("moveForward","RIGHT_TOP_SHOULDER"),e("moveBackward","LEFT_TOP_SHOULDER"),e("moveLeft","FACE_3"),e("moveRight","FACE_2"),e("moveUp","FACE_4"),e("moveDown","FACE_1"),t}),define("jade",[],function(){}),define("ui/UiTemplates",["jade"],function(t){return t&&void 0!==t.runtime&&(t=t.runtime),this.UiTemplates=this.UiTemplates||{},this.UiTemplates.CreateSessionDialog=function(){var t=[];return t.push('<div class="modal-header"><h3>Create a Session</h3><span>eve-kino v.{{version}}</span></div><div class="modal-body"><div class="btn-group"><button type="button" ng-model="setType" btn-radio="\'space\'" class="btn">Space</button><button type="button" ng-model="setType" btn-radio="\'chromaKey\'" class="btn">Chroma Key</button></div><div class="row-fluid"><div ng-show="(setType == \'space\')">Select a background:<div class="row-fluid"><select ng-model="selectedBackground" ng-options="bg as bg.resourceUrl for bg in backgrounds" size="5" class="span12"></select></div></div><div ng-show="(setType == \'chromaKey\')">Pick a color (RGB values):<div class="row-fluid"><div class="span4"><input type="text" ng-model="chromaKey" placeholder="#0044BB or #0F0"/></div><div class="span4"></div><div ng-style="{ \'backgroundColor\': chromaKey }" class="span4 container"></div></div></div></div></div><div class="modal-footer"><button ng-click="create(setType)" ng-disabled="!canBeCreated()" class="btn btn-primary">Create</button></div>'),t.join("")},this.UiTemplates.SplashDialog=function(){var t=[];return t.push('<div class="modal-header"><h3>{{ title }}</h3></div><div class="modal-body">{{ message }}</div>'),t.join("")},this.UiTemplates}),define("ui/SplashDialog",["ui/UiTemplates"],function(t){var e="SplashDialogController",n=t.SplashDialog(),o=function(t,e,n){t.title=n.title,t.message=n.message},r=function(t){t.controller(e,["$scope","dialog","model",o])},i=function(t,o){var r={backdrop:!0,backdropFade:!1,backdropClick:!1,keyboard:!1,controller:e,template:n,resolve:{model:function(){return o}}};return t.dialog(r)},a={controller:o,template:n,register:r,getBuilder:i};return a}),define("version",[],function(){return"0.0.3"}),define("ui/CreateSessionDialog",["ui/UiTemplates","version"],function(t,e){var n="CreateSessionDialogController",o=t.CreateSessionDialog(),r={"^#([0-9A-Fa-f]){6}$":function(t){var e=parseInt(t.substr(1,2),16),n=parseInt(t.substr(3,2),16),o=parseInt(t.substr(5,2),16);return[e/255,n/255,o/255]},"^#([0-9A-Fa-f]){3}$":function(t){var e=parseInt(t.substr(1,1),16),n=parseInt(t.substr(2,1),16),o=parseInt(t.substr(3,1),16);return[e/15,n/15,o/15]}},i=function(t,e){var n,o;for(n in r)o=new RegExp(n),o.test(t)&&e(r[n])},a=function(t){var e=[0,0,0];return i(t,function(n){e=n(t)}),e},s=function(t){var e=!1;return i(t,function(){e=!0}),e},c=function(t,n,o){t.version=e,t.setType="space",t.backgrounds=o.backgrounds,t.selectedBackground=o.backgrounds[0],t.chromaKey="#00FF00",t.canBeCreated=function(){var e=!1;return"space"===t.setType?e=!!t.selectedBackground:"chromaKey"===t.setType&&(e=s(t.chromaKey)),e},t.create=function(e){var o={};o.space=function(e){return e.createSpaceSet(t.selectedBackground)},o.chromaKey=function(e){return e.createChromaKeyedSet(a(t.chromaKey))},n.close(o[e])}},u=function(t){t.controller(n,["$scope","dialog","model",c])},p=function(t,e){var r={backdrop:!0,backdropFade:!1,backdropClick:!1,keyboard:!1,controller:n,template:o,resolve:{model:function(){return e}}};return t.dialog(r)},h={controller:c,template:o,register:u,getBuilder:p};return h}),define("ui/Dialogs",["ui/SplashDialog","ui/CreateSessionDialog"],function(t,e){var n={splashDialog:t,createSessionDialog:e};return n}),define("util/GlHelper",["lib/gl-matrix"],function(t){t.mat4.multiply3x3=t.mat4.multiplyVec3;var e=Math.PI/180,n={forward:-1,upward:-1,rightward:1},o={rollClockwise:-1,pitchUp:-1,yawRight:-1},r={forward:1,upward:1,rightward:-1},i={rollClockwise:1,pitchUp:1,yawRight:-1},a={VIEW_DIRECTION_FORWARD:n.forward,VIEW_DIRECTION_UP:n.upward,VIEW_DIRECTION_RIGHT:n.rightward,VIEW_ROTATION_ROLL_CLOCKWISE:o.rollClockwise,VIEW_ROTATION_PITCH_UP:o.pitchUp,VIEW_ROTATION_YAW_RIGHT:o.yawRight,VIEW_VECTOR_FORWARD:t.vec3.create([0,0,n.forward]),VIEW_VECTOR_UP:t.vec3.create([0,n.upward,0]),VIEW_VECTOR_RIGHT:t.vec3.create([n.rightward,0,0]),MODEL_DIRECTION_FORWARD:r.forward,MODEL_DIRECTION_UP:r.upward,MODEL_DIRECTION_RIGHT:r.rightward,MODEL_ROTATION_ROLL_CLOCKWISE:i.rollClockwise,MODEL_ROTATION_PITCH_UP:i.pitchUp,MODEL_ROTATION_YAW_RIGHT:i.yawRight,MODEL_VECTOR_FORWARD:t.vec3.create([0,0,r.forward]),MODEL_VECTOR_UP:t.vec3.create([0,r.upward,0]),MODEL_VECTOR_RIGHT:t.vec3.create([r.rightward,0,0]),degreeToRad:function(t){return t*e}};return a}),define("production/Animator",["lib/gl-matrix","util/GlHelper"],function(t,e){var n=t.quat4.create(),o=t.vec3.create(),r={getFrameData:function(){return null}},i=function(o,r,i,a){t.quat4.fromAngleAxis(r*e.MODEL_ROTATION_ROLL_CLOCKWISE,e.MODEL_VECTOR_FORWARD,n),t.quat4.multiply(o,n,o),t.quat4.fromAngleAxis(i*e.MODEL_ROTATION_PITCH_UP,e.MODEL_VECTOR_RIGHT,n),t.quat4.multiply(o,n,o),t.quat4.fromAngleAxis(a*e.MODEL_ROTATION_YAW_RIGHT,e.MODEL_VECTOR_UP,n),t.quat4.multiply(o,n,o)},a=function(t){this.prop=t,this.script=r,this.commandChannel=null,this.lastState=null};return a.prototype.setScript=function(t){this.script=t},a.prototype.getScript=function(){return this.script},a.prototype.getProp=function(){return this.prop},a.prototype.setCommandChannel=function(t){this.commandChannel=t,this.resetToScript()},a.prototype.resetToScript=function(){var t=this.prop.getStateData(this.lastState),e=this.script.getFrameData()||t;this.prop.setStateData(e)},a.prototype.update=function(){var t=this.prop.getStateData(this.lastState),e=this.prop.getStateData(),n=this.script.getFrameData()||e;e=this.commandChannel?this.updateByCommands(e,t,n):n,this.prop.setStateData(e),this.script.setFrameData(e),this.lastState=t},a.prototype.updateByCommands=function(n){var r=this.commandChannel.getCommands(),a=.02*(r.rollClockwise-r.rollCounter),s=.02*(r.pitchUp-r.pitchDown),c=.02*(r.yawRight-r.yawLeft),u=r.moveUp-r.moveDown,p=r.moveRight-r.moveLeft,h=r.moveForward-r.moveBackward;return i(n.rotation,a,s,c),o[0]=p*e.MODEL_DIRECTION_RIGHT,o[1]=u*e.MODEL_DIRECTION_UP,o[2]=6.6*h*e.MODEL_DIRECTION_FORWARD,t.quat4.multiplyVec3(n.rotation,o),n.position[0]+=o[0],n.position[1]+=o[1],n.position[2]+=o[2],n},a}),define("production/StageManager",["production/Animator"],function(t){var e=function(t){this.stage=t,this.animators=[]};return e.prototype.updateStage=function(){this.animators.forEach(function(t){t.update()})},e.prototype.getAnimator=function(e){var n=this.findAnimatorByProp(e);return n||(n=new t(e),this.animators.push(n)),n},e.prototype.findAnimatorByProp=function(t){var e=null;return this.animators.forEach(function(n){n.getProp()===t&&(e=n)}),e},e}),define("controls/CommandChannel",[],function(){var t=function(t,e,n,o){this.owner=t,this.id=e,this.type=n,this.actions=o,this.resetCommands()};return t.prototype.resetCommands=function(){var t=this;this.commands={},this.actions.forEach(function(e){t.commands[e]=0})},t.prototype.close=function(){this.owner.removeCommandChannel(this.id)},t.prototype.hasAction=function(t){return this.actions.indexOf(t)>=0},t.prototype.setCommandIntensity=function(t,e){this.commands[t]=e},t.prototype.getCommands=function(){return this.commands},t}),define("controls/InputChannel",[],function(){var t=function(t,e,n){this.owner=t,this.id=e,this.type=n};return t.prototype.close=function(){this.owner.removeInputChannel(this.id)},t.prototype.setIntensity=function(t,e){this.owner.setInputIntensity(this.type,t,e)},t}),define("production/Director",["controls/CommandChannel","controls/InputChannel"],function(t,e){var n=function(){this.bindings={},this.commandChannels={},this.inputChannels={},this.idCounter=0};return n.prototype.getNextId=function(){return""+this.idCounter++},n.prototype.getInputChannel=function(t){var n=this.getNextId(),o=new e(this,n,t);return this.inputChannels[n]=o,o},n.prototype.removeInputChannel=function(t){delete this.inputChannels[t]},n.prototype.getCommandChannel=function(e,n){var o=this.getNextId(),r=new t(this,o,e,n);return this.commandChannels[o]=r,r},n.prototype.removeCommandChannel=function(t){delete this.commandChannels[t]},n.prototype.getBindings=function(){return this.bindings},n.prototype.addBinding=function(t,e){this.bindings[t.actionName]=[e]},n.prototype.setInputIntensity=function(t,e,n){var o=this,r=function(t){var r=o.bindings[t];r&&r.forEach(function(r){e===r.inputName&&o.setActionIntensity(t,n)})};for(var i in this.bindings)r(i)},n.prototype.setActionIntensity=function(t,e){var n,o;for(n in this.commandChannels)o=this.commandChannels[n],o.hasAction(t)&&o.setCommandIntensity(t,e)},n}),define("production/CameraOperator",["lib/gl-matrix","util/GlHelper"],function(t,e){var n=["pitchUp","pitchDown","rollClockwise","rollCounter","yawRight","yawLeft","moveUp","moveDown","moveForward","moveBackward","moveRight","moveLeft"],o=t.vec3.create(),r=function(){var n=t.quat4.create();return function(o,r,i,a){t.quat4.fromAngleAxis(r*e.VIEW_ROTATION_ROLL_CLOCKWISE,e.VIEW_VECTOR_FORWARD,n),t.quat4.multiply(n,o,o),t.quat4.fromAngleAxis(i*e.VIEW_ROTATION_PITCH_UP,e.VIEW_VECTOR_RIGHT,n),t.quat4.multiply(n,o,o),t.quat4.fromAngleAxis(a*e.VIEW_ROTATION_YAW_RIGHT,e.VIEW_VECTOR_UP,n),t.quat4.multiply(n,o,o)}}(),i=function(e,n){t.quat4.set(e,n),r(n,0,0,-Math.PI),t.quat4.inverse(n)},a=function(){var e=t.quat4.create();return function(n,o){return i(n,e),t.quat4.multiplyVec3(e,o),o}}(),s=function(t,e){this.camera=t,this.shotList=e,this.commandChannel=null,this.lastState=null};return s.getActionNames=function(){return n.slice(0)},s.prototype.getShotList=function(){return this.shotList},s.prototype.setCommandChannel=function(t){this.commandChannel=t,this.resetToShotList()},s.prototype.setChaseObject=function(t){this.chaseObject=t,this.chaseObject||this.resetToShotList()},s.prototype.resetToShotList=function(){var t=this.camera,e=t.getStateData(this.lastState),n=this.shotList.getFrameData()||e;t.setStateData(n)},s.prototype.placeObjectInFrontOfCamera=function(e,n){var o=e.getStateData(),r=this.camera.getStateData(),a=n>10?n:10;i(r.rotation,o.rotation),o.position=[0,0,a],t.quat4.multiplyVec3(o.rotation,o.position),t.vec3.subtract(o.position,r.position),e.setStateData(o)},s.prototype.updateCamera=function(){var t=this.camera,e=t.getStateData(this.lastState),n=t.getStateData(),o=this.shotList.getFrameData()||n;n=this.chaseObject?this.updateByChase(n,e):this.commandChannel?this.updateByCommands(n,e,o):o,t.setStateData(n),this.shotList.setFrameData(n),this.lastState=e},s.prototype.updateByChase=function(n){var o=this.chaseObject.getStateData(),i=this.chaseObject.getBoundingSphereRadius(),a=-10-2*i;return t.vec3.negate(o.position,n.position),t.quat4.set(o.rotation,n.rotation),t.quat4.inverse(n.rotation),r(n.rotation,0,e.degreeToRad(-1)*e.VIEW_ROTATION_PITCH_UP,Math.PI),t.vec3.set([0,.5*-i,a],n.viewOffset),n},s.prototype.updateByCommands=function(t){var n=this.commandChannel.getCommands(),i=.02*(n.rollClockwise-n.rollCounter),s=.02*(n.pitchUp-n.pitchDown),c=.02*(n.yawRight-n.yawLeft),u=n.moveUp-n.moveDown,p=n.moveRight-n.moveLeft,h=n.moveForward-n.moveBackward;return r(t.rotation,i,s,c),o[0]=p*e.VIEW_DIRECTION_RIGHT,o[1]=u*e.VIEW_DIRECTION_UP,o[2]=6.6*h*e.VIEW_DIRECTION_FORWARD,a(t.rotation,o),t.position[0]+=o[0],t.position[1]+=o[1],t.position[2]+=o[2],t.viewOffset[0]=t.viewOffset[1]=t.viewOffset[2]=0,t},s}),define("production/Resources",["production/StageManager","production/Director","production/CameraOperator"],function(t,e,n){var o={StageManager:t,Director:e,CameraOperator:n};return o}),define("controls/Gamepad",["lib/gamepad"],function(){var t=function(){this.listeners=[]};return t.prototype.getRuntimeId=function(){return this.runtimeId},t.prototype.addListener=function(t){this.listeners.push(t)},t.prototype.onDeviceDisconnected=function(){this.listeners.forEach(function(t){t.onGamepadDisconnected()})},t.prototype.onControlValueChanged=function(t,e){this.listeners.forEach(function(n){n.onControlValueChanged(t,e)})},t}),define("controls/GamepadApi",["lib/gamepad","controls/Gamepad"],function(t,e){var n=function(){this.lib=new t,this.gamepads={},this.idCounter=0,this.connectionListeners=[]};return n.prototype.init=function(){var e=this;return this.lib.bind(t.Event.CONNECTED,function(t){e.onDeviceConnected(t)}),this.lib.bind(t.Event.DISCONNECTED,function(t){e.onDeviceDisonnected(t)}),this.lib.bind(t.Event.BUTTON_DOWN,function(t){e.onControlValueChanged(t.gamepad.index,t.control,1)}),this.lib.bind(t.Event.BUTTON_UP,function(t){e.onControlValueChanged(t.gamepad.index,t.control,0)}),this.lib.bind(t.Event.AXIS_CHANGED,function(t){e.onAxisValueChanged(t.gamepad.index,t.axis,t.value)}),this.lib.init()},n.prototype.getGamepads=function(){var t,e=[];for(t in this.gamepads)e.push(this.gamepads[t]);return e},n.prototype.addGamepadListener=function(t){this.connectionListeners.push(t)},n.prototype.onDeviceConnected=function(t){var n=new e(this.idCounter++);this.gamepads[t.index]=n,this.connectionListeners.forEach(function(t){t.onGamepadConnected(n)})},n.prototype.onDeviceDisonnected=function(t){var e=this.gamepads[t.index];e&&(delete this.gamepads[t.index],e.onDeviceDisconnected(),this.connectionListeners.forEach(function(t){t.onGamepadDisconnected(e)}))},n.prototype.onControlValueChanged=function(t,e,n){var o=this.gamepads[t];o&&o.onControlValueChanged(e,n)},n.prototype.onAxisValueChanged=function(t,e,n){var o=this.gamepads[t];o&&(0>n?(o.onControlValueChanged(e+"_POS",0),o.onControlValueChanged(e+"_NEG",-n)):(o.onControlValueChanged(e+"_NEG",0),o.onControlValueChanged(e+"_POS",n)))},n}),define("production/ccp/res/Ship",["lib/gl-matrix"],function(t){var e=function(e,n,o){this.ccpwgl=e,this.obj=n,this.id=o,this.position=t.vec3.create(),this.rotation=t.quat4.identity(),this.transform=t.mat4.identity()};return e.prototype.toString=function(){return"Ship "+this.id},e.prototype.getBoundingSphereRadius=function(){return this.obj.getBoundingSphere()[1]},e.prototype.getStateData=function(e){var n=e||{};return n.position=t.vec3.set(this.position,n.position||[0,0,0]),n.rotation=t.quat4.set(this.rotation,n.rotation||[0,0,0,1]),n},e.prototype.setStateData=function(e){t.vec3.set(e.position,this.position),t.quat4.set(e.rotation,this.rotation),t.mat4.fromRotationTranslation(this.rotation,this.position,this.transform),this.obj.setTransform(this.transform)},e}),define("production/ccp/res/ShipArchetype",["production/ccp/res/Ship"],function(t){var e=function(){this.resourceUrl=""};return e.prototype.request=function(e,n,o,r){return n.loadShip(this.resourceUrl,function(){o.resolve(new t(e,this,r))})},e.prototype.setResourceUrl=function(t){return this.resourceUrl=t,this},e}),define("production/ccp/res/Planet",["lib/gl-matrix"],function(t){var e=function(e,n){this.obj=e,this.id=n,this.position=t.vec3.create(),this.rotation=t.quat4.identity(),this.transform=t.mat4.identity(),this.radius=6e4};return e.prototype.toString=function(){return"Planet "+this.id},e.prototype.getBoundingSphereRadius=function(){return this.radius},e.prototype.getStateData=function(e){var n=e||{};return n.position=t.vec3.set(this.position,n.position||[0,0,0]),n.rotation=t.quat4.set(this.rotation,n.rotation||[0,0,0,1]),n},e.prototype.setStateData=function(e){t.vec3.set(e.position,this.position),t.quat4.set(e.rotation,this.rotation),t.mat4.fromRotationTranslation(this.rotation,[0,0,0],this.transform),t.mat4.scale(this.transform,[this.radius/2,this.radius/2,this.radius/2]),this.transform[12]=this.position[0],this.transform[13]=this.position[1],this.transform[14]=this.position[2],this.obj.setTransform(this.transform)},e}),define("production/ccp/res/PlanetArchetype",["production/ccp/res/Planet"],function(t){var e=function(){this.resourceUrl="",this.itemId=0,this.atmosphereUrl=null,this.heightMap1Url=null,this.heightMap2Url=null};return e.prototype.request=function(e,n,o,r){var i=n.loadPlanet(this.itemId,this.resourceUrl,this.atmosphereUrl,this.heightMap1Url,this.heightMap2Url);o.resolve(new t(i,r))},e.prototype.setItemId=function(t){return this.itemId=t,this},e.prototype.setResourceUrl=function(t){return this.resourceUrl=t,this},e.prototype.setAtmosphereUrl=function(t){return this.atmosphereUrl=t,this},e.prototype.setHeightMap1Url=function(t){return this.heightMap1Url=t,this},e.prototype.setHeightMap2Url=function(t){return this.heightMap2Url=t,this},e}),define("production/ccp/res/Scenery",["lib/gl-matrix"],function(t){var e=function(e,n,o){this.ccpwgl=e,this.obj=n,this.id=o,this.position=t.vec3.create(),this.rotation=t.quat4.identity(),this.transform=t.mat4.identity()};return e.prototype.toString=function(){return"Scenery "+this.id},e.prototype.getBoundingSphereRadius=function(){return this.obj.getBoundingSphere()[1]},e.prototype.getStateData=function(e){var n=e||{};return n.position=t.vec3.set(this.position,n.position||[0,0,0]),n.rotation=t.quat4.set(this.rotation,n.rotation||[0,0,0,1]),n},e.prototype.setStateData=function(e){t.vec3.set(e.position,this.position),t.quat4.set(e.rotation,this.rotation),t.mat4.fromRotationTranslation(this.rotation,this.position,this.transform),this.obj.setTransform(this.transform)},e}),define("production/ccp/res/SceneryArchetype",["production/ccp/res/Scenery"],function(t){var e=function(){this.resourceUrl=""};return e.prototype.request=function(e,n,o,r){return n.loadObject(this.resourceUrl,function(){o.resolve(new t(e,this,r))})},e.prototype.setResourceUrl=function(t){return this.resourceUrl=t,this},e}),define("production/Track",[],function(){var t=function(t){this.data=t,this.currentFrame=0};return t.prototype.getLength=function(){return this.data.length},t.prototype.setCurrentFrame=function(t){this.currentFrame=t},t.prototype.getFrameData=function(){var t=null,e=this.data.length;return e>0&&(t=e>this.currentFrame?this.data[this.currentFrame]:this.data[e-1]),t},t.prototype.setRecording=function(t){this.recording=t},t.prototype.setFrameData=function(t){var e=this.data.length;this.recording&&(e<this.currentFrame&&(e>0?this.pushFrameUntilCurrentIndex(this.data[e-1]):this.pushFrameUntilCurrentIndex(t)),this.data[this.currentFrame]=t)},t.prototype.pushFrameUntilCurrentIndex=function(t){for(var e=this.data.length;e<this.currentFrame;)this.data.push(t),e++},t}),define("production/Reel",[],function(){var t=function(){this.tracks=[],this.currentFrame=0};return t.prototype.getPosition=function(){return this.currentFrame},t.prototype.getLength=function(){var t=0;return this.tracks.forEach(function(e){var n=e.getLength();n>t&&(t=n)}),t},t.prototype.addTrack=function(t){this.tracks.push(t),t.setCurrentFrame(this.currentFrame)},t.prototype.skipTo=function(t){this.currentFrame=t,this.tracks.forEach(function(e){e.setCurrentFrame(t)})},t.prototype.nextFrame=function(){this.skipTo(this.currentFrame+1)},t}),define("ApplicationController",["Defaults","ui/Dialogs","production/Resources","controls/GamepadApi","production/ccp/res/ShipArchetype","production/ccp/res/PlanetArchetype","production/ccp/res/SceneryArchetype","production/Track","production/Reel"],function(t,e,n,o,r,i,a,s,c){var u=function(t,e){var n=new r;n.setResourceUrl(e),t.props.push(n)},p=function(t,e,n,o,r,a){var s=new i;s.setItemId(e),s.setResourceUrl(n),s.setAtmosphereUrl(o),s.setHeightMap1Url(r),s.setHeightMap2Url(a),t.props.push(s)},h=function(t,e){var n=new a;n.setResourceUrl(e),t.props.push(n)},l=function(t,e){t.status="Initializing...",t.record=function(){e.record()},t.stop=function(){e.stop()},t.play=function(){e.play()},t.addProp=function(t){e.addProp(t)},t.setFocusOnCamera=function(){e.setFocusOnCamera()},t.setFocusOnProp=function(t){e.setFocusOnProp(t)},t.encodeSession=function(){return e.encodeSession()},t.stageProps=[],t.props=[],u(t,"res:/dx9/model/ship/amarr/battleship/ab3/ab3_t1.red"),u(t,"res:/dx9/model/ship/gallente/Cruiser/GC3/CreoDron/GC3_T2_CreoDron.red"),u(t,"res:/dx9/model/ship/amarr/at1/at1.red"),u(t,"res:/dx9/model/ship/jove/capsule/capsule.red"),p(t,40000002,"res:/dx9/model/WorldObject/Planet/Template/Terrestrial/P_Terrestrial_61.red",void 0,"res:/dx9/model/worldobject/planet/Terrestrial/Terrestrial03_H.png","res:/dx9/model/worldobject/planet/Terrestrial/Terrestrial04_H.png"),p(t,40000100,"res:/dx9/model/WorldObject/Planet/Template/Gas/P_GasGiant_12.red",void 0,"res:/dx9/model/worldobject/planet/Gasgiant/GasGiant01_D.png","res:/dx9/model/worldobject/planet/Gasgiant/GasGiant03_D.png"),h(t,"res:/dx9/Model/station/gallente/gs2/gs2.red"),h(t,"res:/dx9/model/jumpgate/amarr/abg.red"),h(t,"res:/dx9/model/worldobject/asteroid/zuthrine/shards/zuthrine_shard01_unmined.red")},d=function(t,n,o,r,i){var a=this;this.productionManager=r,this.modelView=t,this.dialogFactory=n,l(t,this,o),r.setResourcePath("res","//web.ccpgamescdn.com/ccpwgl/res/");var s={createSpaceSet:function(t){return r.createSet(i,t.resourceUrl)},createChromaKeyedSet:function(t){return r.createChromaKeyedSet(i,t)}},c={backgrounds:[{resourceUrl:"res:/dx9/scene/universe/a01_cube.red"}]},u=e.createSessionDialog.getBuilder(this.dialogFactory,c),p=null;u.open().then(function(t){return p=a.showSplash("Creating set...","Please wait."),t(s)}).then(function(e){p.close(),p=null,a.onSetCreated(e),t.status="Set created",t.$apply()},function(t){var e=t&&(t.message||t)||"Unknown reason. That's bad.";p.close(),p=null,a.showSplash("Failed to create a set. Try Reloading.",e)})};d.prototype.showSplash=function(t,n){var o={title:t,message:n},r=e.splashDialog.getBuilder(this.dialogFactory,o);return r.open(),this.modelView.$$phase||this.modelView.$apply(),r},d.prototype.encodeSession=function(){var t={};return JSON.stringify(t)},d.prototype.addProp=function(t){var e=this,n=this.set.getStage().enter(t);n.then(function(t){var n=t.getBoundingSphereRadius();e.cameraOperator.placeObjectInFrontOfCamera(t,n),e.createScriptedAnimatorForProp(t),e.modelView.stageProps.push(t),e.modelView.$apply(),e.setFocusOnProp(t)})},d.prototype.createScriptedAnimatorForProp=function(t){var e=new s([]),n=this.stageManager.getAnimator(t);n.setScript(e),this.reel.addTrack(e)},d.prototype.createDefaultBindings=function(){for(var e in t.inputsByAction)this.director.addBinding({actionName:e},{inputName:t.inputsByAction[e]})},d.prototype.setupGamepadInput=function(){var t=this.director.getInputChannel("gamepad"),e={onGamepadDisconnected:function(){},onControlValueChanged:function(e,n){t.setIntensity(e,n)}},n=new o;n.addGamepadListener({onGamepadConnected:function(t){t.addListener(e)},onGamepadDisconnected:function(){}}),n.init()},d.prototype.onSetCreated=function(t){var e=this;this.set=t,this.director=new n.Director,this.reel=new c,this.stopReelTransmission(),this.camCommands=this.director.getCommandChannel("camera",n.CameraOperator.getActionNames());var o=new s([]);this.reel.addTrack(o),this.cameraOperator=new n.CameraOperator(t.getSceneCamera(),o),this.setFocusOnCamera(),this.stageManager=new n.StageManager(t.getStage()),this.createDefaultBindings(),this.setupGamepadInput(),this.animCommands=e.director.getCommandChannel("animator",n.CameraOperator.getActionNames()),t.getSyncSource().setCallback(function(){e.stageManager.updateStage(),e.cameraOperator.updateCamera(),e.reelTransmission.update()})},d.prototype.clearFocus=function(){this.focusTarget&&(this.focusTarget.setCommandChannel(null),this.focusTarget=null,this.focusTrack.setRecording(!1),this.focusTrack=null,this.focusCommandChannel=null,this.modelView.selectedFocus=null,this.modelView.$apply())},d.prototype.setFocusOnCamera=function(){this.clearFocus(),this.focusTarget=this.cameraOperator,this.focusTrack=this.cameraOperator.getShotList(),this.focusCommandChannel=this.camCommands,this.cameraOperator.setChaseObject(null),this.focusTarget.setCommandChannel(this.focusCommandChannel)},d.prototype.setFocusOnProp=function(t){this.clearFocus(),this.focusTarget=this.stageManager.getAnimator(t),this.focusTrack=this.focusTarget.getScript(),this.focusCommandChannel=this.animCommands,this.cameraOperator.setChaseObject(t),this.focusTarget.setCommandChannel(this.focusCommandChannel),this.modelView.selectedFocus=t,this.modelView.$apply()},d.prototype.record=function(){this.startReelTransmission(),this.reel.skipTo(0),this.focusTarget&&(this.focusTarget.setCommandChannel(this.focusCommandChannel),this.focusTrack.setRecording(!0))},d.prototype.stop=function(){this.stopReelTransmission(),this.reel.skipTo(0),this.focusTarget&&(this.focusTarget.setCommandChannel(this.focusCommandChannel),this.focusTrack.setRecording(!1))},d.prototype.play=function(){this.startReelTransmission(),this.reel.skipTo(0),this.focusTarget&&(this.focusTarget.setCommandChannel(null),this.focusTrack.setRecording(!1))},d.prototype.startReelTransmission=function(){var t=this.reel;this.reelTransmission={update:function(){t.nextFrame()}}},d.prototype.stopReelTransmission=function(){this.reelTransmission={update:function(){}}};var m=function(t,e,n){return function(o,r){return new d(o,r,t,e,n)}};return{ApplicationController:d,create:m}}),define("production/ccp/SyncSource",[],function(){var t=60,e=function(t,e){this.ccpwgl=t,this.scene=e};return e.prototype.setCallback=function(t){this.ccpwgl.onPostRender=t},e.prototype.getRate=function(){return t},e}),define("production/ccp/Set",[],function(){var t=function(t){this.ccpwgl=t.ccpwgl,this.scene=t.scene,this.syncSource=t.syncSource,this.stage=t.stage,this.sceneCamera=t.sceneCamera,this.lightBoard=t.lightBoard};return t.prototype.getSyncSource=function(){return this.syncSource},t.prototype.getStage=function(){return this.stage},t.prototype.getSceneCamera=function(){return this.sceneCamera},t}),define("production/ccp/Stage",["lib/q"],function(t){var e=function(t,e){this.ccpwgl=t,this.scene=e,this.propCounter=1,this.props=[]};return e.prototype.enter=function(e){var n=t.defer(),o=this;return e.request(this.ccpwgl,this.scene,n,this.propCounter++),n.promise.then(function(t){o.props.push(t)}),n.promise},e.prototype.getProps=function(){return this.props},e}),define("production/ccp/SceneCamera",["lib/gl-matrix","util/GlHelper"],function(t){var e=function(){this.fov=60,this.nearPlane=1,this.farPlane=1e5,this.rotation=t.quat4.identity(),this.position=t.vec3.create(),this.viewOffset=t.vec3.create(),this.projection=t.mat4.create(),this.view=t.mat4.create(),this.updateView=this.calculateView};return e.prototype.nullFunction=function(){},e.prototype.calculateView=function(){t.mat4.fromRotationTranslation(this.rotation,this.viewOffset,this.view),t.mat4.translate(this.view,this.position),this.updateView=this.nullFunction},e.prototype.onViewChanged=function(){this.updateView=this.calculateView},e.prototype.getProjection=function(e){return t.mat4.perspective(this.fov,e,this.nearPlane,this.farPlane,this.projection),this.projection},e.prototype.getView=function(){return this.updateView(),this.view},e.prototype.update=function(){},e.prototype.getStateData=function(t){var e=t||{};return e.viewOffset=this.getViewOffset(e.viewOffset),e.position=this.getPosition(e.position),e.rotation=this.getRotation(e.rotation),e},e.prototype.setStateData=function(e){t.vec3.set(e.viewOffset,this.viewOffset),t.vec3.set(e.position,this.position),t.quat4.set(e.rotation,this.rotation),this.onViewChanged()},e.prototype.getViewOffset=function(e){return t.vec3.set(this.viewOffset,e||[0,0,0])},e.prototype.getPosition=function(e){return t.vec3.set(this.position,e||[0,0,0])},e.prototype.setPosition=function(e){t.vec3.set(e,this.position),this.onViewChanged()},e.prototype.getRotation=function(e){return t.quat4.set(this.rotation,e||[0,0,0,0])},e.prototype.setRotation=function(e){t.quat4.set(e,this.rotation),this.onViewChanged()},e}),define("production/ccp/LightBoard",[],function(){var t=function(t,e){this.ccpwgl=t,this.scene=e};return t}),define("production/ccp/ProductionManager",["lib/q","production/ccp/SyncSource","production/ccp/Set","production/ccp/Stage","production/ccp/SceneCamera","production/ccp/LightBoard"],function(t,e,n,o,r,i){var a={},s=function(t,a){var s={ccpwgl:t,scene:a,syncSource:new e(t,a),stage:new o(t,a),sceneCamera:new r,lightBoard:new i(t,a)};return t.setCamera(s.sceneCamera),new n(s)},c=function(e,n,o){var r=t.defer(),i=function(t){var n=s(e,t);r.resolve(n)};try{e.initialize(n,a),o(i)}catch(c){r.reject(c)}return r.promise},u=function(t){this.ccpwgl=t};return u.prototype.setResourcePath=function(t,e){this.ccpwgl.setResourcePath(t,e)},u.prototype.createSet=function(t,e){var n=this.ccpwgl;return c(n,t,function(t){var o=function(){t(this)};n.loadScene(e,o)})},u.prototype.createChromaKeyedSet=function(t,e){var n=this.ccpwgl;return c(n,t,function(t){var o=n.createScene(e);t(o)})},u}),define("ui/ControllerList",["ui/SplashDialog","ui/CreateSessionDialog"],function(t,e){var n=[t,e];return n}),define("util/BrowserHelper",[],function(){var t=function(t,e,n){var o=["webkit","moz","ms","o"],r=n;return o.forEach(function(n){var o=n+e,i=t[o];"undefined"!=typeof i&&(r=i)}),r},e={findPrefixProperty:t};return e}),define("directives/FilmViewDirective",["util/BrowserHelper"],function(t){var e=function(e,n){n.directive("filmView",function(n){return function(o,r){var i=r[0],a=e.element(n),s=16/9;o.getAreaDimension=function(){return{width:i.clientWidth,height:i.clientHeight}},o.goFullscreen=function(){i.requestFullScreen||(i.requestFullScreen=t.findPrefixProperty(i,"RequestFullScreen",function(){})),i.requestFullScreen()},o.$watch(o.getAreaDimension,function(t){o.style=function(){var e=(t.width/s).toFixed(0),n=0;return t.height>e&&(n=((t.height-e)/2).toFixed(0)),{position:"relative",top:n+"px",width:t.width+"px",height:e+"px"}}},!0),a.bind("resize",function(){o.$apply()})}})},n={register:e};return n}),define("directives/SaveAsDirective",["util/BrowserHelper"],function(t){var e=function(e,n){n.directive("saveAs",function(e){return function(n,o){var r=o[0],i=e.URL;i||(i=t.findPrefixProperty(e,"URL",{createObjectURL:function(){return"#"}})),r.target="_blank",r.download="session.json",o.bind("click",function(){r.href="#"}),o.bind("click",function(){var t=n.encodeSession(),e=new Blob([t],{type:"application/json;charset=utf-8"});r.href=i.createObjectURL(e)})}})},n={register:e};return n}),define("directives/DirectiveList",["directives/FilmViewDirective","directives/SaveAsDirective"],function(){var t,e=[];for(t=0;t<arguments.length;t++)e.push(arguments[t]);return e}),define("ClientApp",["module","angular","lib/ccpwgl","ApplicationController","production/ccp/ProductionManager","ui/ControllerList","directives/DirectiveList"],function(t,e,n,o,r,i,a){var s=t.config(),c=function(t){var c=e.module("ClientApp",["ui.bootstrap"]),u=new r(n);return c.controller("ApplicationController",["$scope","$dialog",o.create(s,u,t)]),a.forEach(function(t){t.register(e,c)}),i.forEach(function(t){t.register(c)}),[c.name]};return c});