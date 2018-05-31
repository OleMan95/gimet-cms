import express from "express";
import Experts from "../controllers/experts";

const router = express.Router();
const experts = new Experts();

router.get('/experts', experts.find);
router.get('/experts/:id', experts.findById);
router.post('/experts', experts.createOrUpdate);
router.put('/experts/:id', experts.createOrUpdate);
// router.delete('/expert/:id', experts.delete);

export default router;