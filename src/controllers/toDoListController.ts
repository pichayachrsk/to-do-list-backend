import { Request, Response } from "express";
import * as fileHandlerUtil from "../utils/fileHandler";
import { ToDoItem, ToDoList } from "../schemas/model";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const dataPath = "data/toDoList";

const getList = async (req: Request, res: Response) => {
  try {
    const data = <ToDoList>await fileHandlerUtil.readFile(dataPath);
    res.status(StatusCodes.OK).json(data.items);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR + error);
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
    res.status(StatusCodes.CREATED).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR + error);
  }
};

const updateItem = async (req: Request, res: Response) => {
  try {
    const data = <ToDoList>await fileHandlerUtil.readFile(dataPath);
    const itemId = parseInt(req.params.id);

    const itemIndex = data.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
      res.status(StatusCodes.NOT_FOUND).send({ message: `Item ID ${itemId} is not found` });
      return;
    }

    data.items[itemIndex] = { ...{ id: itemId }, ...req.body};

    await fileHandlerUtil.writeFile(dataPath, { items: data.items});
    res.status(StatusCodes.CREATED).json({ message: "Item updated successfully", item: data.items[itemIndex] });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR + error);
  }
};

const UpdateItemField = async (req: Request, res: Response) => {
  try {
    const data = <ToDoList>await fileHandlerUtil.readFile(dataPath);
    const itemId = parseInt(req.params.id);

    const itemIndex = data.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
      res.status(StatusCodes.NOT_FOUND).send({ message: `Item ID ${itemId} is not found` });
      return;
    }

    data.items[itemIndex] = {...data.items[itemIndex], ...req.body};

    await fileHandlerUtil.writeFile(dataPath, { items: data.items });
    res.status(StatusCodes.CREATED).json({ message: "Item updated successfully", item: data.items[itemIndex] });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR + error);
  }
};

const deleteItem = async (req: Request, res: Response) => {
  try {
    const data = <ToDoList>await fileHandlerUtil.readFile(dataPath);
    const itemId = parseInt(req.params.id);

    const itemIndex = data.items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
     res.status(StatusCodes.NOT_FOUND).send({ message: `Item ID ${itemId} is not found` });
      return;
    }

    data.items.splice(itemIndex, 1);

    await fileHandlerUtil.writeFile(dataPath, { items: data.items });
    res.status(StatusCodes.CREATED).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR + error);
  }
};

export default {
  getList,
  addItem,
  updateItem,
  UpdateItemField,
  deleteItem,
};
