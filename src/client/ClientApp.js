/* jshint maxparams:10 */
/**
ClientApp is the primary entry point for the main client side application

@module Client
@class ClientApp
*/
define(["module", "angular", "lib/ccpwgl", "ApplicationController", "production/ccp/ProductionManager", "ui/ControllerList", "directives/DirectiveList"],

function(module, angular, ccpwgl, appController, ProductionManager, controllerList, directiveList) {
  "use strict";

  var config = module.config();

  var main = function(mainScreen) {
    var appModule = angular.module("ClientApp", ["ui.bootstrap"]);
    var productionManager = new ProductionManager(ccpwgl);

    appModule.controller("ApplicationController", ["$scope", "$dialog", appController.create(config, productionManager, mainScreen)]);

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