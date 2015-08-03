(function(angular) {
  'use strict';
  
angular.module('root', [])
  .controller('index', ['$scope', function($scope){
    $scope.dialogs = [
      {
        minimized: false,
        maximized: false,
        width: 200,
        height: 300,
        top: 30,
        left: 30,
        zindex: 1,
        template: 'experiment-dialog.html'
      },
      
      {
        minimized: false,
        maximized: false,
        width: 200,
        height: 250,
        top: 257,
        left: 238,
        zindex: 0,
        template: 'other-dialog.html'
      },
      
      {
        minimized: false,
        maximized: false,
        width: 200,
        height: 250,
        top: 215,
        left: 103,
        zindex: 2,
        template: 'other-dialog.html'
      },
      
      {
        minimized: false,
        maximized: false,
        width: 200,
        height: 200,
        top: 80,
        left: 154,
        zindex: 3,
        template: 'other-dialog.html'
      }
    ];
    
    $scope.globals = {
      maxbool: false
    };
    
    //should be in a separate directive?
    $scope.restore = function(dialog, dialogs) {
      dialog.minimized = false;
      var k = dialog.zindex;
      var l = dialogs.length;
      for(var i = 0; i < l; i++){
		      if(dialogs[i].zindex > k) {
		        dialogs[i].zindex -= 1;
		      } 
		    }
		    dialog.zindex = l-1;
    };
    
  }])
  
  .directive('makeDialog', function($document) {
	return {
		restrict: 'E',
		scope: {
			model: '=',
			dialogs: '=',
			globals: '='
		},
		templateUrl: 'dialog.html',
		link: function(scope, element, attrs) {
		  
		 //bring to top
		 scope.zorder = function() {
		    var k = scope.model.zindex;
		    var l = scope.dialogs.length;
		    for(var i = 0; i < l; i++){
		      if(scope.dialogs[i].zindex > k) {
		        scope.dialogs[i].zindex -= 1;
		      } 
		    }
		    scope.model.zindex = l-1;
		  };
		  
		  //jqlite elements
		  var dialog = angular.element(element[0].querySelector('.dialog'));
		  var topBar = dialog.children().eq(0);
		  var drag = dialog.children().eq(2);
		  
		  //minimization
		  scope.minimize = function() {
		    scope.model.minimized = true;
		  }; 
		  
		  //maximization
		  scope.maximize = function() {
		    if(scope.model.maximized === false) {
		      scope.model.maximized = true;
		      scope.globals.maxbool = true;
		    } else {
		      scope.model.maximized = false;
		      scope.globals.maxbool = false;
		    }
		  };
		  
		  //drag variables
		  var t = scope.model.top;
		  var l = scope.model.left;
		  var offsetL = 0, offsetT = 0;
		  
		  //drag functions
		  topBar.on('mousedown', function(event) {
		    event.preventDefault();
		    offsetL = event.screenX - l;
		    offsetT = event.screenY - t;
		    $document.on('mousemove', mousemoveDrag);
		    $document.on('mouseup', mouseupDrag);
		  });
		    
		  function mousemoveDrag(event) {
		    l = event.screenX - offsetL;
		    t = event.screenY - offsetT;
		    dialog.css({
            top: Math.max(0,t) + 'px',
            left: Math.max(0,l) + 'px'
        });
		  }
		  
		  function mouseupDrag(event) {
		    $document.off('mousemove', mousemoveDrag);
		    $document.off('mouseup', mouseupDrag);
		    scope.model.top = Math.max(0,t);
		    scope.model.left = Math.max(0,l);
		    scope.$apply();
		  }
		  
		  //resize variables
		  var h = 0, w = 0, startX = 0, startY = 0;
		  var minW = 100, minH = 100; //minimium allowable window size
		  
		  //resize functions
		  drag.on('mousedown', function(event) {
		      event.preventDefault();
		      startY = event.screenY;
		      startX = event.screenX;
		      $document.on('mousemove', mousemoveSize);
		      $document.on('mouseup', mouseupSize);
		  });
		  
		  function mousemoveSize(event) {
		    w = scope.model.width + event.screenX - startX;
		    h = scope.model.height + event.screenY - startY;
		    dialog.css({
		      width: Math.max(w, minW) + 'px',
		      height: Math.max(h, minH) + 'px'
		    });
		  }
		  
		  function mouseupSize(event) {
		    $document.off('mousemove', mousemoveSize);
		    $document.off('mouseup', mouseupSize);
		    scope.model.width = Math.max(w, minW);
		    scope.model.height = Math.max(h, minH);
		    scope.$apply();
		  }
		}
	};
});


})(window.angular);