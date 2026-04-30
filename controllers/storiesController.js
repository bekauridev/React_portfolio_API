import Story from "../models/storyModel.js";
import {
  indexDoc,
  showDoc,
  storeDoc,
  updateDoc,
  destroyDoc,
} from "./crudHandlerFactory.js";

/**
 * @desc    Get all stories
 * @route   GET /api/v1/stories
 * @access  Public
 */
export const indexStories = indexDoc(Story);

/**
 * @desc    Get single story
 * @route   GET /api/v1/stories/:id
 * @access  Public
 */
export const showStory = showDoc(Story);

/**
 * @desc    Create new story
 * @route   POST /api/v1/stories
 * @access  Admin
 */
export const storeStory = storeDoc(Story);

/**
 * @desc    Update story
 * @route   PATCH /api/v1/stories/:id
 * @access  Admin
 */
export const updateStory = updateDoc(Story);

/**
 * @desc    Delete story
 * @route   DELETE /api/v1/stories/:id
 * @access  Admin
 */
export const destroyStory = destroyDoc(Story);
