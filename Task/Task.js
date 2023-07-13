const { Router } = require("express");
const SqlString = require("sqlstring");
const async = require("async");
const data = require("./data.json");
const pool = require("../db/db");
module.exports = () => {
  const task = Router();

  //Bulk adding the details
  task.post("/bulk_add_details", (req, res) => {
    async.eachSeries(
      data,
      (dataOne, cb) => {
        const myQuery = SqlString.format("INSERT INTO ?? SET ?", [
          "products",
          dataOne,
        ]);
        pool.query(myQuery, (error, user_data) => {
          if (error) {
            console.log(error);
          } else {
            if (user_data) {
              console.log(user_data);
              cb();
            } else {
              cb();
            }
          }
        });
      },
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          res.status(200).json({
            error: false,
            message: "success",
          });
        }
      }
    );
  });

  //add a single product
  task.post("/add_product", (req, res) => {
    const postData = req.body;
    const myQuery = SqlString.format("INSERT INTO ?? SET ?", [
      "products",
      postData,
    ]);
    pool.query(myQuery, (error, inserted) => {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json({
          error: false,
          details: inserted,
          message: "success",
        });
      }
    });
  });

  //edit products
  task.put("/edit_product", (req, res) => {
    const postData = req.body;
    const myQuery = SqlString.format(`UPDATE ?? SET ? WHERE id=?`, [
      "products",
      postData,
      postData.id,
    ]);

    pool.query(myQuery, (error, updated) => {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json({
          error: false,
          details: updated,
          message: "success",
        });
      }
    });
  });

  //delete product
  task.delete("/delete_product", (req, res) => {
    const postData = req.body;
    const myQuery = SqlString.format(`DELETE FROM products WHERE id=?;`, [
      postData.id,
    ]);

    pool.query(myQuery, (error, deleted) => {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json({
          error: false,
          details: deleted,
          message: "successfully deleted",
        });
      }
    });
  });

  //getting all details of all product
  task.get("/get_details", (req, res) => {
    pool.query(`SELECT * FROM products;`, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          error: false,
          details: data,
        });
      }
    });
  });
  // search_details for products
  task.post("/search_details", (req, res) => {
    const postData = req.body;
    pool.query(
      `SELECT * FROM products where name="%${postData.name}%" OR description="%${postData.description}% OR category_name="%${postData.category_name}%";`,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            error: false,
            details: data,
          });
        }
      }
    );
  });

  //getting all details of product by id
  task.get("/get_details_by_id/:id", (req, res) => {
    let { id } = req.params;
    pool.query(`SELECT * FROM products where id = ?;`, [id], (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          error: false,
          details: data,
        });
      }
    });
  });
  return task;
};
