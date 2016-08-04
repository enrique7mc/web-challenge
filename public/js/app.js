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
    })
    .service("Todos", function($http) {
        this.getTodos = function() {
            // return $http.get("/todos").
            // then(function(response) {
            //     return response;
            // }, function(response) {
            //     alert("Error finding todos.");
            // });
            return mockTodos;
        };
        this.createTodo = function () {

        }
    })
    .controller('ListController', function (todos, $scope) {
        $scope.todos = todos.data;

        $scope.addTodo = function (todo) {
            // call API post
            mockTodos.data.push({
                id: mockTodos.data.length + 1,
                description: $scope.todoDescription,
                completed: false
            });
        };

        $scope.clearCompleted = function () {
            // call api delete
            mockTodos.data = mockTodos.data.filter(function (todo) {
                return !todo.completed;
            });
            console.log(mockTodos.data);
        };
    });

var mockTodos = {
    data: [
        {
            id: 1,
            description: 'todo 1',
            completed: false
        },
        {
            id: 2,
            description: 'todo 2',
            completed: true
        },
        {
            id: 3,
            description: 'todo 3',
            completed: false
        }
    ]
};