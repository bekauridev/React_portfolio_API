import Goodie from "../models/goodieModel.js";
import {
  indexDoc,
  showDoc,
  storeDoc,
  updateDoc,
  destroyDoc,
} from "./crudHandlerFactory.js";

/**
 * @desc    Get all goodies
 * @route   GET /api/v1/goodies
 * @access  Public
 */
export const indexGoodies = indexDoc(Goodie);

/**
 * @desc    Get single goodie
 * @route   GET /api/v1/goodies/:id
 * @access  Public
 */
export const showGoodie = showDoc(Goodie);

/**
 * @desc    Create new goodie
 * @route   POST /api/v1/goodies
 * @access  Admin
 */
export const storeGoodie = storeDoc(Goodie);

/**
 * @desc    Update goodie
 * @route   PATCH /api/v1/goodies/:id
 * @access  Admin
 */
export const updateGoodie = updateDoc(Goodie);

/**
 * @desc    Delete goodie
 * @route   DELETE /api/v1/goodies/:id
 * @access  Admin
 */
export const destroyGoodie = destroyDoc(Goodie);
