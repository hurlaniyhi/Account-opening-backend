const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const crypto = require("crypto")
const multer = require('multer')
const path = require("path")

const GridFsStorage = require("multer-gridfs-storage")
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";



mongoose.set('useFindAndModify', false);
const User = mongoose.model('User')
const router = express.Router()




// const mongoURI = "mongodb://localhost:27017/node-file-upl";
// // mongodb+srv://ridwan:ridwan526@ridwanlock-uqlxu.mongodb.net/test?retryWrites=true&w=majority
// // connection
// // mongodb://localhost:27017/node-file-upl
// const conn = mongoose.createConnection(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

var minisave = []

// let gfs;
// conn.once("open", () => {
//   // init stream
//   gfs = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "uploads"
//   });
// });

// const storage = new GridFsStorage({
//     url: mongoURI,
//     file: (req, file) => {
//         console.log(file)
//         console.log(file.fieldname)
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = buf.toString("hex") + path.extname(file.originalname);
          
//          // minisave.push(buf.toString("hex"))
//           minisave.push(filename)
//           console.log(minisave[minisave.length-1])
          
          
//           const fileInfo = {
//             filename: filename,
//             bucketName: "uploads"

//           };
//           resolve(fileInfo);


//         });
//       });
//     }
//   });
  
//   const upload = multer({
//     storage
//   });

let localsave = {

}

 router.get('/',(req,res)=>{
     res.send("server is good")
 })

  router.post('/email',(req,res)=>{
      console.log(req.body.email)
    User.findOne({email: req.body.email},function(err, doc){
        if(!doc){
            localsave.email = req.body.email

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
      to: req.body.email, 
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
    localsave.BVN = req.body.BVN
    localsave.DOB = req.body.DOB 
    res.send("good")
})

router.post('/verify',(req,res)=>{
    res.send("good")
})

router.post('/info',(req,res)=>{
    localsave.firstName = req.body.firstName
    localsave.middleName = req.body.middleName
    localsave.lastName = req.body.lastName
    console.log(localsave)
    res.send("good")
})

router.post('/address',(req,res)=>{
    localsave.phoneNumber = req.body.phoneNumber
    localsave.address = req.body.address
    localsave.gender = req.body.gender
    console.log(localsave)
    res.send("good")
})



router.post('/complete',(req,res)=>{

    if (req.body.passport && req.body.signature && req.body.idCard){
        localsave.passport = req.body.passport
        localsave.signature = req.body.signature
        localsave.idCard = req.body.idCard
    }
    else if(req.body.passport && req.body.signature){
        localsave.passport = req.body.passport
        localsave.signature = req.body.signature
    }
    else if(req.body.passport && req.body.idCard){
        localsave.passport = req.body.passport
        localsave.idCard = req.body.idCard
    }
    else if(req.body.signature && req.body.idCard){
        localsave.signature = req.body.signature
        localsave.idCard = req.body.idCard
    }
    else if(req.body.passport){
        localsave.passport = req.body.passport
    }
    else if(req.body.signature){
        localsave.signature = req.body.signature
    }
    else if(req.body.idCard){
        localsave.idCard = req.body.idCard
    }
    
     if(localsave.phoneNumber != "" && localsave.address !="" && localsave.gender !="" && localsave.email !="" && localsave.DOB !="" && localsave.firstName !="" && localsave.lastName !="" && localsave.BVN !=""){
        console.log(localsave)
        var accountNumber = String(0 + String(Math.floor(Math.random() * 999999999) + 100000000)); 
        var password = String(Math.floor(Math.random() * 999999) + 100000);  
        
        if(password.length != 6){
            password = password.slice(0,6)
        }
        if(accountNumber.len != 10){
            accountNumber = accountNumber.slice(0,10)
        }
        console.log("Good")

        var user = new User();
        user.accountNumber = accountNumber
        user.password = password
        user.phoneNumber = localsave.phoneNumber
        user.address = localsave.address
        user.gender = localsave.gender
        user.email = localsave.email
        user.BVN = localsave.BVN
        user.DOB = localsave.DOB
        user.firstName = localsave.firstName
        user.middleName = localsave.middleName
        user.lastName = localsave.lastName
        user.passport = localsave.passport
        user.signature = localsave.signature
        user.idCard = localsave.idCard
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

        User.findOne({email: req.body.email},function(err, docs){
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
                     to: docs.email, 
                     subject: 'Account Opening', 
                     text: `Congratulations! ${docs.firstName} your account is now open. Your Account Number is  ${docs.accountNumber} and your password for internet banking is ${docs.password}.`
                   
                   };
                 
               
                   transporter.sendMail(mailOptions, (error,info)=>{
                       
                     if(error){
                         return console.log(error)
                     } 
               
                     console.log("Message sent: %s", info.messageId);
                   
                   
                   })
                   res.json({
                    "comment": "good",
                    "accountNumber": docs.accountNumber,
                    "password": docs.password,
                    "passport": docs.passport,
                    "firstName": docs.firstName,
                    "email": docs.email
         
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
     const upload = multer({storage}).single('file')
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
                localsave.passport = image.secure_url

             }
         )
     }
     )

   
 })

 router.post('/signature',(req,res)=>{
    const upload = multer({storage}).single('file')
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
               localsave.signature = image.secure_url

            }
        )
    }
    )

  
})


router.post('/idCard',(req,res)=>{
    const upload = multer({storage}).single('file')
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
               localsave.idCard = image.secure_url

            }
        )
    }
    )

  
})


 
//  router.post('/signature',(req,res)=>{
//     localsave.signature = req.body.file
//  })

//  router.post('/idCard',(req,res)=>{
//     localsave.idCard = req.body.file
//  })






module.exports = router