var express = require('express');
var router = express.Router();
var positionDao=require('./../dao/positionDAO').positionDao;

/* GET home page. */
router.get('/', function(req, res, next) {
  positionDao.getAllPositions(function (result) {
      if(result.length==0){
        res.json(null);
      }else{
        res.json(result);
      }
  })
});

module.exports = router;
