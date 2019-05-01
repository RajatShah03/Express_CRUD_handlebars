const express = require('express');
const uuid = require('uuid');
const members = require('../../Members');

const router = express.Router();

/* Get all Members */
router.get('/', (req, res) => {
  res.json(members);
}); // members list will be returned as JSON when hit the api with front-end/postman

/* Get Single Member based on id */
router.get('/:id', (req, res) => {
  const idParam = parseInt(req.params.id);
  const found = members.some(member => member.id === idParam);

  if(found) {
    res.json(members.filter(member => member.id === idParam));
  } else {
    res.status(400).json({ status: 400, msg: 'No members found' });
  }
});

/* Create a new member */
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if(!newMember.name || !newMember.email) {
    return res.status(400).json({ status: 400, msg: 'Invalid Credentials' });
  }

  members.push(newMember);
  res.redirect('/');
});

/* Update member */
router.put('/:id', (req, res) => {
  const idParam = parseInt(req.params.id);
  const found = members.some(member => member.id === idParam);

  if(found) {
    const updMember = req.body;
    members.forEach(member => {
      if(member.id === idParam) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: 'Updated successfully', member });
      }
    });
  } else {
    res.status(400).json({ status: 400, msg: 'No members found' });
  }
});

/* Delete member */
router.delete('/:id', (req, res) => {
  const idParam = parseInt(req.params.id);
  const found = members.some(member => member.id === idParam);

  if(found) {
    members.forEach((member, index) => {
      if(member.id === idParam) {
        members.splice(index, 1);
        res.json({ msg: 'Deleted successfully', members });
      }
    });
  } else {
    res.status(400).json({ status: 400, msg: 'No members found' });
  }
});

module.exports = router;