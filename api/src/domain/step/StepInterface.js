class StepInterface {
    constructor(domain) {
        this.domain = domain;
    }

    async addStep(step) {}

    async getStep(id) {}
}

module.exports = StepInterface;
