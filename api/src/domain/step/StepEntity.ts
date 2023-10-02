import { ERRORS } from "../../error";

class Step {
    constructor({ image, tags, id }: { image: Base64, tags: string, id: number }) {
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

    static fromDto(dto: PostStepRequest) {
        try {
            return new Step({
                image: dto.file.buffer as unknown as Base64,
                tags: dto.body.tags,
                id: dto.body.id,
            });
        } catch (error) {
            throw ERRORS.INVALID_FORMAT;
        }
    }

    toDto() {
        return {
            image: this.image,
            tags: this.tags,
            id: this.id,
        };
    }

    static fromDboAdd(dbo: DboPostStep) {
        return dbo.rows[0].id;
    }

    static fromDboGet(dbo: DboGetStep) {
        return new Step({
            image: dbo.rows[0].image.toString("base64") as Base64,
            tags: dbo.rows[0].tags,
            id: dbo.rows[0].id
        });
    }
}

export default Step;
