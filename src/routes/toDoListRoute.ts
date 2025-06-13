import express from 'express';
import toDoListControllers from '../controllers/toDoListController';

const router = express.Router(); 
router.get('/get-list', toDoListControllers.getList); 
router.post('/add-item', toDoListControllers.addItem);
router.put('/update-item/:id', toDoListControllers.updateItem);
router.patch('/toggle-item/:id', toDoListControllers.toggleItem);
router.delete('/delete-item/:id', toDoListControllers.deleteItem);

export default router;