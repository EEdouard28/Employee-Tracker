DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role
  FOREIGN KEY (role_id)
  REFERENCES roles(id),
  manager_id INT,
  CONSTRAINT fk_manager
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
);


