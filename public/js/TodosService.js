/**
 * Created by enrique.munguia on 8/4/16.
 */
angular.module("todoApp")
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
    });