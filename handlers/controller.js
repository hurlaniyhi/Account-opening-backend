const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const crypto = require("crypto")
const multer = require('multer')
const path = require("path")

const GridFsStorage = require("multer-gridfs-storage")
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";




const Account = mongoose.model('Account')
const router = express.Router()


var minisave = []

let localsave = {

}

 router.get('/email',(req,res)=>{
     res.send("server is good")
 })

  router.post('/email',(req,res)=>{
      console.log(req.body.Email)
    Account.findOne({Email: req.body.Email},function(err, doc){
        if(!doc){
            localsave.Email = req.body.Email

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


//   router.post("/upload", upload.single("passport"),(req,res)=>{
//     res.redirect('/')
// })

router.post('/bvn',(req,res)=>{
    localsave.Bvn = req.body.Bvn
    localsave.Dob = req.body.Dob 
    res.send("good")
})

router.post('/verify',(req,res)=>{
    res.send("good")
})

router.post('/info',(req,res)=>{
    localsave.FirstName = req.body.FirstName
    localsave.MiddleName = req.body.MiddleName
    localsave.LastName = req.body.LastName
    console.log(localsave)
    res.send("good")
})

router.post('/address',(req,res)=>{
    localsave.PhoneNumber = req.body.PhoneNumber
    localsave.Address = req.body.Address
    localsave.Gender = req.body.Gender
    console.log(localsave)
    res.send("good")
})



router.post('/complete',(req,res)=>{

    if (req.body.Passport && req.body.Signature && req.body.IdCard){
        localsave.Passport = req.body.Passport
        localsave.Signature = req.body.Signature
        localsave.IdCard = req.body.IdCard
    }
    else if(req.body.Passport && req.body.Signature){
        localsave.Passport = req.body.Passport
        localsave.Signature = req.body.Signature
    }
    else if(req.body.Passport && req.body.IdCard){
        localsave.Passport = req.body.Passport
        localsave.IdCard = req.body.IdCard
    }
    else if(req.body.Signature && req.body.IdCard){
        localsave.Signature = req.body.Signature
        localsave.IdCard = req.body.IdCard
    }
    else if(req.body.Passport){
        localsave.Passport = req.body.Passport
    }
    else if(req.body.Signature){
        localsave.Signature = req.body.Signature
    }
    else if(req.body.IdCard){
        localsave.IdCard = req.body.IdCard
    }
    
     if(localsave.PhoneNumber != "" && localsave.Address !="" && localsave.Gender !="" && localsave.Email !="" && localsave.Dob !="" && localsave.FirstName !="" && localsave.LastName !="" && localsave.Bvn !=""){
        console.log(localsave)
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
        user.PhoneNumber = localsave.PhoneNumber
        user.Address = localsave.Address
        user.Gender = localsave.Gender
        user.Email = localsave.Email
        user.Bvn = localsave.Bvn
        user.Dob = localsave.Dob
        user.FirstName = localsave.FirstName
        user.MiddleName = localsave.MiddleName
        user.LastName = localsave.LastName
        user.Passport = localsave.Passport
        user.Signature = localsave.Signature
        user.IdCard = localsave.IdCard
        user.save((err, doc)=>{
            if (!err){
              
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
                localsave.Passport = image.secure_url

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
               localsave.Signature = image.secure_url

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
               localsave.IdCard = image.secure_url

            }
        )
    }
    )

  
})


 



module.exports = router