'use strict';

module.exports = function(Customerinterest) {

    Customerinterest.addData = function(data,cb){
        var response = {};
        var entryData = [];
        var userId='';
        if(data['interested']) {    
            for (var i = 0; i < data['interested'].length; i++) {
                if(data['interested'][i].interest_text && data['interested'][i].interest_text!=''){
                    userId = data['interested'][i].user_id;
                    let insertData = { 
                        "user_id": data['interested'][i].user_id, 
                        "interestId": data['interested'][i].interestId, 
                        "interest_text": data['interested'][i].interest_text, 
                        "customerId": data['interested'][i].user_id
                    };
                    entryData.push(insertData);
                }
                
            }
            Customerinterest.remove({ "user_id": userId }, (err1, res1) => {
                if (err1) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                }
                Customerinterest.create(entryData, (err, res) => {
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

    Customerinterest.remoteMethod('addData', {
        http: {path: '/insertInterest', verb: 'post'},
        accepts: [
        {
            arg: 'data',
            type: 'object',
            http: { source: 'body' }  
        }
        ],
        returns: {arg: 'interest', type: 'object'}
    });

    Customerinterest.deleteAll = function(data,cb){
        var response = {};
        var grpId=data['user_id'];
        if(grpId) {  
            Customerinterest.remove({ "user_id": grpId }, (err1, res1) => {
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

    Customerinterest.remoteMethod('deleteAll', {
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

    Customerinterest.addNewData = function(data,cb){
        var response = {};
        var entryData = [];
        var userId='';
        if(data['interested']) {    
            for (var i = 0; i < data['interested'].length; i++) {
                if(data['interested'][i].interest_text && data['interested'][i].interest_text!=''){
                    userId = data['interested'][i].user_id;
                    let insertData = { 
                        "user_id": data['interested'][i].user_id, 
                        "interestId": data['interested'][i].interestId, 
                        "interest_text": data['interested'][i].interest_text, 
                        "customerId": data['interested'][i].user_id
                    };
                    entryData.push(insertData);
                }
                
            }
            Customerinterest.create(entryData, (err, res) => {
                if (err) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                }
                response.type = "success";
                response.message = "success";
                cb(null, response);
            });
        }else{
            response.type = "error";
            response.message = "Plesae give proper data.";
            cb(null, response);
        }
    }

    Customerinterest.remoteMethod('addNewData', {
        http: {path: '/insertInterestNoDelPre', verb: 'post'},
        accepts: [
        {
            arg: 'data',
            type: 'object',
            http: { source: 'body' }  
        }
        ],
        returns: {arg: 'interest', type: 'object'}
    });
};
