// Import and require mysql2
const mysql = require("mysql2");
const { prompt } = require("inquirer");
require('console.table')

// Connect to database
const db = mysql.createConnection(
	{
		host: "localhost",
		// MySQL username,
		user: "root",
		// MySQL password
		password: "password",
		database: "business_db",
	},
	console.log(`Connected to the business_db database.`)
);

openingSeq();

function openingSeq() {
	prompt([
		{
			type: "list",
			message: "What would you like to do?",
			name: "action",
			choices: [
				"View All Employees",
				"Add Employee",
				"Update Employee Role",
				"Update Manager",
				"View Employees by Manager",
				"View All Roles",
				"Add Role",
				"View All Departments",
				"View Emplyees by Department",
				"View Staff Budget",
				"Delete Departments, Roles, and/or Employees",
				"Quit"
			],
		},
	]).then((res) => {
		let action = res.action;
		switch (action) {
			case "View All Employees":
				viewEmployee();
				break;
			case "Add Employee":
				addEmployee();
				break;
			case "Update Employee Role":
				empUpdate();
				break;
			case "Update Manager":
				manaUpdate();
				break;
			case "View All Roles":
				viewRole();
				break;
			case "Add Role":
				addRole();
				break;
			case "View All Departments":
				viewDepartment();
				break;
			case "View Employees by Department":
				viewempDept();
				break;
			case "Delete Departments, Roles, and/or Employees":
				deleteEntry();
				break;
			case "Quit":
				db.end();
				break;
		}
	});
}

function viewEmployee() {
	db.query(
		"SELECT employee.id AS 'Emp ID', employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Job Title', department.name AS 'Department', role.salary AS 'Salary', CONCAT (manager.first_name, ' ', manager.last_name) AS 'Manager' FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employees AS manager ON employees.manager = manager.id;",
		(err, res) => {
			console.table(res);
			console.log("-------------------");
			openingSeq();
		}
	);
}


function addEmployee() {
	prompt([
		{
			type: "input",
			message: "What is the employee's first name?",
			name: "empFname",
		},
		{
			type: "input",
			message: "What is the employee's last name?",
			name: "empLname",
		},
		{
			type: "list",
			message: "What is the employee's role?",
			name: "empRole",
			choices: [
				"Sales Lead",
				"Salesperson",
				"Lead Engineer",
				"Software Engineer",
				"Account Manager",
				"Accountant",
				"Legal Team Lead",
				"Lawyer" 
			],
		},
		{
			type: "input",
			message: "Who is the employee's manager?",
			name: "EmpManager",
		},
	]).then((res) => {});
}


function empUpdate() {
	prompt([
		{
			type: "input",
			message: "Which employee's role do you want to update?",
			name: " empUpdate",
		},
		{
			type: "list",
			message: "Which role do you want to assign the selected employees?",
			name: "empNrole",
			choices: [
				"Sales Lead",
				"Salesperson",
				"Lead Engineer",
				"Software Engineer",
				"Account Manager",
				"Accountant",
				"Legal Team Lead",
				"Lawyer"
			],
		},
		{
			type: "input",
			message: "Who is the manager of the selected employees?",
			name: "empManager",
		},
	]).then((res) => []);
}

function manaUpdate(){

}


function viewRole() {
	db.query(
		"SELECT role.title AS 'Job Title', role.id AS 'Job ID', department.name AS 'Department', role.salary AS 'Salary' FROM role LEFT JOIN department ON role.department_id = department.id;",
		(err, res) => {
			console.table(res);
			console.log("----------------------");
			openingSeq();
		}
	);
}









function addRole() {
	prompt([
		{
			type: "input",
			message: "What is the name of the department?",
			name: "deptName",
		},
		{
			type: "input",
			message: "What is the name of the role?",
			name: "roleName",
		},
		{
			type: "input",
			message: "What is the salary of the role?",
			name: "salaryRole",
		},
		{
			type: "checkbox",
			message: "Which department does the role belong to?",
			name: "deptRole",
			choices: [
				"Sales",
				"Legal",
				"Finance",
				"Engineering",
			],
		},
	]).then((res) => []);
}



function viewDepartment(){
    db.query('SELECT * FROM department;', (err, res)=> {
        console.table(res)
		console.log('-----------');
        openingSeq();
    })
}

function viewempDept(){
	db.query(
		"SELECT department.name AS 'Department', CONCAT (employee.first_name, ' ', employee.last_name) AS 'Employee Name', employee FROM department LEFT JOIN;", (err, res)=> {
        console.table(res)
		console.log('-----------');
        openingSeq();
    })
}

function deleteEntry(){
	prompt([
		{
			type: "list",
			message: "What are you deleting from?",
			name: "delEntry",
			choices: [
				"Departments",
				"Roles",
				"Employees"
			],
		},
	]).then((res) => {
		let delEntry = res.delEntry;
		switch (delEntry){

		}
	})
}
