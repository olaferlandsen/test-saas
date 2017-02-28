angular.module('app', [])
	.controller('NumberNameCtrl', function ($scope) {
		$scope.$watch('number', function (n) {
			if (Number(n) == n) $scope.name = numberName(n);
		});
	});