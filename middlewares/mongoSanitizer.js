export const mongoSanitizer = (req, res, next) => {
  const clean = (value) => {
    if (!value || typeof value !== "object") return;

    if (Array.isArray(value)) {
      value.forEach(clean);
      return;
    }

    for (const key of Object.keys(value)) {
      if (key.startsWith("$") || key.includes(".")) {
        delete value[key]; // prevent NoSQL injection
        continue;
      }
      if (typeof value[key] === "object") {
        clean(value[key]);
      }
    }
  };

  clean(req.body);
  clean(req.query);
  clean(req.params);

  next();
};
