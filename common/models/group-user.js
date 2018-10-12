'use strict';

module.exports = function(Groupuser) {
    Groupuser.addData = function(data,cb){
        var response = {};
        var entryData = [];
        var communityId='';
        if(data['selectuser']) {  
            communityId=data['group_id'];  
            for (var i = 0; i < data['selectuser'].length; i++) {
                if(data['selectuser'][i] && data['selectuser'][i]!=''){
                    let insertData = { 
                        "group_id": communityId, 
                        "customerId": data['selectuser'][i]
                    };
                    entryData.push(insertData);
                }
            }
            Groupuser.remove({ "group_id": communityId }, (err1, res1) => {
                if (err1) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                }
                Groupuser.create(entryData, (err, res) => {
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

    Groupuser.remoteMethod('addData', {
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

    Groupuser.deleteAll = function(data,cb){
        var response = {};
        var grpId=data['group_id'];
        if(grpId) {  
            Groupuser.remove({ "group_id": grpId }, (err1, res1) => {
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

    Groupuser.remoteMethod('deleteAll', {
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

    Groupuser.deletea = function(data,cb){
        var response = {};
        var grpId=data['group_id'];
        var customerId=data['customerId'];
        if(grpId && customerId) {  
            Groupuser.remove({ "group_id": grpId,"customerId": customerId }, (err1, res1) => {
                if (err1) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                } else {
                    response.type = "success";
                    response.message = 'deleted success';
                    cb(null, response);
                }
            })
        }else{
            response.type = "error";
            response.message = "Plesae give proper data.";
            cb(null, response);
        }
    }

    Groupuser.remoteMethod('deletea', {
        http: {path: '/deletegrpc', verb: 'post'},
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
