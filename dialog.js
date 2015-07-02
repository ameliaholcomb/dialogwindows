angular.module('root', [])
.controller('index', ['$scope', function($scope) {
	$scope.experimentDialog = {
		minimized: true,
		top: 10,
		left: 10,
		width: 600,
		height: 800,
		template: 'experiment-dialog.html'
	};
}])

.directive('makeDialog', function() {
	return {
		restrict: 'E',
		scope: {
			model: '='
		},
		templateUrl: 'dialog.html'
	};
});