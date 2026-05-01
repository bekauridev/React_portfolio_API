import TechStack from "../models/techStackModel.js";
import {
  indexDoc,
  showDoc,
  storeDoc,
  updateDoc,
  destroyDoc,
} from "./crudHandlerFactory.js";

/**
 * @desc    Get all tech stack items
 * @route   GET /api/v1/tech-stack
 * @access  Public
 */
export const indexTechStack = (req, res, next) => {
  req.query.sort = req.query.sort || "order";
  return indexDoc(TechStack)(req, res, next);
};

/**
 * @desc    Get single tech stack item
 * @route   GET /api/v1/tech-stack/:id
 * @access  Public
 */
export const showTechStack = showDoc(TechStack);

/**
 * @desc    Create new tech stack item
 * @route   POST /api/v1/tech-stack
 * @access  Admin
 */
export const storeTechStack = storeDoc(TechStack);

/**
 * @desc    Update tech stack item
 * @route   PATCH /api/v1/tech-stack/:id
 * @access  Admin
 */
export const updateTechStack = updateDoc(TechStack);

/**
 * @desc    Delete tech stack item
 * @route   DELETE /api/v1/tech-stack/:id
 * @access  Admin
 */
export const destroyTechStack = destroyDoc(TechStack);
