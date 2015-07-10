(function(angular) {
  'use strict';
  
angular.module('root', [])
  .controller('index', ['$scope', function($scope){
    $scope.dialogs = [
      {
      minimized: false,
      width: 200,
      height: 300,
      top: 0,
      left: 0,
      template: 'experiment-dialog.html'
      },
      
      {
        minimized: false,
        width: 200,
        height: 200,
        top: 300,
        left: 250,
        template: 'other-dialog.html'
      }
    ]
  }])
  
  .directive('makeDialog', function($document) {
	return {
		restrict: 'E',
		scope: {
			model: '='
		},
		templateUrl: 'dialog.html',
		link: function(scope, element, attrs) {
		  
		  //minimization
		  scope.minimize = function() {
		    scope.model.minimized = true;
		  }; 
		  
		  //jqlite elements
		  var dialog = element.find('div');
		  var topBar = dialog.children().eq(0);
		  var drag = dialog.children().eq(1);
		  
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
            top: t + 'px',
            left: l + 'px'
        });
		  }
		  
		  function mouseupDrag(event) {
		    $document.off('mousemove', mousemoveDrag);
		    $document.off('mouseup', mouseupDrag);
		    scope.model.top = t;
		    scope.model.left = l;
		    scope.$apply();
		  }
		  
		  //resize variables
		  var h = 0, w = 0, startX = 0, startY = 0;
		  
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
		      width: w + 'px',
		      height: h + 'px'
		    });
		  }
		  
		  function mouseupSize(event) {
		    $document.off('mousemove', mousemoveSize);
		    $document.off('mouseup', mouseupSize);
		    scope.model.width = w;
		    scope.model.height = h;
		    scope.$apply();
		  }
		}
	};
});