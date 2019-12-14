var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw (err);
    console.log("connected as id", connection.threadId);
    makeTable()
})
var makeTable = function () {
    connection.query("SELECT *FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].Id + " || " + res[i].Product + " || " +
                res[i].Department + " || " + res[i].Price + "||" + res[i].Stock + "\n");
        }
        promptCustomer(res);
    })
}
var promptCustomer = function (res) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What would you like to buy?"
    }]).then(function (answer) {
        var correct = false;
        for (var i = 0; i < res.length; i++) {
            correct = true;
            var product = answer.choice;
            var id = i;
            inquirer.prompt({
                type: "input",
                name: "quant",
                message: "How many would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) == false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }).then(function (answer) {
                if ((re[id].Stock - answer.quant) > 0) {
                    connection.query("UPDATE products SET Stock= '" + (res[id].Stock - answer.quant) + "'WHERE Product=' " + Product + "'" function (err, res2) {
                        console.log("Thank you for your purchase!");
                        makeTable();
                    })
                } else {
                    console.log("Insufficent Quanitity!!");
                    promptCustomer(res);
                }
            }
    }
    })
}