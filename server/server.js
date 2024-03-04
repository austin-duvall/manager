const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const port = 3001;

app.use(cors());

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// GET request
app.get('/employees', async (req, res) => {
  try {
    // Read the data.json file asynchronously
    const data = await fs.readFile('data.json', 'utf-8');
    res.json(JSON.parse(data).employees);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST request to add employee
app.post('/employees', async (req, res) => {
  try {
    const { body } = req;

    // Read the data.json file asynchronously
    const data = await fs.readFile('data.json', 'utf-8');
    const parsedData = JSON.parse(data);

    // Add a new employee
    parsedData.employees.push(body);

    // Write the updated data back to the file
    await fs.writeFile('data.json', JSON.stringify(parsedData, null, 2));

    res.json({ message: 'Employee added successfully', employee: body });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST request to add an entry to the corr array
app.post('/employees/:employeeNumber/corr', async (req, res) => {
  try {
    const { employeeNumber } = req.params;
    const { newCorrEntry } = req.body;

    // Read the data.json file asynchronously
    const data = await fs.readFile('data.json', 'utf-8');
    const jsonData = JSON.parse(data);

    // Find the employee by employeeNumber
    const employeeIndex = jsonData.employees.findIndex(
      (employee) => employee.employeeNumber === employeeNumber
    );

    if (employeeIndex !== -1) {
      // Add the new entry to the corr array
      jsonData.employees[employeeIndex].corr.push(newCorrEntry);

      // Write the updated data back to data.json
      await fs.writeFile('data.json', JSON.stringify(jsonData, null, 2));

      res.json({ message: 'Entry added to corr array successfully.' });
    } else {
      return res.status(404).json({ error: 'Employee not found.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST request to fire an employee and move them to the fired.json file
app.post('/employees/:employeeNumber/term', async (req, res) => {
  try {
    const { employeeNumber } = req.params;

    const { reason, dateOfTerm } = req.body;

    // Read the data.json file asynchronously
    const data = await fs.readFile('data.json', 'utf-8');
    const jsonData = JSON.parse(data);

    // Find the employee by employeeNumber
    const employeeIndex = jsonData.employees.findIndex(
      (employee) => employee.employeeNumber === employeeNumber
    );

    if (employeeIndex !== -1) {
      // Extract the employee object
      const fullEmployee = jsonData.employees.splice(employeeIndex, 1)[0];

      // Create a new object with only the required fields
      const firedEmployee = {
        firstName: fullEmployee.firstName,
        lastName: fullEmployee.lastName,
        employeeNumber: fullEmployee.employeeNumber,
        position: fullEmployee.position,
        status: "Inactive", // Or any other status you want to set for a fired employee
        reason: reason,
        dateOfTerm: dateOfTerm,
      };

      // Proceed with adding firedEmployee to fired.json as before
      const firedData = await fs.readFile('fired.json', 'utf-8');
      const firedJsonData = JSON.parse(firedData);
      if (!firedJsonData.firedEmployees) firedJsonData.firedEmployees = [];
      firedJsonData.firedEmployees.push(firedEmployee);

      // Write the updated data back to data.json and fired.json
      await Promise.all([
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2)),
        fs.writeFile('fired.json', JSON.stringify(firedJsonData, null, 2))
      ]);

      res.json({ message: 'Employee fired and moved to fired.json successfully.' });
    } else {
      return res.status(404).json({ error: 'Employee not found.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});



// PUT request to update an employee's wage
app.put('/employees/:employeeNumber/wage', async (req, res) => {
  try {
      // Read the data.json file
      const data = await fs.readFile('data.json', 'utf-8');
      const parsedData = JSON.parse(data);

      // Find the employee to update
      const employeeIndex = parsedData.employees.findIndex(
          employee => employee.employeeNumber === req.params.employeeNumber
      );

      if (employeeIndex === -1) {
          return res.status(404).json({ error: 'Employee not found' });
      }

      // Update the wage
      parsedData.employees[employeeIndex].wage = req.body.wage;

      // Write the updated data back to the file
      await fs.writeFile('data.json', JSON.stringify(parsedData, null, 2)); // Indent for readability

      res.json(parsedData.employees[employeeIndex]); // Return the updated employee
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});

// PUT request to update an employee's position
app.put('/employees/:employeeNumber/position', async (req, res) => {
  try {
      // Read the data.json file
      const data = await fs.readFile('data.json', 'utf-8');
      const parsedData = JSON.parse(data);

      // Find the employee to update
      const employeeIndex = parsedData.employees.findIndex(
          employee => employee.employeeNumber === req.params.employeeNumber
      );

      if (employeeIndex === -1) {
          return res.status(404).json({ error: 'Employee not found' });
      }

      // Update the wage
      parsedData.employees[employeeIndex].position = req.body.position;

      // Write the updated data back to the file
      await fs.writeFile('data.json', JSON.stringify(parsedData, null, 2)); // Indent for readability

      res.json(parsedData.employees[employeeIndex]); // Return the updated employee
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});

// PUT request to update an employee's position
app.put('/employees/:employeeNumber/hours', async (req, res) => {
  try {
      // Read the data.json file
      const data = await fs.readFile('data.json', 'utf-8');
      const parsedData = JSON.parse(data);

      // Find the employee to update
      const employeeIndex = parsedData.employees.findIndex(
          employee => employee.employeeNumber === req.params.employeeNumber
      );

      if (employeeIndex === -1) {
          return res.status(404).json({ error: 'Employee not found' });
      }

      // Update the wage
      parsedData.employees[employeeIndex].hours = req.body.hours;

      // Write the updated data back to the file
      await fs.writeFile('data.json', JSON.stringify(parsedData, null, 2)); // Indent for readability

      res.json(parsedData.employees[employeeIndex]); // Return the updated employee
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
