export const helloRoute = {
  method: "get",
  path: "/hello",
  handler: async (req, res) => {
    return res.json("Hello World!");
  },
};
