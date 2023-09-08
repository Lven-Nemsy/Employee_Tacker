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


// Tried to use pool- having an issue with deleting employees.
// const pool = mysql.createPool(
// 	{
// 		host: "localhost",
// 		// MySQL username,
// 		user: "root",
// 		// MySQL password
// 		password: "password",
// 		database: "business_db",
// 		waitForConnections: true,
// 		connectionLimit: 10,
// 		queueLimit: 0,
// 	},
// 	console.log(`Connected to the business_db database.`)
// );
// const db = pool.promise();

//ASCII Art
console.log(`
   	+-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+--+-+-+-+--+-+
	{}|	 /$$$$$$$$                         /$$                                               /$$      /$$                                                            	|{}
	{}|	| $$_____/                        | $$                                              | $$$    /$$$                                                            	|{}
	{}|	| $$       /$$$$$$/$$$$   /$$$$$$ | $$  /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$       | $$$$  /$$$$  /$$$$$$  /$$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$ 	|{}
	{}|	| $$$$$   | $$_  $$_  $$ /$$__  $$| $$ /$$__  $$| $$  | $$ /$$__  $$ /$$__  $$      | $$ $$/$$ $$ |____  $$| $$__  $$ |____  $$ /$$__  $$ /$$__  $$ /$$__  $$	|{}
	{}|	| $$__/   | $$ \  $$ \  $$| $$  \  $$| $$| $$  \  $$| $$  | $$| $$$$$$$$| $$$$$$$$      | $$  $$$| $$  /$$$$$$$| $$  \  $$  /$$$$$$$| $$  \  $$| $$$$$$$$| $$  \ __/	|{}
	{}|	| $$      | $$ | $$ | $$| $$  | $$| $$| $$  | $$| $$  | $$| $$_____/| $$_____/      | $$\   $ | $$ /$$__  $$| $$  | $$ /$$__  $$| $$  | $$| $$_____/| $$      	|{}
	{}|	| $$$$$$$$| $$ | $$ | $$| $$$$$$$/| $$|  $$$$$$/|  $$$$$$$|  $$$$$$$|  $$$$$$$      | $$ \/   | $$|  $$$$$$$| $$  | $$|  $$$$$$$|  $$$$$$$|  $$$$$$$| $$      	|{}
	{}|	|________/|__/ |__/ |__/| $$____/ |__/ \ ______/  \ ____  $$ \ _______/ \ _______/      |__/     |__/ \ _______/|__/  |__/ \ _______/ \ ____  $$ \ _______/|__/      	|{}
	{}|				| $$                     /$$  | $$                                                                      /$$  \  $$                    	|{}
	{}|				| $$                    |  $$$$$$/                                                                     |  $$$$$$/                    	|{}
	{}|				|__/                     \ ______/                                                                       \ ______/                     	|{}
	+-+-+-+-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+--+-+-+-+--+-+
`);

openingSeq();

//Main menu
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
				"Add Department",
				"View Employees by Department",
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
			case "View Employees by Manager":
				viewempMana();
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
			case "Add Department":
				addDepartment();
				break;
			case "View Employees by Department":
				viewempDept();
				break;
			case "View Staff Budget":
				staffBudget();
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

//View all employees
function viewEmployee() {
	db.query(
		"SELECT employee.id AS 'Emp ID', employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Job Title', department.name AS 'Department', role.salary AS 'Salary', CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager' FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
		(err, res) => {
			console.table(res);
			console.log("---------------------------------------------------------------------------------------");
			openingSeq();
		}
	);
}

//Add an employee
function addEmployee() {
	db.query("SELECT * FROM role", (err, res) => {
		const roleList = res.map((data) => {
			return {
				name: data.title,
				value: data.id,
			};
		});
		console.log(roleList);

		db.query("SELECT * from employee", (err, res) => {
			const manaList = res.map((data) => {
				return {
					name: data.last_name,
					value: data.id,
				};
			});
			console.log(manaList); 

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
					choices: roleList,
				},
				{
					type: "list",
					message: "Who is the employee's manager?",
					name: "empManager",
					choices: manaList,
				},
			])
			.then((res) => {
				db.query("INSERT INTO employee SET ?;", {
					first_name: res.empFname,
					last_name: res.empLname,
					role_id: res.empRole,
					manager_id: res.empManager,
				});
				openingSeq();
			});
		});
	});
}

//Update employee
function empUpdate() {
	db.query("SELECT * FROM role", (err, res) => {
		const roleList = res.map((data) => {
			return {
				name: data.title,
				value: data.id,
			};
		});
		console.log(roleList);

		db.query("SELECT * from employee", (err, res) => {
			const empList = res.map((data) => {
				return {
					name: data.last_name,
					value: data.id,
				};
			});
			console.log(empList); 

			
			db.query("SELECT * from employee", (err, res) => {
				const manaList = res.map((data) => {
					return {
						name: data.last_name,
						value: data.id,
					};
				});
				manaList.push({name: "None", value: ''})
				console.log(manaList); 

				prompt([
					{
						type: "list",
						message: "Which employee's role do you want to update?",
						name: "empName",
						choices: empList,
					},
					{
						type: "list",
						message: "Which role do you want to assign the selected employee?",
						name: "empNrole",
						choices: roleList,
					},
					{
						type: "list",
						message: "Who is the manager of the selected employee?",
						name: "empNmana",
						choices: manaList,
					},
				])
				.then((res) => {					
					if (res.empNmana === ''){
						db.query(
							`UPDATE employee SET employee.role_id=${res.empNrole}, employee.manager_id=None WHERE employee.last_name=${res.empName}`
						);
					} else {db.query(
						`UPDATE employee SET employee.role_id=${res.empNrole}, employee.manager_id=${res.empNmana} WHERE employee.last_name=${res.empName}`
					);
				}
					openingSeq();
				});
			});
		});
	});
}

//Update manager info - not working yet
function manaUpdate(){
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
				"Lead Engineer",
				"Account Manager",
				"Legal Team Lead",
			],
		},
	])
	.then((res) => {
		db.query
		openingSeq();
	});
}

//View employees by manager - not working yet
function viewempMana() {
	db.query(
		"SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager', CONCAT(employee.first_name, ' ', employee.last_name) AS 'Employee Name' FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;",
		(err, res) => {
			console.table(res);
			console.log("-----------------------------------");
			openingSeq();
		}
	);
}

//View all roles
function viewRole() {
	db.query(
		"SELECT role.title AS 'Job Title', role.id AS 'Job ID', department.name AS 'Department', role.salary AS 'Salary' FROM role LEFT JOIN department ON role.department_id = department.id;",
		(err, res) => {
			console.table(res);
			console.log("----------------------------------------------");
			openingSeq();
		}
	);
}

//Add a role
function addRole() {
	db.query("SELECT * FROM department", (err, res) => {
		const deptList = res.map(data => {
			return {
				name: data.name,
				value: data.id
			}
		})
		console.log(deptList);
		prompt([
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
				type: "list",
				message: "Which department does the role belong to?",
				name: "deptRole",
				choices: deptList,
			},
		])
		.then((res) => {
			db.query("INSERT INTO role SET ? ", {
				title: res.roleName,
				salary: res.salaryRole,
				department_id: res.deptRole,
			});
			openingSeq();
		});
	})
}

//View all departments
function viewDepartment(){
    db.query('SELECT * FROM department;', (err, res)=> {
        console.table(res)
		console.log('---------------');
        openingSeq();
    })
}

//Add a department
function addDepartment() {
	db.query("SELECT * FROM department", (err, res) => {
		const deptList = res.map((data) => {
			return {
				name: data.name,
				value: data.id,
			};
		});
		console.log(deptList);
		prompt([
			{
				type: "input",
				message: "What is the name of the department?",
				name: "deptName",
			},
		]).then((res) => {
			db.query("INSERT INTO department SET ? ", {
				name: res.deptName,
			});
			openingSeq();
		});
	});
}

//View employees by department - not working yet
function viewempDept(){
	db.query(
		"SELECT department.name AS 'Department', CONCAT(employee.first_name, ' ', employee.last_name) AS 'Employee Name', role.department_id AS 'Job Title'FROM department LEFT JOIN employee ON role.department_id = employee.role;", (err, res)=> {
        console.table(res)
		console.log('-----------');
        openingSeq();
    })
}

//View staff budget - kinda works
function staffBudget() {
	db.query(
		"SELECT department.name AS 'Department', role.title AS 'Job Title', role.salary AS 'Salary'FROM department LEFT JOIN role ON department.id = role.department_id;",
		(err, res) => {
			console.table(res);
			console.log("---------------------------------------");
			openingSeq();
		}
	);
}

//Asking what to delete
function deleteEntry(){
	prompt([
		{
			type: "list",
			message: "What do you want to delete?",
			name: "action",
			choices: [
				"Role",
				"Employee",
				"Department",
				"Go Back"
			],
		},
	]).then((res) => {
		let action = res.action;
		switch (action) {
			case "Role":
				delRole();
				break;
			case "Employee":
				delEmployee();
				break;
			case "Department":
				delDepartment();
				break;
			case "Go Back":
				openingSeq();
				break;
		}
	});
}

//Deleting a role
function delRole(){
	db.query("SELECT * FROM role", (err, res) => {
		const goBack = openingSeq();
		const roleList = res.map(data => {
			return {
				name: data.title,
				value: data.id
			}
		})
		console.log(roleList);
		prompt([
			{
				type: "list",
				message: "Which role are you deleting?",
				name: "delEntry",
				choices: roleList, goBack
			},
		])
		.then((res) => {
			let delEntry = res.delEntry;
			//switch (delEntry){
			db.query(`DELETE FROM role where id=${delEntry}`,
			(err, res) => {
				console.log("Role has been deleted.");
			})
			openingSeq();
		});
	});
}

//Deleting a department
function delDepartment(){
	db.query("SELECT * FROM department", (err, res) => {
		const goBack = openingSeq();
		const deptList = res.map((data) => {
			return {
				name: data.name,
				value: data.id,
			};
		});
		console.log(deptList);
		prompt([
			{
				type: "list",
				message: "Which department are you deleting?",
				name: "delEntry",
				choices: deptList, goBack
			},
		]).then((res) => {
			let delEntry = res.delEntry;
			//switch (delEntry){
			db.query(`DELETE FROM department where id=${delEntry}`, (err, res) => {
				console.log("Department has been deleted.");
			});
			openingSeq();
		});
	});
}

//Deleting an employee
function delEmployee(){	
	db.query("SELECT * FROM employee", (err, res) => {
		const goBack = openingSeq();
		const empList = res.map((data) => {
			return {
				name: data.last_name,
				value: data.id,
			};
		});
		console.log(empList);
		prompt([
			{
				type: "list",
				message: "Which employee are you deleting?",
				name: "delEntry",
				choices: empList, goBack
			},
		]).then((res) => {
			let delEntry = res.delEntry;
			//switch (delEntry){
			db.query(
				`DELETE FROM employee where id=${delEntry}`,
				(err, res) => {
					console.log("Employee has been deleted.");
				}
			);
			openingSeq();
		});
	});
}
