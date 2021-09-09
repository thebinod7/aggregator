const ContactModel = require('../models/contacts');
const { DataUtils } = require('../utils');

const saveContact = (payload) => {
  return ContactModel.create(payload);
};

const listContacts = async ({ page, limit, search }) => {
  let query = {};
  let offset = (page - 1) * limit;

  if (search) query = { name: { $regex: search, $options: 'i' } };

  let data = await DataUtils.paging({
    offset,
    limit,
    sort: { created_at: -1 },
    model: ContactModel,
    query: [
      {
        $match: { $and: [{ is_active: true }, query] },
      },
    ],
  });
  return data;
};

const getById = (contactId) => {
  return ContactModel.findById(contactId);
};

const updateContact = (contactId, payload) => {
  return ContactModel.findOneAndUpdate(
    { _id: contactId },
    { $set: payload },
    { new: true }
  );
};

const deleteContact = (contactId) => {
  return ContactModel.remove({ _id: contactId });
};

module.exports = {
  saveContact,
  listContacts,
  getById,
  updateContact,
  deleteContact,
};
