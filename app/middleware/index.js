import db from '../database/models';
import helpers from '../helpers';

const UserMiddleware = {

    async getUser(req, res, next) {
      const user = await db.User.findOne({ where: { email: req.body.email }, raw: true });
      user
      ? res.status(409).send({status:409, message:'user with email already exists'})
      :next();
    },

    async checkUserExist(req, res, next) {
      const user = await db.User.findOne({ where: { email: req.body.email }, raw: true });
      const password = user && helpers.comparePassword(req.body.password, user.password);
    if(!password){
      return res.status(409).send({status:409, message:'invalid login details'}); 
    }else{
      delete user.password;
      req.user = user;
      return next()
    }
  }
}

export default UserMiddleware;