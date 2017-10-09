create database bamazon;

use bamazon;

create table products(
item_id integer(10) auto_increment not null,
product_name varchar(30),
department_name varchar(20),
price integer(10),
stock_quantity integer(10),
primary key (item_id)
);


select * from products;
insert into products (product_name, department_name, price, stock_quantity) values ("batteries", "tools", 7.99, 25),
('hose', 'outdoor', 18, 20), ('lawn mower', 'outdoor', 350, 7), ('beer stein', 'kitchen', 25, 25), ('silverware', 'kitchen', 20, 18), 
('knife set', 'kitchen', 200, 20), ('range', 'appliances', 499, 4), ('sofa', 'furniture', 650, 7), ('coffee table', 'furniture', 125, 10);


