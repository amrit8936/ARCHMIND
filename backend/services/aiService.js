let OpenAI;
let client;

const SYSTEM_PROMPT = `You are an expert software architect. When given a product requirement, generate a complete system design as a JSON object. 

Your response must be ONLY valid JSON with this exact structure:
{
  "title": "Short title for this architecture",
  "overview": "2-3 sentence overview of the architecture",
  "services": [
    { "name": "Service Name", "description": "What it does", "technology": "Tech stack used", "type": "service_type" }
  ],
  "database": {
    "type": "SQL/NoSQL/NewSQL",
    "technology": "PostgreSQL/MongoDB/Redis etc",
    "schema": [
      { "table": "TableName", "fields": ["field1:type", "field2:type"], "description": "Purpose" }
    ]
  },
  "apis": [
    { "method": "GET/POST/PUT/DELETE", "endpoint": "/api/path", "description": "What it does", "auth": true/false }
  ],
  "scalability": [
    { "strategy": "Strategy name", "description": "How and why to apply it", "impact": "High/Medium/Low" }
  ],
  "nodes": [
    { "id": "unique-id", "type": "custom", "position": { "x": 100, "y": 100 }, "data": { "label": "Node Label", "nodeType": "service|database|queue|gateway|cache|client", "description": "Short desc", "technology": "Tech" } }
  ],
  "edges": [
    { "id": "e1-2", "source": "node-id-1", "target": "node-id-2", "label": "relationship", "animated": true }
  ]
}

For nodes, position them logically:
- Client/Gateway nodes: x=400, y=50
- API Gateway: x=400, y=180
- Services spread horizontally: y=350
- Databases below services: y=520
- Cache/Queue layers: y=350 offset

Generate at least 6 nodes and their connecting edges. Make it comprehensive and production-quality.`;

const generateArchitecture = async (requirement) => {
  try {
    if (!OpenAI) OpenAI = require('openai');
    if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Generate a complete system design for: ${requirement}` },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content);
    return result;
  } catch (err) {
    // If OpenAI fails (no key, quota, etc.) return a detailed mock for "build Uber"-like systems
    console.warn('OpenAI API error, using mock response:', err.message);
    return getMockDesign(requirement);
  }
};

const getMockDesign = (requirement) => {
  const title = requirement.split(' ').slice(0, 4).join(' ');
  return {
    title: `${title} - System Architecture`,
    overview: `A scalable microservices architecture for ${requirement}. Built for high availability, horizontal scaling, and real-time performance using industry best practices.`,
    services: [
      { name: 'API Gateway', description: 'Single entry point, rate limiting, auth routing', technology: 'Kong / AWS API Gateway', type: 'gateway' },
      { name: 'Auth Service', description: 'JWT-based auth, OAuth2 social login, session management', technology: 'Node.js + Redis', type: 'auth' },
      { name: 'User Service', description: 'User profiles, preferences, CRUD operations', technology: 'Node.js + PostgreSQL', type: 'service' },
      { name: 'Core Service', description: 'Main business logic and domain operations', technology: 'Node.js + MongoDB', type: 'service' },
      { name: 'Notification Service', description: 'Email, SMS, push notifications via queue', technology: 'Node.js + RabbitMQ', type: 'service' },
      { name: 'Search Service', description: 'Full-text search, geospatial queries', technology: 'Elasticsearch', type: 'service' },
    ],
    database: {
      type: 'Polyglot',
      technology: 'PostgreSQL + MongoDB + Redis',
      schema: [
        { table: 'users', fields: ['id:UUID', 'name:VARCHAR', 'email:VARCHAR', 'password_hash:VARCHAR', 'created_at:TIMESTAMP'], description: 'Core user records' },
        { table: 'sessions', fields: ['id:UUID', 'user_id:UUID', 'token:TEXT', 'expires_at:TIMESTAMP'], description: 'Auth sessions' },
        { table: 'activities', fields: ['_id:ObjectId', 'user_id:String', 'type:String', 'data:JSON', 'timestamp:Date'], description: 'Activity logs (MongoDB)' },
        { table: 'cache', fields: ['key:STRING', 'value:JSON', 'ttl:INT'], description: 'Redis cache layer' },
      ],
    },
    apis: [
      { method: 'POST', endpoint: '/api/auth/signup', description: 'Register new user', auth: false },
      { method: 'POST', endpoint: '/api/auth/login', description: 'Login and get JWT token', auth: false },
      { method: 'GET', endpoint: '/api/users/me', description: 'Get logged-in user profile', auth: true },
      { method: 'PUT', endpoint: '/api/users/me', description: 'Update user profile', auth: true },
      { method: 'GET', endpoint: '/api/core/items', description: 'List core resources', auth: true },
      { method: 'POST', endpoint: '/api/core/items', description: 'Create a new resource', auth: true },
      { method: 'GET', endpoint: '/api/search?q=query', description: 'Full-text search', auth: false },
      { method: 'POST', endpoint: '/api/notifications/send', description: 'Trigger notification', auth: true },
    ],
    scalability: [
      { strategy: 'Horizontal Scaling', description: 'Deploy multiple instances of each microservice behind a load balancer. Use Kubernetes HPA for auto-scaling based on CPU/memory metrics.', impact: 'High' },
      { strategy: 'CDN & Caching', description: 'Use CloudFront/Cloudflare for static assets. Redis caching for hot data with TTL-based invalidation reduces DB load by 70%.', impact: 'High' },
      { strategy: 'Database Sharding', description: 'Shard PostgreSQL by user_id using consistent hashing. Each shard handles a subset of users, enabling linear scale.', impact: 'High' },
      { strategy: 'Message Queues', description: 'RabbitMQ/Kafka for async processing of notifications, emails, and analytics events decoupling services.', impact: 'Medium' },
      { strategy: 'Read Replicas', description: 'PostgreSQL read replicas for analytics and reporting queries. Route writes to primary, reads to replicas.', impact: 'Medium' },
      { strategy: 'Circuit Breaker', description: 'Implement circuit breakers (Hystrix/Resilience4j) to prevent cascading failures across microservices.', impact: 'Medium' },
    ],
    nodes: [
      { id: 'client', type: 'custom', position: { x: 400, y: 30 }, data: { label: 'Client Apps', nodeType: 'client', description: 'Web, iOS, Android clients', technology: 'React / React Native' } },
      { id: 'cdn', type: 'custom', position: { x: 200, y: 30 }, data: { label: 'CDN', nodeType: 'cache', description: 'Static asset delivery', technology: 'Cloudflare / CloudFront' } },
      { id: 'gateway', type: 'custom', position: { x: 400, y: 180 }, data: { label: 'API Gateway', nodeType: 'gateway', description: 'Rate limiting, routing, auth', technology: 'Kong / AWS API Gateway' } },
      { id: 'lb', type: 'custom', position: { x: 620, y: 180 }, data: { label: 'Load Balancer', nodeType: 'gateway', description: 'Traffic distribution', technology: 'Nginx / AWS ALB' } },
      { id: 'auth-svc', type: 'custom', position: { x: 120, y: 360 }, data: { label: 'Auth Service', nodeType: 'service', description: 'JWT, OAuth2, sessions', technology: 'Node.js' } },
      { id: 'user-svc', type: 'custom', position: { x: 340, y: 360 }, data: { label: 'User Service', nodeType: 'service', description: 'Profiles & CRUD', technology: 'Node.js' } },
      { id: 'core-svc', type: 'custom', position: { x: 560, y: 360 }, data: { label: 'Core Service', nodeType: 'service', description: 'Business logic', technology: 'Node.js' } },
      { id: 'notif-svc', type: 'custom', position: { x: 780, y: 360 }, data: { label: 'Notification Service', nodeType: 'service', description: 'Email, SMS, Push', technology: 'Node.js' } },
      { id: 'queue', type: 'custom', position: { x: 780, y: 510 }, data: { label: 'Message Queue', nodeType: 'queue', description: 'Async event processing', technology: 'RabbitMQ / Kafka' } },
      { id: 'postgres', type: 'custom', position: { x: 220, y: 530 }, data: { label: 'PostgreSQL', nodeType: 'database', description: 'User & transaction data', technology: 'PostgreSQL 15' } },
      { id: 'mongodb', type: 'custom', position: { x: 450, y: 530 }, data: { label: 'MongoDB', nodeType: 'database', description: 'Activity & analytics data', technology: 'MongoDB 7' } },
      { id: 'redis', type: 'custom', position: { x: 120, y: 510 }, data: { label: 'Redis Cache', nodeType: 'cache', description: 'Session & hot data cache', technology: 'Redis 7' } },
      { id: 'search', type: 'custom', position: { x: 660, y: 530 }, data: { label: 'Elasticsearch', nodeType: 'database', description: 'Full-text & geo search', technology: 'Elasticsearch 8' } },
    ],
    edges: [
      { id: 'e-client-cdn', source: 'client', target: 'cdn', label: 'static assets', animated: false },
      { id: 'e-client-gw', source: 'client', target: 'gateway', label: 'API calls', animated: true },
      { id: 'e-gw-lb', source: 'gateway', target: 'lb', label: 'route', animated: true },
      { id: 'e-lb-auth', source: 'lb', target: 'auth-svc', label: 'auth requests', animated: true },
      { id: 'e-lb-user', source: 'lb', target: 'user-svc', label: 'user requests', animated: true },
      { id: 'e-lb-core', source: 'lb', target: 'core-svc', label: 'core requests', animated: true },
      { id: 'e-lb-notif', source: 'lb', target: 'notif-svc', label: 'notifications', animated: true },
      { id: 'e-auth-redis', source: 'auth-svc', target: 'redis', label: 'sessions', animated: false },
      { id: 'e-auth-pg', source: 'auth-svc', target: 'postgres', label: 'user auth', animated: false },
      { id: 'e-user-pg', source: 'user-svc', target: 'postgres', label: 'user data', animated: false },
      { id: 'e-core-mongo', source: 'core-svc', target: 'mongodb', label: 'activity data', animated: false },
      { id: 'e-core-search', source: 'core-svc', target: 'search', label: 'index/search', animated: false },
      { id: 'e-notif-queue', source: 'notif-svc', target: 'queue', label: 'events', animated: true },
      { id: 'e-core-queue', source: 'core-svc', target: 'queue', label: 'async tasks', animated: true },
    ],
  };
};

module.exports = { generateArchitecture };
