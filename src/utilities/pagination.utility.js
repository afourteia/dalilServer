const paginate = (limit, page) => {
        return {
            limit: limit,
            skip: (page - 1) * limit
        }
};

module.exports = paginate;