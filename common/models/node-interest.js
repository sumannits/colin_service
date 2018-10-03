'use strict';

module.exports = function(Nodeinterest) {
    Nodeinterest.addData = function(data,cb){
        var response = {};
        var entryData = [];
        var communityId='';
        if(data['selectinterest']) {  
            communityId=data['node_id'];  
            for (var i = 0; i < data['selectinterest'].length; i++) {
                if(data['selectinterest'][i] && data['selectinterest'][i]!=''){
                    let insertData = { 
                        "node_id": communityId, 
                        "interestId": data['selectinterest'][i]
                    };
                    entryData.push(insertData);
                }
            }
            Nodeinterest.remove({ "node_id": communityId }, (err1, res1) => {
                if (err1) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                }
                Nodeinterest.create(entryData, (err, res) => {
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
        }else{
            response.type = "error";
            response.message = "Plesae give proper data.";
            cb(null, response);
        }
    }

    Nodeinterest.remoteMethod('addData', {
        http: {path: '/insertData', verb: 'post'},
        accepts: [
        {
            arg: 'data',
            type: 'object',
            http: { source: 'body' }  
        }
        ],
        returns: {arg: 'response', type: 'object'}
    });

    Nodeinterest.deleteAll = function(data,cb){
        var response = {};
        var grpId=data['node_id'];
        if(grpId) {  
            Nodeinterest.remove({ "node_id": grpId }, (err1, res1) => {
                if (err1) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                }
            })
        }else{
            response.type = "error";
            response.message = "Plesae give proper data.";
            cb(null, response);
        }
    }

    Nodeinterest.remoteMethod('deleteAll', {
        http: {path: '/deleteAllData', verb: 'post'},
        accepts: [
        {
            arg: 'data',
            type: 'object',
            http: { source: 'body' }  
        }
        ],
        returns: {arg: 'response', type: 'object'}
    });

};
