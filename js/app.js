app = angular.module('pizzaapp', ['ngRoute', 'ngMaterial']);

app.controller('AppController', function($scope, $mdSidenav, $http, $mdPanel, $location) {

    $scope.createGroup = function(name, password) {
        $http.post('http://pizzatummyserver.herokuapp.com/api/newGroup?name=' + encodeURI(name) + '&password=' + encodeURI(password)).then(function(response) {
            $scope.id = response.data._id;
            $scope.showDialog();
        });
    }

    $scope.showDialog = function() {
        var position = $mdPanel.newPanelPosition()
            .absolute()
            .center();
        var config = {
            attachTo: angular.element(document.body),
            controller: "IdPanelController",
            templateUrl: 'partials/idPanel/idPanel.tmpl.html',
            hasBackdrop: true,
            position: position,
            trapFocus: true,
            panelClass: "id-panel",
            zIndex: 150,
            locals: {
                id: $scope.id
            },
            clickOutsideToClose: true,
            escapeToClose: true,
            focusOnOpen: true
        };
        $mdPanel.open(config);
    };

    $scope.toNewGroupPage = function() {
        $location.path("/newGroup")
    }
})