// import library
// setup inquirer questions with choices below
// View All Employees
// View All Employees by Department
// View All Employees by Manager
// Add Employee
// Remove Employee
// Update Employee Role
// Update Employee Manager
// View All Roles
// Add Role
// Remove Role
// View All Departments
// Add Department
// Remove Department
// View Total Utilized Budget by Department
// Quit

const inquirer = require("inquirer");
const Query = require("./query");

// create new object from Query class
const query = new Query();

// create a CLI class
class CLI {
  run() {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "toDo",
          message: "What would you like to do?",
          default: "Use arrow keys",
          choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "Remove Role",
            "View All Departments",
            "Add Department",
            "Remove Department",
            "Quit",
          ],
        },
      ])
      .then((response) => {
        const toDo = response.toDo;
        if (toDo !== "Quit") {
          switch (toDo) {
            case "Add Department":
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "departmentName",
                    message: "Please enter the department name:",
                  },
                ])
                .then((response) => {
                  query
                    .add(toDo, [response.departmentName])
                    .then(() => this.run());
                });
              break;
            case "Add Role":
              let dptChoices;
              let departmentID;
              (async () => {
                const departments = await query.get("All Departments");
                // console.log(Promise.resolve(departments));
                dptChoices = departments.reduce((acc, { name }) => {
                  acc.push(name);
                  return acc;
                }, []);
              })().then(() => {
                inquirer
                  .prompt([
                    {
                      type: "input",
                      name: "roleName",
                      message: "Please enter the name of the role:",
                    },
                    {
                      type: "input",
                      name: "salary",
                      message: "Please enter the salary for this role:",
                    },
                    {
                      type: "list",
                      name: "department",
                      message: "Please select the department for this role:",
                      choices: dptChoices,
                    },
                  ])
                  .then((response) => {
                    const { roleName, salary, department } = response;
                    (async () => {
                      const data = await query.get("Department", [department]);
                      departmentID = data[0].id;
                    })().then(() => {
                      query
                        .add(toDo, [roleName, salary, departmentID])
                        .then(() => this.run());
                    });
                  });
              });

              break;
            case "Add Employee":
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "first_name",
                    message: "What is the employee's first name?",
                  },
                  {
                    type: "input",
                    name: "last_name",
                    message: "What is the employee's last name?",
                  },
                  {
                    type: "input",
                    name: "roleID",
                    message: "What is the employee's role?",
                    default: "Enter the role id",
                  },
                  {
                    type: "input",
                    name: "managerID",
                    message: "What is the employee's manager?",
                    default: "Enter the manager id",
                  },
                ])
                .then((response) => {
                  const { first_name, last_name, roleID, managerID } = response;
                  query
                    .add(toDo, [first_name, last_name, roleID, managerID])
                    .then(() => this.run());
                });
              break;
            case "Update Employee Role":
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "employeeID",
                    message: "What is the employee's id?",
                  },
                  {
                    type: "input",
                    name: "roleID",
                    message: "What is the employee's new role?",
                    default: "Enter the role id",
                  },
                ])
                .then((response) => {
                  const { roleID, employeeID } = response;
                  query
                    .update(toDo, [+roleID, +employeeID])
                    .then(() => this.run());
                });
              break;
            case "Remove Employee":
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "employeeID",
                    message: "Which employee you would like to remove?",
                    default: "Enter the employee ID",
                  },
                ])
                .then((response) => {
                  query
                    .delete(toDo, [response.employeeID])
                    .then(() => this.run());
                });
              break;
            case "Remove Role":
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "roleID",
                    message: "Which role you would like to remove?",
                    default: "Enter the role ID",
                  },
                ])
                .then((response) => {
                  query.delete(toDo, [response.roleID]).then(() => this.run());
                });
              break;
            case "Remove Department":
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "departmentID",
                    message: "Which department you would like to remove?",
                    default: "Enter the department ID",
                  },
                ])
                .then((response) => {
                  query
                    .delete(toDo, [response.departmentID])
                    .then(() => this.run());
                });
              break;
            default:
              query.view(toDo).then(() => this.run());
          }
        } else {
          process.exit();
        }
      })
      .catch((error) => console.log(error));
  }
}

module.exports = CLI;
