const errorHandler2 = (fuc) =>  async (req, res, next) => {
    try{
        await fuc();
    }
    catch(err){
        next(err);
    }
}
module.exports = errorHandler2;