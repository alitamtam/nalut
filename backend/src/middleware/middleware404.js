const middleware404 = (req, res) => {
  res.status(404).render("notFound");
};

export default middleware404;
