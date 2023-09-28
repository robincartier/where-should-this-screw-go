const { ERRORS } = require("../../error");

class Step {
    constructor({ image, tags, id }) {
        this._tags = tags;
        this._image = image;
        this._id = id;
    }

    _tags;
    get tags() {
        return this._tags;
    }
    set tags(tags) {
        this._tags = tags;
    }

    _image;
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }

    _id;
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    static fromDto(dto) {
        try {
            return new Step({
                image: dto.file.buffer,
                tags: dto.body.tags,
                id: dto.body.id,
            });
        } catch (error) {
            throw new Error("format", { cause: ERRORS.INVALID_FORMAT.code });
        }
    }

    toDto() {
        return {
            image: this.image,
            tags: this.tags,
            id: this.id,
        };
    }

    static fromDboAdd(dbo) {
        return dbo.rows[0].id;
    }

    static fromDboGet(dbo) {
        return new Step({
            image: dbo.rows[0].image.toString("base64"),
            tags: dbo.rows[0].tags,
            id: dbo.rows[0].id
        });
    }
}

module.exports = Step;
