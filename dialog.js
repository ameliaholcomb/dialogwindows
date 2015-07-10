angular.module('root', [])
.controller('index', ['$scope', function($scope) {
	$scope.dialogs = [
		{
			minimized: true,
			top: '10px',
			left: '10px',
			width: '600px',
			height: '800px',
			template: 'experiment-dialog.html'
		}
	]
}])

  .directive('makeDialog', function() {
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
		  
		  //draggable
		  topBar.on('mousedown', function() {
		    dialog.css('border', 'solid purple')
		  })
		  
		}
	};
});