app.config(function($routeProvider, $mdIconProvider, $mdThemingProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "partials/home/home.html"
        })
        .when('/newGroup', {
            templateUrl: "partials/newGroup/newGroup.html"
        })
        .when('/:id', {
            templateUrl: "partials/editGroup/editGroup.html",
            scope: false,
            controller: "EditGroupController"
        });

    $mdThemingProvider.theme('docs', 'default')
        .primaryPalette('red')

    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('red')
        .dark()
})