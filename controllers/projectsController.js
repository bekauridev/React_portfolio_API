import Project from "../models/projectModel.js";
import {
  indexDoc,
  showDoc,
  storeDoc,
  updateDoc,
  destroyDoc,
} from "./crudHandlerFactory.js";

/**
 * @desc    Get all projects
 * @route   GET /api/v1/projects
 * @access  Public
 */
export const indexProjects = indexDoc(Project);

/**
 * @desc    Get single project
 * @route   GET /api/v1/projects/:id
 * @access  Public
 */
export const showProject = showDoc(Project);

/**
 * @desc    Create new project
 * @route   POST /api/v1/projects
 * @access  Admin
 */
export const storeProject = storeDoc(Project);

/**
 * @desc    Update project
 * @route   PATCH /api/v1/projects/:id
 * @access  Admin
 */
export const updateProject = updateDoc(Project);

/**
 * @desc    Delete project
 * @route   DELETE /api/v1/projects/:id
 * @access  Admin
 */
export const destroyProject = destroyDoc(Project);
