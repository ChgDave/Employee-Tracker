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
            "Update Employee Manager",
            "View All Roles",
            "Add Role",
            "Remove Role",
            "View All Departments",
            "Add Department",
            "Remove Department",
            "View Total Utilized Budget By Department",
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
              (async () => {
                // Get all departments name from database then convert them into an array
                const departments = await query.view("View All Departments");
                const dptChoices = departments.reduce((acc, { name, id }) => {
                  const department = { name: name, value: id };
                  acc.push(department);
                  return acc;
                }, []);
                // Inquire for role information
                const response = await inquirer.prompt([
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
                    name: "departmentID",
                    message: "Please select the department for this role:",
                    choices: dptChoices,
                  },
                ]);
                // convert the department from a text to the corresponding department id that needs to update the role table
                const { roleName, salary, departmentID } = response;
                // query to add the new roles into role table
                query
                  .add(toDo, [roleName, salary, departmentID])
                  .then(() => this.run());
              })();
              break;
            case "Add Employee":
              (async () => {
                // query for all the roles list
                const roles = await query.view("View All Roles");
                const roleChoices = roles.reduce((acc, { title, role_id }) => {
                  const role = { name: title, value: role_id };
                  acc.push(role);
                  return acc;
                }, []);
                // query for all the employee list
                const employees = await query.view("View All Employees");
                const employeeChoices = employees.reduce(
                  (acc, { first_name, last_name, title, employee_id }) => {
                    const person = {
                      name: `${first_name} ${last_name} (${title})`,
                      value: employee_id,
                    };
                    acc.push(person);
                    return acc;
                  },
                  []
                );
                const response = await inquirer.prompt([
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
                    type: "list",
                    name: "roleID",
                    message: "What is the employee's role?",
                    choices: roleChoices,
                  },
                  {
                    type: "list",
                    name: "managerID",
                    message: "What is the employee's manager?",
                    choices: employeeChoices,
                  },
                ]);

                const { first_name, last_name, roleID, managerID } = response;
                // query to add the role into role table
                query
                  .add(toDo, [first_name, last_name, roleID, managerID])
                  .then(() => this.run());
              })();

              break;
            case "Update Employee Role":
              (async () => {
                const roles = await query.view("View All Roles");
                const roleChoices = roles.reduce((acc, { title, role_id }) => {
                  const role = { name: title, value: role_id };
                  acc.push(role);
                  return acc;
                }, []);

                const employees = await query.view("View All Employees");
                const employeeChoices = employees.reduce(
                  (acc, { first_name, last_name, title, employee_id }) => {
                    const person = {
                      name: `${first_name} ${last_name} (${title})`,
                      value: employee_id,
                    };
                    acc.push(person);
                    return acc;
                  },
                  []
                );
                const response = await inquirer.prompt([
                  {
                    type: "list",
                    name: "employeeID",
                    message: "Which employee's role you would like to update?",
                    choices: employeeChoices,
                  },
                  {
                    type: "list",
                    name: "roleID",
                    message: "What is the employee's new role?",
                    choices: roleChoices,
                  },
                ]);

                const { roleID, employeeID } = response;
                // query to update the employee role
                query.update(toDo, [roleID, employeeID]).then(() => this.run());
              })();
              break;
            case "Update Employee Manager":
              (async () => {
                const employees = await query.view("View All Employees");
                const employeeChoices = employees.reduce(
                  (acc, { first_name, last_name, title, employee_id }) => {
                    const person = {
                      name: `${first_name} ${last_name} (${title})`,
                      value: employee_id,
                    };
                    acc.push(person);
                    return acc;
                  },
                  []
                );
                const response = await inquirer.prompt([
                  {
                    type: "list",
                    name: "employeeID",
                    message:
                      "Which employee's manager you would like to update?",
                    choices: employeeChoices,
                  },
                  {
                    type: "list",
                    name: "managerID",
                    message: "What is the employee's new manager?",
                    choices: employeeChoices,
                  },
                ]);

                const { managerID, employeeID } = response;
                // query to update the employee role
                query
                  .update(toDo, [managerID, employeeID])
                  .then(() => this.run());
              })();
              break;
            case "Remove Employee":
              (async () => {
                const employees = await query.view("View All Employees");
                const employeeChoices = employees.reduce(
                  (acc, { employee_id, first_name, last_name, title }) => {
                    const employee = {
                      name: `${first_name} ${last_name} (${title})`,
                      value: employee_id,
                    };
                    acc.push(employee);
                    return acc;
                  },
                  []
                );
                const response = await inquirer.prompt([
                  {
                    type: "list",
                    name: "employeeID",
                    message: "Which employee you would like to remove?",
                    choices: employeeChoices,
                  },
                ]);

                query
                  .delete(toDo, [response.employeeID])
                  .then(() => this.run());
              })();

              break;
            case "Remove Role":
              (async () => {
                const roles = await query.view("View All Roles");
                const roleChoices = roles.reduce((acc, { role_id, title }) => {
                  const role = { name: title, value: role_id };
                  acc.push(role);
                  return acc;
                }, []);

                const response = await inquirer.prompt([
                  {
                    type: "list",
                    name: "roleID",
                    message: "Which role you would like to remove?",
                    choices: roleChoices,
                  },
                ]);
                // query to delete the role
                query.delete(toDo, [response.roleID]).then(() => this.run());
              })();

              break;
            case "Remove Department":
              (async () => {
                const departments = await query.view("View All Departments");
                const dptChoices = departments.reduce((acc, { id, name }) => {
                  const department = { name: name, value: id };
                  acc.push(department);
                  return acc;
                }, []);

                const response = await inquirer.prompt([
                  {
                    type: "list",
                    name: "departmentID",
                    message: "Which department you would like to remove?",
                    choices: dptChoices,
                  },
                ]);

                query
                  .delete(toDo, [response.departmentID])
                  .then(() => this.run());
              })();

              break;
            default:
              (async () => {
                const data = await query.view(toDo);
                console.table(data);
                this.run();
              })();
          }
        } else {
          process.exit();
        }
      })
      .catch((error) => console.log(error));
  }
}

module.exports = CLI;
