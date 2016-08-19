app.controller("PasswordController", function($scope, password, mdPanelRef, $location) {
    $scope.verifyPassword = function() {
        if ($scope.input.password == password) {
            $scope.closeDialog();
        } else {}
    }

    $scope.closeDialog = function() {
        mdPanelRef && mdPanelRef.close().then(function() {
            mdPanelRef.destroy();
        })
    }
})