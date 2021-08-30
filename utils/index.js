const TextUtils = {
  pascalToCamelCase: (s) =>
    s.replace(/\.?([A-Z])/g, (x, y) => '_' + y.toLowerCase()).replace(/^_/, ''),
  escapeRegex: (text) => text.replace(/[-[\]{}()*=?.,\\^$|#\s]/g, '\\$&'),
};

const DataUtils = {
  paging: async ({ offset = 0, limit = 10, sort, model, query }) => {
    query.push({
      $sort: sort,
    });
    query.push({
      $facet: {
        data: [
          {
            $skip: parseInt(offset),
          },
          {
            $limit: parseInt(limit),
          },
        ],
        total: [
          {
            $group: {
              _id: null,
              count: {
                $sum: 1,
              },
            },
          },
        ],
      },
    });
    let matchedData = await model.aggregate(query);

    let data = [],
      total = 0;
    if (matchedData[0].data.length > 0) {
      data = matchedData[0].data;
      total = matchedData[0].total[0].count;
    }

    return {
      data,
      total,
      limit,
      totalPages: Math.ceil(total / limit),
      page: Math.round(offset / limit) + 1,
    };
  },
};
module.exports = {
  DataUtils,
  TextUtils,
};
