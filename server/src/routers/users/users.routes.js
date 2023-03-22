const { Router } = require('express');
const UsersControllers = require('../../controllers/users.controller');

const router = Router();

const usersController = new UsersControllers();

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;