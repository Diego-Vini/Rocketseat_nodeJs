const express = require('express');
const { v4: uuidv4 } = require('uuid')
const isUUID = require('is-uuid');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

const projects = [];

function logRequest (req, res, next) {
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  return next();

}

function validateProjectId (req, res, next) {
  const {id} = req.params;

  if(!isUUID.v4(id)) return res.status(400).json({ error: "Invalid project ID"});

  return next();
}

app.use(logRequest);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (req, res) => {
  const {title} = req.query;

  if (!title) return res.status(200).json(projects)

  const results = projects.filter(project => project.title.includes(title));
  
  return res.json(results);
});

app.post('/projects', (req, res) => {
  const { title, owner} = req.body;

  const project = { id: uuidv4(), title, owner };

  projects.push(project)

  return res.json(project);
});

app.put('/projects/:id', (req, res) => {
  const {id} = req.params;
  const {title, owner} = req.body;

  const projectIndex = projects.findIndex((project) => project.id ===id );

  if(projectIndex < 0) {
      return res.status(404).json({ error: "Project not found "})
  }

  const project = {
    id, 
    title,
    owner,
  };

  projects[projectIndex] = project;
 
  return res.json(project);
});

app.delete('/projects/:id', (req, res) => {
  const {id} = req.params;
  
  const projectIndex = projects.findIndex((project) => project.id ===id );

  if(projectIndex < 0) {
      return res.status(404).json({ error: "Project not found "})
  }

  projects.splice(projectIndex, 1)
  
  return res.status(204).send();
});

app.listen(3333, () => console.log('🚀 Rodando na porta 3333'));