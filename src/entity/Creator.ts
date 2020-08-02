import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Book from "./Book";

@Entity()
export default class Creator {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  furigana?: string | null;

  @ManyToMany((type) => Book, (book) => book.creators)
  books?: Book[];
}
