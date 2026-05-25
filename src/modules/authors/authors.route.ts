import express from "express"
import { createAuthorValidation, updateAuthorValidation } from './authors.validator';
import { Createauthor, GetAllauthor, GetAuthorByID, DeleteAuthors, UpdateAuthors } from "./authors.controller";
const router = express.Router();

router.post("/", createAuthorValidation, Createauthor);
router.get("/", GetAllauthor);
router.get("/:id", GetAuthorByID);
router.put("/:id", updateAuthorValidation, UpdateAuthors);
router.delete("/:id", DeleteAuthors);
export default router