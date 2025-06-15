import { Router } from 'express';
import toDoListControllers from '../controllers/toDoListController';
import { addOrUpdateItemValidation, updateItemFieldValidation } from "../middleware/validation";

const router = Router(); 
router.get('/get-list', toDoListControllers.getList); 
router.post('/add-item', addOrUpdateItemValidation(), toDoListControllers.addItem);
router.put('/update-item/:id', addOrUpdateItemValidation(), toDoListControllers.updateItem);
router.patch('/toggle-item/:id', updateItemFieldValidation(), toDoListControllers.UpdateItemField);
router.delete('/delete-item/:id', toDoListControllers.deleteItem);

export default router;