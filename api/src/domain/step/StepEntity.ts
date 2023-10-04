import { ERRORS } from "../../error";

class Step {
    constructor({ image, tags = [], id }: { image: Base64, tags?: string[], id: number }) {
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

    static parseInputTags(inputTags: string): string[] {
        return inputTags
            .replace("/ +/g", " ")
            .toLowerCase()
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag);
    }

    static fromDto(dto: PostStepRequest) {
        try {
            const tags = Step.parseInputTags(dto.body.tags);

            return new Step({
                image: dto.file.buffer as unknown as Base64,
                tags,
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

    appendTags(...tags: string[]) {
        this._tags.push(...tags);
    }

    setTagsFromDbo(tagsDbo: DboGetTags) {
        const tags = tagsDbo.rows.map(row => row.tag);

        this.tags = tags;
    }

    static fromDboGet(dbo: DboGetStep) {
        return dbo.rows.map(row => (
            new Step({
                image: row.image.toString("base64") as Base64,
                id: row.id
            })
        ));
    }
}

export default Step;
