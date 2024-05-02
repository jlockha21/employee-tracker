document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employee-form');
    const employeeTable = document.getElementById('employee-table').querySelector('tbody');

    // Function to fetch and display employee data from local storage
    const fetchEmployees = () => {
        // Retrieve employee data from local storage
        const employees = JSON.parse(localStorage.getItem('employees')) || [];

        // Clear the table
        employeeTable.innerHTML = '';
        // Populate the table with employees
        employees.forEach((employee, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td contenteditable="true" data-id="${index}" data-field="name">${employee.name}</td>
                <td contenteditable="true" data-id="${index}" data-field="department">${employee.department}</td>
                <td contenteditable="true" data-id="${index}" data-field="role">${employee.role}</td>
                <td contenteditable="true" data-id="${index}" data-field="salary">${employee.salary}</td>
                <td>
                    <button class="delete-btn" data-id="${index}">Delete</button>
                </td>
            `;
            employeeTable.appendChild(row);
        });

        // Add event listeners for input changes and delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', handleDelete);
        });

        employeeTable.addEventListener('input', handleTableEdit);
    };

    // Function to handle form submission and save new employee data to local storage
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Retrieve form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const department = formData.get('department');
        const role = formData.get('role');
        const salary = Number(formData.get('salary'));

        // Create an object with the form data
        const newEmployee = {
            name,
            department,
            role,
            salary,
        };

        // Retrieve existing employees from local storage
        let employees = JSON.parse(localStorage.getItem('employees')) || [];

        // Add the new employee to the list
        employees.push(newEmployee);

        // Save the updated list to local storage
        localStorage.setItem('employees', JSON.stringify(employees));

        // Reset the form
        form.reset();

        // Refresh employee data
        fetchEmployees();
        alert('Employee added successfully!');
    });

    // Function to handle table edits and update employee data in local storage
    const handleTableEdit = (event) => {
        const target = event.target;
        if (target.tagName === 'TD' && target.contentEditable === 'true') {
            const index = parseInt(target.getAttribute('data-id'), 10);
            const field = target.getAttribute('data-field');
            const newValue = field === 'salary' ? Number(target.textContent) : target.textContent;

            // Retrieve existing employees from local storage
            let employees = JSON.parse(localStorage.getItem('employees')) || [];

            // Update the employee data in the list
            employees[index][field] = newValue;

            // Save the updated list to local storage
            localStorage.setItem('employees', JSON.stringify(employees));
        }
    };

    // Function to handle deleting an employee from local storage
    const handleDelete = (event) => {
        const index = parseInt(event.target.getAttribute('data-id'), 10);

        // Retrieve existing employees from local storage
        let employees = JSON.parse(localStorage.getItem('employees')) || [];

        // Remove the employee from the list
        employees.splice(index, 1);

        // Save the updated list to local storage
        localStorage.setItem('employees', JSON.stringify(employees));

        // Refresh employee data
        fetchEmployees();
        alert('Employee deleted successfully!');
    };

    // Initial call to fetch and display employee data from local storage
    fetchEmployees();
});
