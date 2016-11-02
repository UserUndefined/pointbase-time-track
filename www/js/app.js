var db = null;

angular.module('app', ['ionic', 'ngCordova', 'ionic-material', 'ionMdInput', 'ionic-datepicker', 'restangular','angularMoment'])

  .run(function($ionicPlatform, $cordovaSQLite, moment) {
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
      //cordovaHTTP.enableSSLPinning(true, function() {console.log('success!');}, function() {console.log('error :(');});
      window.CordovaHttpPlugin.acceptAllCerts(true, function() {console.log('success!');}, function() {console.log('error :(');});
      backgroundGeolocation.configure(locationReceived, locationError, {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        interval: 300000
      });
      function locationReceived(location){
        //console.log('location received!!!!');
        //alert('location received');
        postLocation(location, function (err, result) {
          if (result) {
            //console.log(JSON.stringify(result));
            backgroundGeolocation.finish();
          }
          else {
            //console.log(JSON.stringify('no result'));
            backgroundGeolocation.finish();
          }
        });
      }
      function locationError(error){
        console.log('location error received!!!!');
      }
      function postLocation(location, callback) {
        var location = {latitude: location.latitude, longitude: location.longitude, user: 'Test02', dateTime: moment().format()};
        window.CordovaHttpPlugin.post("https://generic-receiver-api.herokuapp.com/location", location, {}, function(response) {
          //alert('location sent');
          return callback(null, 'OK');
        }, function(error) {
          //alert('location not sent')
          return callback(error);
        });
        //return callback(null, 'OK');
      }
      backgroundGeolocation.start();
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

document.addEventListener("deviceready", function() {
  //alert('test test test');
  //angular.bootstrap(domElement, ["app"]);
}, false);