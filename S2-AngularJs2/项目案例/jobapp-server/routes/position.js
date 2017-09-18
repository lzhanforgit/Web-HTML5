var express = require('express');
var jwt=require('jwt-simple');
var moment = require('moment');
var router = express.Router();
var positionDao=require('./../dao/positionDAO').positionDao;

/* GET home page. */
router.get('/', function(req, res, next) {
    var str=req.header('token');
    console.log(str);
    console.log(req.query);
    positionDao.getAllPositions(function (result) {
      if(result.length==0){
        res.json(null);
      }else{
        res.json(result);
      }
  })
});

router.get('/header', function(req, res, next) {
    var expires = moment(5, "HH").valueOf();
    var token = jwt.encode({
        iss: user.id,
        exp: expires
    }, app.get('jwtTokenSecret'));

    console.log(token);

    res.json({code:1})

});

module.exports = router;
