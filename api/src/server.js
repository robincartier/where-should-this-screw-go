const express = require("express");
const multer  = require("multer");

class Server {

    _app;
    get app() {
        return this._app;
    }
    set app(app) {
        this._app = app;
    }
    
    _upload;
    get upload() {
        return this._upload;
    }
    set upload(upload) {
        this._upload = upload;
    }

    initServer() {
        const storage = multer.memoryStorage();
        this.upload = multer({ storage: storage });

        this.app = express();
        this.port = 3000;

        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }

}

module.exports = Server;
