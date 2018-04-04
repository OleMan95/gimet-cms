import express from "express";
import Users from "../controllers/users";

const router = express.Router();
const users = new Users();

router.get('/users', users.find);
router.get('/user', users.findOne);
router.post('/auth/signin', users.signin);
router.post('/auth/signup', users.signup);
router.put('/user', users.update);
router.delete('/user', users.deleteOne);

export default router;

