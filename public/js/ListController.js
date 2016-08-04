/**
 * Created by enrique.munguia on 8/4/16.
 */
angular.module("todoApp")
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