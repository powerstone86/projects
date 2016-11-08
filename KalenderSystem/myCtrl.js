 app.config(function($routeProvider) 
{
            $routeProvider
                    .when('/', {template : "<center><h2><p>Detta är första sidan</p></h2></center>"})
                    .when('/employee', {
            templateUrl: 'employee.html',
            controller: 'employeeController'
        }).
        otherwise({
            redirectTo: '/'
        });
});
    
app.controller("mainController", function($scope) 
{	

});
