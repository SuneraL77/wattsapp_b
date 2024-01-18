import createHttpError from 'http-errors';
import logger from '../configs/logger.config.js';
import { searchUsers as  searchUsersService} from '../services/user.service.js';
export const searchUser = async (req,res,next) =>{
try{
    const keyword = req.query.search;
   
    if(!keyword){
        logger.error('Please add a search query frist ')
        throw createHttpError.BadRequest("Opps..Somthing went wrong")
    }
    const users = await searchUsersService(keyword,req.user.userId);
    res.status(200).json(users)

}catch(error){
    next(error)
}
}