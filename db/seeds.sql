USE company_db;

INSERT INTO departments (name)

VALUES ("Engineering"), ("HR"), ("Management");


INSERT INTO roles (title, salary, department_id)

VALUES ("Front End Engineer", 80000, 1);


INSERT INTO employees (first_name, last_name, role_id, manager_id)

VALUES ("Sam", "Blake", 1, NULL);
