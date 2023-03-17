module.exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
        return res.redirect('/auth/login');
    }
};