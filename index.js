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
				"add employee",

				"update Employee Role",
				"view All Roles",

				// {
				//     name: "addRole",
				//     value: "add_role"
				// },
				// {
				//     name: "viewAllDepartments",
				//     value: "view_dept"
				// },
				"View Department",

				"quit",
			],
		},
	]).then((res) => {
		let action = res.action;
		switch (action) {
			case "View Department":
				viewDepartment();
				break;
				case 'view All Roles':
				viewallRoles();
				break;
			// case "add_employee":
			// 	addEmployee();
			// 	break;
			// case "up_emp_role":
			// 	empUpdate();
			// 	break;
			// case "add_role":
			// 	addRole();
			// 	break;
			//case "add_dept";
		}
	});
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
				"Lawyer", //How to make dynamic, how to add more items to the list without manually creating one.
			],
		},
		{
			type: "input",
			message: "Who is the employee's manager?",
			name: "EmpManager",
		},
	]).then((res) => {});
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
			choices: ["Sales", "Legal", "Finance", "Engineering"],
		},
	]).then((res) => []);
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
				"Lawyer",
			],
		},
		{
			type: "input",
			message: "Who is the manager of the selected employees?",
			name: "empManager",
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

function viewallRoles(){
	db.query("SELECT role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;" , (err, res) => {
		console.table(res);
		console.log("-----------");
		openingSeq();
	});
}
