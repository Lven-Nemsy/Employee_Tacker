// Import and require mysql2
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'business_db'
  },
  console.log(`Connected to the business_db database.`)
);

inquirer
  .prompt([
    {
        type: "checkbox",
        message: "What would you like to do?",
        name: "Action",
        choices: ["Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
    },
    {
        type: "input",
        message: "What is the name of the department?",
        name: "Department Name",
    },
    {
        type: "input",
        message: "What is the name of the role?",
        name: "Role Name",
    },
    {
        type: "input",
        message: "What is the salary of the role?",
        name: " Salary Role",
    },
    {
        type: "checkbox",
        message: "Which department does the role belong to?",
        choices: ["Sales", "Legal", "Finance", "Engineering"],
    },
    {
        type: "input",
        message: "What is the employee's first name?",
        name: "Employee First Name",
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "Epmloyee Last Name",
    },
    {
        type: "checkbox",
        message: "What is the employee's role?",
        name: "Employee Role",
        choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"],
    },
    {
        type: "input",
        message: "Who is the employee's manager?",
        name: "Employee's Manager",
    },
    {
        type: "input",
        message: "Which employee's role do you want to update?",
        name: " Employee Update",
    },
    {
        type: "checkbox",
        message: "Which role do you want to assign the selected employees?",
        name: "Employee New Role",        
        choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"],
    },
    {
        type: "checkbox",
        message: "Which role do you want to assign the selected employees?",
        name: "Employee New Role",        
        choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"],
    },


  ])
  .then((response) => {
    //console.log(response);
    fs.appendFile("userinfo.txt", JSON.stringify(response) + "\n", (err) => {
      err ? console.error(err) : console.log("success");
    });
  });



