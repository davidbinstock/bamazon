DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30),
    price DECIMAL(10,2),
    stock_quantity INTEGER(10),
    product_sales DECIMAL(20,2) DEFAULT 0,   
    PRIMARY KEY(item_id)
);

INSERT INTO products
VALUES
	(NULL, 'Smelly Socks', 'Dirty Clothes', 8.99, 2000,0),
	(NULL, 'Sweaty Shirts', 'Dirty Clothes', 14.87, 1000,0),
	(NULL, 'Muddy Pants', 'Dirty Clothes', 21.65, 1500,0),
    (NULL, 'Broken Toaster', 'Broken Things', 16.61, 500,0),
    (NULL, 'Broken Record Player', 'Broken Things', 51.42, 200,0),
    (NULL, 'Broken Chair', 'Broken Things', 13.13, 700,0),
    (NULL, 'Thneeds', 'Dr Suess', 120.79, 1750,0),
    (NULL, 'Clown Shoes', 'Silly Stuff', 30.45, 200,0),
    (NULL, 'Fake Mustache', 'Silly Stuff', 1.96, 200,0),
    (NULL, 'Jar of Dirt', 'Misc', 357.23, 200,0),
    (NULL, 'Stale Bread', 'Misc', 30.45, 200,0)
;

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs DECIMAL(10,2),
    PRIMARY KEY(department_id)
);

INSERT INTO departments
VALUES
	(NULL, 'Dirty Clothes', 1200.00),
    (NULL, 'Broken Things', 2300.00),
    (NULL, 'Dr Suess', 8800.00),
    (NULL, 'Silly Stuff', 100.00),
    (NULL, 'Misc', 3400.00)
;