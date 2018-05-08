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
            message: "What would you like to do, manager?",
            choices: [
                {
                    name: "View Products for Sale",
                    value: 1
                },
                {
                    name: "View Low Inventory",
                    value: 2
                },
                {
                    name: "Add to Inventory",
                    value: 3
                },
                {
                    name: "Add New Product",
                    value: 4
                },
                {
                    name: "Exit",
                    value: 5
                }
            ],
            name: "choice"
        }
    ]).then(function(response){
        switch(response.choice){
            case 1:
                displayProducts();
                break;
            case 2:
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Show products with stock quantity less than:",
                        name: "max"
                    }
                ]).then(function(response){
                    displayLowInventory(response.max);
                })
                break;
            case 3:
                addToInventory();
                break;
            case 4:
                addProductPrompt();
                break;
            case 5:
                console.log("Ok, bye!");
                connection.end();
                
        }
        
    })
}

function displayProducts(){
    //Display a table of the items
    var query = connection.query(
        "SELECT * FROM products",
        function(err, res) {
            console.table(res);
            mainMenu();
        }
    );
}

function displayLowInventory(maxQuantity){
    var query = connection.query(
        "SELECT * FROM products WHERE stock_quantity < ?",
        [maxQuantity],
        function(err, res) {
            if(res.length >= 1){
                console.table(res);
                console.log("There are no products with a stock quantity less than "+ maxQuantity)
            }
            mainMenu();
        }
    );
}

function addToInventory(){
    //get all products and store names into an array
    var query = connection.query(
        "SELECT * FROM products",
        function(err, res) {
            var choicesArray = res.map(function(val,ind,arr){
                var id = val.item_id;
                var itemName = val.product_name;
                var quantity = val.stock_quantity;
                return {
                    name: itemName+" (current stock: "+ quantity+")",
                    value: id
                }
            })
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which product would you like to inventory to?",
                    choices: choicesArray,
                    name: "productID"
                }
            ]).then(function(response){
                var id = response.productID
                inquirer.prompt([
                    {
                        type: "input",
                        message: "How much stock would you like to add to the inventory?:",
                        name: "add"
                    }
                ]).then(function(response){
                    var addQuantity = response.add;
                    console.log(id)
                    var query = connection.query(
                        "SELECT * FROM products WHERE ?",
                        [{
                            item_id: id
                        }],
                        function(err, res) {
                            var exQuantity = res[0].stock_quantity;
                            console.log("existing stock: ", exQuantity);
                            var newQuantity = exQuantity += parseInt(addQuantity);
                            console.log("add stock: ", addQuantity);
                            console.log("new stock: ", newQuantity);
                            var query = connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                  {
                                    stock_quantity: newQuantity
                                  },
                                  {
                                    item_id: id
                                  }
                                ],
                                function(err, res) {
                                  console.log(res.affectedRows + " products updated!\n");
                                  mainMenu();
                                }
                              );
                        }
                    );

                })

            })
        }
    );
}

function addProductPrompt(){
    var query = connection.query(
        "SELECT DISTINCT department_name FROM products",
        function(err, res) {
            if(err) throw err;
            var choicesArray = res.map(function(val,ind,arr){
                return val.department_name;
            })
            console.log("Ok, let's add a product!!");
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Product Name: ",
                        name: "productName"
                    },
                    {
                        type: "list",
                        message: "Department: ",
                        choices: choicesArray,
                        name: "department"
                    },
                    {
                        type: "input",
                        message: "Price: ",
                        name: "price"
                    },
                    {
                        type: "input",
                        message: "Stock Quantity: ",
                        name: "quantity"
        
                }]).then(function(responses) {
                    addToDB(responses.productName, responses.department, parseFloat(responses.price), parseInt(responses.quantity));
                });
        }
    );
}


function addToDB(productName, department, price, quantity) {
        console.log("Adding a new item...\n");
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: productName,
                department_name: department,
                price: price,
                stock_quantity: quantity
            },
            function(err, res) {
                console.log(res.affectedRows + " item entered!\n");
                mainMenu();
            }
        );
}