const { Router } = require('express');
const MessagesControllers = require('../../controllers/messages.controller');

const router = Router();

const messagesController = new MessagesControllers();

router.post('/', messagesController.createMessage);
router.get('/', messagesController.getMessages);
router.get('/:id', messagesController.getMessagesById);
router.get('/email/:email', messagesController.getMessagesByEmail);
router.put('/:id', messagesController.updateMessage);
router.delete('/:id', messagesController.deleteMessage); 


module.exports = router;
