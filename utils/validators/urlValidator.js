import validator from "validator";

const isEmptyOptionalValue = (value) =>
  value === null || value === undefined || value === "";

// Reusable HTTPS-only URL validator
export const httpsUrlValidator = {
  validator: (value) => {
    if (isEmptyOptionalValue(value)) return true;

    return validator.isURL(value, {
      require_protocol: true,
      protocols: ["https"],
      require_valid_protocol: true,
    });
  },
  message: (props) => `${props.path} must be a valid HTTPS URL`,
};

export const gitRepoUrlValidator = {
  validator: (value) => {
    if (isEmptyOptionalValue(value)) return true;

    return validator.isURL(value, {
      require_protocol: true,
      protocols: ["https", "git"],
      require_valid_protocol: true,
    });
  },
  message: "Git repository URL must be a valid HTTPS or Git URL",
};
