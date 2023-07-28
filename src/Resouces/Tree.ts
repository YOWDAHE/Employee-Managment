interface TreeNode {
    value: string;
    children: TreeNode[];
}

export const Tree: TreeNode = {
    "value": "CEO",
    "children": [
        {
            "value": "CTO",
            "children": [
                {
                    "value": "Project Manager",
                    "children": [
                        {
                            "value": "Product Owner",
                            "children": [
                                {
                                    "value": "Tech Lead",
                                    "children": [
                                        {
                                            "value": "Frontend Developer",
                                            "children": []
                                        },
                                        {
                                            "value": "Backend Developer",
                                            "children": []
                                        },
                                        {
                                            "value": "DevOps Engineer",
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "value": "QA Engineer",
                                    "children": []
                                },
                                {
                                    "value": "Scrum Master",
                                    "children": []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "value": "CFO",
            "children": [
                {
                    "value": "Chef Accountant",
                    "children": [
                        {
                            "value": "Financial Analyst",
                            "children": []
                        },
                        {
                            "value": "Account and Payable",
                            "children": []
                        }
                    ]
                },
                {
                    "value": "Internal Audit",
                    "children": []
                }
            ]
        },
        {
            "value": "COO",
            "children": [
                {
                    "value": "Product Manager",
                    "children": []
                },
                {
                    "value": "Operation Manager",
                    "children": []
                },
                {
                    "value": "Customer Relation",
                    "children": []
                }
            ]
        },
        {
            "value": "HR",
            "children": []
        }
    ]
}

interface Position {
    parentid: string | null;
    name: string;
}

type Positions = {
    [key: string]: Position;
};

export const positions: Positions = {
    id: {
        parentid: null,
        name: 'CEO'
    },
    id2: {
        parentid: null,
        name: 'CEO'
    },
}

// export default Tree;