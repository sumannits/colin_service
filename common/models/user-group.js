'use strict';
var CONTAINERS_URL = '/api/containers/';
module.exports = function(Usergroup) {
    Usergroup.allData = function(filter,cb){
        var response = {};
        if(filter != undefined){
            var jsonFilter = JSON.parse(filter);
            Usergroup.find(jsonFilter, function(err, data) { 
                if (err) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                }else{
                    response.type = "success";
                    cb(null, data);
                }
            });
        }else{
            Usergroup.find(function(err, data) { 
                if (err) {
                    response.type = "error";
                    response.message = err;
                    cb(null, response);
                }else{
                    response.type = "success";
                    cb(null, data);
                }
            });
        }
    }

    Usergroup.remoteMethod('allData', {
        http: {path: '/getallData', verb: 'get'},
        accepts: [
            {
                arg: 'filter',
                type: 'string'
            }
        ],
        returns: {arg: 'response', type: 'object'}
    });

    Usergroup.uploadFile = function (ctx,options,cb) {
        if(!options) options = {};
        ctx.req.params.container = 'group';
        //console.log(ctx);
        Usergroup.app.models.container.upload(ctx.req,ctx.result,options,function (err,fileObj) {
            if(err) {
                cb(err);
            } else {
                var fileInfo = fileObj.files.photo[0];
                var uploadId = fileObj.fields.upload_id[0];
                let updateCustData = {id:uploadId, image:fileInfo.name};
                Usergroup.upsert(updateCustData, function (err, res) {
                    if(err){
                        cb(err);
                    }else{
                        cb(null, res);
                    }
                });
            }
        });
    };
    
    Usergroup.remoteMethod('uploadFile', {
        http: {path: '/uploadimg/:id', verb: 'post'},
        accepts: [
            { arg: 'ctx', type: 'object', http: { source:'context' } },
            { arg: 'options', type: 'object', http:{ source: 'query'} }
        ],
        returns: {arg: 'fileObject', type: 'object', root: true}
    });
};
