import ErrorResponse from "../utils/ErrorResponse.js";
import ApiFeatures from "../utils/apiFeatures.js";
import mongoose from "mongoose";

// Validate ObjectId before querying DB
const validateId = (id, next) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse(`Invalid ID: ${id}`, 400));
  }
  return true;
};

// @desc Retrieve list of documents
export const indexDoc = (Model) => async (req, res, next) => {
  const filter =
    req.filter && typeof req.filter === "object" && Object.keys(req.filter).length
      ? req.filter
      : {};

  const features = new ApiFeatures(Model.find(filter).lean(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: { doc },
  });
};

// @desc Retrieve single document by ID (supports populate ?populate=a,b,c)
export const showDoc = (Model) => async (req, res, next) => {
  if (!validateId(req.params.id, next)) return;

  const filter =
    req.filter && typeof req.filter === "object" && Object.keys(req.filter).length
      ? req.filter
      : {};

  let query = Model.findOne({ _id: req.params.id, ...filter });

  if (req.query.populate) {
    req.query.populate
      .split(",")
      .map((field) => field.trim())
      .forEach((field) => (query = query.populate(field)));
  }

  const doc = await query;

  if (!doc) {
    return next(new ErrorResponse(`No document found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: { doc },
  });
};

// @desc Create new document
export const storeDoc = (Model) => async (req, res, next) => {
  const doc = await Model.create(req.body);

  res.status(201).json({
    status: "success",
    data: { doc },
  });
};

// @desc Update document by ID
export const updateDoc = (Model) => async (req, res, next) => {
  if (!validateId(req.params.id, next)) return;

  const filter =
    req.filter && typeof req.filter === "object" && Object.keys(req.filter).length
      ? req.filter
      : {};

  const doc = await Model.findOneAndUpdate({ _id: req.params.id, ...filter }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new ErrorResponse(`No document found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: { doc },
  });
};

// @desc Delete document by ID
export const destroyDoc = (Model) => async (req, res, next) => {
  if (!validateId(req.params.id, next)) return;

  const filter =
    req.filter && typeof req.filter === "object" && Object.keys(req.filter).length
      ? req.filter
      : {};

  const doc = await Model.findOneAndDelete({ _id: req.params.id, ...filter });

  if (!doc) {
    return next(new ErrorResponse(`No document found with id ${req.params.id}`, 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};
