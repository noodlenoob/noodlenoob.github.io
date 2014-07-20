var app = angular.module("app", [])

var students = [{
  name: 'Rafael',
  lastname: 'Fernandes'
}, {
  name: 'Wagner',
  lastname: 'da Silva'
}, ]

var student1 = {
  name: 'Rafael',
  lastname: 'Fernandes'
}

var reverse = false;

app.controller('MainCtrl', function($scope, $http, $filter) {
  $scope.searched = false;
  $scope.students = students;
  $scope.reverse = reverse
  
  $scope.range = function(min, max, step){
    step = (step === undefined) ? 1 : step;
    var input = [];
    for (var i = min; i <= max; i += step) input.push(i);
    return input;
  };
  
  var successresult = function (response){
        $scope.githubuser = response.data;  
        $scope.processing = false;
        $scope.searched = true;
        $scope.reverse = false;
  };

  var errorResult = function (response){
        $scope.error = "Not able to reach the server!";  
        $scope.processing = false;
        $scope.githubuser = null;
  };

var orderBy = $filter('orderBy');
  
  $scope.search = function() {
    $scope.processing = true;
    $http.get("http://noodlenoob.github.io/monsterdata.txt")
    .then(successresult, errorResult)
  };
  
  $scope.order = function(predicate, reverse) {
    $scope.githubuser = orderBy($scope.githubuser, predicate, reverse);
};
});