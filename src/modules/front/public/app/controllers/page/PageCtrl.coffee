module.exports = (app) ->
	app.controller 'PageCtrl', ["$scope",
		($scope) ->
			$scope.phrase = "Here you go! You've got some web dev to do...";
			return
	]
