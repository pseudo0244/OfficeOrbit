const jwt = require('jsonwebtoken');
const Employee = require('../../models/employee/employee');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token will expire in 1 hour
};

// Register Employee
const registerEmployee = async (req, res) => {
  const { name, email, empId, password, jobRole } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    const employee = new Employee({
      name,
      email,
      empId,
      password,
      jobRole
    });

    const savedEmployee = await employee.save();
    
    const token = generateToken(savedEmployee._id);

    res.status(201).json({
      message: 'Employee registered successfully',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login Employee
const loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await employee.matchPassword(password); // Compare passwords

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(employee._id);

    res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerEmployee,
  loginEmployee
};
