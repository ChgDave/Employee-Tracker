const mysql = require("mysql2/promise");

// Create a connection pool
const pool = mysql.createPool(
  {
    host: "localHost",
    user: "root",
    password: "Password1",
    database: "employee_db",
  },
  console.log("Connected to employee_db database.")
);

// Define new class Query
class Query {
  // Define async query view function
  async view(toDo) {
    try {
      let sql;
      const connection = await pool.getConnection();
      switch (toDo) {
        // get all employees
        case "View All Employees":
          sql =
            "SELECT employee.id AS employee_id, first_name, last_name, title, name AS department_name, salary, manager_id FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON department.id=role.department_id ORDER BY employee_id";
          break;
        // get all employees by department
        case "View All Employees by Department":
          sql =
            "SELECT department_id, name AS department_name, first_name, last_name, title, salary, manager_id From role LEFT JOIN employee ON role.id=employee.role_id LEFT JOIN department ON department.id=role.department_id ORDER BY department_id";
          break;
        // get all employees by manager
        case "View All Employees by Manager":
          sql =
            "SELECT manager_id, first_name, last_name, title, salary, department_id, name AS department_name  From employee LEFT JOIN role ON role.id=employee.role_id LEFT JOIN department ON department.id=role.department_id ORDER BY manager_id";
          break;
        // get all roles
        case "View All Roles":
          sql =
            "SELECT role.id AS role_id, title, salary, name AS department_name From role JOIN department ON department.id=role.department_id";
          break;
        // get all departments
        case "View All Departments":
          sql = "SELECT * From department";
          break;

        case "View Total Utilized Budget By Department":
          sql =
            "SELECT department_id, name AS department_name, SUM(salary) AS budeget From role LEFT JOIN employee ON role.id=employee.role_id LEFT JOIN department ON department.id=role.department_id GROUP BY department_id";
          break;
      }

      const [rows, fields] = await connection.execute(sql);
      connection.release();
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  // Define query add function
  async add(toDo, values) {
    try {
      let sql;
      const connection = await pool.getConnection();
      switch (toDo) {
        // add department
        case "Add Department":
          sql = "INSERT INTO department (name) VALUES(?)";
          break;

        // add role
        case "Add Role":
          sql = "INSERT INTO role (title, salary, department_id) VALUES(?,?,?)";
          break;

        // add employee
        case "Add Employee":
          sql =
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
          break;
      }

      const [rows, fields] = await connection.execute(sql, values);
      connection.release();
      console.table(rows);
    } catch (error) {
      console.log(error);
    }
  }
  // Define query update function
  async update(toDo, values) {
    try {
      let sql;
      const connection = await pool.getConnection();
      switch (toDo) {
        case "Update Employee Role":
          sql = "UPDATE employee SET role_id=? WHERE id=?";
          break;
        case "Update Employee Manager":
          sql = "Update employee SET manager_id=? WHERE id=?";
          break;
      }
      const [rows, fields] = await connection.execute(sql, values);
      connection.release();
      console.log(rows);
    } catch (error) {
      console.log(error);
    }
  }
  // Define query for delete function
  async delete(toDo, values) {
    try {
      let sql;
      const connection = await pool.getConnection();
      switch (toDo) {
        case "Remove Employee":
          sql = "DELETE FROM employee WHERE id=?";
          break;
        case "Remove Role":
          sql = "DELETE FROM role WHERE id=?";
          break;
        case "Remove Department":
          sql = "DELETE FROM department WHERE id=?";
          break;
      }
      const [rows, fields] = await connection.execute(sql, values);
      connection.release();
      console.log(rows);
    } catch (error) {
      console.log(error);
    }
  }

  async find(toDo, values) {
    try {
      let sql;
      const connection = await pool.getConnection();
      switch (toDo) {
        case "Role":
          sql = "SELECT id FROM role WHERE title=?";
          break;
        // select departments to findout department id
        case "Department":
          sql = "SELECT id FROM department WHERE name=?";
          break;
      }
      const [rows, fields] = await connection.execute(sql, values);
      connection.release();
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Query;
