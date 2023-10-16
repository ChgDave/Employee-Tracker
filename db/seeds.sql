--@block
INSERT INTO
    department (name)
VALUES
    ("Engineering"),
    ("Accounting"),
    ("IT"),
    ("Purchasing"),
    ("Marketing"),
    ("Sales"),
    ("Executive");

INSERT INTO
    role (title, salary, department_id)
VALUES
    ("Junior Engineer", 70000.00, 1),
    ("Senior Engineer", 140000.00, 1),
    ("Junior Accountant", 60000.00, 2),
    ("Senior Accountant", 120000.00, 2),
    ("Network Engineer", 80000.00, 3),
    ("Network Architect", 160000.00, 3),
    ("Junior Buyer", 60000.00, 4),
    ("Senior Buyer", 100000.00, 4),
    ("Marketing Analyst", 100000.00, 5),
    ("Marketing Director", 200000.00, 5),
    ("Sales Representative", 100000.00, 6),
    ("Sales Director", 200000.00, 6),
    ("CEO", 250000.00, 7);

INSERT INTO
    employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, "Jason", "Smith", 13, NULL),
    (2, "John", "Adams", 2, 1),
    (3, "Jessica", "Simpsons", 1, 2),
    (4, "Tracey", "Waltz", 4, 1),
    (5, "Lucas", "McAdams", 3, 4),
    (6, "William", "Clarke", 6, 1),
    (7, "Amelie", "Blackwell", 5, 6),
    (8, "Abby", "Watts", 8, 1),
    (9, "Lexi", "Leal", 7, 8),
    (10, "Brady", "Hoover", 10, 1),
    (11, "Julie", "Bates", 9, 10),
    (12, "Alvin", "Cannon", 12, 1),
    (13, "Ryder", "Castro", 11, 12);