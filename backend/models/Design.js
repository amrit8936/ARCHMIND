const mongoose = require('mongoose');

const designSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    requirement: { type: String, required: true },
    overview: { type: String, default: '' },
    services: { type: Array, default: [] },
    database: { type: Object, default: {} },
    apis: { type: Array, default: [] },
    scalability: { type: Array, default: [] },
    nodes: { type: Array, default: [] },
    edges: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Design', designSchema);
