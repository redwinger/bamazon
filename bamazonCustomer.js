var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root',
	password: 'password',
	database: 'bamazon'
});

connection.connect(function(err){

	if(err){throw err;}
	
	start();
	
	console.log('connected as id ' + connection.threadId)
});

function start() {

	connection.query('select * from products', function(err, results){
	if(err){throw err;}

	console.log("******Items Available for Purchase******")

	for(var i = 0; i < results.length; i++) {
		console.log(results[i].item_id, results[i].product_name, results[i].price)
	}		
	

	inquirer.prompt([{
            name: "item_id",
            type: "input",
            message: "What is the item ID you would like to buy?",
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        }, {
            name: "quantity",
            type: "input",
            message: "How many of this item would you like to buy?",
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
		}]).then(function(answer) {
            var chosenId = answer.item_id -1;
            var chosenQuantity = answer.quantity
            if (chosenQuantity < results[chosenId].stock_quantity) {
                console.log("Your total for "  + answer.quantity + " - " + results[chosenId].product_name + " is: " + results[chosenId].price * chosenQuantity);
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: results[chosenId].stock_quantity - chosenQuantity
                }, {
                    item_id: results[chosenId].item_id
                }], function(err) {
                    if(err){throw err}
                    	console.log("Thank you for your order!")
                    	connection.end()  
                });

            } else {
                console.log("Sorry, insufficient Quanity at this time. All we have is " + results[chosenId].stock_quantity + " in our Inventory.");   
            }
        })
        
	})
};