var promise;
angular.module('app', [])
	.controller('ChessCtrl', function ($scope, $interval) {
		$scope.board = Array.apply(null, Array(8)).map(function (_, i) {return i});
		var size = 8;
		$scope.chess = new Chess(size, 4 , 0);
		$scope.play = function() {
			if (promise) $interval.cancel (promise);
			angular.element(document.querySelectorAll('.horse')).remove();
			$scope.chess.solve();
			$scope.solutions = $scope.chess.getSolutions();
			$scope.stringSolution = $scope.chess.getSolutionString();
			
			$scope.index = 0;
			promise = $interval(function () {
				var img = document.createElement('img');
				img.src = 'chess-knight.png';
				img.className = 'horse';
				angular.element(document.querySelectorAll('.horse')).addClass('old');
				if ($scope.solutions.hasOwnProperty( $scope.index )) {
					var pos = $scope.solutions[$scope.index];
					var element = document.querySelector ("[data-x='" + pos.x + "'][data-y='" + pos.y + "']");
					angular.element (element).append (img);
				}
				if ($scope.index > Object.keys ($scope.solutions).length) $interval.cancel (promise);
				$scope.index++;
			}, 1000);
		};
	});