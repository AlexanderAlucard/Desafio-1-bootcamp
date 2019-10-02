const express = require("express");

const server = express();

server.use(express.json());

var ContReq = 0;


let BD = [{ id: "1", title: "titulo", tasks: [] }];

server.use((req, res, next) => {
  ContReq++;
  console.log(ContReq);
  next();
})




function identificarId(req, res, next) {
  const { id } = req.params;
  const projeto = BD.find(p => p.id == id);

  if (!projeto) {
    return res.status(400).json({ error: 'Usuario não existe' })
  }

  return next();
};

server.get('/projects/:index', (req, res) => {
  const { index } = req.params;

  return res.json(BD[index]);

});

server.get('/projects', (req, res) => {

  return res.json(BD);

});

server.put('/projects/:id', identificarId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = BD.find(p => p.id == id);

  project.title = title;

  return res.json(project);


});


server.post('/projects', (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  const jsonResponse = {
    id,
    title,
    tasks: []
  }


  BD.push(jsonResponse);

  return res.json(BD);

});

server.delete('/projects/:id', identificarId, (req, res) => {
  const { id } = req.params;

  const project = BD.findIndex(p => p.id == id);

  BD.splice(project, 1);

  return res.json(BD);

})

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const project = BD.find(p => p.id == id);
  project.tasks.push(task);

  return res.json(BD);
})

server.listen(8000);