console.log("---------------------------------------------------------");

console.log("ADES>backend> model >mapOfMaze.js");

console.log("---------------------------------------------------------");

//----------------------------------------------------------------------------

//imports

//----------------------------------------------------------------------------

const pool = require("../controllers/dbconfig")

// ----------------------------------------------------------------------------

// Objects/functions

// ----------------------------------------------------------------------------

var maze = {

    getMazeContent: function (callback) {
        pool.query('SELECT * FROM public."mazeContent"ORDER BY "mazeLvl" ASC '
            , (err, result) => {
                if (err) {
                    cconsole.log(err);
                    return callback(err);
                } else {
                    return callback(null, result);
                }
            })

    },
    getMazeByStudentID: function (StudentID, callback) {
        const sql = `SELECT "mazeLvl" FROM public."Student" WHERE "studentID" = $1`;
        pool.query(sql, [StudentID], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null, result);
            }
        })
    },
    editMazeContent: function (mazeLvl, point, callback) {
        var pt = parseInt(point.points);
        var data = [pt, mazeLvl];
        var sql = ` 
        UPDATE public."mazeContent"
         SET 
         points= $1
           WHERE 
           "mazeLvl"=$2;`;
        pool.query(sql, data, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null, result);
            }
        })
    },
    getMazePts: function(mazeLvl, callback){
        const sql = `SELECT points FROM public."mazeContent" WHERE "mazeLvl" = $1`;
        const value = [mazeLvl];
        pool.query(sql,value,(err,result) => {
            if(err){
                console.log(err);
                return callback(err);
            }else{
                return callback(null,result);
            }
        })
    },
    updatePtsnLvl: function(studentID,maze,callback) {
            var currentPts = maze.currentPts ;
            var totalPts = maze.totalPts ;
            var level = maze.level ;
      
            const sql = `UPDATE "public"."Student" SET "totalPts" = $1, "redeemedPts"=$2, "mazeLvl"= $3 WHERE "studentID"=$4`;
            const values = [totalPts, currentPts, level, studentID]
            pool.query(sql,values,(err, result) => {
                if(err) {
                    console.log(err);
                    return callback(err);
                } else {
                    return callback(null,result);
                }
            })
    }

};

// ----------------------------------------------------------------------------

// exports

// ----------------------------------------------------------------------------

module.exports = maze;