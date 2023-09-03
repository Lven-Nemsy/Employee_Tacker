DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE department (
  id INT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL,
);

CREATE TABLE department_role (
  id INT PRIMARY KEY,
  role_title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
);
