import WorkStatus from "../models/workStatusModel.js";
import {
  showDoc,
  updateDoc,
  destroyDoc,
} from "./crudHandlerFactory.js";

/**
 * @desc    Get current work status
 * @route   GET /api/v1/work-status
 * @access  Public
 */
export const getWorkStatus = async (req, res) => {
  const doc = await WorkStatus.findOne().sort("-updatedAt").lean();

  res.status(200).json({
    status: "success",
    data: doc,
  });
};

/**
 * @desc    Get single work status
 * @route   GET /api/v1/work-status/:id
 * @access  Public
 */
export const showWorkStatus = showDoc(WorkStatus);

/**
 * @desc    Create or replace current work status
 * @route   POST /api/v1/work-status
 * @access  Admin
 */
export const storeWorkStatus = async (req, res) => {
  const doc = await WorkStatus.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });

  res.status(201).json({
    status: "success",
    data: doc,
  });
};

/**
 * @desc    Update work status
 * @route   PATCH /api/v1/work-status/:id
 * @access  Admin
 */
export const updateWorkStatus = updateDoc(WorkStatus);

/**
 * @desc    Delete work status
 * @route   DELETE /api/v1/work-status/:id
 * @access  Admin
 */
export const destroyWorkStatus = destroyDoc(WorkStatus);
