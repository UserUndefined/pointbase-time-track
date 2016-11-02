var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      console.log('onDeviceReady called');
      app.receivedEvent('deviceready');
      var startButton = document.getElementById("start-button");
      startButton.addEventListener('click', this.startRecording, false);
      startButton.addEventListener('on-tap', this.startRecording, false);
      startButton.addEventListener('onclick', this.startRecording, false);
      startButton.addEventListener('onClick', this.startRecording, false);
      var myButton = document.getElementById("btnClick");
      myButton.addEventListener("click", this.clicked, false);
      document.getElementById("btnNotPress").addEventListener('click', this.clicked, false);
      document.getElementById("btnDoStuff").addEventListener('click', this.clicked, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    startRecording: function(){
      console.log('startRecording called');
      alert("You clicked a button.");
    },
    clicked: function()
    {
      console.log('clicked called');
      alert("You clicked a button.");
    }
};

app.initialize();
