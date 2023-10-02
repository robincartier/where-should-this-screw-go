import express, { Express } from "express";
import multer, { Multer } from "multer";

class Server {

    port = 3000;

    _app!: Express;
    get app() {
        return this._app;
    }
    set app(app) {
        this._app = app;
    }
    
    _upload!: Multer;
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

        this.app.use(function(_req, res, next) {
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

export default Server;
