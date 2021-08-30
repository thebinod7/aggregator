const UserModel = require('../models/users');
const { DataUtils } = require('../utils');

const saveUser = (payload) => {
  return UserModel.create(payload);
};

const listUsers = async ({ page, limit, search }) => {
  let query = {};
  let offset = (page - 1) * limit;

  if (search) query = { family_head: { $regex: search, $options: 'i' } };

  let data = await DataUtils.paging({
    offset,
    limit,
    sort: { created_at: -1 },
    model: UserModel,
    query: [
      {
        $match: { $and: [{ is_active: true }, query] },
      },
    ],
  });
  return data;
};

const getById = (userId) => {
  return UserModel.findById(userId);
};

const updateUser = (userId, payload) => {
  return UserModel.findOneAndUpdate(
    { _id: userId },
    { $set: payload },
    { new: true }
  );
};

const deleteUser = (userId) => {
  return UserModel.remove({ _id: userId });
};

module.exports = { saveUser, listUsers, getById, updateUser, deleteUser };
