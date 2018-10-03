'use strict';

module.exports = function(Interestmultiple) {
    Interestmultiple.addData = function(data,cb){
        var response = {};
        var entryData = [];
        var communityId='';
        if(data['selectinterest']) {  
            communityId=data['interest_pid'];  
            for (var i = 0; i < data['selectinterest'].length; i++) {
                if(data['selectinterest'][i] && data['selectinterest'][i]!=''){
                    let insertData = { 
                        "interest_pid": communityId, 
                        "interestId": data['selectinterest'][i]
                    };
                    entryData.push(insertData);
                }
            }
            Interestmultiple.remove({ "interest_pid": communityId }, (err1, res1) => {
                if (err1) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                }
                Interestmultiple.create(entryData, (err, res) => {
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

    Interestmultiple.remoteMethod('addData', {
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

    Interestmultiple.deleteAll = function(data,cb){
        var response = {};
        var grpId=data['interest_pid'];
        if(grpId) {  
            Interestmultiple.remove({ "interest_pid": grpId }, (err1, res1) => {
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

    Interestmultiple.remoteMethod('deleteAll', {
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
