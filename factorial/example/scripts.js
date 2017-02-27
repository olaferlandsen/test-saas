var promise;
angular.module('app', [])
	.controller('FactorialCtrl', function ($scope) {
		$scope.$watch('number', function (n) {
			var parsed = Number(n);
			if (parsed == n) {
				$scope.iterativeFactorial = iterativeFactorial(parsed);
				$scope.recursiveFactorial = recursiveFactorial(parsed);
				$scope.allZeros = allRightZeros(parsed);
				$scope.lastZeros= lastRightZeros(parsed);
			}
		});
	});