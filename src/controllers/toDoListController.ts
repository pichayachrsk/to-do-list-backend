import { Request, Response } from "express";
import * as fileHandlerUtil from "../utils/fileHandler";

interface ToDoList {
  items: ToDoItem[];
};

interface ToDoItem {
  id: number;
  title: string;
  completed: boolean;
};

const dataPath = "data/toDoList";

const getList = async (req: Request, res: Response) => {
  try {
    const data = <ToDoList>await fileHandlerUtil.readFile(dataPath);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const addItem = async (req: Request, res: Response) => {
  try {
    const data = <ToDoList>await fileHandlerUtil.readFile(dataPath);
    const newItem: ToDoItem = {
      id: data.items.length + 1,
      ...req.body,
    };

    await fileHandlerUtil.writeFile(dataPath, { items: [...data.items, newItem] });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).send(`Internal Server Error${error}`);
  }
};

const updateItem = async (req: Request, res: Response) => {
  try {
    const data = <ToDoList>await fileHandlerUtil.readFile(dataPath);
    const itemId = parseInt(req.params.id);

    const itemIndex = data.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
      res.status(404).send(`Item ID ${itemId} is not found`);
      return;
    }

    data.items[itemIndex] = req.body;

    await fileHandlerUtil.writeFile(dataPath, { items: data.items });
    res.status(201).json(data.items[itemIndex]);
  } catch (error) {
    res.status(500).send(`Internal Server Error${error}`);
  }
};

const toggleItem = async (req: Request, res: Response) => {
  try {
    const data = <ToDoList>await fileHandlerUtil.readFile(dataPath);
    const itemId = parseInt(req.params.id);

    const itemIndex = data.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
      res.status(404).send(`Item ID ${itemId} is not found`);
      return;
    }

    data.items[itemIndex] = {...data.items[itemIndex], ...req.body};

    await fileHandlerUtil.writeFile(dataPath, { items: data.items });
    res.status(201).json(data.items[itemIndex]);
  } catch (error) {
    res.status(500).send(`Internal Server Error${error}`);
  }
};

const deleteItem = async (req: Request, res: Response) => {
  try {
    const data = <ToDoList>await fileHandlerUtil.readFile(dataPath);
    const itemId = parseInt(req.params.id);

    const itemIndex = data.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
      res.status(404).send(`Item ID ${itemId} is not found`);
      return;
    }

    data.items.splice(itemIndex, 1);

    await fileHandlerUtil.writeFile(dataPath, { items: data.items });
    res.status(201).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).send(`Internal Server Error${error}`);
  }
};

export default {
  getList,
  addItem,
  updateItem,
  toggleItem,
  deleteItem,
};
