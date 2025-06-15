import {
  Length,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
} from "class-validator";
import { ToDoItem } from "./model";

export class AddOrUpdateItem implements Pick<ToDoItem, 'title' | 'completed'> {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  title!: string;

  @IsBoolean()
  completed!: boolean;
}

export class UpdateItemField implements Partial<ToDoItem> {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  title?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
