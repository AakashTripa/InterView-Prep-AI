import express from 'express';
import { getUserProfile, loginUser, registerUser} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',protect,getUserProfile);

router.post('/upload-image',upload.single('image'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"});
    }
const imageUrl=`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(200).json({message:"File uploaded successfully",imageUrl:imageUrl});
})

export default router;