-- Insert data into departments table
INSERT INTO departments (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Support'),
    ('Human Resources'),
    ('Marketing'),
    ('Research and Development');

-- Insert data into roles table
INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Salesperson', 100000, 1),
    ('Accountant', 76900, 3),
    ('Customer Support Specialist', 100000, 5),
    ('HR Manager', 125000, 6),
    ('Product Marketer', 90000, 7),
    ('Software Developer', 120000, 8),
    ('Data Scientist', 100000, 2),
    ('Front End Web Developer', 80000, 2),
    ('Back End Web Developer', 100000, 5),
    ('Full Stack Web Developer', 150000, 2),
    ('Quality Assurance Analyst', 85000, 1),
    ('Project Manager', 185000, 1);

-- Insert data into employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Eloe', 4, NULL),
    ('Mike', 'Chan', 5, NULL),
    ('Ashley', 'Rodriguez', 6, NULL),  
    ('Kevin', 'Tupik', 7, NULL),       
    ('Malia', 'Brown', 8, 2),       
    ('Sarah', 'Lourd', 9, 2),       
    ('Tommy', 'Allen', 10, NULL),
    ('Christian', 'Eckhardt', 11, NULL),
    ('Karen', 'Harrison', 12, NULL),
    ('Chad', 'Furman', 13, NULL),
    ('Pete', 'Moore', 14, NULL),
    ('Samantha', 'Bailey', 15, 2),
    ('Laura', 'Smith', 16, NULL),
    ('Jennifer', 'Lawrence', 17, NULL),
    ('Nicole', 'Williams', 18, NULL),
    ('Carl', 'Rogers', 19, NULL),
    ('James', 'Franco', 20, 2),
    ('Olivia', 'Culpo', 21, NULL),
    ('Anna', 'Kournikova', 22, NULL),
    ('Serena', 'Williams', 23, 2),
    ('Venus', 'Williams', 24, NULL),
    ('Maria', 'Sharapova', 25, NULL);

SET FOREIGN_KEY_CHECKS = 1; -- Enable foreign key checks again