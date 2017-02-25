(function(){
	'use strict';

	angular
	.module('app')
	.factory('Auth', Auth);

	Auth.$inject = ['$http'];

	function Auth($http) {
		var loggedIn = false;
		var currentUser = {};

		return {
			register: register,
			login: login,
			isLoggedIn: isLoggedIn,
			getUserStatus: getUserStatus
		}

		function isLoggedIn() { 
			return loggedIn;
		}

		function getUserStatus() {
			return loggedIn
		}

		function register(user) {
			return $http.post('/users/register', user);
		}

		function login(user) {
			return $http.post('/users/login', user)
			.then(function(response){
				loggedIn = true;
			}, function(response){
				console.log('error occured');
				loggedIn = false;
			});
		};
	}
})();