const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.json());

app.get('/employees', async (req, res) => {
  try {
    const data = await fs.readFile('data.json', 'utf-8');
    res.json(JSON.parse(data).employees);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/employees', async (req, res) => {
  try {
    const { body } = req;

    const data = await fs.readFile('data.json', 'utf-8');
    const parsedData = JSON.parse(data);

    parsedData.employees.push(body);

    await fs.writeFile('data.json', JSON.stringify(parsedData, null, 2));

    res.json({ message: 'Employee added successfully', employee: body });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/employees/:employeeNumber/corr', async (req, res) => {
  try {
    const { employeeNumber } = req.params;
    const { newCorrEntry } = req.body;

    const data = await fs.readFile('data.json', 'utf-8');
    const jsonData = JSON.parse(data);

    const employeeIndex = jsonData.employees.findIndex(
      (employee) => employee.employeeNumber === employeeNumber
    );

    if (employeeIndex !== -1) {
      jsonData.employees[employeeIndex].corr.push(newCorrEntry);

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

app.post('/employees/:employeeNumber/term', async (req, res) => {
  try {
    const { employeeNumber } = req.params;

    const { reason, dateOfTerm } = req.body;

    const data = await fs.readFile('data.json', 'utf-8');
    const jsonData = JSON.parse(data);

    const employeeIndex = jsonData.employees.findIndex(
      (employee) => employee.employeeNumber === employeeNumber
    );

    if (employeeIndex !== -1) {
      const fullEmployee = jsonData.employees.splice(employeeIndex, 1)[0];

      const firedEmployee = {
        firstName: fullEmployee.firstName,
        lastName: fullEmployee.lastName,
        employeeNumber: fullEmployee.employeeNumber,
        position: fullEmployee.position,
        status: "Inactive",
        reason: reason,
        dateOfTerm: dateOfTerm,
      };

      const firedData = await fs.readFile('fired.json', 'utf-8');
      const firedJsonData = JSON.parse(firedData);
      if (!firedJsonData.firedEmployees) firedJsonData.firedEmployees = [];
      firedJsonData.firedEmployees.push(firedEmployee);

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



app.put('/employees/:employeeNumber/wage', async (req, res) => {
  try {
      const data = await fs.readFile('data.json', 'utf-8');
      const parsedData = JSON.parse(data);

      const employeeIndex = parsedData.employees.findIndex(
          employee => employee.employeeNumber === req.params.employeeNumber
      );

      if (employeeIndex === -1) {
          return res.status(404).json({ error: 'Employee not found' });
      }

      parsedData.employees[employeeIndex].wage = req.body.wage;

      await fs.writeFile('data.json', JSON.stringify(parsedData, null, 2));

      res.json(parsedData.employees[employeeIndex]);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put('/employees/:employeeNumber/position', async (req, res) => {
  try {
      const data = await fs.readFile('data.json', 'utf-8');
      const parsedData = JSON.parse(data);

      const employeeIndex = parsedData.employees.findIndex(
          employee => employee.employeeNumber === req.params.employeeNumber
      );

      if (employeeIndex === -1) {
          return res.status(404).json({ error: 'Employee not found' });
      }

      parsedData.employees[employeeIndex].position = req.body.position;

      await fs.writeFile('data.json', JSON.stringify(parsedData, null, 2));

      res.json(parsedData.employees[employeeIndex]);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put('/employees/:employeeNumber/hours', async (req, res) => {
  try {
      const data = await fs.readFile('data.json', 'utf-8');
      const parsedData = JSON.parse(data);

      const employeeIndex = parsedData.employees.findIndex(
          employee => employee.employeeNumber === req.params.employeeNumber
      );

      if (employeeIndex === -1) {
          return res.status(404).json({ error: 'Employee not found' });
      }

      parsedData.employees[employeeIndex].hours = req.body.hours;

      await fs.writeFile('data.json', JSON.stringify(parsedData, null, 2));

      res.json(parsedData.employees[employeeIndex]);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
