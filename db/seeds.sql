USE company_db;

INSERT INTO departments (name)

VALUES ("Technology"), ("Marketing"), ("Public Affairs"), ("Human Resources"), ("Management");


INSERT INTO roles (title, salary, department_id)

VALUES 
("Software Engineer", 120000, 1),
("Full Stack Developer", 80000, 1),
("Marketing Associate", 70000, 2),
("Senior Marketing Associate", 80000, 2),
("Publicist", 65000, 3),
("Publicist Assistant", 50000, 3),
("Human Resource Specialist", 60000, 4),
("Project Manager", 150000, 5),
("Operations Manager", 150000, 5);




INSERT INTO employees (first_name, last_name, role_id, manager_id)

VALUES 
("Sam", "Blake", 1, NULL),
("Jennifer", "White", 2, NULL),
("Damien", "Johnson", 3, NULL),
("Christopher", "Young", 4, NULL),
("Laura", "White", 5, NULL),
("Samantha", "Rodriguez", 6, NULL),
("Curtis", "Jackson", 7, NULL),
("Sean", "Thomas", 8, 1),
("Rebecca", "Gordon", 9, 2);