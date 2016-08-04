angular.module("todoApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListController",
                resolve: {
                    todos: function(Todos) {
                        return Todos.getTodos();
                    }
                }
            })
            .otherwise({
                redirectTo: "/"
            });
    });