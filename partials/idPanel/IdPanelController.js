app.controller("IdPanelController", function($scope, mdPanelRef, id, $location) {
    $scope.id = id;
    
    $scope.closeDialog = function() {
        mdPanelRef && mdPanelRef.close().then(function() {
            mdPanelRef.destroy();
        })
        $location.path('/'+$scope.id)
    }
})