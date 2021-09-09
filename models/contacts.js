const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    gender: { type: String, enum: ['M', 'F', 'O', 'U'], default: 'U' },
    is_active: { type: Boolean, default: true },
  },
  {
    collection: 'contacts',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toObject: {
      virtuals: true,
    },
    toJson: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model('Contact', schema);
