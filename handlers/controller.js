const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
// const crypto = require("crypto")
const multer = require('multer')
const path = require("path")


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";




const Account = mongoose.model('Account')
const router = express.Router()




 router.get('/email',(req,res)=>{
     res.send("server is good")
 })

  router.post('/email',(req,res)=>{
      console.log(req.body.Email)
    Account.findOne({Email: req.body.Email},function(err, doc){
        if(!doc){
            

    var generate = String(Math.floor(Math.random() * 999999) + 100000);
    if (generate != 6){
        generate = generate.slice(0,6)
    }  
          
            
    let transporter = nodemailer.createTransport({
     
     service: 'gmail',
      auth: {
        user: 'olaniyi.jibola152@gmail.com',
        pass: 'ridwan526'
      },

    });
  
    
    let mailOptions = {
      from: 'fintech.request@gmail.com', 
      to: req.body.Email, 
      subject: 'Account Opening Verification Code', 
      text: `Your verification code is ${String(generate)}.`
    
    };
  

    transporter.sendMail(mailOptions, (error,info)=>{
        
      if(error){
          return console.log(error)
      } 

      console.log("Message sent: %s", info.messageId);

      
      res.json({
        "comment": "good",
        "code": generate
    })
    
    })
    
            console.log(generate)

          
        }
        else{
            res.json({
                "comment": "Email already exist"
            })
        }
    })
      
  })






router.post('/complete',(req,res)=>{

    
     if(req.body.PhoneNumber != "" && req.body.Address !="" && req.body.Gender !="" && req.body.Email !="" && req.body.Dob !="" && req.body.FirstName !="" && req.body.LastName !="" && req.body.Bvn !=""){
        
        var accountNumber = String(0 + String(Math.floor(Math.random() * 999999999) + 100000000)); 
        var password = String(Math.floor(Math.random() * 999999) + 100000);  
        
        if(password.length != 6){
            password = password.slice(0,6)
        }
        if(accountNumber.length != 10){
            accountNumber = accountNumber.slice(0,10)
        }
        console.log("Good")

        var user = new Account();
        user.AccountNumber = accountNumber
        user.Password = password
        user.PhoneNumber = req.body.PhoneNumber
        user.Address = req.body.Address
        user.Gender = req.body.Gender
        user.Email = req.body.Email
        user.Bvn = req.body.Bvn
        user.Dob = req.body.Dob
        user.FirstName = req.body.FirstName
        user.MiddleName = req.body.MiddleName
        user.LastName = req.body.LastName
        user.Passport = req.body.Passport
        user.Signature = req.body.Signature
        user.IdCard = req.body.IdCard
        user.save((err, doc)=>{
            if (!err){
             console.log(doc) 
             res.send("good")
            
            }
            else{
                res.send("server is down")
                console.log("error occur during insertion")
            }
        })
    }
    else{
        res.send("Please fill the necessary information")
    }
}) 
        
     router.post('/congrat',(req,res)=>{

        Account.findOne({Email: req.body.Email},function(err, docs){
            if(docs){
                console.log(docs)
               let transporter = nodemailer.createTransport({
                    
                    service: 'gmail',
                     auth: {
                       user: 'olaniyi.jibola152@gmail.com',
                       pass: 'ridwan526'
                     }, 
        
                   });
                 
                   
                   let mailOptions = {
                     from: 'fintech.request@gmail.com', 
                     to: docs.Email, 
                     subject: 'Account Opening', 
                     text: `Congratulations! ${docs.FirstName} your account is now open. Your Account Number is  ${docs.AccountNumber} and your password for internet banking is ${docs.Password}.`
                   
                   };
                 
               
                   transporter.sendMail(mailOptions, (error,info)=>{
                       
                     if(error){
                         return console.log(error)
                     } 
               
                     console.log("Message sent: %s", info.messageId);
                   
                   
                   })
                   res.json({
                    "comment": "good",
                    "accountNumber": docs.AccountNumber,
                    "password": docs.Password,
                    "passport": docs.Passport,
                    "firstName": docs.FirstName,
                    "email": docs.Email
         
                })
                }
            else{
                console.log("document is not found")
            }

     })  
    })  

    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, 'uploads/')
        },
        filename: function(req, file, cb){
            console.log(file)
            cb(null, file.originalname)
        }
    })   
    
 router.post('/passport',(req,res)=>{
     const upload = multer({storage}).single('File')
     upload(req, res, function(err){
         if(err){
             return res.send(err)
         }
         console.log("file uploaded to server")
         console.log(req.file)
         

         const cloudinary = require('cloudinary').v2
         cloudinary.config({
             cloud_name: 'dcx4utzdx',
             api_key: '226791946435464',
             api_secret: 'yzsp3pOrvIEzFAhfMfWEIWXQmmA'
         })
         console.log("welcome to cloudinary")
         const path = req.file.path
         const uniqueFilename = new Date().toISOString()

         cloudinary.uploader.upload(
             path,
             {
                 public_id: `blog/${uniqueFilename}`, tags: `blog`
             },
             function(err, image){
                 if(err) return console.log(err)
                 console.log("file uploaded to cloudinary")

                 const fs = require('fs')
                 fs.unlinkSync(path)
                 console.log(image)

               res.send(image.secure_url)

             }
         )
     }
     )

   
 })

 router.post('/signature',(req,res)=>{
    const upload = multer({storage}).single('File')
    upload(req, res, function(err){
        if(err){
            return res.send(err)
        }
        console.log("file uploaded to server")
        console.log(req.file)
        

        const cloudinary = require('cloudinary').v2
        cloudinary.config({
            cloud_name: 'dcx4utzdx',
            api_key: '226791946435464',
            api_secret: 'yzsp3pOrvIEzFAhfMfWEIWXQmmA'
        })
        console.log("welcome to cloudinary")
        const path = req.file.path
        const uniqueFilename = new Date().toISOString()

        cloudinary.uploader.upload(
            path,
            {
                public_id: `blog/${uniqueFilename}`, tags: `blog`
            },
            function(err, image){
                if(err) return console.log(err)
                console.log("file uploaded to cloudinary")

                const fs = require('fs')
                fs.unlinkSync(path)
                console.log(image)
               res.send(image.secure_url)

            }
        )
    }
    )

  
})


router.post('/idCard',(req,res)=>{
    const upload = multer({storage}).single('File')
    upload(req, res, function(err){
        if(err){
            return res.send(err)
        }
        console.log("file uploaded to server")
        console.log(req.file)
        

        const cloudinary = require('cloudinary').v2
        cloudinary.config({
            cloud_name: 'dcx4utzdx',
            api_key: '226791946435464',
            api_secret: 'yzsp3pOrvIEzFAhfMfWEIWXQmmA'
        })
        console.log("welcome to cloudinary")
        const path = req.file.path
        const uniqueFilename = new Date().toISOString()

        cloudinary.uploader.upload(
            path,
            {
                public_id: `blog/${uniqueFilename}`, tags: `blog`
            },
            function(err, image){
                if(err) return console.log(err)
                console.log("file uploaded to cloudinary")

                const fs = require('fs')
                fs.unlinkSync(path)
                console.log(image)
               res.send(image.secure_url)

            }
        )
    }
    )

  
})


 



module.exports = router