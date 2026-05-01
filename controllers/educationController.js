import Education from "../models/educationModel.js";
import {
  indexDoc,
  showDoc,
  storeDoc,
  updateDoc,
  destroyDoc,
} from "./crudHandlerFactory.js";

/**
 * @desc    Get all education items
 * @route   GET /api/v1/education
 * @access  Public
 */
export const indexEducation = (req, res, next) => {
  req.query.sort = req.query.sort || "order";
  return indexDoc(Education)(req, res, next);
};

/**
 * @desc    Get single education item
 * @route   GET /api/v1/education/:id
 * @access  Public
 */
export const showEducation = showDoc(Education);

/**
 * @desc    Create new education item
 * @route   POST /api/v1/education
 * @access  Admin
 */
export const storeEducation = storeDoc(Education);

/**
 * @desc    Update education item
 * @route   PATCH /api/v1/education/:id
 * @access  Admin
 */
export const updateEducation = updateDoc(Education);

/**
 * @desc    Delete education item
 * @route   DELETE /api/v1/education/:id
 * @access  Admin
 */
export const destroyEducation = destroyDoc(Education);
