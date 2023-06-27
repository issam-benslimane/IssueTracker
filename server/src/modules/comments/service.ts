import db from "../../db";
import {
  TCommentWhere,
  TCommentWhereUnique,
  TCommentCreate,
  TCommentUpdate,
} from "./types";

const getComments = async (where: TCommentWhere) => {
  const comments = await db.comment.findMany();
  return comments;
};

const createcomment = async (props: TCommentCreate) => {
  const comment = await db.comment.create({ data: props });
  return comment;
};

const updatecomment = async (
  where: TCommentWhereUnique,
  props: TCommentUpdate
) => {
  const comment = await db.comment.update({ where, data: props });
  return comment;
};

const deletecomment = async (where: TCommentWhereUnique) => {
  await db.comment.delete({ where });
};

export const commentsService = {
  getComments,
  createcomment,
  updatecomment,
  deletecomment,
};
