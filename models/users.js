const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    family_head: { type: String, required: true },
    gender: { type: String, enum: ['M', 'F', 'O'], required: true },
    district: { type: String, required: true },
    address: { type: String, required: true },
    total_members: { type: String, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, required: true },
    is_active: { type: Boolean, default: true },
  },
  {
    collection: 'users',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toObject: {
      virtuals: true,
    },
    toJson: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model('Users', schema);
