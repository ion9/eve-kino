/**
Containing defaults

@module Client
@class Defaults
*/
define('Defaults',[], function() {
  "use strict";

  var defaults = {
    inputsByAction: {}
  };

  var addActionInput = function(actionName, inputName) {
    defaults.inputsByAction[actionName] = inputName;
  };

  addActionInput("yawLeft", "RIGHT_STICK_X_NEG");
  addActionInput("yawRight", "RIGHT_STICK_X_POS");
  addActionInput("pitchUp", "RIGHT_STICK_Y_POS");
  addActionInput("pitchDown", "RIGHT_STICK_Y_NEG");
  addActionInput("rollClockwise", "LEFT_STICK_X_POS");
  addActionInput("rollCounter", "LEFT_STICK_X_NEG");
  addActionInput("moveForward", "RIGHT_TOP_SHOULDER");
  addActionInput("moveBackward", "LEFT_TOP_SHOULDER");
  addActionInput("moveLeft", "FACE_3");
  addActionInput("moveRight", "FACE_2");
  addActionInput("moveUp", "FACE_4");
  addActionInput("moveDown", "FACE_1");

  return defaults;
});
define('jade',[], function() {
  // This file is needed so that the generated UiTemplates can work.
});
define('ui/UiTemplates',['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

this["UiTemplates"] = this["UiTemplates"] || {};

this["UiTemplates"]["AddPropDialog"] = function anonymous(locals
) {
var buf = [];
buf.push("<div class=\"modal-header\"><h3>Add a prop</h3></div><div class=\"modal-body\"><div class=\"row-fluid\"><input type=\"text\" ng-model=\"search.text\" placeholder=\"Blank separated search words\" class=\"span12\"/></div><div class=\"row-fluid\"><tabset class=\"span12\"><tab heading=\"Ship\"><div class=\"row-fluid\"><select ng-model=\"search.selected\" ng-options=\"prop as prop.propData.resourceUrl for prop in filteredShips\" size=\"10\" class=\"span12\"></select></div></tab><tab heading=\"Planet\"><div class=\"row-fluid\"><select ng-model=\"search.selected\" ng-options=\"prop as prop.propData.resourceUrl for prop in filteredPlanets\" size=\"10\" class=\"span12\"></select></div></tab><tab heading=\"Scenery\"><div class=\"row-fluid\"><select ng-model=\"search.selected\" ng-options=\"prop as prop.propData.resourceUrl for prop in filteredSceneries\" size=\"10\" class=\"span12\"></select></div></tab></tabset></div></div><div class=\"modal-footer\"><button ng-click=\"add(search.selected)\" ng-disabled=\"!search.selected\" class=\"btn btn-primary\">Add</button><button ng-click=\"cancel()\" class=\"btn\">Cancel</button></div>");;return buf.join("");
};

this["UiTemplates"]["CreateSessionDialog"] = function anonymous(locals
) {
var buf = [];
buf.push("<div class=\"modal-header\"><h3>Create a Session</h3><span>eve-kino v.{{version}}</span></div><div class=\"modal-body\"><tabset><tab heading=\"Background\"><div class=\"btn-group\"><button type=\"button\" ng-model=\"set.type\" btn-radio=\"'space'\" class=\"btn\">Space</button><button type=\"button\" ng-model=\"set.type\" btn-radio=\"'chromaKey'\" class=\"btn\">Chroma Key</button></div><div class=\"row-fluid\"><div ng-show=\"(set.type == 'space')\">Select a background:<div class=\"row-fluid\"><select ng-model=\"set.selectedBackground\" ng-options=\"bg as bg.resourceUrl for bg in backgrounds\" size=\"5\" class=\"span12\"></select></div></div><div ng-show=\"(set.type == 'chromaKey')\">Pick a color (RGB values):<div data-color-input color=\"set.chromaKey.color\" on-change=\"colorInputChanged()\"></div></div></div></tab><tab heading=\"By File\"><div data-file-input=\"file\" on-change=\"readFile(file)\">Choose File</div></tab><tab heading=\"Quality\"><div ng-repeat=\"option in qualityOptions\" class=\"row-fluid\"><div class=\"span4\">{{option.title}}</div><div class=\"span8 btn-group\"><button type=\"button\" ng-repeat=\"value in option.values\" ng-model=\"selectedOptions[option.field]\" btn-radio=\"value.id\" class=\"btn\">{{value.title}}</button></div></div><div class=\"row-fluid\"><div class=\"span12\">Some of these settings are dependent on machine or resources and might not be available.</div></div></tab></tabset></div><div class=\"modal-footer\"><button ng-click=\"create(set.type)\" ng-disabled=\"!canBeCreated()\" class=\"btn btn-primary\">Create</button></div>");;return buf.join("");
};

this["UiTemplates"]["SplashDialog"] = function anonymous(locals
) {
var buf = [];
buf.push("<div class=\"modal-header\"><h3>{{ title }}</h3></div><div class=\"modal-body\">{{ message }}</div>");;return buf.join("");
};

return this["UiTemplates"];

});
/* global console */
/**
This dialog is a display field that can not be interrupted. It is application
controlled.

@module Client
@class SplashDialog
*/
define('ui/SplashDialog',["ui/UiTemplates"],

function(templates) {
  "use strict";

  var name = "SplashDialogController";
  var template = templates.SplashDialog();

  var controller = function($scope, dialog, model) {
    $scope.title = model.title;
    $scope.message = model.message;
  };

  var register = function(module) {
    module.controller(name, ["$scope", "dialog", "model", controller]);
  };

  var getBuilder = function(dialogFactory, model) {
    var options = {
      backdrop: true,
      backdropFade: false,
      backdropClick: false,
      keyboard: false,

      controller: name,
      template: template,
      resolve: {
        model: function() {
          return model;
        }
      }
    };

    return dialogFactory.dialog(options);
  };

  var dialog = {
    controller: controller,
    template: template,

    register: register,
    getBuilder: getBuilder
  };

  return dialog;
});
define('version',[], function() { return "0.0.7"; });
/* global console */
/**
This validator handles session data

@module Client
@class SessionValidator
*/
define('util/validators/SessionValidator',["lib/jski"], function(jski) {
  "use strict";

  var setSpaceBackground = jski.object({
    space: jski.object({
      background: jski.string()
    }).required("background")
  }).required("space");
  var setChromaKeyBackground = jski.object({
    chromaKey: jski.object({
      color: jski.array(jski.number()).minItems(3).maxItems(3).additionalItems(false)
    }).required("color")
  }).required("chromaKey");

  var trackSchema = jski.array(jski.object({}));

  var propDataSchema = jski.object({
    propType: jski.string()
  }).required("propType");

  var propSchema = jski.object({
    propData: propDataSchema,
    script: trackSchema
  }).required("propData", "script");

  var stageSchema = jski.object({
    props: jski.array(propSchema).additionalItems(false)
  }).required("props");

  var cameraSchema = jski.object({
    shotList: trackSchema
  }).required("shotList");

  var videographySchema = jski.object({
    cameras: jski.array(cameraSchema).additionalItems(false)
  }).required("cameras");

  var schema = jski.object({
    ver: jski.number().minimum(0),
    session: jski.object({
      set: jski.anyOf(setSpaceBackground, setChromaKeyBackground)
    }).required("set"),
    stage: stageSchema,
    videography: videographySchema
  }).required("ver", "session", "stage", "videography");

  var Validator = function() {

  };

  Validator.prototype.isValid = function(object) {
    var errors = schema.validate(object);

    return errors.length === 0;
  };

  return Validator;
});
/* global console */
/**
This dialog is responsible for determining the parameters of a session to be created.

@module Client
@class CreateSessionDialog
*/
define('ui/CreateSessionDialog',["version", "ui/UiTemplates", "util/validators/SessionValidator"],

  function(version, templates, SessionValidator) {
    "use strict";

    var name = "CreateSessionDialogController";
    var template = templates.CreateSessionDialog();

    var controller = function($scope, dialog, model, fileReader) {
      var findBackgroundByUrl = function(url) {
        var result = null;

        model.backgrounds.forEach(function(background) {
          if (background.resourceUrl === url) {
            result = background;
          }
        });

        return result;
      };

      $scope.version = version;

      $scope.backgrounds = model.backgrounds;
      $scope.qualityOptions = model.qualityOptions;
      $scope.selectedOptions = {};
      model.qualityOptions.forEach(function(option) {
        $scope.selectedOptions[option.field] = option.defaultValue;
      });

      $scope.set = {
        type: "space",
        selectedBackground: model.backgrounds[0],
        chromaKey: {
          color: [0.0, 1.0, 0.0]
        }
      };

      $scope.canBeCreated = function() {
        var result = false;

        if ($scope.set.type === "space") {
          result = !! $scope.set.selectedBackground;
        } else if ($scope.set.type === "chromaKey") {
          result = !! $scope.set.chromaKey.color;
        }

        return result;
      };

      $scope.create = function(setType) {
        var notifier = {};

        notifier.space = function(user) {
          user.setQualityOptions($scope.selectedOptions);

          return user.createSpaceSet($scope.set.selectedBackground, $scope.set.sessionData);
        };
        notifier.chromaKey = function(user) {
          user.setQualityOptions($scope.selectedOptions);

          return user.createChromaKeyedSet($scope.set.chromaKey.color, $scope.set.sessionData);
        };

        dialog.close(notifier[setType]);
      };

      $scope.readFile = function(file) {
        var readPromise = fileReader.readAsText($scope, file, "utf-8");

        readPromise.then(function(data) {
          var validator = new SessionValidator();
          var object;
          var isValid = false;

          try {
            object = JSON.parse(data);
            isValid = validator.isValid(object);
          } catch (ex) {

          }
          if (isValid) {
            $scope.set.sessionData = object;
            if (object.session.set.space) {
              $scope.set.type = "space";
              $scope.set.selectedBackground = findBackgroundByUrl(object.session.set.space.background);
            } else if (object.session.set.chromaKey) {
              $scope.set.type = "chromaKey";
              $scope.set.chromaKey.color = object.session.set.chromaKey.color;
            }
          } else {
            console.log("!!!!! file not valid");
          }
        });
      };
    };

    var register = function(module) {
      module.controller(name, ["$scope", "dialog", "model", "fileReader", controller]);
    };

    var getBuilder = function(dialogFactory, model) {
      var options = {
        backdrop: true,
        backdropFade: false,
        backdropClick: false,
        keyboard: false,

        controller: name,
        template: template,
        resolve: {
          model: function() {
            return model;
          }
        }
      };

      return dialogFactory.dialog(options);
    };

    var dialog = {
      controller: controller,
      template: template,

      register: register,
      getBuilder: getBuilder
    };

    return dialog;
  });
/**
This dialog is helping to add a prop to the scene

@module Client
@class AddPropDialog
*/
define('ui/AddPropDialog',["ui/UiTemplates"],

  function(templates) {
    "use strict";

    var name = "AddPropDialogController";
    var template = templates.AddPropDialog();

    var Controller = function($scope, dialog, model) {
      var that = this;

      this.resourceLibrary = model.resLibrary;
      this.modelView = $scope;

      $scope.selected = null;
      $scope.search = {
        text: "",
        selected: null
      };
      $scope.filteredShips = [];
      $scope.filteredPlanets = [];
      $scope.filteredScenery = [];

      $scope.$watch("search.text", function(newValue) {
        that.updateFiltered(newValue);
      });


      $scope.cancel = function() {
        var callback = function() {};

        dialog.close(callback);
      };

      $scope.add = function(archetype) {
        var callback = function(listener) {
          listener.addProp(archetype);
        };

        dialog.close(callback);
      };

      this.updateFiltered("");
    };

    Controller.prototype.updateFiltered = function(filterText) {
      var modelView = this.modelView;
      var filteredShips = modelView.filteredShips = [];
      var filteredPlanets = modelView.filteredPlanets = [];
      var filteredSceneries = modelView.filteredSceneries = [];
      var filters = filterText.toLowerCase().split(" ");
      var predicate = function(arch) {
        var resourceUrl = arch.propData.resourceUrl.toLowerCase();
        var valid = true;

        filters.forEach(function(filter) {
          if (resourceUrl.indexOf(filter) < 0) {
            valid = false;
          }
        });

        return valid;
      };

      this.resourceLibrary.forEachResource("ship", function(arch) {
        if (predicate(arch)) {
          filteredShips.push(arch);
        }
      });
      this.resourceLibrary.forEachResource("planet", function(arch) {
        if (predicate(arch)) {
          filteredPlanets.push(arch);
        }
      });
      this.resourceLibrary.forEachResource("scenery", function(arch) {
        if (predicate(arch)) {
          filteredSceneries.push(arch);
        }
      });
    };

    var register = function(module) {
      module.controller(name, ["$scope", "dialog", "model", Controller]);
    };

    var getBuilder = function(dialogFactory, model) {
      var options = {
        backdrop: true,
        backdropFade: false,
        backdropClick: false,
        keyboard: true,

        controller: name,
        template: template,
        resolve: {
          model: function() {
            return model;
          }
        }
      };

      return dialogFactory.dialog(options);
    };

    var dialog = {
      controller: Controller,
      template: template,

      register: register,
      getBuilder: getBuilder
    };

    return dialog;
  });
/**
This is a helper object to collect all dialogs

@module Client
@class Dialogs
*/
define('ui/Dialogs',["ui/SplashDialog", "ui/CreateSessionDialog", "ui/AddPropDialog"],

  function(splashDialog, createSessionDialog, addPropDialog) {
    "use strict";

    var dialogs = {
      splashDialog: splashDialog,
      createSessionDialog: createSessionDialog,
      addPropDialog: addPropDialog
    };

    return dialogs;
  });
/**
The helper is a static object providing some helper constants and functions
for GL related topics.

@module Client
@class GlHelper
*/
define('util/GlHelper',["lib/gl-matrix"], function(glMatrix) {
  "use strict";

  // ccpwgl extends mat4 with this multiply3x3 function; Since glMatrix is
  // re-loaded, this extension is lost, so reintroduce it here.
  // The function seems to be based on multiplyVec3, but without the translation.
  // For now let's set it equal, until artefacts are discovered.
  glMatrix.mat4.multiply3x3 = glMatrix.mat4.multiplyVec3;

  var oneDegreeInRad = Math.PI / 180.0;
  var viewDirections = {
    forward: -1.0,
    upward: -1.0,
    rightward: 1.0
  };
  var viewRotations = {
    rollClockwise: -1.0,
    pitchUp: -1.0,
    yawRight: -1.0
  };
  var modelDirections = {
    forward: 1.0,
    upward: 1.0,
    rightward: -1.0
  };
  var modelRotations = {
    rollClockwise: 1.0,
    pitchUp: 1.0,
    yawRight: -1.0
  };

  var helper = {
    VIEW_DIRECTION_FORWARD: viewDirections.forward,
    VIEW_DIRECTION_UP: viewDirections.upward,
    VIEW_DIRECTION_RIGHT: viewDirections.rightward,

    VIEW_ROTATION_ROLL_CLOCKWISE: viewRotations.rollClockwise,
    VIEW_ROTATION_PITCH_UP: viewRotations.pitchUp,
    VIEW_ROTATION_YAW_RIGHT: viewRotations.yawRight,

    VIEW_VECTOR_FORWARD: glMatrix.vec3.create([0, 0, viewDirections.forward]),
    VIEW_VECTOR_UP: glMatrix.vec3.create([0, viewDirections.upward, 0]),
    VIEW_VECTOR_RIGHT: glMatrix.vec3.create([viewDirections.rightward, 0, 0]),

    MODEL_DIRECTION_FORWARD: modelDirections.forward,
    MODEL_DIRECTION_UP: modelDirections.upward,
    MODEL_DIRECTION_RIGHT: modelDirections.rightward,

    MODEL_ROTATION_ROLL_CLOCKWISE: modelRotations.rollClockwise,
    MODEL_ROTATION_PITCH_UP: modelRotations.pitchUp,
    MODEL_ROTATION_YAW_RIGHT: modelRotations.yawRight,

    MODEL_VECTOR_FORWARD: glMatrix.vec3.create([0, 0, modelDirections.forward]),
    MODEL_VECTOR_UP: glMatrix.vec3.create([0, modelDirections.upward, 0]),
    MODEL_VECTOR_RIGHT: glMatrix.vec3.create([modelDirections.rightward, 0, 0]),

    /**
      Converts given degree number to radians
      @method degreeToRad
      @param degrees {Number} Degrees (0..360) to convert to radians
      @return {Number} radians for given degrees
    */
    degreeToRad: function(degrees) {
      return degrees * oneDegreeInRad;
    }
  };

  return helper;
});
/**
The actuator is a time-bound "motor" that tries to achieve a certain value
out of a range of 0..1 within a certain time.
The motor moves from one extreme to the other using the maximum time.

@module Client
@class Actuator
*/
define('simulation/Actuator',[], function() {
  "use strict";

  var Actuator = function(timeWatch, timeSpan) {
    this.timeWatch = timeWatch;
    this.timeSpan = timeSpan;

    this.currentValue = 0.0;
  };

  /**
   * @method getCurrentValue
   * @return {Number} the current value of the actuator
   */
  Actuator.prototype.getCurrentValue = function() {
    return this.currentValue;
  };

  /**
   * @method moveTo
   * @param {Number} dest the destination to move to
   * @return {Number} the current value of the actuator
   */
  Actuator.prototype.moveTo = function(dest) {
    var timePassed = this.timeWatch.getDelta();
    var distance = timePassed / this.timeSpan;
    var missing = Math.abs(this.currentValue - dest);

    if (distance < missing) {
      this.currentValue += (dest >= this.currentValue) ? distance : -distance;
    } else {
      this.currentValue = dest;
    }

    return this.currentValue;
  };

  return Actuator;
});
/**
The simulated thruster provides velocity according to a function over time.
(Being code, everything is 'simulated', this one is meant to be that if it
were real, it would provide thrust according a table, defying physics)

@module Client
@class SimulatedThruster
*/
define('simulation/SimulatedThruster',[], function() {
  "use strict";

  /**
   * @constructor
   * @param {Actuator} actuator for the time based index
   * @param {Number} maxSpeed the maximum speed (thrust)
   * @param {Function} velocityTimeFunction a function taking a time index returning speed
   */
  var SimulatedThruster = function(actuator, maxSpeed, velocityTimeFunction) {
    this.actuator = actuator;
    this.maxSpeed = maxSpeed;
    this.velocityTimeFunction = velocityTimeFunction;
  };

  /**
   * @method getSpeed
   * @param {Number} power [0..1] put into the thruster
   * @return {Number} the speed the thruster provides
   */
  SimulatedThruster.prototype.getSpeed = function(power) {
    var time = this.actuator.moveTo(power);
    var speed = this.velocityTimeFunction(time);

    return speed * this.maxSpeed;
  };

  return SimulatedThruster;
});
/**
The helper is a static object providing some helper methods for mathematics.

@module Client
@class MathHelper
*/
define('util/MathHelper',[], function() {
  "use strict";

  var getPointOnLine = function(pointA, pointB, offset) {
    var result = {
      x: pointA.x + ((pointB.x - pointA.x) * offset),
      y: pointA.y + ((pointB.y - pointA.y) * offset)
    };

    return result;
  };

  var bezierFoldEdges = function(points, offset) {
    var result = [];
    var i;

    for (i = 0; i < (points.length - 1); i++) {
      result.push(getPointOnLine(points[i], points[i + 1], offset));
    }

    return result;
  };

  /**
   * Calculate the Y from a given X on a bezier curve. X is not specified in
   * an absolute coordinate, but the offset in the range of 0..1
   *
   * @method bezierGetY
   * @return {Number} The resulting Y
   */
  var bezierGetY = function(points, x) {
    var result = 0.0;
    var temp = points;

    while (temp.length > 1) {
      temp = bezierFoldEdges(temp, x);
    }

    return temp[0].y;
  };

  var helper = {
    bezierGetY: bezierGetY
  };

  return helper;
});
/**
An animator is responsible for updating the state of a prop

@module Client
@class Animator
*/
define('production/Animator',["lib/gl-matrix", "util/GlHelper", "simulation/Actuator", "simulation/SimulatedThruster", "util/MathHelper"],
  function(glMatrix, helper, Actuator, SimulatedThruster, mathHelper) {
    "use strict";

    var tempQuat = glMatrix.quat4.create();
    var tempVec3 = glMatrix.vec3.create();

    var emptyScript = {
      getFrameData: function() {
        return null;
      }
    };

    var rotateModelOrientation = function(dest, roll, pitch, yaw) {
      glMatrix.quat4.fromAngleAxis(roll * helper.MODEL_ROTATION_ROLL_CLOCKWISE, helper.MODEL_VECTOR_FORWARD, tempQuat);
      glMatrix.quat4.multiply(dest, tempQuat, dest);
      glMatrix.quat4.fromAngleAxis(pitch * helper.MODEL_ROTATION_PITCH_UP, helper.MODEL_VECTOR_RIGHT, tempQuat);
      glMatrix.quat4.multiply(dest, tempQuat, dest);
      glMatrix.quat4.fromAngleAxis(yaw * helper.MODEL_ROTATION_YAW_RIGHT, helper.MODEL_VECTOR_UP, tempQuat);
      glMatrix.quat4.multiply(dest, tempQuat, dest);
    };

    var Animator = function(prop, timeWatch) {
      var that = this;

      var addAgility = function(name, maximum, time) {
        that.agility[name] = {
          maximum: maximum,
          time: time
        };
      };

      var makePoint = function(x, y) {
        var point = {
          x: x,
          y: y
        };

        return point;
      };
      var pointsMovement = [makePoint(0, 0), makePoint(0.33, 0.25), makePoint(0.66, 0.75), makePoint(1, 1)];
      var pointsRotation = [makePoint(0, 0), makePoint(0.75, 0.25), makePoint(1, 1)];

      this.prop = prop;
      this.script = emptyScript;

      this.commandChannel = null;
      this.lastState = null;

      this.timeWatch = timeWatch;
      this.agility = {};
      this.thrusters = {};

      addAgility("forward", 300, 0.5);
      addAgility("navigation", 100, 0.5);
      addAgility("rotation", 2, 1.0);

      this.createThruster("moveForward", "forward", pointsMovement);
      ["moveBackward", "moveLeft", "moveRight", "moveUp", "moveDown"].forEach(function(direction) {
        that.createThruster(direction, "navigation", pointsMovement);
      });
      ["rollClockwise", "rollCounter", "pitchUp", "pitchDown", "yawLeft", "yawRight"].forEach(function(direction) {
        that.createThruster(direction, "rotation", pointsRotation);
      });
    };

    Animator.prototype.createThruster = function(thrusterName, agilityName, points) {
      var entry = this.agility[agilityName];
      var actuator = new Actuator(this.timeWatch, entry.time);
      var velocityTimeFunction = function(time) {
        return mathHelper.bezierGetY(points, time);
      };
      var thruster = new SimulatedThruster(actuator, entry.maximum, velocityTimeFunction);

      this.thrusters[thrusterName] = thruster;
    };

    Animator.prototype.setScript = function(script) {
      this.script = script;
    };

    Animator.prototype.getScript = function() {
      return this.script;
    };

    Animator.prototype.getProp = function() {
      return this.prop;
    };

    Animator.prototype.setCommandChannel = function(commandChannel) {
      this.commandChannel = commandChannel;
    };

    Animator.prototype.resetToRecording = function() {
      var lastState = this.prop.getStateData(this.lastState);
      var resetState = this.script.getFrameData() || lastState;

      this.prop.setStateData(resetState);
    };

    Animator.prototype.update = function() {
      var lastState = this.prop.getStateData(this.lastState);
      var newState = this.prop.getStateData();
      var recordedState = this.script.getFrameData() || newState;

      if (this.commandChannel) {
        newState = this.updateByCommands(newState, lastState, recordedState);
      } else {
        newState = recordedState;
      }

      this.prop.setStateData(newState);
      this.script.setFrameData(newState);
      this.lastState = lastState;
    };

    Animator.prototype.updateByCommands = function(newState, lastState, recordedState) {
      var timeDelta = this.timeWatch.getDelta();
      var commands = this.commandChannel.getCommands();
      var roll = (this.thrusters.rollClockwise.getSpeed(commands.rollClockwise) -
        this.thrusters.rollCounter.getSpeed(commands.rollCounter)) * timeDelta;
      var pitch = (this.thrusters.pitchUp.getSpeed(commands.pitchUp) -
        this.thrusters.pitchDown.getSpeed(commands.pitchDown)) * timeDelta;
      var yaw = (this.thrusters.yawRight.getSpeed(commands.yawRight) -
        this.thrusters.yawLeft.getSpeed(commands.yawLeft)) * timeDelta;
      var up = (this.thrusters.moveUp.getSpeed(commands.moveUp) -
        this.thrusters.moveDown.getSpeed(commands.moveDown)) * timeDelta;
      var right = (this.thrusters.moveRight.getSpeed(commands.moveRight) -
        this.thrusters.moveLeft.getSpeed(commands.moveLeft)) * timeDelta;
      var forward = (this.thrusters.moveForward.getSpeed(commands.moveForward) -
        this.thrusters.moveBackward.getSpeed(commands.moveBackward)) * timeDelta;

      rotateModelOrientation(newState.rotation, roll, pitch, yaw);

      tempVec3[0] = right * helper.MODEL_DIRECTION_RIGHT;
      tempVec3[1] = up * helper.MODEL_DIRECTION_UP;
      tempVec3[2] = forward * helper.MODEL_DIRECTION_FORWARD;
      glMatrix.quat4.multiplyVec3(newState.rotation, tempVec3);
      newState.position[0] += tempVec3[0];
      newState.position[1] += tempVec3[1];
      newState.position[2] += tempVec3[2];

      return newState;
    };

    return Animator;
  });
/**
The Stage Manager updates the stage according to the script and/or input

@module Client
@class StageManager
*/
define('production/StageManager',["production/Animator"], function(Animator) {
  "use strict";

  var StageManager = function(stage, timeWatch) {
    this.stage = stage;
    this.timeWatch = timeWatch;

    this.animators = [];
  };

  StageManager.prototype.encodeData = function() {
    var data = {
      props: []
    };
    var that = this;

    this.stage.forEachProp(function(prop) {
      var animator = that.findAnimatorByProp(prop);
      var script = animator && animator.getScript();
      var propEntry = {
        //id: prop.id,
        propData: prop.propData,
        script: script ? script.data : []
      };

      data.props.push(propEntry);
    });

    return data;
  };

  StageManager.prototype.updateStage = function() {
    this.animators.forEach(function(animator) {
      animator.update();
    });
  };

  StageManager.prototype.getAnimator = function(prop) {
    var animator = this.findAnimatorByProp(prop);

    if (!animator) {
      animator = new Animator(prop, this.timeWatch);
      this.animators.push(animator);
    }

    return animator;
  };

  StageManager.prototype.findAnimatorByProp = function(prop) {
    var animator = null;

    this.animators.forEach(function(test) {
      if (test.getProp() === prop) {
        animator = test;
      }
    });

    return animator;
  };

  return StageManager;
});
/**
A command channel provides commands based on inputs

@module Client
@class CommandChannel
*/
define('controls/CommandChannel',[], function() {
  "use strict";

  var CommandChannel = function(owner, id, type, actions) {
    this.owner = owner;
    this.id = id;
    this.type = type;
    this.actions = actions;

    this.resetCommands();
  };

  CommandChannel.prototype.resetCommands = function() {
    var that = this;

    this.commands = {};
    this.actions.forEach(function(actionName) {
      that.commands[actionName] = 0.0;
    });
  };

  CommandChannel.prototype.close = function() {
    this.owner.removeCommandChannel(this.id);
  };

  CommandChannel.prototype.hasAction = function(actionName) {
    return this.actions.indexOf(actionName) >= 0;
  };

  CommandChannel.prototype.setCommandIntensity = function(actionName, intensity) {
    this.commands[actionName] = intensity;
  };

  CommandChannel.prototype.getCommands = function() {
    return this.commands;
  };

  return CommandChannel;
});
/**
An input channel delivers inputs from a source

@module Client
@class InputChannel
*/
define('controls/InputChannel',[], function() {
  "use strict";

  var InputChannel = function(owner, id, type) {
    this.owner = owner;
    this.id = id;
    this.type = type;
  };

  InputChannel.prototype.close = function() {
    this.owner.removeInputChannel(this.id);
  };

  InputChannel.prototype.setIntensity = function(inputName, intensity) {
    this.owner.setInputIntensity(this.type, inputName, intensity);
  };

  return InputChannel;
});
/**
A director issues directions

@module Client
@class Director
*/
define('production/Director',["controls/CommandChannel", "controls/InputChannel"], function(CommandChannel, InputChannel) {
  "use strict";

  var Director = function() {
    this.bindings = {};
    this.commandChannels = {};
    this.inputChannels = {};
    this.idCounter = 0;
  };

  Director.prototype.getNextId = function() {
    return "" + this.idCounter++;
  };

  Director.prototype.getInputChannel = function(type) {
    var id = this.getNextId();
    var inputChannel = new InputChannel(this, id, type);

    this.inputChannels[id] = inputChannel;

    return inputChannel;
  };

  Director.prototype.removeInputChannel = function(id) {
    delete this.inputChannels[id];
  };

  Director.prototype.getCommandChannel = function(type, actions) {
    var id = this.getNextId();
    var commandChannel = new CommandChannel(this, id, type, actions);

    this.commandChannels[id] = commandChannel;

    return commandChannel;
  };

  Director.prototype.removeCommandChannel = function(id) {
    delete this.commandChannels[id];
  };

  Director.prototype.getBindings = function() {
    return this.bindings;
  };


  Director.prototype.addBinding = function(actionId, inputId) {
    this.bindings[actionId.actionName] = [inputId];
  };

  Director.prototype.setInputIntensity = function(inputType, inputName, intensity) {
    var that = this;
    var checkBindings = function(actionName) {
      var bindingList = that.bindings[actionName];

      if (bindingList) {
        bindingList.forEach(function(boundInputId) {
          if (inputName === boundInputId.inputName) {
            that.setActionIntensity(actionName, intensity);
          }
        });
      }
    };

    for (var actionName in this.bindings) {
      checkBindings(actionName);
    }
  };

  Director.prototype.setActionIntensity = function(actionName, intensity) {
    var id;
    var channel;

    for (id in this.commandChannels) {
      channel = this.commandChannels[id];
      if (channel.hasAction(actionName)) {
        channel.setCommandIntensity(actionName, intensity);
      }
    }
  };

  return Director;
});
/* global console */
/**
A camera operator handles a camera when directed to

@module Client
@class Director
*/
define('production/CameraOperator',["lib/gl-matrix", "util/GlHelper", "simulation/Actuator", "simulation/SimulatedThruster", "util/MathHelper"],
  function(glMatrix, helper, Actuator, SimulatedThruster, mathHelper) {
    "use strict";

    var actionNames = [
      "pitchUp", "pitchDown", "rollClockwise", "rollCounter", "yawRight", "yawLeft",
      "moveUp", "moveDown", "moveForward", "moveBackward", "moveRight", "moveLeft"
    ];

    var tempVec3 = glMatrix.vec3.create();

    var rotateViewOrientation = (function() {
      var tempQuat = glMatrix.quat4.create();

      return function(dest, roll, pitch, yaw) {
        glMatrix.quat4.fromAngleAxis(roll * helper.VIEW_ROTATION_ROLL_CLOCKWISE, helper.VIEW_VECTOR_FORWARD, tempQuat);
        glMatrix.quat4.multiply(tempQuat, dest, dest);
        glMatrix.quat4.fromAngleAxis(pitch * helper.VIEW_ROTATION_PITCH_UP, helper.VIEW_VECTOR_RIGHT, tempQuat);
        glMatrix.quat4.multiply(tempQuat, dest, dest);
        glMatrix.quat4.fromAngleAxis(yaw * helper.VIEW_ROTATION_YAW_RIGHT, helper.VIEW_VECTOR_UP, tempQuat);
        glMatrix.quat4.multiply(tempQuat, dest, dest);
      };
    })();

    var getModelRotationFromViewRotation = function(viewRotation, result) {
      glMatrix.quat4.set(viewRotation, result);
      rotateViewOrientation(result, 0, 0, -Math.PI);
      glMatrix.quat4.inverse(result);
    };

    var rotateModelVectorByViewRotation = (function() {
      var tempQuat = glMatrix.quat4.create();

      return function(viewRotation, modelVector) {
        getModelRotationFromViewRotation(viewRotation, tempQuat);
        glMatrix.quat4.multiplyVec3(tempQuat, modelVector);

        return modelVector;
      };
    })();

    var CameraOperator = function(camera, shotList, timeWatch) {
      var that = this;

      var addAgility = function(name, maximum, time) {
        that.agility[name] = {
          maximum: maximum,
          time: time
        };
      };

      var makePoint = function(x, y) {
        var point = {
          x: x,
          y: y
        };

        return point;
      };
      var pointsMovement = [makePoint(0, 0), makePoint(0.33, 0.25), makePoint(0.66, 0.75), makePoint(1, 1)];
      var pointsRotation = [makePoint(0, 0), makePoint(0.75, 0.25), makePoint(1, 1)];

      this.camera = camera;
      this.shotList = shotList;

      this.commandChannel = null;

      this.timeWatch = timeWatch;
      this.agility = {};
      this.thrusters = {};

      addAgility("forward", 300, 0.5);
      addAgility("navigation", 100, 0.5);
      addAgility("rotation", 2, 0.5);

      this.createThruster("moveForward", "forward", pointsMovement);
      ["moveBackward", "moveLeft", "moveRight", "moveUp", "moveDown"].forEach(function(direction) {
        that.createThruster(direction, "navigation", pointsMovement);
      });
      ["rollClockwise", "rollCounter", "pitchUp", "pitchDown", "yawLeft", "yawRight"].forEach(function(direction) {
        that.createThruster(direction, "rotation", pointsRotation);
      });

      /**
       * @private
       * @property lastState buffer object to avoid creating new ones each frame
       */
      this.lastState = null;
    };

    CameraOperator.getActionNames = function() {
      return actionNames.slice(0);
    };

    CameraOperator.prototype.createThruster = function(thrusterName, agilityName, points) {
      var entry = this.agility[agilityName];
      var actuator = new Actuator(this.timeWatch, entry.time);
      var velocityTimeFunction = function(time) {
        return mathHelper.bezierGetY(points, time);
      };
      var thruster = new SimulatedThruster(actuator, entry.maximum, velocityTimeFunction);

      this.thrusters[thrusterName] = thruster;
    };

    CameraOperator.prototype.getShotList = function() {
      return this.shotList;
    };

    CameraOperator.prototype.setCommandChannel = function(commandChannel) {
      this.commandChannel = commandChannel;
    };

    CameraOperator.prototype.setChaseObject = function(object) {
      this.chaseObject = object;
      if (!this.chaseObject) {
        this.resetToRecording();
      }
    };

    CameraOperator.prototype.resetToRecording = function() {
      var camera = this.camera;
      var lastState = camera.getStateData(this.lastState);
      var resetState = this.shotList.getFrameData() || lastState;

      camera.setStateData(resetState);
    };

    CameraOperator.prototype.placeObjectInFrontOfCamera = function(object, distance) {
      var objectState = object.getStateData();
      var cameraState = this.camera.getStateData();
      var offset = distance > 10.0 ? distance : 10.0;

      // align objects rotation to that of camera
      getModelRotationFromViewRotation(cameraState.rotation, objectState.rotation);
      // position object in front
      objectState.position = [0, 0, offset];
      glMatrix.quat4.multiplyVec3(objectState.rotation, objectState.position);
      glMatrix.vec3.subtract(objectState.position, cameraState.position);

      object.setStateData(objectState);
    };

    CameraOperator.prototype.updateCamera = function() {
      var camera = this.camera;
      var lastState = camera.getStateData(this.lastState);
      var newState = camera.getStateData();
      var recordedState = this.shotList.getFrameData() || newState;

      if (this.chaseObject) {
        newState = this.updateByChase(newState, lastState);
      } else if (this.commandChannel) {
        newState = this.updateByCommands(newState, lastState, recordedState);
      } else {
        newState = recordedState;
      }

      camera.setStateData(newState);
      this.shotList.setFrameData(newState);
      this.lastState = lastState;
    };

    CameraOperator.prototype.updateByChase = function(newState, lastState) {
      var chaseData = this.chaseObject.getStateData();
      var radius = this.chaseObject.getBoundingSphereRadius();
      var backDistance = -10 - radius * 2.0;

      glMatrix.vec3.negate(chaseData.position, newState.position);

      glMatrix.quat4.set(chaseData.rotation, newState.rotation);
      glMatrix.quat4.inverse(newState.rotation);
      rotateViewOrientation(newState.rotation, 0, helper.degreeToRad(-1.0) * helper.VIEW_ROTATION_PITCH_UP, Math.PI);

      glMatrix.vec3.set([0, -radius * 0.5, backDistance], newState.viewOffset);

      return newState;
    };

    CameraOperator.prototype.updateByCommands = function(newState, lastState, recordedState) {
      var timeDelta = this.timeWatch.getDelta();
      var commands = this.commandChannel.getCommands();
      var roll = (this.thrusters.rollClockwise.getSpeed(commands.rollClockwise) -
        this.thrusters.rollCounter.getSpeed(commands.rollCounter)) * timeDelta;
      var pitch = (this.thrusters.pitchUp.getSpeed(commands.pitchUp) -
        this.thrusters.pitchDown.getSpeed(commands.pitchDown)) * timeDelta;
      var yaw = (this.thrusters.yawRight.getSpeed(commands.yawRight) -
        this.thrusters.yawLeft.getSpeed(commands.yawLeft)) * timeDelta;
      var up = (this.thrusters.moveUp.getSpeed(commands.moveUp) -
        this.thrusters.moveDown.getSpeed(commands.moveDown)) * timeDelta;
      var right = (this.thrusters.moveRight.getSpeed(commands.moveRight) -
        this.thrusters.moveLeft.getSpeed(commands.moveLeft)) * timeDelta;
      var forward = (this.thrusters.moveForward.getSpeed(commands.moveForward) -
        this.thrusters.moveBackward.getSpeed(commands.moveBackward)) * timeDelta;

      rotateViewOrientation(newState.rotation, roll, pitch, yaw);

      tempVec3[0] = right * helper.VIEW_DIRECTION_RIGHT;
      tempVec3[1] = up * helper.VIEW_DIRECTION_UP;
      tempVec3[2] = forward * helper.VIEW_DIRECTION_FORWARD;
      rotateModelVectorByViewRotation(newState.rotation, tempVec3);
      newState.position[0] += tempVec3[0];
      newState.position[1] += tempVec3[1];
      newState.position[2] += tempVec3[2];
      newState.viewOffset[0] = newState.viewOffset[1] = newState.viewOffset[2] = 0;

      return newState;
    };

    return CameraOperator;
  });
/**

@module Client
@class Resource
*/
define('production/Resources',["production/StageManager", "production/Director", "production/CameraOperator"], function(StageManager, Director, CameraOperator) {
  "use strict";

  var resources = {
    StageManager: StageManager,
    Director: Director,
    CameraOperator: CameraOperator
  };

  return resources;
});
/**
The gamepad API provides a wrapper around the used gamepad interface

@module Client
@class GamepadApi
*/
define('controls/Gamepad',["lib/gamepad"], function(GamepadLib) {
  "use strict";

  var Gamepad = function(runtimeId) {
    this.listeners = [];
  };

  Gamepad.prototype.getRuntimeId = function() {
    return this.runtimeId;
  };

  Gamepad.prototype.addListener = function(listener) {
    this.listeners.push(listener);
  };

  Gamepad.prototype.onDeviceDisconnected = function() {
    this.listeners.forEach(function(listener) {
      listener.onGamepadDisconnected();
    });
  };

  Gamepad.prototype.onControlValueChanged = function(controlName, value) {
    this.listeners.forEach(function(listener) {
      listener.onControlValueChanged(controlName, value);
    });
  };

  return Gamepad;
});
/**
The gamepad API provides a wrapper around the used gamepad interface

@module Client
@class GamepadApi
*/
define('controls/GamepadApi',["lib/gamepad", "controls/Gamepad"], function(GamepadLib, Gamepad) {
  "use strict";

  var GamepadApi = function() {
    this.lib = new GamepadLib();
    this.gamepads = {};
    this.idCounter = 0;
    this.connectionListeners = [];
  };

  GamepadApi.prototype.init = function() {
    var that = this;

    this.lib.bind(GamepadLib.Event.CONNECTED, function(device) {
      that.onDeviceConnected(device);
    });
    this.lib.bind(GamepadLib.Event.DISCONNECTED, function(device) {
      that.onDeviceDisonnected(device);
    });
    this.lib.bind(GamepadLib.Event.BUTTON_DOWN, function(param) {
      that.onControlValueChanged(param.gamepad.index, param.control, 1.0);
    });
    this.lib.bind(GamepadLib.Event.BUTTON_UP, function(param) {
      that.onControlValueChanged(param.gamepad.index, param.control, 0.0);
    });
    this.lib.bind(GamepadLib.Event.AXIS_CHANGED, function(param) {
      that.onAxisValueChanged(param.gamepad.index, param.axis, param.value);
    });

    return this.lib.init();
  };

  GamepadApi.prototype.getGamepads = function() {
    var result = [];
    var index;

    for (index in this.gamepads) {
      result.push(this.gamepads[index]);
    }

    return result;
  };

  GamepadApi.prototype.addGamepadListener = function(listener) {
    this.connectionListeners.push(listener);
  };

  GamepadApi.prototype.onDeviceConnected = function(device) {
    var gamepad = new Gamepad(this.idCounter++);

    this.gamepads[device.index] = gamepad;
    this.connectionListeners.forEach(function(listener) {
      listener.onGamepadConnected(gamepad);
    });
  };

  GamepadApi.prototype.onDeviceDisonnected = function(device) {
    var gamepad = this.gamepads[device.index];

    if (gamepad) {
      delete this.gamepads[device.index];
      gamepad.onDeviceDisconnected();
      this.connectionListeners.forEach(function(listener) {
        listener.onGamepadDisconnected(gamepad);
      });
    }
  };

  GamepadApi.prototype.onControlValueChanged = function(deviceKey, controlName, value) {
    var gamepad = this.gamepads[deviceKey];

    if (gamepad) {
      gamepad.onControlValueChanged(controlName, value);
    }
  };

  GamepadApi.prototype.onAxisValueChanged = function(deviceKey, rawAxisName, value) {
    var gamepad = this.gamepads[deviceKey];

    if (gamepad) {
      if (value < 0) {
        gamepad.onControlValueChanged(rawAxisName + "_POS", 0.0);
        gamepad.onControlValueChanged(rawAxisName + "_NEG", -value);
      } else {
        gamepad.onControlValueChanged(rawAxisName + "_NEG", 0.0);
        gamepad.onControlValueChanged(rawAxisName + "_POS", value);
      }
    }
  };

  return GamepadApi;
});
/**
The ship wrapper

@module Client
@class Ship
*/
define('production/ccp/res/Ship',["lib/gl-matrix"], function(glMatrix) {
  "use strict";

  var Ship = function(ccpwgl, obj, id, propData) {
    this.ccpwgl = ccpwgl;
    this.obj = obj;
    this.id = id;
    this.propData = propData;

    this.position = glMatrix.vec3.create();
    this.rotation = glMatrix.quat4.identity();
    this.transform = glMatrix.mat4.identity();
  };

  Ship.prototype.toString = function() {
    return "Ship " + this.id;
  };

  Ship.prototype.getBoundingSphereRadius = function() {
    return this.obj.getBoundingSphere()[1];
  };

  Ship.prototype.getStateData = function(dest) {
    var result = dest || {};

    result.position = glMatrix.vec3.set(this.position, result.position || [0, 0, 0]);
    result.rotation = glMatrix.quat4.set(this.rotation, result.rotation || [0, 0, 0, 1]);

    return result;
  };

  Ship.prototype.setStateData = function(data) {
    glMatrix.vec3.set(data.position, this.position);
    glMatrix.quat4.set(data.rotation, this.rotation);

    glMatrix.mat4.fromRotationTranslation(this.rotation, this.position, this.transform);
    this.obj.setTransform(this.transform);
  };

  return Ship;
});
/**
An archetype for ships

@module Client
@class ShipArchetype
*/
define('production/ccp/res/ShipArchetype',["production/ccp/res/Ship"], function(Ship) {
  "use strict";

  var ShipArchetype = function(propData) {
    this.propData = propData || {};
    this.propData.propType = ShipArchetype.propType;
  };

  ShipArchetype.propType = "ship";

  ShipArchetype.prototype.request = function(ccpwgl, scene, deferred, id) {
    var propData = this.propData;

    return scene.loadShip(this.propData.resourceUrl, function() {
      deferred.resolve(new Ship(ccpwgl, this, id, propData));
    });
  };

  ShipArchetype.prototype.setResourceUrl = function(value) {
    this.propData.resourceUrl = value;

    return this;
  };

  return ShipArchetype;
});
/**
The planet wrapper

@module Client
@class Planet
*/
define('production/ccp/res/Planet',["lib/gl-matrix"], function(glMatrix) {
  "use strict";

  var Planet = function(obj, id, propData) {
    this.obj = obj;
    this.id = id;
    this.propData = propData;

    this.position = glMatrix.vec3.create();
    this.rotation = glMatrix.quat4.identity();
    this.transform = glMatrix.mat4.identity();

    this.radius = 60 * 1000;
  };

  Planet.prototype.toString = function() {
    return "Planet " + this.id;
  };

  Planet.prototype.getBoundingSphereRadius = function() {
    return this.radius;
  };

  Planet.prototype.getStateData = function(dest) {
    var result = dest || {};

    result.position = glMatrix.vec3.set(this.position, result.position || [0, 0, 0]);
    result.rotation = glMatrix.quat4.set(this.rotation, result.rotation || [0, 0, 0, 1]);

    return result;
  };

  Planet.prototype.setStateData = function(data) {
    glMatrix.vec3.set(data.position, this.position);
    glMatrix.quat4.set(data.rotation, this.rotation);

    glMatrix.mat4.fromRotationTranslation(this.rotation, [0, 0, 0], this.transform);
    glMatrix.mat4.scale(this.transform, [this.radius / 2, this.radius / 2, this.radius / 2]);
    this.transform[12] = this.position[0];
    this.transform[13] = this.position[1];
    this.transform[14] = this.position[2];

    this.obj.setTransform(this.transform);
  };

  return Planet;
});
/**
An archetype for planets

@module Client
@class PlanetArchetype
*/
define('production/ccp/res/PlanetArchetype',["production/ccp/res/Planet"], function(Planet) {
  "use strict";

  var PlanetArchetype = function(propData) {
    this.propData = propData;
  };

  PlanetArchetype.propType = "planet";

  PlanetArchetype.prototype.request = function(ccpwgl, scene, deferred, id) {
    var propData = this.propData;
    var obj = scene.loadPlanet(this.propData.itemId, this.propData.resourceUrl,
      this.propData.atmosphereUrl, this.propData.heightMap1Url, this.propData.heightMap2Url);

    deferred.resolve(new Planet(obj, id, propData));
  };

  PlanetArchetype.prototype.setItemId = function(value) {
    this.propData.itemId = value;

    return this;
  };

  PlanetArchetype.prototype.setResourceUrl = function(value) {
    this.propData.resourceUrl = value;

    return this;
  };

  PlanetArchetype.prototype.setAtmosphereUrl = function(value) {
    this.propData.atmosphereUrl = value;

    return this;
  };

  PlanetArchetype.prototype.setHeightMap1Url = function(value) {
    this.propData.heightMap1Url = value;

    return this;
  };

  PlanetArchetype.prototype.setHeightMap2Url = function(value) {
    this.propData.heightMap2Url = value;

    return this;
  };

  return PlanetArchetype;
});
/**
The Scenery wrapper

@module Client
@class Scenery
*/
define('production/ccp/res/Scenery',["lib/gl-matrix"], function(glMatrix) {
  "use strict";

  var Scenery = function(ccpwgl, obj, id, propData) {
    this.ccpwgl = ccpwgl;
    this.obj = obj;
    this.id = id;
    this.propData = propData;

    this.position = glMatrix.vec3.create();
    this.rotation = glMatrix.quat4.identity();
    this.transform = glMatrix.mat4.identity();
  };

  Scenery.prototype.toString = function() {
    return "Scenery " + this.id;
  };

  Scenery.prototype.getBoundingSphereRadius = function() {
    return this.obj.getBoundingSphere()[1];
  };

  Scenery.prototype.getStateData = function(dest) {
    var result = dest || {};

    result.position = glMatrix.vec3.set(this.position, result.position || [0, 0, 0]);
    result.rotation = glMatrix.quat4.set(this.rotation, result.rotation || [0, 0, 0, 1]);

    return result;
  };

  Scenery.prototype.setStateData = function(data) {
    glMatrix.vec3.set(data.position, this.position);
    glMatrix.quat4.set(data.rotation, this.rotation);

    glMatrix.mat4.fromRotationTranslation(this.rotation, this.position, this.transform);
    this.obj.setTransform(this.transform);
  };

  return Scenery;
});
/**
An archetype for sceneries (generic objects that can only be placed/rotated)

@module Client
@class SceneryArchetype
*/
define('production/ccp/res/SceneryArchetype',["production/ccp/res/Scenery"], function(Scenery) {
  "use strict";

  var SceneryArchetype = function(propData) {
    this.propData = propData || {};
    this.propData.propType = SceneryArchetype.propType;
  };

  SceneryArchetype.propType = "scenery";

  SceneryArchetype.prototype.request = function(ccpwgl, scene, deferred, id) {
    var propData = this.propData;

    return scene.loadObject(this.propData.resourceUrl, function() {
      deferred.resolve(new Scenery(ccpwgl, this, id, propData));
    });
  };

  SceneryArchetype.prototype.setResourceUrl = function(value) {
    this.propData.resourceUrl = value;

    return this;
  };

  return SceneryArchetype;
});
/**
A track stores data for one thing in a recording

@module Client
@class Track
*/
define('production/Track',[], function() {
  "use strict";

  var Track = function(data) {
    this.data = data;
    this.currentFrame = 0;
  };

  Track.prototype.getLength = function() {
    return this.data.length;
  };

  Track.prototype.setCurrentFrame = function(index) {
    this.currentFrame = index;
  };

  Track.prototype.getFrameData = function() {
    var data = null;
    var dataLength = this.data.length;

    if (dataLength > 0) {
      data = (dataLength > this.currentFrame) ? this.data[this.currentFrame] : this.data[dataLength - 1];
    }

    return data;
  };

  Track.prototype.setRecording = function(state) {
    this.recording = state;
  };

  Track.prototype.setFrameData = function(data) {
    var dataLength = this.data.length;

    if (this.recording) {
      if (dataLength < this.currentFrame) {
        if (dataLength > 0) {
          this.pushFrameUntilCurrentIndex(this.data[dataLength - 1]);
        } else {
          this.pushFrameUntilCurrentIndex(data);
        }
      }
      this.data[this.currentFrame] = data;
    }
  };

  Track.prototype.pushFrameUntilCurrentIndex = function(data) {
    var dataLength = this.data.length;

    while (dataLength < this.currentFrame) {
      this.data.push(data);
      dataLength++;
    }
  };

  return Track;
});
/**
A reel contains one or more tracks and keeps them in sync

@module Client
@class Reel
*/
define('production/Reel',[], function() {
  "use strict";

  var Reel = function() {
    this.tracks = [];
    this.currentFrame = 0;
  };

  Reel.prototype.getPosition = function() {
    return this.currentFrame;
  };

  Reel.prototype.getLength = function() {
    var length = 0;

    this.tracks.forEach(function(track) {
      var trackLength = track.getLength();

      if (trackLength > length) {
        length = trackLength;
      }
    });

    return length;
  };

  Reel.prototype.addTrack = function(track) {
    this.tracks.push(track);
    track.setCurrentFrame(this.currentFrame);
  };

  Reel.prototype.skipTo = function(frame) {
    this.currentFrame = frame;
    this.tracks.forEach(function(track) {
      track.setCurrentFrame(frame);
    });
  };

  Reel.prototype.nextFrame = function() {
    this.skipTo(this.currentFrame + 1);
  };

  return Reel;
});
/**
The helper is a static object providing some helper constants and functions
for browser access.

@module Client
@class BrowserHelper
*/
define('util/BrowserHelper',[], function() {
  "use strict";

  /**
   * Tries to find a property with prefixes for the common browsers on a
   * specific target.
   *
   * @method findPrefixProperty
   * @param {Object} target in which target object to look for
   * @param {String} name the name of the property (without prefix)
   * @param {Object} [shim] optional shim to return if none found
   * @param {Object} [overrides] optional overrides, keyed by the prefix
   * @return {Function} a getter function returning the found object or shim
   */
  var findPrefixProperty = function(target, name, shim, overrides) {
    var prefixes = ["webkit", "moz", "ms", "o"];
    var result = function() {
      return shim;
    };

    prefixes.forEach(function(prefix) {
      var fullName = (overrides && overrides[prefix]) || (prefix + name);

      if (fullName in target) {
        result = function() {
          return target[fullName];
        };
      }
    });

    return result;
  };

  var helper = {
    findPrefixProperty: findPrefixProperty
  };

  return helper;
});
/* global window */
/**
This is a time source that provides a relative second count based on the system.
It tries to use high performance time interface before falling back to Date().

@module Client
@class SystemTimeSource
*/
define('util/time/SystemTimeSource',["util/BrowserHelper"], function(browserHelper) {
  "use strict";

  // http://www.w3.org/TR/hr-time/#sec-DOMHighResTimeStamp
  var performance = window.performance || {};

  if (!("now" in performance)) {
    performance.now = browserHelper.findPrefixProperty(performance, "Now", function() {
      return new Date().getTime();
    })();
  }

  var SystemTimeSource = function() {
    this.startTime = performance.now();
  };

  /**
   * @method now
   * @return {Number} Seconds (including fractions) since instantiation.
   */
  SystemTimeSource.prototype.now = function() {
    return (performance.now() - this.startTime) * 0.001;
  };

  return SystemTimeSource;
});
/**
This is a time source that provides a second count based on a sync clock.

@module Client
@class ClockedTimeSource
*/
define('util/time/ClockedTimeSource',[], function() {
  "use strict";

  var ClockedTimeSource = function(hertz) {
    this.hertz = hertz;
    this.delta = 1 / hertz;

    this.time = 0.0;
  };

  /**
   * Increments the time by one tick
   * @method tick
   */
  ClockedTimeSource.prototype.tick = function() {
    this.time += this.delta;
  };

  /**
   * sets the time according to a specific amount of ticks
   * @method setTickCount
   * @param {Number} ticks amount of ticks
   */
  ClockedTimeSource.prototype.setTickCount = function(ticks) {
    this.time = ticks / this.hertz;
  };

  /**
   * @method now
   * @return {Number} Seconds (including fractions)
   */
  ClockedTimeSource.prototype.now = function() {
    return this.time;
  };

  return ClockedTimeSource;
});
/**
This time watch keeps track of deltas between calls of setTime() . 

@module Client
@class TimeWatch
*/
define('util/time/TimeWatch',[], function() {
  "use strict";

  var TimeWatch = function(initTime) {
    this.reset(initTime || 0);
  };

  /**
   * @method reset
   * @param {Number} time the new time
   */
  TimeWatch.prototype.reset = function(time) {
    this.lastTime = time;
    this.delta = 0.0;
  };

  /**
   * @method setTime
   * @param {Number} time the new time
   */
  TimeWatch.prototype.setTime = function(time) {
    this.delta = time - this.lastTime;
    this.lastTime = time;
  };

  /**
   * @method getDelta
   * @return {Number} Delta time since last checkpoint. Unit in seconds.
   */
  TimeWatch.prototype.getDelta = function() {
    return this.delta;
  };

  return TimeWatch;
});
/* jshint maxparams:20 */
/* global console */
/**
The ApplicationController is the master controller for the app

@module Client
@class ApplicationController
*/
define('ApplicationController',["lib/q", "Defaults", "ui/Dialogs", "production/Resources", "controls/GamepadApi",
    "production/ccp/res/ShipArchetype", "production/ccp/res/PlanetArchetype", "production/ccp/res/SceneryArchetype",
    "production/Track", "production/Reel", "util/time/SystemTimeSource", "util/time/ClockedTimeSource", "util/time/TimeWatch"
  ],

  function(q, defaults, uiDialogs, Resources, GamepadApi, ShipArchetype, PlanetArchetype, SceneryArchetype, Track, Reel,
    SystemTimeSource, ClockedTimeSource, TimeWatch) {
    "use strict";

    var addPlanet = function(resLibrary, itemId, resourceUrl, atmosphereUrl, heightMap1Url, heightMap2Url) {
      var arch = new PlanetArchetype({
        propType: PlanetArchetype.propType
      });

      arch.setItemId(itemId);
      arch.setResourceUrl(resourceUrl);
      arch.setAtmosphereUrl(atmosphereUrl);
      arch.setHeightMap1Url(heightMap1Url);
      arch.setHeightMap2Url(heightMap2Url);

      resLibrary.addResource("planet", arch);
    };

    var initModelView = function(modelView, controller, config) {
      modelView.status = "Initializing...";
      modelView.record = function() {
        controller.record();
      };
      modelView.stop = function() {
        controller.stop();
      };
      modelView.play = function() {
        controller.play();
      };
      modelView.newProp = function() {
        controller.newProp();
      };
      modelView.setFocusOnCamera = function() {
        controller.setFocusOnCamera();
      };
      modelView.setFocusOnProp = function(prop) {
        controller.setFocusOnProp(prop);
      };

      modelView.encodeSession = function() {
        return controller.encodeSession();
      };

      modelView.starLightColorChanged = function() {
        controller.setStarLightColor(modelView.set.lighting.starLightColor);
      };
      modelView.requestStar = function(starDesc) {
        controller.requestStar(starDesc);
      };

      modelView.set = {
        lighting: {
          starLightColor: [0, 0, 0]
        }
      };

      modelView.stars = [];
      var noStar = {
        resourceUrl: "",
        toString: function() {
          return "(no star)";
        }
      };
      modelView.stars.push(noStar);
      modelView.selectedStar = noStar;

      modelView.stageProps = [];
    };

    var ApplicationController = function(modelView, dialogFactory, config, productionManager, mainScreen) {
      var that = this;
      var sessionMeta = {
        set: {}
      };

      this.systemTimeSource = new SystemTimeSource();
      this.timeWatch = new TimeWatch();

      this.mainScreen = mainScreen;
      this.productionManager = productionManager;
      this.modelView = modelView;
      this.dialogFactory = dialogFactory;
      this.sessionMeta = sessionMeta;

      initModelView(modelView, this, config);

      var resPromise = productionManager.setResourcePath("res", "//web.ccpgamescdn.com/ccpwgl/res/");

      resPromise.then(function(resLibrary) {

        that.resourceLibrary = resLibrary;

        resLibrary.forEachResource("star", function(entry) {
          that.modelView.stars.push(entry);
        });

        addPlanet(resLibrary, 40000002,
          "res:/dx9/model/WorldObject/Planet/Template/Terrestrial/P_Terrestrial_61.red",
          undefined,
          "res:/dx9/model/worldobject/planet/Terrestrial/Terrestrial03_H.png",
          "res:/dx9/model/worldobject/planet/Terrestrial/Terrestrial04_H.png");
        addPlanet(resLibrary, 40000100,
          "res:/dx9/model/WorldObject/Planet/Template/Gas/P_GasGiant_12.red",
          undefined,
          "res:/dx9/model/worldobject/planet/Gasgiant/GasGiant01_D.png",
          "res:/dx9/model/worldobject/planet/Gasgiant/GasGiant03_D.png");

        modelView.$apply(function() {
          that.showCreationDialog(resLibrary);
        });
      });
    };

    ApplicationController.prototype.showCreationDialog = function(resLibrary) {
      var productionManager = this.productionManager;
      var mainScreen = this.mainScreen;
      var sessionMeta = this.sessionMeta;
      var modelView = this.modelView;
      var that = this;

      var createSession = function(creation, sessionData) {
        var deferred = q.defer();
        var session = {
          set: null,
          data: sessionData
        };

        creation.then(function(set) {
          session.set = set;
          deferred.resolve(session);
        }, function(err) {
          deferred.reject(err);
        });

        return deferred.promise;
      };

      var createDialogListener = {
        setQualityOptions: function(options) {
          productionManager.setQualityOptions(options);
        },

        createSpaceSet: function(background, sessionData) {
          var creation = productionManager.createSet(mainScreen, background.resourceUrl);

          sessionMeta.set = {
            space: {
              background: background.resourceUrl
            }
          };

          return createSession(creation, sessionData);
        },
        createChromaKeyedSet: function(color, sessionData) {
          var creation = productionManager.createChromaKeyedSet(mainScreen, color);

          sessionMeta.set = {
            chromaKey: {
              color: color
            }
          };

          return createSession(creation, sessionData);
        }
      };

      var dialogParams = {
        backgrounds: [],
        qualityOptions: productionManager.getQualityOptions()
      };

      resLibrary.forEachResource("sceneBg", function(entry) {
        dialogParams.backgrounds.push(entry);
      });
      dialogParams.backgrounds.sort(function(a, b) {
        return a.toString().localeCompare(b.toString());
      });

      var dialogTemplate = uiDialogs.createSessionDialog.getBuilder(that.dialogFactory, dialogParams);
      var loadingDialog = null;

      dialogTemplate.open().then(function(result) {
        loadingDialog = that.showSplash("Creating set...", "Please wait.");

        return result(createDialogListener);
      }).then(function(session) {
        loadingDialog.close();
        loadingDialog = null;
        that.onSessionCreated(session);
        modelView.status = "Set created";
        modelView.$apply();
      }, function(err) {
        var reason = (err && (err.message || err)) || "Unknown reason. That's bad.";

        loadingDialog.close();
        loadingDialog = null;
        that.showSplash("Failed to create a set. Try Reloading.", reason);
      });
    };

    ApplicationController.prototype.showSplash = function(title, message) {
      var params = {
        title: title,
        message: message
      };
      var dialog = uiDialogs.splashDialog.getBuilder(this.dialogFactory, params);
      var result = dialog.open();

      if (!this.modelView.$$phase) {
        this.modelView.$apply();
      }

      return dialog;
    };

    ApplicationController.prototype.encodeSession = function() {
      var session = {
        ver: 0,
        session: this.sessionMeta,
        stage: this.stageManager.encodeData(),
        videography: {
          cameras: [{
            shotList: this.cameraOperator.getShotList().data
          }]
        },
        lighting: this.set.getLightBoard().getStateData()
      };

      return JSON.stringify(session);
    };

    ApplicationController.prototype.newProp = function() {
      var that = this;
      var params = {
        resLibrary: this.resourceLibrary
      };
      var dialog = uiDialogs.addPropDialog.getBuilder(this.dialogFactory, params);

      dialog.open().then(function(callback) {
        callback(that);
      });

    };

    ApplicationController.prototype.addProp = function(arch, scriptData) {
      var that = this;
      var propPromise = this.set.getStage().enter(arch);

      propPromise.then(function(prop) {
        var radius = prop.getBoundingSphereRadius();

        that.createScriptedAnimatorForProp(prop, scriptData);

        if (!scriptData) {
          that.cameraOperator.placeObjectInFrontOfCamera(prop, radius);
          that.setFocusOnProp(prop);
        }

        that.modelView.stageProps.push(prop);
        that.modelView.$apply();
      });
    };

    ApplicationController.prototype.createScriptedAnimatorForProp = function(prop, scriptData) {
      var track = new Track(scriptData || []);
      var animator = this.stageManager.getAnimator(prop);

      animator.setScript(track);
      this.reel.addTrack(track);
    };

    ApplicationController.prototype.createDefaultBindings = function() {
      for (var actionName in defaults.inputsByAction) {
        this.director.addBinding({
          actionName: actionName
        }, {
          inputName: defaults.inputsByAction[actionName]
        });
      }
    };

    ApplicationController.prototype.setupGamepadInput = function() {
      var gamepadInput = this.director.getInputChannel("gamepad");

      var gamepadListener = {
        onGamepadDisconnected: function() {},
        onControlValueChanged: function(controlName, value) {
          gamepadInput.setIntensity(controlName, value);
        }
      };

      var gamepadApi = new GamepadApi();
      gamepadApi.addGamepadListener({
        onGamepadConnected: function(gamepad) {
          gamepad.addListener(gamepadListener);
        },
        onGamepadDisconnected: function() {}
      });

      gamepadApi.init();
    };

    ApplicationController.prototype.findStarDescByResourceUrl = function(resourceUrl) {
      var result = null;

      this.modelView.stars.forEach(function(starDesc) {
        if (starDesc.resourceUrl === resourceUrl) {
          result = starDesc;
        }
      });

      return result;
    };

    ApplicationController.prototype.onSessionCreated = function(session) {
      var that = this;
      var set = session.set;
      var lightBoard = set.getLightBoard();

      this.set = set;
      this.clockedTimeSource = new ClockedTimeSource(this.set.getSyncSource().getRate());
      this.timeWatch.reset(that.clockedTimeSource.now());

      this.director = new Resources.Director();
      this.reel = new Reel();
      this.stopReelTransmission();

      this.camCommands = this.director.getCommandChannel("camera", Resources.CameraOperator.getActionNames());

      var shotList = null;
      if (session.data && session.data.lighting) {
        this.modelView.set.lighting.starLightColor = session.data.lighting.starLightColor;
        lightBoard.setStarLightColor(session.data.lighting.starLightColor);
        if (session.data.lighting.starResourceUrl !== "") {
          this.modelView.selectedStar = this.findStarDescByResourceUrl(session.data.lighting.starResourceUrl);
          lightBoard.requestStar(session.data.lighting.starResourceUrl);
        }
      }
      if (session.data && session.data.videography) {
        session.data.videography.cameras.forEach(function(cameraEntry) {
          var track = new Track(cameraEntry.shotList);

          that.reel.addTrack(track);
          if (!shotList) {
            shotList = track;
          }
        });
      }
      if (!shotList) {
        shotList = new Track([]);
        this.reel.addTrack(shotList);
      }
      this.cameraOperator = new Resources.CameraOperator(set.getSceneCamera(), shotList, this.timeWatch);
      this.setFocusOnCamera();

      this.stageManager = new Resources.StageManager(set.getStage(), this.timeWatch);

      this.createDefaultBindings();
      this.setupGamepadInput();

      if (session.data) {
        session.data.stage.props.forEach(function(propEntry) {
          var arch = that.productionManager.getArchetypeForProp(propEntry.propData);

          that.addProp(arch, propEntry.script);
        });
      }

      // TODO: The command channel must come from the prop archetype!
      this.animCommands = that.director.getCommandChannel("animator", Resources.CameraOperator.getActionNames()); // TODO: proper action names

      set.getSyncSource().setCallback(function() {
        // TODO: move this to some general time keeper

        // this is part of the callback from the intermittent mechanism; onNewFrame
        that.clockedTimeSource.tick();
        that.timeWatch.setTime(that.clockedTimeSource.now());
        //that.timeWatch.setTime(that.systemTimeSource.now());
        //console.log("time: " + that.timeWatch.getDelta());
        that.stageManager.updateStage();
        that.cameraOperator.updateCamera();

        // this is part of the intermittent mechanism
        that.reelTransmission.update();
      });

    };

    ApplicationController.prototype.setStarLightColor = function(rgb) {
      var lightBoard = this.set.getLightBoard();

      lightBoard.setStarLightColor(rgb);
    };

    ApplicationController.prototype.requestStar = function(starDesc) {
      var lightBoard = this.set.getLightBoard();

      if (starDesc.resourceUrl !== "") {
        lightBoard.requestStar(starDesc.resourceUrl);
      } else {
        lightBoard.removeStar();
      }
    };

    ApplicationController.prototype.clearFocus = function() {
      if (this.focusTarget) {
        this.focusTarget.setCommandChannel(null);
        this.focusTarget = null;
        this.focusTrack.setRecording(false);
        this.focusTrack = null;
        this.focusCommandChannel = null;

        this.modelView.selectedFocus = null;
        this.modelView.$apply();
      }
    };

    ApplicationController.prototype.setFocusOnCamera = function() {
      this.clearFocus();
      this.focusTarget = this.cameraOperator;
      this.focusTrack = this.cameraOperator.getShotList();
      this.focusCommandChannel = this.camCommands;

      this.cameraOperator.setChaseObject(null);
      this.focusTarget.setCommandChannel(this.focusCommandChannel);
    };

    ApplicationController.prototype.setFocusOnProp = function(prop) {
      this.clearFocus();
      this.focusTarget = this.stageManager.getAnimator(prop);
      this.focusTrack = this.focusTarget.getScript();
      this.focusCommandChannel = this.animCommands;

      this.cameraOperator.setChaseObject(prop);
      this.focusTarget.setCommandChannel(this.focusCommandChannel);

      this.modelView.selectedFocus = prop;
      this.modelView.$apply();
    };

    ApplicationController.prototype.record = function() {
      this.startReelTransmission();
      this.reel.skipTo(0);

      if (this.focusTarget) {
        this.focusTarget.setCommandChannel(this.focusCommandChannel);
        this.focusTrack.setRecording(true);
      }
    };

    ApplicationController.prototype.stop = function() {
      this.stopReelTransmission();
      this.reel.skipTo(0);

      if (this.focusTarget) {
        this.focusTarget.resetToRecording();
        this.focusTarget.setCommandChannel(this.focusCommandChannel);
        this.focusTrack.setRecording(false);
      }
    };

    ApplicationController.prototype.play = function() {
      this.startReelTransmission();
      this.reel.skipTo(0);

      if (this.focusTarget) {
        this.focusTarget.setCommandChannel(null);
        this.focusTrack.setRecording(false);
      }
    };

    ApplicationController.prototype.startReelTransmission = function() {
      var reel = this.reel;

      this.reelTransmission = {
        update: function() {
          reel.nextFrame();
        }
      };
    };

    ApplicationController.prototype.stopReelTransmission = function() {
      this.reelTransmission = {
        update: function() {}
      };
    };

    /**
    Creates a controller function

    @method create
    @param config {Object} the configuration to use
    @return {Function} Controller function
  */
    var create = function(config, productionManager, mainScreen) {
      return function($scope, $dialog) {
        return new ApplicationController($scope, $dialog, config, productionManager, mainScreen);
      };
    };

    return {
      ApplicationController: ApplicationController,
      create: create
    };
  });
/**
The sync source provides a callback mechanism for black-burst synchronization.

@module Client
@class SyncSource
*/
define('production/ccp/SyncSource',[], function() {
  "use strict";

  var clockRate = 60; // as per requestAnimFrame

  var SyncSource = function(ccpwgl, scene) {
    this.ccpwgl = ccpwgl;
    this.scene = scene;
  };

  /**
    This method registers a callback that is called for each picture.
    @method setCallback
    @param callback {function() void} the function to call for each new picture
  */
  SyncSource.prototype.setCallback = function(callback) {
    // With current ccpwgl implementation, there is no callback happening
    // before rendering AND retrieving the view matrix from the camera.
    // Note: independent of the Update() calls.

    this.ccpwgl.onPostRender = callback;
  };

  SyncSource.prototype.getRate = function() {
    return clockRate;
  };

  return SyncSource;
});
/**
The set provides access to all necessary set properties

@module Client
@class Set
*/
define('production/ccp/Set',[], function() {
  "use strict";

  var Set = function(components) {
    this.ccpwgl = components.ccpwgl;
    this.scene = components.scene;
    this.syncSource = components.syncSource;
    this.stage = components.stage;
    this.sceneCamera = components.sceneCamera;
    this.lightBoard = components.lightBoard;
  };

  Set.prototype.getSyncSource = function() {
    return this.syncSource;
  };

  Set.prototype.getStage = function() {
    return this.stage;
  };

  Set.prototype.getSceneCamera = function() {
    return this.sceneCamera;
  };

  Set.prototype.getLightBoard = function() {
    return this.lightBoard;
  };

  return Set;
});
/**
The Stage holds all the set pieces and actors

@module Client
@class Stage
*/
define('production/ccp/Stage',["lib/q"], function(q) {
  "use strict";

  var Stage = function(ccpwgl, scene) {
    this.ccpwgl = ccpwgl;
    this.scene = scene;

    this.propCounter = 1;
    this.props = [];
  };

  /**
   * Iterates through all props and passes them to a callback
   *
   * @method forEachProp
   * @param {Function} callback to receive each prop in succession
   */
  Stage.prototype.forEachProp = function(callback) {
    this.props.forEach(callback);
  };

  /**
   * @method enter
   * @param {Object} archetype the archetype to request
   * @return {Promise} for the creation
   */
  Stage.prototype.enter = function(archetype) {
    var deferred = q.defer();
    var that = this;

    archetype.request(this.ccpwgl, this.scene, deferred, this.propCounter++);
    deferred.promise.then(function(prop) {
      that.props.push(prop);
    });

    return deferred.promise;
  };

  Stage.prototype.getProps = function() {
    return this.props;
  };

  return Stage;
});
/**
The SceneCamera is a very basic camera for the scene. It has the minimal
implementation to provide the projection and view matrices.

@module Client
@class SceneCamera
*/
define('production/ccp/SceneCamera',["lib/gl-matrix", "util/GlHelper"], function(glMatrix, helper) {
  "use strict";

  var SceneCamera = function() {
    this.fov = 60;
    this.nearPlane = 1;
    this.farPlane = 100000;

    this.rotation = glMatrix.quat4.identity();
    this.position = glMatrix.vec3.create();
    this.viewOffset = glMatrix.vec3.create();

    this.projection = glMatrix.mat4.create();
    this.view = glMatrix.mat4.create();

    this.updateView = this.calculateView;
  };

  SceneCamera.prototype.nullFunction = function() {

  };

  SceneCamera.prototype.calculateView = function() {
    glMatrix.mat4.fromRotationTranslation(this.rotation, this.viewOffset, this.view);
    glMatrix.mat4.translate(this.view, this.position);

    this.updateView = this.nullFunction;
  };

  SceneCamera.prototype.onViewChanged = function() {
    this.updateView = this.calculateView;
  };

  SceneCamera.prototype.getProjection = function(aspect) {
    glMatrix.mat4.perspective(this.fov, aspect, this.nearPlane, this.farPlane, this.projection);

    return this.projection;
  };

  SceneCamera.prototype.getView = function() {
    this.updateView();

    return this.view;
  };

  SceneCamera.prototype.update = function(dt) {

  };

  SceneCamera.prototype.getStateData = function(dest) {
    var result = dest || {};

    result.viewOffset = this.getViewOffset(result.viewOffset);
    result.position = this.getPosition(result.position);
    result.rotation = this.getRotation(result.rotation);

    return result;
  };

  SceneCamera.prototype.setStateData = function(data) {
    glMatrix.vec3.set(data.viewOffset, this.viewOffset);
    glMatrix.vec3.set(data.position, this.position);
    glMatrix.quat4.set(data.rotation, this.rotation);
    this.onViewChanged();
  };

  SceneCamera.prototype.getViewOffset = function(dest) {
    return glMatrix.vec3.set(this.viewOffset, dest || [0, 0, 0]);
  };

  SceneCamera.prototype.getPosition = function(dest) {
    return glMatrix.vec3.set(this.position, dest || [0, 0, 0]);
  };

  SceneCamera.prototype.setPosition = function(position) {
    glMatrix.vec3.set(position, this.position);
    this.onViewChanged();
  };

  SceneCamera.prototype.getRotation = function(dest) {
    return glMatrix.quat4.set(this.rotation, dest || [0, 0, 0, 0]);
  };

  SceneCamera.prototype.setRotation = function(rotation) {
    glMatrix.quat4.set(rotation, this.rotation);
    this.onViewChanged();
  };

  return SceneCamera;
});
/**
The light board provides access to lighting controls

@module Client
@class LightBoard
*/
define('production/ccp/LightBoard',["lib/q"], function(q) {
  "use strict";

  var SunLoadedState = function() {
    this.context = null;
  };

  SunLoadedState.prototype.activate = function(context) {
    this.context = context;
  };

  SunLoadedState.prototype.request = function(deferred, resourceUrl) {
    this.context.activateSunState(new SunLoadingState(deferred, resourceUrl));
  };

  SunLoadedState.prototype.remove = function() {
    this.context.activateSunState(new SunUnloadingState());
  };

  var SunUnloadingState = function() {

  };

  SunUnloadingState.prototype.activate = function(context) {
    context.scene.removeSun();
    context.activateSunState(new SunUnloadedState());
  };

  var SunLoadingState = function(deferred, resourceUrl) {
    this.context = null;
    this.resourceUrl = resourceUrl;
    this.deferred = deferred;

    this.nextState = new SunLoadedState();
  };

  SunLoadingState.prototype.activate = function(context) {
    var that = this;

    context.scene.loadSun(this.resourceUrl, function() {
      context.stateData.starResourceUrl = that.resourceUrl;
      context.activateSunState(that.nextState);
      that.deferred.resolve();
    });
  };

  SunLoadingState.prototype.request = function(deferred, resourceUrl) {
    this.nextState = new SunLoadingState(deferred, resourceUrl);
  };

  SunLoadingState.prototype.remove = function() {
    this.nextState = new SunUnloadingState();
  };

  var SunUnloadedState = function() {
    this.context = null;
  };

  SunUnloadedState.prototype.activate = function(context) {
    this.context = context;
  };

  SunUnloadedState.prototype.request = function(deferred, resourceUrl) {
    return this.context.activateSunState(new SunLoadingState(deferred, resourceUrl));
  };

  SunUnloadedState.prototype.remove = function() {

  };

  var LightBoard = function(ccpwgl, scene) {
    this.ccpwgl = ccpwgl;
    this.scene = scene;

    this.stateData = {
      starLightColor: [0, 0, 0],
      starResourceUrl: ""
    };

    this.setStarLightColor(this.stateData.starLightColor); // reset

    this.activateSunState(new SunUnloadedState());
  };

  LightBoard.prototype.getStateData = function() {
    return this.stateData;
  };

  LightBoard.prototype.activateSunState = function(state) {
    this.sunState = state;
    state.activate(this);
  };

  LightBoard.prototype.setStarLightColor = function(rgb) {
    this.stateData.starLightColor = rgb || [0, 0, 0];
    this.scene.setSunLightColor(this.stateData.starLightColor);
  };

  /**
   * Requests a star based on given URL. The returned promise will only be
   * resolved. Time-outs or several sequential re-requests will have the
   * promise ignored.
   *
   * @method requestStar
   * @param {String} resourceUrl the URL of the star
   * @return {Promise} Will be resolved when star loaded.
   */
  LightBoard.prototype.requestStar = function(resourceUrl) {
    var deferred = q.defer();

    this.sunState.request(deferred, resourceUrl);

    return deferred.promise;
  };

  /**
   * Requests to remove the current star. If one is still loading, it will
   * be removed as soon as it is ready.
   */
  LightBoard.prototype.removeStar = function() {
    this.sunState.remove();
  };

  LightBoard.SunStates = {
    Unloaded: SunUnloadedState,
    Loading: SunLoadingState,
    Loaded: SunLoadedState,
    Unloading: SunUnloadingState
  };

  return LightBoard;
});
/**
A list of archetypes

@module Client
@class ArchetypeList
*/
define('production/ccp/res/ArchetypeList',["production/ccp/res/PlanetArchetype", "production/ccp/res/SceneryArchetype", "production/ccp/res/ShipArchetype"], function() {
  "use strict";

  var list = [];
  var i;

  for (i = 0; i < arguments.length; i++) {
    list.push(arguments[i]);
  }

  return list;
});
/**
The resource library contains entries for various set pieces available from
the production manager.

@module Client
@class ResourceLibrary
*/
define('production/ResourceLibrary',[], function() {
  "use strict";

  var ResourceLibrary = function(namespace) {
    this.namespace = namespace;

    this.resources = {};
  };

  ResourceLibrary.prototype.getNamespace = function() {
    return this.namespace;
  };

  ResourceLibrary.prototype.addResource = function(type, entry) {
    var list = this.resources[type];

    if (!list) {
      this.resources[type] = list = [];
    }
    list.push(entry);
  };

  ResourceLibrary.prototype.forEachResource = function(type, callback) {
    if (type in this.resources) {
      this.resources[type].forEach(callback);
    }
  };

  return ResourceLibrary;
});
/*jshint maxparams:10 */

/**
The production manager is responsible for creating a set with all necessary
deparments. 

@module Client
@class ProductionManager
*/
define('production/ccp/ProductionManager',["lib/q", "production/ccp/SyncSource", "production/ccp/Set", "production/ccp/Stage",
    "production/ccp/SceneCamera", "production/ccp/LightBoard", "production/ccp/res/ArchetypeList",
    "production/ResourceLibrary", "lib/ccpStandardGraphicIds"
  ],

  function(q, SyncSource, Set, Stage, SceneCamera, LightBoard, archetypeList, ResourceLibrary, ccpStandardGraphicIds) {
    "use strict";

    var archetypesByType = {};
    var standardResourceLibrary = null;

    archetypeList.forEach(function(Constructor) {
      archetypesByType[Constructor.propType] = Constructor;
    });

    var forEachCcpStandardId = function(callback) {
      var id;
      var entry;

      for (id in ccpStandardGraphicIds) {
        entry = ccpStandardGraphicIds[id];
        if (entry.graphicFile) {
          callback(parseInt(id, 10), entry);
        }
      }
    };

    var sceneOptions = {};

    var onSceneCreated = function(ccpwgl, scene) {
      var components = {
        ccpwgl: ccpwgl,
        scene: scene,
        syncSource: new SyncSource(ccpwgl, scene),
        stage: new Stage(ccpwgl, scene),
        sceneCamera: new SceneCamera(),
        lightBoard: new LightBoard(ccpwgl, scene)
      };

      ccpwgl.setCamera(components.sceneCamera);

      return new Set(components);
    };

    var createSceneDeferred = function(ccpwgl, canvas, strategy) {
      var deferred = q.defer();
      var resolveCallback = function(scene) {
        var set = onSceneCreated(ccpwgl, scene);

        deferred.resolve(set);
      };

      try {
        ccpwgl.initialize(canvas, sceneOptions);

        strategy(resolveCallback);
      } catch (ex) {
        deferred.reject(ex);
      }

      return deferred.promise;
    };

    var ProductionManager = function(ccpwgl) {
      this.ccpwgl = ccpwgl;
    };

    ProductionManager.STANDARD_RES_NAMESPACE = "res";
    // ProductionManager.STANDARD_RES_URL = "//web.ccpgamescdn.com/ccpwgl/res/";
    ProductionManager.STANDARD_RES_URL = "//developers.eveonline.com/ccpwgl/assetpath/860161/";

    var sceneRegExp = /.*\/scene\/.*red$/i;
    var shipRegExp = /.*\/model\/ship\/.*red$/i;
    var wreckRegExp = /.*wreck.*/i;
    var planetRegExp = /.*\/planet\/.*red$/i;
    var starRegExp = /.*\/model\/lensflare\/.*red$/i;
    var turretRegExp = /.*\/model\/turret\/.*red$/i;
    var objRegExp = /.*red$/i;
    var ignoredRegExp = /.*(character|interior|placeable).*/i;

    var isSceneBackground = function(entry) {
      return sceneRegExp.test(entry.graphicFile);
    };

    var isShip = function(entry) {
      return shipRegExp.test(entry.graphicFile) && !wreckRegExp.test(entry.graphicFile);
    };

    var isPlanet = function(entry) {
      return planetRegExp.test(entry.graphicFile);
    };

    var isStar = function(entry) {
      return starRegExp.test(entry.graphicFile);
    };

    var isTurret = function(entry) {
      return turretRegExp.test(entry.graphicFile);
    };

    var isObject = function(entry) {
      return objRegExp.test(entry.graphicFile) && !ignoredRegExp.test(entry.graphicFile);
    };

    var createSceneBackgroundEntry = (function() {
      var entryPrototype = {
        toString: function() {
          return this.resourceUrl;
        }
      };

      return function(entry) {
        var bgEntry = Object.create(entryPrototype);

        bgEntry.resourceUrl = entry.graphicFile;

        return bgEntry;
      };
    })();

    var createStarEntry = (function() {
      var entryPrototype = {
        toString: function() {
          return this.resourceUrl;
        }
      };

      return function(entry) {
        var starEntry = Object.create(entryPrototype);

        starEntry.resourceUrl = entry.graphicFile;

        return starEntry;
      };
    })();

    var createShipArchetype = function(entry) {
      var Constructor = archetypesByType.ship;
      var propData = {
        resourceUrl: entry.graphicFile
      };

      return new Constructor(propData, entry.description);
    };

    var createSceneryArchetype = function(entry) {
      var Constructor = archetypesByType.scenery;
      var propData = {
        resourceUrl: entry.graphicFile
      };

      return new Constructor(propData, entry.description);
    };

    ProductionManager.getStandardResourceLibrary = function() {

      if (!standardResourceLibrary) {
        standardResourceLibrary = new ResourceLibrary(ProductionManager.STANDARD_RES_NAMESPACE);
        forEachCcpStandardId(function(id, entry) {
          if (isSceneBackground(entry)) {
            standardResourceLibrary.addResource("sceneBg", createSceneBackgroundEntry(entry));
          } else if (isShip(entry)) {
            standardResourceLibrary.addResource("ship", createShipArchetype(entry));
          } else if (isPlanet(entry)) {
            // TODO
          } else if (isStar(entry)) {
            standardResourceLibrary.addResource("star", createStarEntry(entry));
          } else if (isTurret(entry)) {
            // TODO
          } else if (isObject(entry)) {
            standardResourceLibrary.addResource("scenery", createSceneryArchetype(entry));
          }
        });
      }

      return standardResourceLibrary;
    };

    ProductionManager.prototype.getQualityOptions = function() {
      var options = [];
      var valueOption = function(title, id) {
        var opt = {
          title: title,
          id: id
        };

        return opt;
      };

      // Texture quality options are currently disabled, as long as
      // we only have the HIGH ones available.
      //
      // options.push({
      //   title: "Texture Quality",
      //   field: "textureQuality",
      //   defaultValue: this.ccpwgl.TextureQuality.HIGH,
      //   values: [valueOption("High", this.ccpwgl.TextureQuality.HIGH),
      //     valueOption("Medium", this.ccpwgl.TextureQuality.MEDIUM),
      //     valueOption("Low", this.ccpwgl.TextureQuality.LOW)
      //   ]
      // });

      options.push({
        title: "Shader Quality",
        field: "shaderQuality",
        defaultValue: this.ccpwgl.ShaderQuality.HIGH,
        values: [valueOption("High", this.ccpwgl.ShaderQuality.HIGH),
          valueOption("Low", this.ccpwgl.ShaderQuality.LOW)
        ]
      });

      options.push({
        title: "Anisotropic Filter",
        field: "anisotropicFilter",
        defaultValue: true,
        values: [valueOption("Yes", true),
          valueOption("No", false)
        ]
      });

      options.push({
        title: "Postprocessing",
        field: "postprocessing",
        defaultValue: false,
        values: [valueOption("Yes", true),
          valueOption("No", false)
        ]
      });

      return options;
    };

    ProductionManager.prototype.setQualityOptions = function(options) {
      var name;

      for (name in options) {
        sceneOptions[name] = options[name];
      }
    };

    /**
     * See ccpwgl.setResourcePath()
     *
     * @method setResourcePath
     * @param {string} namespace Resource namespace.
     * @param {string} url URL to resource root. Needs to have a trailing slash.
     * @return {Deferred} A deferred that will resolve with a resource library
     */
    ProductionManager.prototype.setResourcePath = function(namespace, url) {
      var deferred = q.defer();

      this.ccpwgl.setResourcePath(namespace, url);
      if (namespace === ProductionManager.STANDARD_RES_NAMESPACE) {
        deferred.resolve(ProductionManager.getStandardResourceLibrary());
      } else {
        deferred.reject("Not supported");
      }

      return deferred.promise;
    };

    ProductionManager.prototype.createSet = function(canvas, backgroundUrl) {
      var ccpwgl = this.ccpwgl;

      return createSceneDeferred(ccpwgl, canvas, function(callback) {
        var onLoad = function() {
          callback(this);
        };

        ccpwgl.loadScene(backgroundUrl, onLoad);
      });
    };

    ProductionManager.prototype.createChromaKeyedSet = function(canvas, backgroundColor) {
      var ccpwgl = this.ccpwgl;

      return createSceneDeferred(ccpwgl, canvas, function(callback) {
        var scene = ccpwgl.createScene(backgroundColor);

        callback(scene);
      });
    };

    ProductionManager.prototype.getArchetypeForProp = function(propData) {
      var Constructor = archetypesByType[propData.propType];
      var arch = null;

      if (Constructor) {
        arch = new Constructor(propData);
      }

      return arch;
    };

    return ProductionManager;
  });
/* global FileReader */
/**
This service wraps the FileReader and transforms an evented API into a promise API.

Source: http://odetocode.com/blogs/scott/archive/2013/07/03/building-a-filereader-service-for-angularjs-the-service.aspx

@module Client
@class FileInputDirective
*/
define('services/FileReaderService',[], function() {
  "use strict";

  var fileReader = function($q) {

    var onLoad = function(scope, deferred, reader) {
      return function() {
        scope.$apply(function() {
          deferred.resolve(reader.result);
        });
      };
    };

    var onError = function(scope, deferred, reader) {
      return function() {
        scope.$apply(function() {
          deferred.reject(reader.result);
        });
      };
    };

    var getReader = function(scope, deferred) {
      var reader = new FileReader();

      reader.onload = onLoad(scope, deferred, reader);
      reader.onerror = onError(scope, deferred, reader);

      return reader;
    };

    var readAsText = function(scope, file, encoding) {
      var deferred = $q.defer();
      var reader = getReader(scope, deferred);

      reader.readAsText(file, encoding);

      return deferred.promise;
    };

    return {
      readAsText: readAsText
    };
  };

  var register = function(angular, appModule) {
    appModule.factory("fileReader", ["$q", fileReader]);
  };

  var service = {
    register: register
  };

  return service;
});
/**
The Service list collects all services

@module Client
@class DirectiveList
*/
define('services/ServiceList',["services/FileReaderService"],
  function() {
    "use strict";

    var directives = [];
    var i;

    for (i = 0; i < arguments.length; i++) {
      directives.push(arguments[i]);
    }

    return directives;
  });
/**
The Controller list collects all controller modules

@module Client
@class Controller
*/
define('ui/ControllerList',["ui/SplashDialog", "ui/CreateSessionDialog", "ui/AddPropDialog"],
  function() {
    "use strict";

    var controller = [];
    var i;

    for (i = 0; i < arguments.length; i++) {
      controller.push(arguments[i]);
    }

    return controller;
  });
/**
The data-film-view directive handles the correct display of a film view and
its contained port.

@module Client
@class FilmViewDirective
*/
define('directives/FilmViewDirective',["util/BrowserHelper"], function(browserHelper) {
  "use strict";

  var watchFullScreen = function($window, callback) {
    var document = $window.document;
    var isFullScreen = function() {
      return document.fullScreen;
    };

    if (!("fullScreen" in document)) {
      isFullScreen = browserHelper.findPrefixProperty(document, "FullScreen", false, {
        webkit: "webkitIsFullScreen"
      });
    }

    var lastFullScreen = isFullScreen();

    // This interval is necessary to cover cases where the browser is already in
    // maximized mode (F11, presentation-mode) and switches between fullscreen modes
    $window.setInterval(function() {
      var newFullScreen = isFullScreen();

      if (newFullScreen !== lastFullScreen) {
        lastFullScreen = newFullScreen;
        callback();
      }
    }, 100);
  };

  var register = function(angular, appModule) {
    appModule.directive("filmView", function($window) {
      return function(scope, element) {
        var area = element[0];
        var win = angular.element($window);
        var ratio = 16.0 / 9.0;

        var updateStyle = function(newDimension) {
          scope.style = function() {
            var height = (newDimension.width / ratio).toFixed(0);
            var top = 0;

            if (newDimension.height > height) {
              top = ((newDimension.height - height) / 2).toFixed(0);
            }

            return {
              position: "relative",
              top: top + "px",
              width: newDimension.width + "px",
              height: height + "px"
            };
          };
        };

        scope.getAreaDimension = function() {
          return {
            width: area.clientWidth,
            height: area.clientHeight
          };
        };

        scope.goFullscreen = function() {
          if (!area.requestFullScreen) {
            area.requestFullScreen = browserHelper.findPrefixProperty(area, "RequestFullScreen", function() {})();
          }
          area.requestFullScreen();
        };

        scope.$watch(scope.getAreaDimension, function(newValue, oldValue) {
          updateStyle(newValue);
        }, true);

        win.bind("resize", function() {
          if (!scope.$$phase) {
            scope.$apply();
          }
        });

        watchFullScreen($window, function() {
          scope.$apply();
        });
      };
    });

  };

  var directive = {
    register: register
  };

  return directive;
});
/* global Blob */
/**
The data-save-as directive handles saving of the session to a file.

@module Client
@class SaveAsDirective
*/
define('directives/SaveAsDirective',["util/BrowserHelper"], function(browserHelper) {
  "use strict";

  var register = function(angular, appModule) {
    appModule.directive("saveAs", function($window) {
      return function(scope, element, attrs) {
        var rawElement = element[0];
        var url = $window.URL;

        if (!url) {
          url = browserHelper.findPrefixProperty($window, "URL", {
            createObjectURL: function() {
              return "#";
            }
          });
        }

        rawElement.target = "_blank";
        rawElement.download = "session.json";
        element.bind("click", function(event) {
          rawElement.href = "#";
        });

        element.bind("click", function() {
          var textToWrite = scope.encodeSession();
          var textFileAsBlob = new Blob([textToWrite], {
            type: "application/json;charset=utf-8"
          });

          rawElement.href = url.createObjectURL(textFileAsBlob);
        });

      };
    });

  };

  var directive = {
    register: register
  };

  return directive;
});
/**
The data-file-input directive is for adding a change event to a file input.

@module Client
@class FileInputDirective
*/
define('directives/FileInputDirective',[], function() {
  "use strict";

  var register = function(angular, appModule) {
    appModule.directive("fileInput", function($parse) {
      return {
        restrict: "EA",
        template: "<input type=\"file\" />",
        replace: true,
        link: function(scope, element, attrs) {
          var modelGet = $parse(attrs.fileInput || attrs.dataFileInput);
          var modelSet = modelGet.assign;
          var onChange = $parse(attrs.onChange);

          var updateModel = function() {
            scope.$apply(function() {
              modelSet(scope, element[0].files[0]);
              onChange(scope);
            });
          };

          element.bind("change", updateModel);
        }
      };
    });
  };

  var directive = {
    register: register
  };

  return directive;
});
/* global console */
/**
The data-color-input directive is for handling a color value

@module Client
@class ColorInputDirective
*/
define('directives/ColorInputDirective',[], function() {
  "use strict";

  var partToHex = function(part) {
    var fixedNumberText = (part * 255.0).toFixed(0);
    var parsedNumber = parseInt(fixedNumberText, 10);

    return ("0" + parsedNumber.toString(16)).substr(-2);
  };

  var colorStringParser = {
    "^#([0-9A-Fa-f]){6}$": function(value) {
      var r = parseInt(value.substr(1, 2), 16);
      var g = parseInt(value.substr(3, 2), 16);
      var b = parseInt(value.substr(5, 2), 16);

      return [r / 255.0, g / 255.0, b / 255.0];
    }
  };

  var forEachMatchingColorStringParser = function(colorString, callback) {
    var expression;
    var regExp;

    for (expression in colorStringParser) {
      regExp = new RegExp(expression);
      if (regExp.test(colorString)) {
        callback(colorStringParser[expression]);
      }
    }
  };

  var parseColor = function(colorString) {
    var result = null;

    forEachMatchingColorStringParser(colorString, function(parser) {
      result = parser(colorString);
    });

    return result;
  };

  var isColorValid = function(colorString) {
    var result = false;

    forEachMatchingColorStringParser(colorString, function() {
      result = true;
    });

    return result;
  };

  var register = function(angular, appModule) {
    appModule.directive("colorInput", function($parse) {
      return {
        restrict: "EA",
        template: "" + //
        "<div class='row-fluid'>" + //
        "<div class='span4 container'><input class='span12' type='text' ng-model='colorText' placeholder='#0044BB' ng-change='colorChanged()'></input></div>" + //
        "<div class='offset4 span4 container' ng-style='{ backgroundColor: colorText }'></div>" + //
        "</div>",
        replace: true,
        link: function(scope, element, attrs) {
          var modelGet = $parse(attrs.color || attrs.dataColor);
          var modelSet = modelGet.assign;
          var onChange = $parse(attrs.onChange);

          scope.$watch(attrs.color, function(value) {
            if (value) {
              scope.colorText = "#" + partToHex(value[0]) + partToHex(value[1]) + partToHex(value[2]);
            }
          });

          scope.colorChanged = function() {
            var color = parseColor(scope.colorText);

            modelSet(scope, color);

            onChange(scope);
          };
        }
      };
    });
  };

  var directive = {
    register: register
  };

  return directive;
});
/**
The Directive list collects all directives

@module Client
@class DirectiveList
*/
define('directives/DirectiveList',["directives/FilmViewDirective", "directives/SaveAsDirective", "directives/FileInputDirective", "directives/ColorInputDirective"],

  function() {
    "use strict";

    var directives = [];
    var i;

    for (i = 0; i < arguments.length; i++) {
      directives.push(arguments[i]);
    }

    return directives;
  });
/* jshint maxparams:10 */
/**
ClientApp is the primary entry point for the main client side application

@module Client
@class ClientApp
*/
define('ClientApp',["module", "angular", "lib/ccpwgl", "ApplicationController", "production/ccp/ProductionManager", "services/ServiceList", "ui/ControllerList", "directives/DirectiveList"],

  function(module, angular, ccpwgl, appController, ProductionManager, serviceList, controllerList, directiveList) {
    "use strict";

    var config = module.config();

    var main = function(mainScreen) {
      var appModule = angular.module("ClientApp", ["ui.bootstrap"]);
      var productionManager = new ProductionManager(ccpwgl);

      appModule.controller("ApplicationController", ["$scope", "$dialog", appController.create(config, productionManager, mainScreen)]);

      serviceList.forEach(function(service) {
        service.register(angular, appModule);
      });

      directiveList.forEach(function(directive) {
        directive.register(angular, appModule);
      });

      controllerList.forEach(function(controller) {
        controller.register(appModule);
      });

      return [appModule.name];
    };

    return main;
  });
