const express = require('express');
const router = express.Router();
const employeeTree = require('./treeStructure');

router.post('/addEmployee', (req, res) => {
    const { employee, managerId } = req.body;
    try {
        const success = employeeTree.addEmployee(employee, managerId);
        if (success) {
            res.json({ message: 'Employee added successfully' });
        } else {
            res.status(400).json({ error: 'Manager not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/deleteEmployee/:id', (req, res) => {
    try {
        const success = employeeTree.deleteEmployee(req.params.id);
        if (success) {
            res.json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/getTree', (req, res) => {
    try {
        const tree = employeeTree.getTree();
        res.json(tree);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/updateEmployee', (req, res) => {
    const { id, name, title, newManagerId } = req.body;
    try {
        const success = employeeTree.updateEmployee(id, { name, title }, newManagerId);
        if (success) {
            res.json({ message: 'Employee updated successfully' });
        } else {
            res.status(404).json({ error: 'Employee or manager not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
