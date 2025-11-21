import validator from "validator";

// Reusable HTTPS-only URL validator
export const httpsUrlValidator = {
  validator: (value) => {
    return validator.isURL(value, {
      require_protocol: true,
      protocols: ["https"],
      require_valid_protocol: true,
    });
  },
  message: (props) => `${props.path} must be a valid HTTPS URL`,
};
