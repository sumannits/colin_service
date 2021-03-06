'use strict';
var loopbackPassport = require('loopback-component-passport');
var CONTAINERS_URL = '/api/containers/';
module.exports = function(Customer) {
  Customer.editCustomer = function(id,customer,cb){
    customer.id = id;
    Customer.upsert( customer, function (err, res) {
        if(err){
          cb(err);
        }else{
          cb(null, res);
        }

    });
  }
  Customer.remoteMethod('editCustomer', {
          http: {path: '/editCustomer/:id', verb: 'put'},
           accepts: [
            {arg: 'id', type: 'number',required:true},
            {
              arg: 'customer',
              type: 'object',
              http:{source:'body'}
            }
          ],
            returns: {arg: 'customer', type: 'object'}
    });

    Customer.signup = function(customer,cb){
      var to = customer.email;
      var subject = 'Successfully Registered';
      var text = 'text';
      var html = 'Hi,<br>Your account has been successfully registered with us<br><br>Regards,<br>Ahoy! Team';
      Customer.upsert( customer, function (err, res) {
        Customer.sendEmail(to,subject,text,html,function(cb){
            console.log(cb.success);
        });
          cb(null, res);
      });
    }
    Customer.remoteMethod('signup', {
            http: {path: '/signup', verb: 'post', status: 200},
             accepts: [
              {
                arg: 'customer',
                type: 'object',
                http:{source:'body'}
              }
            ],
              returns: {arg: 'customer', type: 'object'}
      });


      Customer.emailChecking = function(customer,cb){
        console.log(customer);
        Customer.findOne({where: {email: customer.email}}, function(err, res) {
            if(res){
              cb(null,{"message":"Email exist"});
              // Customer.sendEmail(to,subject,text,html,function(cbb){
              //     if(cbb.success){
              //       cb(null,{"otp":otp,"message":"Successfully sent"});
              //     }else{
              //       cb(err);
              //     }
              // });
            }else{
              cb(null,{"message":"Email does not exist"});
            }
        });
      }
      Customer.remoteMethod('emailChecking', {
          http: {path: '/emailChecking', verb: 'post'},
           accepts: [
            {
              arg: 'customer',
              type: 'object',
              http:{source:'body'}
            }
          ],
            returns: {arg: 'response', type: 'object'}
        });

  Customer.sendEmail = function(to,subject,text,html,cb) {
    Customer.app.models.EmailSend.send({
      to: to,
      from: 'mail@natitsolved.com',
      subject: subject,
      text: text,
      html: html
    }, function(err, mail) {
      console.log('email sent!');
      //cb(err);
      if(!err){
        cb({"success":true})
      }else{
        cb({"success":false});
      }

    });
  }

  Customer.remoteMethod('sendEmail', {
          http: {path: '/sendEmail', verb: 'get'},
           returns: {arg: 'customer', type: 'object'}
    });

    Customer.approveChecking = function(customer,cb){
      Customer.findOne({where: {email: customer.email}}, function(err, res) {
          if(res){
            cb(null,res);
          }else{
            cb({"message":"Email does not exist"});
          }
      });
    }

    Customer.remoteMethod('approveChecking', {
      http: {path: '/approveChecking', verb: 'post'},
       accepts: [
        {
          arg: 'customer',
          type: 'object',
          http:{source:'body'}
        }
      ],
        returns: {arg: 'response', type: 'object'}
    });

Customer.on('resetPasswordRequest', function (info) {
  console.log(info.email); // the email of the requested user
  console.log(info.accessToken.id); // the temp access token to allow password reset

  var to = info.email;
  var acces_token = info.accessToken.id;
  var subject = 'OTP for reset password';
  var text = 'text';
  var otp = Math.floor(1000 + Math.random() * 9000);
  var html = 'Hi,<br>OTP : '+otp+'<br><br>Regards,<br>Krew Team';
  var temp = {
    otp: otp,
    email: to,
    access_token: acces_token
  }
  Customer.app.models.UserTemp.upsert( temp, function (err, res) {
    Customer.sendEmail(to,subject,text,html,function(cb){
        console.log(cb.success);
    });
  });
});

Customer.otpChecking = function(user,cb){
  console.log(user);
  Customer.app.models.UserTemp.findOne({where: {otp: user.otp}}, function(err, res) {
      if(res){
        console.log(res);
        Customer.app.models.UserTemp.destroyAll({where: {otp: user.otp}}, function(err, res) {

        })
        cb(null,{"message":"OTP exist","access_token":res.access_token});
      }else{
        cb({"message":"Wrong OTP"});
      }
  });
}
Customer.remoteMethod('otpChecking', {
    http: {path: '/otpChecking', verb: 'post'},
     accepts: [
      {
        arg: 'user',
        type: 'object',
        http:{source:'body'}
      }
    ],
      returns: {arg: 'response', type: 'object'}
  });

  Customer.socialLogin = function(customer,cb){

    //console.log(customer);
    var profileDetails = JSON.parse(customer.profile);
    var provider = customer.provider;
    var authSchema = 'oAuth 2.0';

    // oneTimeCode from android
    //var oneTimeCode = req.body.oneTimeCode;

    // Make a request to google api
    // to exchange refreshToken and accessToken with using google apis
    var accessToken = customer.credentials.token;
    //var refreshToken = 'FROM GOOGLE API';

    // external id is your google or facebook user id
    var externalId = customer.credentials.userId;
    var email = profileDetails.email;

    var credentials = {};
    credentials.externalId = externalId;
    credentials.accessToken = accessToken;

    var profile = {};
    profile.id = externalId;
    profile.emails = [{type:'account', value: email}];

    //console.log(credentials)
    //console.log(profile)
    Customer.app.models.UserIdentity.login(
      provider, authSchema, profile, credentials ,
      {autoLogin:true}, function(err, loopbackUser, identity, token){
             if(err){
              console.log('a',err)
             }else{
               console.log('b',token)
             }
             // token is access token for thig login
             //return res.send(token);
    });
    cb(null,customer)
  }
  Customer.remoteMethod('socialLogin', {
          http: {path: '/socialLogin', verb: 'post'},
           accepts: [
            {
              arg: 'customer',
              type: 'object',
              http:{source:'body'}
            }
          ],
            returns: {arg: 'customer', type: 'object'}
    });


    Customer.socialLoginEmailCheck = function(customer,cb){

      Customer.findOne({where: {email: customer.email}}, function(err, res) {

          if(res){
            if(res.social_type == 'facebook' || res.social_type == 'google'){
              cb(null,{"exist":2});
            }else{
              cb(null,{"exist":1});
            }

          }else{
            cb(null,{"exist":0});
          }
      });
      //cb(null,customer);

    }
    Customer.remoteMethod('socialLoginEmailCheck', {
          http: {path: '/socialLoginEmailCheck', verb: 'post'},
            accepts: [
            {
              arg: 'customer',
              type: 'object',
              http:{source:'body'}
            }
          ],
            returns: {arg: 'response', type: 'object'}
    });

    Customer.uploadFile = function (ctx,options,cb) {
    //Customer.uploadFile = function (id,customer,cb) {  
        if(!options) options = {};
        ctx.req.params.container = 'users';
        //console.log(ctx);
        Customer.app.models.container.upload(ctx.req,ctx.result,options,function (err,fileObj) {
            if(err) {
                cb(err);
            } else {
                //var fileInfo = fileObj.files.file[0];
                var fileInfo = fileObj.files.photo[0];
                var userId = fileObj.fields.user_id[0];
                let updateCustData = {id:userId, image:fileInfo.name};
                Customer.upsert(updateCustData, function (err, res) {
                    if(err){
                      cb(err);
                    }else{
                      cb(null, res);
                    }

                });
            }
        });
    };

    Customer.remoteMethod('uploadFile', {
        http: {path: '/uploadprfimg/:id', verb: 'post'},
        // accepts: [
        //   {arg: 'id', type: 'number',required:true},
        //   {arg: 'customer',type: 'object', http:{source:'body'}}
        // ],
        accepts: [
            { arg: 'ctx', type: 'object', http: { source:'context' } },
            { arg: 'options', type: 'object', http:{ source: 'query'} }
        ],
        returns: {arg: 'fileObject', type: 'object', root: true}
    });

};
