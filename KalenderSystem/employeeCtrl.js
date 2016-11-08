app.controller("employeeController", function($scope, dateFilter, $http) 
{	

	/*$scope.beginDate = new Date();
	$scope.endDate = new Date();

    $scope.$watch('date', function (date)
    {
        $scope.itemDate = dateFilter(date, 'YYYY-MM-DD HH:MM:SS');
		$scope.beginDate = $scope.itemDate;
		$scope.endDate = $scope.itemDate;
		
    });*/

	getUsers(); // anropar funktionen f�r att h�mta alla anv�ndare n�r man startar sidan
	getDepartments();
	getEvents();

    //$scope.employees = [];
	//$scope.item = {};
	//var newItem = {};
    $scope.addItems = function () // funktion som l�gger till anst�llda
	{
		/*newItem.number = $scope.item.number;
		newItem.name = $scope.item.name;
		newItem.date = $scope.date;
		newItem.attended = $scope.checkboxModel;
		if($scope.checkboxModel == null)
			alert("F�r inte vara null");
			
        $scope.employees.push(newItem);*/ // l�gger till anst�lld i f�rst i arrayen
		
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

	$scope.showEmployees = function() 
	{
		var emp = document.getElementById('allEmps');
		emp.style.display = 'block';
		document.getElementById("btnEmployees").disabled = true;
		var buttonEmployees = document.getElementById("btnEmployees");
		buttonEmployees.style.cursor = "not-allowed";
		var tableEmps = document.getElementById('tableEmps');
		tableEmps.style.border = "1px solid";
		
		/*if (emp.style.display === 'block') {
			emp.style.display = 'none';
		} else {
			emp.style.display = 'block';
		}*/
	}
	
	//function showEvents()
	$scope.showEvents = function()
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
		depTable.style.display = 'block';
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
	$scope.closeDepartments = function()
	{
		var dep = document.getElementById('allDepartments');	
		var depTable = document.getElementById('tableDepartment');
		dep.style.display = 'none';
		depTable.style.display = 'none';
		depTable.style.border = "0px solid";
	}
	
	/*$scope.orderByMe = function(u) // funktion som sorterar n�r man klickar p� tabellen
	{
        $scope.myOrderBy  = u;
    }
    $scope.removeItem = function (x) // funktion som tar bort fr�n tabellen
	{
        $scope.employees.splice(x, 1);
    }*/
	
	$scope.users = []; // array f�r alla anst�llda i en array fr�n databasen
	$scope.departments = [];
	$scope.events = []; // array f�r alla events i en array fr�n databasen
	$scope.eventType = []; // array f�r alla event-typer fr�n databasen

	// L�gg till ett event
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
				$scope.events = response.data; // Visar data fr�n databasen om anropet lyckades
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

	$scope.changedEmpValue = function(empID) /* n�r man valt employee fr�n DropDown listan visas IDn f�r den employeen */
	{		
		$scope.selectedEmpID = empID;
		//alert($scope.selectedEmpID );
	}
	
	$scope.changedDepValue = function(depID) /* n�r man valt en department fr�n DropDown listan */
	{		
		$scope.selectedDepID = depID;
		//alert($scope.selectedDepID);
	}
	
	// F�r att h�mta alla users
	function getUsers()
	{
		$http.get("https://odz-server.herokuapp.com/api/users"
		).then(
		 function(response)
		{
			console.log(response);
			$scope.users = response.data; // Visar data fr�n databasen om anropet lyckades
		},
		function(response)
		{
			console.log($scope.users);
			console.log(response);			
		}
		);
	}
	
	// F�r att h�mta alla avdelningar(departments)
	function getDepartments()
	{		
		$http.get("https://odz-server.herokuapp.com/api/departments"
		).then(
		 function(response)
		{
			console.log(response);
			$scope.departments = response.data; // Visar data fr�n databasen om anropet lyckades
		},
		function(response)
		{
			console.log($scope.departments);
			console.log(response);
			
		}
		);
	}
	
	// F�r att h�mta alla events
	function getEvents()
	{		
		$http.get("https://odz-server.herokuapp.com/api/events"
		).then(
		 function(response)
		{
			console.log(response);
			$scope.events = response.data; // Visar data fr�n databasen om anropet lyckades
		},
		function(response)
		{
			console.log($scope.events);
			console.log(response);
			
		}
		);
	}
	
	// F�r att tabort ett event med en id
	$scope.deleteEvents = function(id)
	{
		/* gå igenom hela arrayen med events och ta bort den med id */
		
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