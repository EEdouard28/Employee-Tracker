const inquirer = require("inquirer");
const db = require("./utils/connection")

function initPrompt() {
    inquirer.prompt([
      {
        name: "question",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "Update employee roles",
          "Exit"
        ]
      }])
      .then(function (response) {
        switch (response.question) {
          case "View all departments":
            viewDepartments();
            break;
          case "View all roles":
            viewRoles();
            break;
          case "View all employees":
            viewEmployees();
            break;
          case "Add a new department":
            addDepartment();
            break;
          case "Add a new role":
            addRole();
            break;
          case "Add a new employee":
            addEmployee();
            break;
          case "Update employee roles":
            UpdateEmployee();
            break;
          case "Exit":
            db.end();
            break;
        }
      });
  };
//Add javascript functions that query sql database 
function viewDepartments() {
    db.query("select * from departments", (err, res) => {
        if (err) throw err
        //create a spreadsheet from response
        console.table(res)
        initPrompt()
    } )
}

function viewRoles() {
    db.query("select * from roles", (err, res) => {
        if (err) throw err
        //create a spreadsheet from response
        console.table(res)
        initPrompt()
    } )
}

function viewEmployees() {
    db.query("select * from employees", (err, res) => {
        if (err) throw err
        //create a spreadsheet from response
        console.table(res)
        initPrompt()
    } )
}

//ADD DEPARTMENT
function addDepartment()
{
  db.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "department",
        type: "input",
        message: "What is the department name?"
      },
    ])
    .then(function (answers) {
      // const selectedRole = res.find(role => role.title === answers.roleId);
      //Object into employees table
      db.query("INSERT INTO departments SET ?",
        {
          name: answers.department,

        }, function (err, res) {
          if (err) throw err;
          console.log("Added" + " " + answers.department + "\n");
          initPrompt();
        })
    })
  })
};



//ADD EMPLOYEE
function addEmployee() {
    db.query("SELECT * FROM roles", function (err, res) {
      if (err) throw err;
      inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the new employee's first name?"
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the new employee's last name?"
        },
        {
          name: "roleId",
          type: "list",
          choices: res.map(role => role.title),
          message: "Select a role for the employee"
        },
        {
            name: "managerId",
            type: "list",
            choices: [1, 2],
            message: "Provide manager ID"
          }
      ]).then(function (answers) {
        const selectedRole = res.find(role => role.title === answers.roleId);
        //Object into employees table
        db.query("INSERT INTO employees SET ?",
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: selectedRole.id,
            manager_id: answers.managerId

          }, function (err, res) {
            if (err) throw err;
            console.log("Added new employee named " + answers.firstName + " " + answers.lastName + "\n");
            initPrompt();
          })
      })
    })
  };


  //ADD ROLE
  function addRole() {
    db.query("SELECT * FROM departments", function (err, res) {
      if (err) throw err;
      inquirer.prompt([
        {
          name: "title",
          type: "input",
          message: "What is the employees title at this company?"
        },
        {
          name: "salary",
          type: "input",
          message: "What is the employees salary?"
        },
        {
            name: "departmentName",
            type: "list",
            choices: res.map(department => department.name),
            message: "Select department ID"
            
          }
      ]).then(function (answers) {
        console.log(answers)
        const selectedDepartment = res.find(department => department.name === answers.departmentName);
        console.log(selectedDepartment)
        //Object into employees table
        db.query("INSERT INTO roles SET ?",
          {
            title: answers.title,
            salary: answers.salary,
            department_id: selectedDepartment.id

          }, function (err, res) {
            if (err) throw err;
            console.log("Added new role " + answers.title + " " + answers.salary + "\n");
            initPrompt();
          })
      })
    })
  };

function UpdateEmpRole() {
  db.query("SELECT id, concat(first_name,'' ,last_name) as name FROM employee",  function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      { type: "list",
        name: "update",
       
        message: "What would like to do?"
      },
      {
        name: "role",
        type: "input",
        message: "Which role do you want to update?"
      },
    ]).then(function (answers) {
      console.log(answers)
      const selectedDepartment = res.find(department => department.name === answers.departmentName);
      console.log(selectedDepartment)
      //Object into employees table
      db.query("INSERT INTO employees SET ?",
        {
          title: answers.title,
          salary: answers.salary,
          department_id: selectedDepartment.id

        }, function (err, res) {
          if (err) throw err;
          console.log("Added new role " + answers.title + " " + answers.salary + "\n");
          initPrompt();
        })
    })
  })
};
//UPDATE EMPLOYEE ROLE
UpdateEmployee = () => {

  db.query( "SELECT * FROM employees", function (err, res) {
    const employees = res.map(({ id, first_name, last_name}) =>  
    ({ name: first_name + " "+ last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to update?",
        choices: employees
      }
    ])
    .then(empChoice => {
      const employee = empChoice.name
      const params = [];
      params.push(employee);

    db.query("SELECT * FROM roles", function (err, res) {
    const roles = res.map(({ id, title }) => ({ name: title, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: "What is the employee's new role?",
        choices: roles
      }
    ])
    .then(roleChoice => {
      const role = roleChoice.role;
      params.push(role); 
      
      let employee = params[0]
      params[0] = role
      params[1] = employee 
      

      const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

                db.query(sql, params, (err, result) => {
                  if (err) throw err;
                console.log("Employee has been updated!");
              
                showEmployees();
              });
            });
          });
        });
      });
    };


  initPrompt()