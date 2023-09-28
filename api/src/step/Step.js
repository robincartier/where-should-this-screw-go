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

    toJSON() {
        return {
            image: this.image,
            tags: this.tags,
            id: this.id,
        };
    }

}

module.exports = Step;
