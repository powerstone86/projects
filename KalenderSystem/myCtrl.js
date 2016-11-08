app.controller("mainController", function($scope) 
{	


    app.config(function($routeProvider) 
    {
            $routeProvider
                    .when('/', {template : "<h2><p>Detta är första sidan</p></h2>"})
                    .when('/employee', {
            templateUrl: 'employee.html',
            controller: 'employeeCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    });

});
