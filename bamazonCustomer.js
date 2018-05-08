var inquirer = require('inquirer');
var mysql = require("mysql");
require("console.table");
//===================================
var products;

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
    entryMenu();
});

function entryMenu(){
    //Welcome Message
    console.log("==========================================================================")
    console.log("========                    WELCOME TO BAMAZON                  ==========")
    console.log("========  your one-stop shop for all your non-essential needs!  ==========")
    console.log("==========================================================================")

    //Display a table of the items
    var query = connection.query(
        "SELECT * FROM products",
        function(err, res) {
            console.table(res);
            products = res;
            buyProduct();
        }
    );

}

function buyProduct(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of the product you would like to buy",
            name: "productID"
        },
        {
            type: "input",
            message: "How many units would you like to buy?",
            name: "units"
        }
    ]).then(function(response){
        var units = response.units;
        var id = response.productID;
        checkItemQuantity(id, units);


    })
}

function checkItemQuantity(productID, unitsToBuy){
    var query = connection.query(
        "SELECT * FROM products WHERE ?",
        [{
            item_id: productID
        }],
        function(err, res) {
            console.table(res);
            var quantity = parseInt(res[0].stock_quantity);
            var productName = res[0].product_name;
            var price = parseFloat(res[0].price);
            console.log("quantity: ", quantity)

            if(quantity<=0){
                console.log("Sorry, we're out of ", productName);
                buyProduct();
            }else if(unitsToBuy>quantity){
                console.log("insufficient quantity, choose an amount less than or equal to ", quantity);
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Enter a new quantity:",
                        name: "units"
                    }
                ]).then(function(response){
                    var units = response.units;
                    checkItemQuantity(productID, units);
                })
            }else{
                console.log("Hooray!! You have bought ", unitsToBuy, "units of", productName, "!");
                var newQuantity = quantity - unitsToBuy;
                var purchasePrice = price * unitsToBuy;
                updateProduct(productID, newQuantity, purchasePrice);
            }
        }
    );
}

function updateProduct(productID, newQuantity, purchasePrice){
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newQuantity
            },
            {
                item_id: productID
            }
        ],
        function(err, res) {
            // console.table(res);
            console.log("Total cost of your purchase: $", purchasePrice)
            entryMenu();
        }
    );

}