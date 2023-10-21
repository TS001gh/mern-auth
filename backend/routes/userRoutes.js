import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
const router = express.Router();

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'frontend/public/uploads');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const fileName = `user-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split('/')[0];

  if (imageType === 'image') {
    return cb(null, true);
  } else {
    return cb(appError.create('file must be an image', 400), false);
  }
};

const upload = multer({
  storage: diskStorage,
  fileFilter,
});

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/avatar', protect, upload.single('image'), uploadAvatar);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
