angular.module('root', [])
.controller('index', ['$scope', function($scope) {
	$scope.experimentDialog = {
		minimized: true,
		top: '10px',
		left: '10px',
		width: '600px',
		height: '800px',
		template: 'experiment-dialog.html'
	};
}])

.directive('makeDialog', function() {
	return {
		restrict: 'E',
		scope: {
			model: '='
		},
		templateUrl: 'dialog.html',
		link: function(scope, element, attrs) {
			scope.minimize = function() {
				scope.model.minimized = true;
			};
		}
	};
});