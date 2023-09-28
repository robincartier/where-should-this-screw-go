const dataprovider = require("../dataprovider/dataprovider");

module.exports = {
    async addStep(step) {
        const id = await dataprovider.addStep(step);

        return id;
    },

    async getStep(id) {
        const step = await dataprovider.getStep(id);

        return step;
    },
};
