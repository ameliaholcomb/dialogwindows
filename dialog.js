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
		  var topBar = element.find('span');
		  var dialog = element.find('div');
		  
		  //drag variables
		  var t = scope.model.top;
		  var l = scope.model.left;
		  var offsetL = 0
		  var offsetT = 0;
		  
		  //drag functions
		  topBar.on('mousedown', function(event) {
		    event.preventDefault();
		    offsetL = event.screenX - l;
		    offsetT = event.screenY - t;
		    $document.on('mousemove', mousemove);
		    $document.on('mouseup', mouseup);
		  });
		    
		  function mousemove(event) {
		    l = event.screenX - offsetL;
		    t = event.screenY - offsetT;
		    dialog.css({
            	top: t + 'px',
            	left:  l + 'px'
        	});
		  }
		  
		  function mouseup(event) {
		    $document.off('mousemove', mousemove);
		    $document.off('mouseup', mouseup);
		    scope.model.top = t;
		    scope.model.left = l;
		    scope.$apply();
		  } 

		}
	};
});