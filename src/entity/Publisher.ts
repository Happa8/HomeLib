import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";
import Book from "./Book";

@Entity()
export default class Publisher {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  furigana?: string | null;

  @OneToMany((type) => Book, (book) => book.publisher)
  books?: Book[];
}
