angular.module('app', [])
	.controller('NumberNameCtrl', function ($scope) {
		$scope.$watch('number', function (n) {
			if (parseInt(n) == n) $scope.name = numberName(n);
		});
	});