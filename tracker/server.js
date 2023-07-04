const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'basketball',
  database: 'employee_db'
});

async function displayDepartments() {
  connection.query('SELECT * FROM departments', (error, results) => {
    if (error) throw error;
    console.log('Departments:');
    console.table(results);
    promptOptions();
  });
}

async function displayRoles() {
  connection.query('SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles INNER JOIN departments ON roles.department_id = departments.id', (error, results) => {
    if (error) throw error;
    console.log('Roles:');
    console.table(results);
    promptOptions();
  });
}

async function displayEmployees() {
  connection.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id LEFT JOIN employees AS manager ON employees.manager_id = manager.id', (error, results) => {
    if (error) throw error;
    console.log('Employees:');
    console.table(results);
    promptOptions();
  });
}

async function addDepartment() {
  const department = await inquirer.prompt([
    {
      message: 'Enter the name of the department:',
      name: 'name',
      type: 'input'
    }
  ]);

  connection.query('INSERT INTO departments SET ?', department, (error) => {
    if (error) throw error;
    console.log('Department added successfully!');
    promptOptions();
  });
}

async function addRole() {
  const departments = await connection.promise().query('SELECT * FROM departments');
  const role = await inquirer.prompt([
    {
      message: 'Enter the name of the role:',
      name: 'title',
      type: 'input'
    },
    {
      message: 'Enter the salary for the role:',
      name: 'salary',
      type: 'number'
    },
    {
      message: 'Select the department for the role:',
      name: 'department_id',
      type: 'list',
      choices: departments[0].map(department => ({ name: department.name, value: department.id }))
    }
  ]);

  connection.query('INSERT INTO roles SET ?', role, (error) => {
    if (error) throw error;
    console.log('Role added successfully!');
    promptOptions();
  });
}

async function addEmployee() {
  const roles = await connection.promise().query('SELECT * FROM roles');
  const employeeList = await connection.promise().query('SELECT * FROM employees');
  
  const employee = await inquirer.prompt([
    {
      message: "Enter the employee's first name:",
      name: 'first_name',
      type: 'input',
    },
    {
      message: "Enter the employee's last name:",
      name: 'last_name',
      type: 'input',
    },
    {
      message: "Select the employee's role:",
      name: 'role_id',
      type: 'list',
      choices: roles[0].map(role => ({ name: role.title, value: role.id })),
    },
    {
      message: "Select the employee's manager:",
      name: 'manager_id',
      type: 'list',
      choices: [{ name: 'None', value: null }, ...employeeList[0].map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))],
    },
  ]);

  connection.query('INSERT INTO employees SET ?', employee, (error) => {
    if (error) throw error;
    console.log('Employee added successfully!');
    promptOptions();
  });
}


async function updateEmployeeRole() {
  const employees = await connection.promise().query('SELECT * FROM employees');
  const roles = await connection.promise().query('SELECT * FROM roles');
  
  const employeeToUpdate = await inquirer.prompt([
    {
      message: 'Select an employee to update:',
      name: 'employee_id',
      type: 'list',
      choices: employees[0].map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
    }
  ]);

  const updatedRole = await inquirer.prompt([
    {
      message: 'Select the new role for the employee:',
      name: 'role_id',
      type: 'list',
      choices: roles[0].map(role => ({ name: role.title, value: role.id })),
    }
  ]);

  connection.query('UPDATE employees SET ? WHERE ?', [{ role_id: updatedRole.role_id }, { id: employeeToUpdate.employee_id }], (error) => {
    if (error) throw error;
    console.log('Employee role updated successfully!');
    promptOptions();
  });
}

function promptOptions() {
  inquirer
    .prompt([
      {
        message: 'What would you like to do?',
        name: 'option',
        type: 'list',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update an Employee Role'
        ]
      }
    ])
    .then(answers => {
      const { option } = answers;
      handleOptions(option);
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });
}

function handleOptions(option) {
  console.log('Received option:', option);

  switch (option) {
    case 'View All Departments':
      displayDepartments();
      break;
    case 'View All Roles':
      displayRoles();
      break;
    case 'View All Employees':
      displayEmployees();
      break;
    case 'Add a Department':
      addDepartment();
      break;
    case 'Add a Role':
      addRole();
      break;
    case 'Add an Employee':
      addEmployee();
      break;
    case 'Update an Employee Role':
      updateEmployeeRole();
      break;
    default:
      console.log('Invalid option. Please try again.');
      promptOptions();
  }
}

function startApp() {
  console.log('Welcome to the Employee Management System!');
  promptOptions();
}

startApp();
