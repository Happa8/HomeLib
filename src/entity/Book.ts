import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Tag from "./Tag";
import Creator from "./Creator";
import Publisher from "./Publisher";

@Entity()
export default class Book {
  @PrimaryGeneratedColumn("uuid")
  readonly id?: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @Column()
  title: string;

  @Column({ nullable: true })
  pubYear?: number;

  @Column()
  isbn: number;

  @ManyToMany((type) => Tag, (tag) => tag.books, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @ManyToMany((type) => Creator, (creator) => creator.books, { cascade: true })
  @JoinTable()
  creators: Creator[];

  @ManyToOne((type) => Publisher, (publisher) => publisher.books, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  publisher?: Publisher;

  @Column("text")
  description: string;
}
