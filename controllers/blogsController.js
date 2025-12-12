import Blog from "../models/blogModel.js";
import {
  indexDoc,
  showDoc,
  storeDoc,
  updateDoc,
  destroyDoc,
} from "./crudHandlerFactory.js";

/**
 * @desc    Get all blogs
 * @route   GET /api/v1/blogs
 * @access  Public
 */
export const indexBlogs = indexDoc(Blog);

/**
 * @desc    Get single blog
 * @route   GET /api/v1/blogs/:id
 * @access  Public
 */
export const showBlog = showDoc(Blog);

/**
 * @desc    Create new blog
 * @route   POST /api/v1/blogs
 * @access  Admin
 */
export const storeBlog = storeDoc(Blog);

/**
 * @desc    Update blog
 * @route   PATCH /api/v1/blogs/:id
 * @access  Admin
 */
export const updateBlog = updateDoc(Blog);

/**
 * @desc    Delete blog
 * @route   DELETE /api/v1/blogs/:id
 * @access  Admin
 */
export const destroyBlog = destroyDoc(Blog);
