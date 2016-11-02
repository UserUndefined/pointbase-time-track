'use strict';

angular.module('app')
    .controller('menuController', function ($scope) {

      function initialise(){
        $scope.spacesController = [];
        $scope.spacesController.push({});
      }

      $scope.submitReceipt = function(){
          //alert('hello');
      };

      initialise();

    });
