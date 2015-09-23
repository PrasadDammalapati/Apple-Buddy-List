var myApp = angular.module("MyApp", ["ngRoute", "LocalStorageModule", "ngModal"]);

myApp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
    .when("/", { templateUrl: 'templs/users.html', controller: 'UsersCtrl', title: "Buddies List" })
    .when("/Users", { templateUrl: 'templs/users.html', controller: 'UsersCtrl', title: "Buddies List" })
    .when("/details", { templateUrl: 'templs/userdetails.html', controller: 'DetailsCtrl', title: "User Details" })
    //.when("/NewBuddy", { templateUrl: 'templs/newuser.html', controller: 'NewUsersCtrl', title: "New Buddy" })
    .otherwise('/');
}]);

myApp.config(function (ngModalDefaultsProvider) {
    return ngModalDefaultsProvider.set({
        closeButtonHtml: "<i class='fa fa-times'></i>"
    });
});

myApp.controller("MyCtrl", function ($scope) {
    
});

myApp.run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.mytitle = current.$$route.title;
    });
}]);

myApp.controller("UsersCtrl", function ($scope, localStorageService) {

    $scope.myPopup = {
        modalShown: false
    }
    $scope.logClose = function () {
        console.log('close!');
    };
    $scope.NewBuddy = function () {
        $scope.myPopup.modalShown = !$scope.myPopup.modalShown;
    };

    $scope.SaveData = function (pars) {
        //alert(pars.fname);
        $scope.AllUsers.push({ id: pars.id, FirstName: pars.fname, LastName: pars.lname, UserName: pars.uname, Email: pars.email, DOB: pars.dob, BIO: pars.boi });
        pars.id = ''; pars.fname = ''; pars.lname = ''; pars.uname = ''; pars.email = ''; pars.dob = ''; pars.bio = '';
    };
    
    $scope.init = function () {
        if (!localStorageService.get("MyBuddiesData")) {
            $scope.AllUsers = [
                         { id: 1, FirstName: "Prasad", LastName: "D", UserName: "prasad.d", Email: "naveen.prasad152@gmail.com", DOB: "7-5-1987", BIO: "N/A" },
                         { id: 2, FirstName: "Harsha", LastName: "H", UserName: "harsha.h", Email: "harsha123@gmail.com", DOB: "12-9-1990", BIO: "N/A" },
                         { id: 3, FirstName: "Sateesh", LastName: "S", UserName: "sateesh.s", Email: "sateesh.s@gmail.com", DOB: "3-10-1988", BIO: "N/A" },
                         { id: 4, FirstName: "Vardhan", LastName: "V", UserName: "vardhan.v", Email: "vardhan.v@gmail.com", DOB: "9-20-1992", BIO: "N/A" }
            ];
        }
        else {
            $scope.AllUsers = localStorageService.get("MyBuddiesData");
        }
    };

    $scope.deleteUser = function (item) {
        var index = $scope.AllUsers.indexOf(item);
        $scope.AllUsers.splice(index, 1);
    };

    $scope.$watch("AllUsers", function (newVal, oldVal) {
        if (newVal !== null && angular.isDefined(newVal) && newVal !== oldVal) {
            localStorageService.add("MyBuddiesData", angular.toJson(newVal));
        }
    }, true);

});

//myApp.controller("DetailsCtrl", function ($scope, $routeParams) {
    
//});