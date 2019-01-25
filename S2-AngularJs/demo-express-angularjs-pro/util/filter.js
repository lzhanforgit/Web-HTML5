/**
 * Created by lzhan on 16/9/5.
 */
function filt(req,res,view) {
    if(req.session.userID==undefined){
        req.session.url='/'+view;
        res.redirect('/login');

    }else {
        res.render(view);
    }

}
exports.filt=filt;