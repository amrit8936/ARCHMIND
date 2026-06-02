const express = require('express');
const Design = require('../models/Design');
const auth = require('../middleware/auth');
const { generateArchitecture } = require('../services/aiService');
const router = express.Router();

// @POST /api/design/generate — generate architecture from requirement
router.post('/generate', auth, async (req, res) => {
  const { requirement } = req.body;

  if (!requirement || requirement.trim().length < 5) {
    return res.status(400).json({ message: 'Please provide a meaningful requirement' });
  }

  const generated = await generateArchitecture(requirement);

  const design = await Design.create({
    userId: req.userId,
    title: generated.title || requirement.slice(0, 60),
    requirement,
    overview: generated.overview,
    services: generated.services,
    database: generated.database,
    apis: generated.apis,
    scalability: generated.scalability,
    nodes: generated.nodes,
    edges: generated.edges,
  });

  return res.status(201).json(design);
});

// @GET /api/design — get all designs for logged-in user
router.get('/', auth, async (req, res) => {
  const designs = await Design.find({ userId: req.userId })
    .select('title requirement overview createdAt')
    .sort({ createdAt: -1 });
  return res.json(designs);
});

// @GET /api/design/:id — get one design
router.get('/:id', auth, async (req, res) => {
  const design = await Design.findOne({ _id: req.params.id, userId: req.userId });
  if (!design) return res.status(404).json({ message: 'Design not found' });
  return res.json(design);
});

// @PUT /api/design/:id — update nodes/edges/title
router.put('/:id', auth, async (req, res) => {
  const { nodes, edges, title } = req.body;
  const design = await Design.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { nodes, edges, title },
    { new: true }
  );
  if (!design) return res.status(404).json({ message: 'Design not found' });
  return res.json(design);
});

// @DELETE /api/design/:id — delete design
router.delete('/:id', auth, async (req, res) => {
  const design = await Design.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (!design) return res.status(404).json({ message: 'Design not found' });
  return res.json({ message: 'Design deleted' });
});

module.exports = router;
