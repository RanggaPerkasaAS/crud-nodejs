const {
    serviceAddUser,
    serviceGetUsers,
    serviceGetUsersById,
    serviceUpdateUser,
    serviceDeleteUser,
    serviceGetUserByEmail} = require("./user.service")

    const {genSaltSync, hashSync, compareSync, hash, compare} = require('bcrypt');
    const {sign} = require("jsonwebtoken");


    module.exports = {
        controllerAddUser: (req, res)=>{
            const body = req.body;
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            serviceAddUser(body, (err, results)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                })
            })
        },
        controllerGetUserById: (req, res)=>{
            const id = req.params.id;
            serviceGetUsersById(id,(err,results)=>{
                if(err){
                    console.log(err)
                    return
                }
                if(!results){
                    return res.json({
                        success:0,
                        message: "record not found"
                    })
                }else{
                    return res.json({
                        success: 1,
                        data: results
                    })
                }
            })
        },
        controllerGetUsers: (req, res)=>{
            serviceUpdateUser((err, results)=>{
                if(err){
                    console.log(err)
                    return
                }else{
                    return res.json({
                        success:1,
                        data: results
                    })
                }
            })
        },
        controllerUpdateUser: (req, res)=>{
            const body = req.body
            const salt = genSaltSync(10)
            body.password = hashSync(body.password, salt)
            serviceUpdateUser(body, (err, results)=>{
                if(err){
                    console.log(err)
                    return
                }
                if(!results){
                    return res.json({
                        success: 0,
                        message: "update filed"
                    })
                }
                else{
                    return res.json({
                        success: 1,
                        message: "update succesfully"
                    })
                }
            })
        },
        controllerDeleteUser: (req, res)=>{
            constdata = req.body
            serviceDeleteUser(data, (err, results)=>{
                if(err){
                    console.log(err)
                    return
                }
                if(!results){
                    return res.json({
                        success: 0,
                        message: "record not found"
                    })
                }else{
                    return res.json({
                        success: 1,
                        message: "user delete succesfuly"
                    })
                }
            })
        },
        controllerLogin: (req, res)=>{
            const body = req.body
            serviceGetUserByEmail(body.email,(err,results)=>{
                if(err){
                    console.log(err)
                }
                if(!results){
                    return res.json({
                        success: 0,
                        message:"Invalid email or password"
                    })
                }
                const result = compareSync(body.password, results.password)

                if(result){
                    results.password = undefined
                    const jsonwebtoken = sign({result:results}, "secretkey",{
                        expiresIn: "1h"
                    })
                    return res.json({
                        success: 1, 
                        message: "login succesfuly, your account already use!",
                        account: results,
                        token: jsonwebtoken
                    })
                }else{
                    return res.json({
                        success: 0,
                        message: "email or password invalid",
                    })
                }
            })
        }
    }