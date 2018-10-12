'use strict';

module.exports = function(Eventuser) {
    Eventuser.addData = function(data,cb){
        var response = {};
        var entryData = [];
        var eventId='';
        if(data['selectuser']) {  
            eventId=data['event_id'];  
            for (var i = 0; i < data['selectuser'].length; i++) {
                if(data['selectuser'][i] && data['selectuser'][i]!=''){
                    let insertData = { 
                        "event_id": eventId, 
                        "customerId": data['selectuser'][i]
                    };
                    entryData.push(insertData);
                }
            }
            Eventuser.remove({ "event_id": eventId }, (err1, res1) => {
                if (err1) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                }
                Eventuser.create(entryData, (err, res) => {
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

    Eventuser.remoteMethod('addData', {
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

    Eventuser.deleteAll = function(data,cb){
        var response = {};
        var grpId=data['event_id'];
        if(grpId) {  
            Eventuser.remove({ "event_id": grpId }, (err1, res1) => {
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

    Eventuser.remoteMethod('deleteAll', {
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

    Eventuser.deletea = function(data,cb){
        var response = {};
        var grpId=data['event_id'];
        var customerId=data['customerId'];
        if(grpId && customerId) {  
            Eventuser.remove({ "event_id": grpId,"customerId": customerId }, (err1, res1) => {
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

    Eventuser.remoteMethod('deletea', {
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
