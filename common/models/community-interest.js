'use strict';

module.exports = function(Communityinterest) {
    Communityinterest.addData = function(data,cb){
        var response = {};
        var entryData = [];
        var communityId='';
        if(data['selectinterest']) {  
            communityId=data['community_id'];  
            for (var i = 0; i < data['selectinterest'].length; i++) {
                if(data['selectinterest'][i] && data['selectinterest'][i]!=''){
                    let insertData = { 
                        "community_id": communityId, 
                        "interestId": data['selectinterest'][i]
                    };
                    entryData.push(insertData);
                }
            }
            Communityinterest.remove({ "community_id": communityId }, (err1, res1) => {
                if (err1) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                }
                Communityinterest.create(entryData, (err, res) => {
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

    Communityinterest.remoteMethod('addData', {
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

    Communityinterest.deleteAll = function(data,cb){
        var response = {};
        var grpId=data['community_id'];
        if(grpId) {  
            Communityinterest.remove({ "community_id": grpId }, (err1, res1) => {
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

    Communityinterest.remoteMethod('deleteAll', {
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
