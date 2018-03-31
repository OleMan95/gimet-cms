import express from "express";
import Users from "../controllers/users";

const router = express.Router();
const users = new Users();

router.post('/users', users.find);
router.get('/user', users.findOne);
router.post('/auth/signin', users.signin);

export default router;

