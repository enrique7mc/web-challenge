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
            return $http.get("/todos").
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error finding todos.");
            });
        };
        this.createTodo = function (todo) {
            return $http.post("/todos", todo).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error creating todo.");
            });
        };
        this.editTodo = function (todo) {
            var url = '/todos/' + todo._id;
            return $http.put(url, todo).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error editing todo.");
            });
        };

        this.deleteTodo = function (todoId) {
            var url = '/todos/' + todoId;
            return $http.delete(url).
            then(function(response) {
                return response;
            }, function(response) {
                alert("Error deleting todo.");
            });
        }
    })
    .controller('ListController', function (todos, $scope, $location, Todos) {
        $scope.todos = todos.data;

        $scope.addTodo = function () {
            if (!$scope.todoDescription) {
                return;
            }
            var todo = {
                description: $scope.todoDescription,
                completed: false
            };
            Todos.createTodo(todo).then(function (doc) {
                $location.path("/");
                $scope.todos.push(doc.data);
            }, function (response) {
                alert(response);
            });

            $scope.todoDescription = '';
        };

        $scope.toggleTodo = function (todo) {
            console.log(todo);
            Todos.editTodo(todo);
        };

        $scope.clearCompleted = function () {
            var idsToDelete = $scope.todos.filter(function (todo) {
                return todo.completed;
            }).map(function (todo) {
                return todo._id;
            });
            idsToDelete.forEach(function (id) {
               Todos.deleteTodo(id);
            });
            $scope.todos = $scope.todos.filter(function (todo) {
                return !todo.completed;
            });
        };
    });
