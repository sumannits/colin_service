'use strict';

module.exports = function (Nodeuser) {
    Nodeuser.addData = function (data, cb) {
        var response = {};
        var entryData = [];
        var communityId = '';
        var nodeId='';
        //console.log("data1", data);
        if (data['selectuser']) {
            communityId = data['community_id'];
            nodeId = data['node_id'];
            for (var i = 0; i < data['selectuser'].length; i++) {
                if (data['selectuser'][i] && data['selectuser'][i] != '') {
                    let insertData = {
                        "node_id": nodeId,
                        "community_id": communityId,
                        "customerId": data['selectuser'][i].customerId
                    };
                    entryData.push(insertData);
                }
            }
            //console.log("entryData", entryData);
            Nodeuser.remove({ "node_id": nodeId }, (err1, res1) => {
                if (err1) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                }
                //console.log("pragati");
                Nodeuser.create(entryData, (err, res) => {
                    if (err) {
                        response.type = "error";
                        response.message = err;
                        cb(null, response);
                    }
                    response.type = "success";
                    response.message = "success";
                    cb(null, response);
                });
            })
        } else {
            response.type = "error";
            response.message = "Plesae give proper data.";
            cb(null, response);
        }
    }

    Nodeuser.remoteMethod('addData', {
        http: { path: '/insertData', verb: 'post' },
        accepts: [
            {
                arg: 'data',
                type: 'object',
                http: { source: 'body' }
            }
        ],
        returns: { arg: 'response', type: 'object' }
    });

    Nodeuser.deleteAll = function (data, cb) {
        var response = {};
        var grpId = data['node_id'];
        if (grpId) {
            Nodeuser.remove({ "node_id": grpId }, (err1, res1) => {
                if (err1) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                }
            })
        } else {
            response.type = "error";
            response.message = "Plesae give proper data.";
            cb(null, response);
        }
    }

    Nodeuser.remoteMethod('deleteAll', {
        http: { path: '/deleteAllData', verb: 'post' },
        accepts: [
            {
                arg: 'data',
                type: 'object',
                http: { source: 'body' }
            }
        ],
        returns: { arg: 'response', type: 'object' }
    });



    Nodeuser.addUserNodes = function (data, cb) {
        var response = {};
        var entryData = [];
        var customerId = '';
        //console.log("data", data);
        if (data['selectedNodes']) {
            customerId = data['customerId'];
            for (var i = 0; i < data['selectedNodes'].length; i++) {
                if (data['selectedNodes'][i] && data['selectedNodes'][i] != '') {
                    let insertData = {
                        "node_id": data['selectedNodes'][i].node_id,
                        "community_id": data['selectedNodes'][i].community_id,
                        "customerId": customerId
                    };
                    entryData.push(insertData);
                }
            }
            //console.log("entryData", entryData);
            Nodeuser.remove({ "customerId": customerId }, (err1, res1) => {
                if (err1) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                }
                Nodeuser.create(entryData, (err, res) => {
                    if (err) {
                        response.type = "error";
                        response.message = err;
                        cb(null, response);
                    }
                    response.type = "success";
                    response.message = "success";
                    cb(null, response);
                });
            })
        }
         else {
            response.type = "error";
            response.message = "Plesae give proper data.";
            cb(null, response);
        }
    }

    Nodeuser.remoteMethod('addUserNodes', {
        http: { path: '/addUserNodes', verb: 'post' },
        accepts: [
            {
                arg: 'data',
                type: 'object',
                http: { source: 'body' }
            }
        ],
        returns: { arg: 'response', type: 'object' }
    });

    Nodeuser.deleteCustomData = function (data, cb) {
        var response = {};
        //console.log(data);
        //var jsonData = JSON.parse(data);
        //console.log(jsonData);
        Nodeuser.remove(data, (err1, res1) => {
            if (err1) {
                response.type = "error";
                response.message = err;
                cb(null, response);
            }else{
                cb(null, res1);
            }
        })
    }

    Nodeuser.remoteMethod('deleteCustomData', {
        http: { path: '/deleteAllParamData', verb: 'post' },
        accepts: [
            {
                arg: 'data',
                type: 'object',
                http: { source: 'body' }
            }
        ],
        returns: { arg: 'response', type: 'object' }
    });

};
