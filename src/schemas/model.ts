export interface ToDoList {
  items: ToDoItem[];
};

export interface ToDoItem {
  id: number;
  title: string;
  completed: boolean;
};