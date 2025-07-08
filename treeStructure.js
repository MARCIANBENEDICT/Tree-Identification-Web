class TreeNode {
    constructor(id, name, title) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.children = [];
    }
}

class EmployeeTree {
    constructor() {
        this.root = null;
    }

    addEmployee(employeeData, managerId = null) {
        const newNode = new TreeNode(
            employeeData.id,
            employeeData.name,
            employeeData.title
        );

        if (!this.root) {
            this.root = newNode;
            return true;
        }

        const findManager = (node) => {
            if (node.id === managerId) {
                node.children.push(newNode);
                return true;
            }
            for (let child of node.children) {
                if (findManager(child)) return true;
            }
            return false;
        };

        return findManager(this.root);
    }

    deleteEmployee(id) {
        const deleteNode = (node, id) => {
            const index = node.children.findIndex(child => child.id === id);
            if (index !== -1) {
                node.children.splice(index, 1);
                return true;
            }
            for (let child of node.children) {
                if (deleteNode(child, id)) return true;
            }
            return false;
        };

        if (this.root.id === id) {
            this.root = null;
            return true;
        }
        return deleteNode(this.root, id);
    }

    updateEmployee(id, newData, newManagerId = null) {
        let employeeNode = null;
        let oldParent = null;
        
        // Find the employee and their parent
        const findEmployee = (node, parent = null) => {
            if (node.id === id) {
                employeeNode = node;
                oldParent = parent;
                return true;
            }
            for (let child of node.children) {
                if (findEmployee(child, node)) return true;
            }
            return false;
        };

        findEmployee(this.root);

        if (!employeeNode) {
            return false;
        }

        // Update employee data
        if (newData.name) employeeNode.name = newData.name;
        if (newData.title) employeeNode.title = newData.title;

        // If new manager ID is provided and different from current
        if (newManagerId && oldParent?.id !== newManagerId) {
            // Find new manager
            let newManager = null;
            const findNewManager = (node) => {
                if (node.id === newManagerId) {
                    newManager = node;
                    return true;
                }
                for (let child of node.children) {
                    if (findNewManager(child)) return true;
                }
                return false;
            };

            findNewManager(this.root);

            if (!newManager) {
                return false;
            }

            // Remove employee from old parent's children
            if (oldParent) {
                const index = oldParent.children.indexOf(employeeNode);
                oldParent.children.splice(index, 1);
            }

            // Add to new manager's children
            newManager.children.push(employeeNode);
        }

        return true;
    }

    getTree() {
        return this.root;
    }
}

module.exports = new EmployeeTree();
