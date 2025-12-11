const greeting = (req, res, next) => {
  const message =
    "Hi there! My name is Giorgi, and welcome to my Portfolio API! You can check out my actual portfolio here: https://bekauridev.vercel.app. If you'd like to use this API or have any questions, feel free to reach out—my contact details are available on my portfolio. Thanks for stopping by!";

  return res.status(200).json({ status: "success", message });
};

export default greeting;
