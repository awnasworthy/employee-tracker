INSERT INTO department (department_name)
VALUES 
('Engineering'),
('Finance'),
('Sales'),
('Basket Weaving');

INSERT INTO roles (title, salary, department_id)
VALUES
('Full Stack Developer', 80001, 1),
('Software Engineer', 121000, 1),
('Accountant', 12000, 2), 
('Finanical Analyst', 130000, 2),
('Marketing Coordindator', 80000, 3), 
('Sales Lead', 80000, 3),
('Project Manager', 100002, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Markie', 'Mark', 1, null),
('Seph', 'McCauley', 2, 1),
('Ginny', 'Fouts', 6, null),
('Will', 'Herondale', 3, 3),
('Jem', 'Carstairs', 6, null),
('Bijou', 'Glider', 5, 5),
('Cordelia', 'Diddle', 7, null),
('Milo', 'Mann', 2, 7);