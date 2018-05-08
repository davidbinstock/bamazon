var inquirer = require('inquirer');
var mysql = require("mysql");
require("console.table");
//===================================

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "david",
    password: "coffee",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    mainMenu();
});

function mainMenu(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do, supervisor?",
            choices: [
                {
                    name: "View Product Sales by Department",
                    value: 1
                },
                {
                    name: "Create New Department",
                    value: 2
                },
                {
                    name: "Exit",
                    value: 3
                }
            ],
            name: "choice"
        }
    ]).then(function(response){
        switch(response.choice){
            case 1:
                displaySales();
                break;
            case 2:
                createDepartment();
                break;
            case 3:
                console.log("Ok, bye!");
                connection.end();
                
        }
        
    })
}

function displaySales(){
    //Display a table of departments
    var query = connection.query(
        "SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) AS product_sales, (SUM(p.product_sales)-d.over_head_costs) AS total_profit FROM bamazon_db.departments AS d LEFT JOIN bamazon_db.products AS p ON d.department_name = p.department_name GROUP BY d.department_name ORDER BY d.department_id ASC;",
        function(err, res) {
            console.table(res);
            mainMenu();
        }
    );
}


function createDepartment(){
    console.log("Ok, let's add a product!!");
    inquirer
        .prompt([
            {
                type: "input",
                message: "Department Name: ",
                name: "departmentName"
            },
            {
                type: "input",
                message: "Over Head Costs: ",
                name: "overHead"
            }
        ]).then(function(responses) {
            addToDB(responses.departmentName, parseFloat(responses.overHead));
        });
}


function addToDB(departmentName, overHead) {
        console.log("Adding a new item...\n");
        var query = connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: departmentName,
                over_head_costs: overHead
            },
            function(err, res) {
                console.log(res.affectedRows + " item entered!\n");
                mainMenu();
            }
        );
}