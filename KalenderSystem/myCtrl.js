app.config(function($routeProvider) 
{
		$routeProvider
                .when('/', {templateUrl : "angularTest.html"})
                .when('/employee', {templateUrl : "pages/employee.html"})
                .otherwise({redirectTo:'/'});
});

app.controller("myCtrl", function($scope, dateFilter, $http) 
{	

	/*$scope.beginDate = new Date();
	$scope.endDate = new Date();

    $scope.$watch('date', function (date)
    {
        $scope.itemDate = dateFilter(date, 'YYYY-MM-DD HH:MM:SS');
		$scope.beginDate = $scope.itemDate;
		$scope.endDate = $scope.itemDate;
		
    });*/

	getUsers(); // anropar funktionen för att hämta alla användare när man startar sidan
	getDepartments();
	getEvents();

    //$scope.employees = [];
	//$scope.item = {};
	//var newItem = {};
    $scope.addItems = function () // funktion som lägger till anställda
	{
		/*newItem.number = $scope.item.number;
		newItem.name = $scope.item.name;
		newItem.date = $scope.date;
		newItem.attended = $scope.checkboxModel;
		if($scope.checkboxModel == null)
			alert("Får inte vara null");
			
        $scope.employees.push(newItem);*/ // lägger till anställd i först i arrayen
		
		//model = newItem.date;
    }
	/*option: null,
    availableOptions: [
      {id: $scope.number, name: 'Option A'},
      {id: '2', name: 'Option B'},
      {id: '3', name: 'Option C'}
    ],
		selectedOption: {name: 'Select a option'} //This sets the default value of the select in the ui
    };*/
	
	function showEvents()
	{
		var ev = document.getElementById('allEvents');	
		var evTable = document.getElementById('evTable');
		if (ev.style.display === 'block') 
		{
			ev.style.display = 'none';
			evTable.style.border = "0";
		} else {
			ev.style.display = 'block';
			evTable.style.border = "1px solid";		
		}
	}
	
	$scope.showDepartments = function()
	{
		var dep = document.getElementById('allDepartments');	
		var depTable = document.getElementById('tableDepartment');	
		document.getElementById('searchDep').autofocus;
		dep.style.display = 'block';
		depTable.style.border = "1px solid";	
		/*if (dep.style.display === 'block') 
		{		
			dep.style.display = 'none';
			depTable.style.border = "0";
		} else {
			dep.style.display = 'block';
			depTable.style.border = "1px solid";		
			//dep.style = 'transform: rotate(180deg);'; 
		}	*/
		
		/*document.getElementById("btnDepartment").disabled = true;
		var buttonDepartment = document.getElementById("btnDepartment");
		buttonDepartment.style.cursor = "not-allowed";*/
	}
	
	/*$scope.orderByMe = function(u) // funktion som sorterar när man klickar på tabellen
	{
        $scope.myOrderBy  = u;
    }
    $scope.removeItem = function (x) // funktion som tar bort från tabellen
	{
        $scope.employees.splice(x, 1);
    }*/
	
	$scope.users = []; // array för alla anställda i en array från databasen
	$scope.departments = [];
	$scope.events = []; // array för alla events i en array från databasen
	$scope.eventType = []; // array för alla event-typer från databasen

	// Lägg till ett event
	$scope.addEvents = function()
	{
		if(document.getElementById("beginDate").value == "" || document.getElementById("endDate").value == "" ||
		   document.getElementById("depID").value == "" || document.getElementById("evTypeID").value == "" ||
		   document.getElementById("empID").value == "")
		{				
		}
		else
		{	
			$http.post("https://odz-server.herokuapp.com/api/events",
			{
				begins_at: new DateTime(document.getElementById("beginDate").value),
				ends_at: new DateTime(document.getElementById("endDate").value),
				department_id: $scope.selectedDepID,
				event_type_id: $scope.evTypeID,
				user_id: $scope.selectedEmpID 
			}
			).then(
			 function(response)
			{
				console.log(response);
				$scope.events = response.data; // Visar data från databasen om anropet lyckades
			},
			function(response)
			{				
				//alert("Fel: " + $scope.events);
				console.log($scope.events);
				console.log(response);
				
			}
			);
		}
	}

	$scope.changedEmpValue = function(empID) /* när man valt employee från DropDown listan visas IDn för den employeen */
	{		
		$scope.selectedEmpID = empID;
		//alert($scope.selectedEmpID );
	}
	
	$scope.changedDepValue = function(depID) /* när man valt en department från DropDown listan */
	{		
		$scope.selectedDepID = depID;
		//alert($scope.selectedDepID);
	}
	
	// För att hämta alla users
	function getUsers()
	{
		$http.get("https://odz-server.herokuapp.com/api/users"
		).then(
		 function(response)
		{
			console.log(response);
			$scope.users = response.data; // Visar data från databasen om anropet lyckades
		},
		function(response)
		{
			console.log($scope.users);
			console.log(response);			
		}
		);
	}
	
	// För att hämta alla avdelningar(departments)
	function getDepartments()
	{		
		$http.get("https://odz-server.herokuapp.com/api/departments"
		).then(
		 function(response)
		{
			console.log(response);
			$scope.departments = response.data; // Visar data från databasen om anropet lyckades
		},
		function(response)
		{
			console.log($scope.departments);
			console.log(response);
			
		}
		);
	}
	
	// För att hämta alla events
	function getEvents()
	{		
		$http.get("https://odz-server.herokuapp.com/api/events"
		).then(
		 function(response)
		{
			console.log(response);
			$scope.events = response.data; // Visar data från databasen om anropet lyckades
		},
		function(response)
		{
			console.log($scope.events);
			console.log(response);
			
		}
		);
	}
	
	// För att tabort ett event med en id
	$scope.deleteEvents = function(id)
	{
		$http.delete("https://odz-server.herokuapp.com/api/events/" + id
		).then(
		 function(response)
		{
			console.log(response);
			$scope.events = response.data; 
		},
		function(response)
		{
			console.log($scope.events);
			console.log(response);		
		}
		);
	}
	
	$scope.getData = function(user,pos,email,city)
	{
		/*$scope.users.name = user;
		$scope.users.position = pos;
		$scope.users.email = email;
		$scope.users.city = city;*/
		//console.log(user,pos,email,city);
	}
});