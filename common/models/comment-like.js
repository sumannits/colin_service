'use strict';

module.exports = function(Commentlike) {
    Commentlike.deleteAll = function(data,cb){
        var response = {};
        var commentId=data['commentId'];
        var customerId=data['customerId'];
        if(grpId) {  
            Commentlike.remove({ "commentId": commentId, "customerId": customerId}, (err1, res1) => {
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

    Commentlike.remoteMethod('deleteAll', {
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
