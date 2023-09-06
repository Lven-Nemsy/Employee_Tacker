SELECT
  department.dept_name AS DeptName, department_role.role_title AS DeptRole, department_role.salary AS Salary
FROM department
JOIN employee_info ON employee.role_id = department_role.id

