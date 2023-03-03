exports.count = async (schemaName) => {
    return await schemaName.count();
};