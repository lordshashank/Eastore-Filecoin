export const uploadRoute = {
  method: "post",
  path: "/upload",
  handler: async (req, res) => {
    const { files } = req.files;
    try {
      const fileName = files.name;
      files.mv("src/uploads/" + fileName, (err) => {
        res.status(200).json({ message: "Upload Successful!" });
      });
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  },
};
