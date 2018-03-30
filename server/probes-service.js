require('dotenv').config();
var request = require("request");
var schedule = require('node-schedule');

var PROBES = process.env.PROBES;
var dbId = process.env.dbId;
var postUrl = process.env.probesUrl;

function probesProcess() {
  schedule.scheduleJob('00 * * * *', function(){
    var probes = JSON.parse(PROBES) || [];
    probes.forEach(function (probe) {
      getProbeData(probe).then(function(data) {
        console.log(data)
      }, function(error) {
        console.log(error)
      })
    });
  });
}

function getProbeData(probe) {
  var options = {
    url: probe.url,
    method: "POST",
    headers: {
      "Authorization": "Basic " + probe.auth,
      "content-type": "application/json"
    }
  }
  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        postData({
          temperature: data.temperature,
          humidity: data.humidity,
          roomInfo: {
            "collName": "ProbeRoomInfo",
            "_id":probe.id
          }
        });
        resolve(data);
      } else {
        reject({
          error: error,
          statusCode: response.statusCode
        })
      }
    });
  })
}

function postData(data) {
  var options = {
    url: postUrl,
    method: "POST",
    headers: {
      "X-Appery-Database-Id": dbId,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  request(options, function (error, response, body) {
    console.log(body)
  });
}

module.exports = {
  probesProcess: probesProcess
};
