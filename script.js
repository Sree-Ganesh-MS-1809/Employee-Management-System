var app = angular.module('myApp', []);
app.controller('myController', function ($scope) {
    $scope.newEmployee = {};
    $scope.employees = [
        { id: 1, name: 'Sir Crocodile', workPlace: 'Cross Guild', salary: '1,900,000' },
    ];

    $scope.searchQuery = ''; // Initialize searchQuery variable

    // Function to filter employees based on search query
    $scope.filteredEmployees = function () {
        return $scope.employees.filter(function (employee) {
            return employee.name.toLowerCase().includes($scope.searchQuery.toLowerCase());
        });
    };

    // Function to update the counts
    $scope.updateCounts = function () {
        $scope.totalEmployees = $scope.employees.length;
        $scope.atWorkPlace = $scope.employees.filter(function (employee) {
            return employee.workPlace !== 'On Leave' && employee.workPlace !== 'On Hold';
        }).length;
        $scope.onLeave = $scope.employees.filter(function (employee) {
            return employee.workPlace === 'On Leave';
        }).length;
        $scope.onHold = $scope.employees.filter(function (employee) {
            return employee.workPlace === 'On Hold';
        }).length;
    };

    // Call updateCounts function initially
    $scope.updateCounts();

    $scope.showUpdate = false;
    $scope.updateEmployee = {};

    $scope.addEmployee = function () {
        $scope.employees.push({
            id: $scope.employees.length + 1,
            name: $scope.newEmployee.name,
            workPlace: $scope.newEmployee.workPlace,
            salary: $scope.newEmployee.salary
        });
        $scope.newEmployee = {};
        $scope.updateCounts(); // Update counts after adding employee
    };

    $scope.deleteEmployee = function (id) {
        var index = -1;
        for (var i = 0; i < $scope.employees.length; i++) {
            if ($scope.employees[i].id === id) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            $scope.employees.splice(index, 1);
            $scope.updateCounts(); // Update counts after deleting employee
        }
    };

    $scope.showUpdateForm = function (employee) {
        $scope.showUpdate = true;
        angular.copy(employee, $scope.updateEmployee);
    };

    $scope.cancelUpdate = function () {
        $scope.showUpdate = false;
        $scope.updateEmployee = {};
    };

    $scope.updateEmployeeDetails = function () {
        $scope.employees.forEach(function (existingEmployee, index) {
            if (existingEmployee.id === $scope.updateEmployee.id) {
                $scope.employees[index] = angular.copy($scope.updateEmployee);
                $scope.showUpdate = false;
                $scope.updateEmployee = {};
            }
        });
        $scope.updateCounts(); // Update counts after updating employee details
    };

    // Function to put an employee on hold
    $scope.putOnHold = function (employee) {
        employee.workPlace = 'On Hold';
        $scope.updateCounts(); // Update counts after putting employee on hold
    };

    // Function to put an employee on leave
    $scope.putOnLeave = function (employee) {
        employee.workPlace = 'On Leave';
        $scope.updateCounts(); // Update counts after putting employee on leave
    };
});
