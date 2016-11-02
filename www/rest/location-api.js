'use strict';

angular.module('app')
    .factory('LocationApi', ['Restangular', function (Restangular) {
        return Restangular.withConfig(function (RestangularConfigurer) {
          RestangularConfigurer.setBaseUrl('https://generic-receiver-api.herokuapp.com/');
        });
    }]);
