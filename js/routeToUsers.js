let express = require('express');



let userRouter = express.Router();

const userModel = require('./modelOfUsers.js');

userRouter.get('/all',userModel.getAll);
userRouter.post('/removeUser',userModel.removeUser); 
userRouter.post('/registerUser',userModel.registerUser);


module.exports = userRouter;
