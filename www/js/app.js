var db = null;

angular.module('app', ['ionic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ionic-datepicker', 'restangular'])

  .run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
      if (window.cordova && window.SQLitePlugin) {
        db = $cordovaSQLite.openDB({ name: 'receipt_capture.db', location: 'default' });
      } else {
        db = window.openDatabase('user', '1.0', 'receipt_capture.db', 100 * 1024 * 1024);
      }
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS user (id text primary key, value text)");
    });
  })

  .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', 'RestangularProvider',
    function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, RestangularProvider) {

      RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/json'
      });

      $ionicConfigProvider.backButton.previousTitleText(false);
      $ionicConfigProvider.backButton.icon('ion-chevron-left');
      $ionicConfigProvider.backButton.text('');

      var
        menuView = {
          url: '/',
          templateUrl: 'views/menu.html',
          controller: 'menuController'
        };

      $stateProvider
        .state('menu', menuView);

      $urlRouterProvider.otherwise('/');

    }]);
