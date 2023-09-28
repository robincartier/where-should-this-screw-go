module.exports = (dataInterface) => ({
    addStep: (step) => {
        return dataInterface.addStep(step);
    },

    getStep: (id) => {
        return dataInterface.getStep(id);
    },
});
