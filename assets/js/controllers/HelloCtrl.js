function HelloCtrl($scope) {
  $scope.title = 'This is A';
  $scope.hello = function () {
    console.log('hello!');
  };
}
