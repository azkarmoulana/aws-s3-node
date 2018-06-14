const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
var jwt = require('jsonwebtoken');

//IAM User Credentials
const BUCKET_NAME = "bucket name goes here" ;
const IAM_USER_KEY = "IAM user key" ;
const IAM_USER_SECRET = "IAM user secret key" ;

router.post('/upload', function(req, res){
    
    const file = req.files.image;

    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME,
        signatureVersion: 'v4'
      },);

      s3bucket.createBucket(function () {
        var params = {
          Bucket: BUCKET_NAME,
          Key: file.name,
          Body: file.data
        };
        s3bucket.upload(params, function (err, data) {
          if (err) {
            console.log(err);
            
          }else{
            console.log(data);
            
            
          }

          var URLparams = {
                  Bucket: BUCKET_NAME,
                  Key: file.name,
                  //ContentType: 'image/jpg'
              };
  
              s3bucket.getSignedUrl('getObject', URLparams, function(err, signedURL){
                  if(err){
                      console.log(err);
                      return next(err);
                  }else{


                        const data = {
                            // tenantName: 'ABC',
                            // tenantID: 'd7yS7ywGtsuLPs5wHaEs4H',
                            imageUrl: signedURL
                        }

                    jwt.sign({data}, 'secretkey', function(err, token){
                        // res.send(token);

                        res.send({
                            status:'200',
                            description:'success',
                            token: token
                            });
                       
                    });

                   


                      
                      
                  }
              });
          

        });
    });  


    
});


module.exports = router;