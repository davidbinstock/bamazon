# bamazon
## We're taking on Amazon baby!!

### Just kidding of course. This is just a simple command line application that stores products in a SQL database and allows users to interact with and update the database.

### see demo here: [https://drive.google.com/file/d/1A1vo48CJrkbSy81wJrXI1AnDA7X8-RSZ/view]

## Structure:
* My SQL database with two tables
    * A '*Products*' with the following columns:
        * Product ID
        * Product name
        * Department name
        * Price
        * Stock quantity
        * Total sales
    * A '*Departments*' with the following columns:
        * Department ID
        * Department name
        * Overhead Costs
* Three node applications written in javascript
    * Customer.js
    * Manager.js
    * Supervisor.js  
    (all three applications are described in detail below)
* NPM packages 
    * Inquirer
    * mysql
    * Console.table
## Customer
The Customer only has one valid action, which is buying a product:
* Buy a Product
    * The customer is shown a list of the products available
    * They are then prompted to choose a product and the quantity they would like to purchase
    * If there is enough stock to complete the order, the inventory and sales in the database are updated, and the user is shown their total price
    * If there is not enough of the item stock, they are prompted to choose a new quantity
    * If the item is out of stock, the user will not be able to complete an order
### Notes:
* Should add some data validation to make sure that user enters in a valid product ID and only numbers
## Manager
The manager can choose from a number of different actions:
* View Products for sale
    * The manager is shown a list of the products available
* View Low Inventory
    * The manager is shown a list of products with low inventory
    * The manager can specify the “low” quantity threshold
* Add to Inventory
    * Manager can add quantity to a products stock
* Add New Product
    * Manager can add a new product
    * Note: the manager cannot add a new department (only supervisor can do this), they must choose from existing department
### Notes:
* Should add some data validation to make sure that user enters in a valid inputs

## Supervisor
The supervisor can choose from two actions:
* View Products sales by department
    * The manager is shown a list of the departments with their total sales, overhead, and net profit.
* Create new department
    * The manager can create a new department, entering in the department name, and the overhead costs
### Notes:
* Should add some data validation to make sure that user enters in a valid inputs
