
let middlewareObj = {}
middlewareObj.isLoggedIn = function(req,res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    //displays message "error" when not logged in
    req.flash("error", "Please log in to do that.")
    res.redirect("/login");
}



module.exports = middlewareObj