app.controller("EditGroupController", function($scope, $mdPanel, $http, $routeParams) {

    $scope.searchText = null;
    $scope.selectedToppings = [];
    $scope.selectedItem = null;
    $scope.id = $routeParams.id;

    $scope.populateItems = function() {
        return $http.get("http://pizzatummyserver.herokuapp.com/api/getGroup/" + $scope.id).then(function(response) {
            $scope.group = response.data;
            console.log($scope.group);
        });
    }

    $scope.init = function() {
        $scope.populateItems().then(function() {
            $scope.showDialog();
        });
    }

    $scope.transformChip = function(chip) {
        // If it is an object, it's already a known chip
        if (angular.isObject(chip)) {
            return chip;
        }

        // Otherwise, create a new one
        return {
            name: chip,
            type: 'Other'
        }
    }

    $scope.showDialog = function() {
        var position = $mdPanel.newPanelPosition()
            .absolute()
            .center();
        var config = {
            attachTo: angular.element(document.body),
            controller: "PasswordController",
            templateUrl: 'partials/passwordPanel/passwordPanel.tmpl.html',
            hasBackdrop: true,
            position: position,
            trapFocus: true,
            panelClass: "pwd-panel",
            zIndex: 150,
            locals: {
                password: $scope.group.password
            },
            focusOnOpen: true
        };
        $mdPanel.open(config);
    };

    $scope.addItem = function(item) {
        if ($scope.item.base && $scope.item.size) {
            $scope.item.toppings = $scope.selectedToppings.map(function(topping) {
                return topping.name;
            });
            $http.post("http://pizzatummyserver.herokuapp.com/api/addItem/" + $scope.id + "?item=" + encodeURIComponent(JSON.stringify($scope.item))).then(function(response) {
                $scope.item = null;
                $scope.selectedToppings = null;

                $scope.populateItems();
            });
        }
    }

    $scope.querySearch = function(query) {
        var results = query ? $scope.defaultToppings.filter($scope.createFilterFor(query)) : [];
        return results;
    }

    $scope.createFilterFor = function(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(topping) {
            return (topping._lowername.indexOf(lowercaseQuery) === 0) ||
                (topping._lowertype.indexOf(lowercaseQuery) === 0);
        };
    }

    $scope.loadToppings = function() {
        defaultToppings = [{
            name: "Pepperoni",
            type: "Meat"
        }, {
            name: "Bacon",
            type: "Meat"
        }, {
            name: "Meatballs",
            type: "Meat"
        }, {
            name: "Ham",
            type: "Meat"
        }, {
            name: "Chicken",
            type: "Meat"
        }, {
            name: "BBQ Sauce",
            type: "Sauce"
        }, {
            name: "Peppers",
            type: "Veggie"
        }, {
            name: "Tomatoes",
            type: "Veggie"
        }, {
            name: "Mushrooms",
            type: "Veggie"
        }, {
            name: "Onions",
            type: "Veggie"
        }, {
            name: "Olives",
            type: "Veggie"
        }]
        return defaultToppings.map(function(topping) {
            topping._lowername = topping.name.toLowerCase();
            topping._lowertype = topping.type.toLowerCase();
            return topping;
        });
    }

    $scope.defaultToppings = $scope.loadToppings();
})