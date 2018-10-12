'use strict';

module.exports = function(Events) {

    Events.uploadFile = function (ctx,options,cb) {
        if(!options) options = {};
        ctx.req.params.container = 'event';
        //console.log(ctx);
        Events.app.models.container.upload(ctx.req,ctx.result,options,function (err,fileObj) {
            if(err) {
                cb(err);
            } else {
                var fileInfo = fileObj.files.photo[0];
                var uploadId = fileObj.fields.upload_id[0];
                let updateCustData = {id:uploadId, image:fileInfo.name};
                Events.upsert(updateCustData, function (err, res) {
                    if(err){
                        cb(err);
                    }else{
                        cb(null, res);
                    }
                });
            }
        });
    };

    Events.remoteMethod('uploadFile', {
        http: {path: '/uploadimg/:id', verb: 'post'},
        accepts: [
            { arg: 'ctx', type: 'object', http: { source:'context' } },
            { arg: 'options', type: 'object', http:{ source: 'query'} }
        ],
        returns: {arg: 'fileObject', type: 'object', root: true}
    });
};
