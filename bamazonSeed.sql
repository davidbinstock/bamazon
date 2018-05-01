DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30),
    price DECIMAL(10,2),
    stock_quantity INTEGER(10),   
    PRIMARY KEY(item_id)
);

INSERT INTO products
VALUES
	(NULL, 'Smelly Socks', 'Dirty Clothes', 8.99, 2000),
	(NULL, 'Sweaty Shirts', 'Dirty Clothes', 14.87, 1000),
	(NULL, 'Muddy Pants', 'Dirty Clothes', 21.65, 1500),
    (NULL, 'Broken Toaster', 'Broken Things', 16.61, 500),
    (NULL, 'Broken Record Player', 'Broken Things', 51.42, 200),
    (NULL, 'Broken Chair', 'Broken Things', 13.13, 700),
    (NULL, 'Thneeds', 'Dr Suess', 120.79, 1750),
    (NULL, 'Clown Shoes', 'Silly Stuff', 30.45, 200),
    (NULL, 'Fake Mustache', 'Silly Stuff', 1.96, 200),
    (NULL, 'Jar of Dirt', 'Misc', 357.23, 200),
    (NULL, 'Stale Bread', 'Misc', 30.45, 200)
;