'use strict';

module.exports = function(Communityuser) {
    Communityuser.addData = function(data,cb){
        var response = {};
        var entryData = [];
        var communityId='';
        if(data['selectuser']) {  
            communityId=data['community_id'];  
            for (var i = 0; i < data['selectuser'].length; i++) {
                if(data['selectuser'][i] && data['selectuser'][i]!=''){
                    let insertData = { 
                        "community_id": communityId, 
                        "customerId": data['selectuser'][i]
                    };
                    entryData.push(insertData);
                }
            }
            Communityuser.remove({ "community_id": communityId }, (err1, res1) => {
                if (err1) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                }
                Communityuser.create(entryData, (err, res) => {
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

    Communityuser.remoteMethod('addData', {
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

    Communityuser.deleteAll = function(data,cb){
        var response = {};
        var grpId=data['community_id'];
        if(grpId) {  
            Communityuser.remove({ "community_id": grpId }, (err1, res1) => {
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

    Communityuser.remoteMethod('deleteAll', {
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
