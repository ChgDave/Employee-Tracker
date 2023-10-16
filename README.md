# 12 SQL: Employee Tracker

## Description

This is the week 12 challenge project for the Northwestern coding bootcamp. Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called **content management systems (CMS)**. This project is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

The application will be invoked by using the following command:

```bash
node index.js
```

The database schema is as shown in the following image:

![Database schema includes tables labeled “employee,” role,” and “department.”](./Assets/12-sql-homework-demo-01.png)

## Table of Contents

- [User Story](#user-story)

- [Installation](#installation)

- [Usage](#usage)

- [License](#license)

- [Github Repo](#github-repo)

- [Video Link](#video-link)

- [Questions](#questions)

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Installation

To install necessary dependencies, run the following command:

```
npm i
npm i inquirer@8.2.4
npm i mysql2
```

## Usage

```
When you run the index.js file through node in your command line, you will be presented with the following series of options:

- View All Employees
- View All Employees by Department
- View All Employees by Manager
- Add Employee
- Remove Employee
- Update Employee Role
- Update Employee Manager
- View All Roles
- Add Role
- Remove Role
- View All Departments
- Add Department
- Remove Department
- View Total Utilized Budget by Department
- Quit

WHEN you choose to view all departments;
THEN you are presented with a formatted table showing department names and department ids.
WHEN you choose to view all roles;
THEN you are presented with the job title, role id, the department that role belongs to, and the salary for that role.
WHEN you choose to view all employees;
THEN you are presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
WHEN you choose to add a department;
THEN you are prompted to enter the name of the department and that department is added to the database.
WHEN you choose to add a role;
THEN you are prompted to enter the name, salary, and department for the role and that role is added to the database.
WHEN I choose to add an employee;
THEN I are prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database.
WHEN I choose to update an employee role;
THEN I are prompted to select an employee to update and their new role and this information is updated in the database.
You also have the option to delete a role, a department or an employee.
You also can view the budget by department.
When you select quit, you will be able to get out of the application.
```

## License

This project is licensed under MIT License

## Github Repo

https://github.com/ChgDave/Employee-Tracker

## Video Link

https://drive.google.com/file/d/1tQa-Dh-qDadDwmepmUOflC94DWpC_G6N/view

## Questions

If you have any qustions about the repo, open an issue or contact me directly at chgdave@gmail.com. You can also find more of my work at [chgdave](https://github.com/chgdave).

## Review

You are required to submit the following for review:

- A walkthrough video demonstrating the functionality of the application.

- A sample README.md file for a project repository generated using your application

- The URL of the GitHub repository, with a unique name and a README describing the project

---

© 2023 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
