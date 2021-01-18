const knex = require('./knexFile');
const compose = require('./compose');
const { leftJoin } = require('./knexFile');

function getAllMusic(req, res){
    knex('all_audio')
    .select()
    .then(data =>{
        res.json(data)
    })
    .catch(error => {
        res.json(error)
    })
}

function addToFav(req, res){
    knex('fav_audio')
    .insert({audio_id:req.params.audioId})
    .then(data => {
        res.json({
            status : "ok",
            msg : "Added to favourite"
        });
    })
    .catch(error=>{
        if(error.code == "ER_DUP_ENTRY"){
            res.json({
                status:"error",
                msg:"Already on favourite"
            })
        }
    })
}

function getAllFavs(req,res){
    knex
    .select(
        'aa.id',
        'aa.artist',
        'aa.audioName'
    )
    .from('fav_audio AS fa')
    .leftJoin('all_audio AS aa', 'fa.audio_id','aa.id')
    .then(data=>{
        res.json(data)
    })
}

function removeFromFavs(req, res){
    knex('fav_audio')
    .del()
    .where({ audio_id: req.params.audioId})
    .then(data=>{
        res.json({
            status: "ok",
            msg:"Removed from favourite"
        })
    })    
}

// "SELECT aa.id, aa.artist, aa.audioName FROM fav_audio AS fa,all_audio AS aa WHERE fa.audio_id = aa.id";

module.exports = {
    getAllMusic: getAllMusic,
    addToFav : addToFav,
    getAllFavs: getAllFavs,
    removeFromFavs : removeFromFavs
}