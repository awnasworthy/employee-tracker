const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./config/connection');
const allEmployeeQuery = `SELECT employee.id, 
employee.first_name, 
employee.last_name, 
roles.title, 
department.department_name AS department,
roles.salary, 
CONCAT (manager.first_name, " ", manager.last_name) AS manager
FROM employee
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id`;
const allRoleQuery = `SELECT * FROM roles`;
const allDepartmentQuery = `SELECT * FROM department`;

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.')
})

function startApp(){
    inquirer.prompt({
        name: 'menuChoice',
        type: 'list',
        message: 'Select an option below',
        choices: ['View all Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View all Departments', 'Add Department', 'Exit']
    })
    .then((answer) => {
        const choices = answer.menuChoice; 
  
        if (choices === "View all Employees") {
          showEmployees();
        }
  
        if (choices === "Add Employee") {
          addEmployee();
        }
  
        if (choices === "Update Employee Role") {
          updateEmployee();
        }
  
        if (choices === "View all Roles") {
          showRoles();
        }
  
        if (choices === "Add Role") {
          addRole();
        }
  
        if (choices === "View all Departments") {
          showDepartments();
        }
  
        if (choices === "Add Department") {
          addDepartment();
        }
  
        if (choices === "Exit") {
          db.end();
        }
  
        
    });

}

function showEmployees() {
    db.query(allEmployeeQuery, (err, results) => {
        if (err) throw err;
        console.table(results);
  });
  db.end();
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message:'What is their first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is their last name?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Please enter their role id.'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "Please enter their manager's id."
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;
        const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]
        db.query(sql, params, (err, result) => {
          if (err) throw err;
          console.log('Added ' + answer.first_name + ' ' + answer.last_name + " to employees!"); 
  
          showEmployees();
          db.end();
      });
    });
}

function updateEmployee() {
        inquirer.prompt([
            {
                name: 'employee',
                type: 'input',
                message: 'Enter the employee id.'
            },
            {
                name: 'newRole',
                type: 'input',
                message: 'Enter the new role id.'
            }
        ]).then((answer) => {
            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
            const params = [ answer.employee, answer.newrole ]
                db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log('Employee has been updated!');
                    showEmployees();
                    db.end();
                })
        })


    }


function showRoles() {
    db.query(allRoleQuery, (err, results) => {
        if (err) throw err;
        console.table(results);
  });
  db.end();
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message:'What role do you want to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message:'What is the salary of this role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message:'Please enter the department id.'
        }
    
    ])
        .then(answer => {
            const sql = `INSERT INTO roles (title, salary, department_id)
                        VALUES (?, ?, ?)`;
            const params = [answer.title, answer.salary, answer.department_id]
            db.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log('Added ' + answer.title + " to roles!"); 
      
              showRoles();
              db.end();
          });
        });
}

function showDepartments() {
    db.query(allDepartmentQuery, (err, results) => {
        if (err) throw err;
        console.table(results);
  });
  db.end();
}

function addDepartment() {
    inquirer.prompt(
        {
                type: 'input',
                name: 'department_name',
                message:'What department do you want to add?'
        })
        .then(answer => {
            const sql = `INSERT INTO department (department_name)
                        VALUES (?)`;
            db.query(sql, answer.department_name, (err, result) => {
              if (err) throw err;
              console.log('Added ' + answer.department_name + " to departments!"); 
      
              showDepartments();
              db.end();
          });
        });
        
    };

startApp();