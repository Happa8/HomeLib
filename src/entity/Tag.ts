import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Book from "./Book";

@Entity()
export default class Tag {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @ManyToMany((type) => Book)
  books?: Book[];
}
