const router = require("express").Router();
const Transaction = require("../models/transaction.js");
// var alert = document.getElementById('alert')
router.post("/api/transaction", ({body}, res) => {
  Transaction.create(body)
    .then(dbTransaction => {
      console.log(dbTransaction.value)
      // if(dbTransaction.value > 0) {
      //   console.log('You have added a deposit to your budget tracker!')
      //   // const alert = document.querySelector('#alert')
      //   // var alert = document.getElementById('alert')
      //   // alert.innerHTML = "whatever";

      // } else {
      //   console.log('You have added an expense to your budget tracker!')
      // }
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
      
    });
});

router.post("/api/transaction/bulk", ({body}, res) => {
  Transaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get("/api/transaction", (req, res) => {
  Transaction.find({}).sort({date: -1})
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;