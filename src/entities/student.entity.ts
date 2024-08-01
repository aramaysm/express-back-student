import { Type } from "class-transformer";
import { GradeEnum } from "../enums/grade.enum";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Grade } from "./grade.entity";

@Entity("student", { orderBy: { id: "DESC" } })
export class Student {
 
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  @Type(() => Number)
  age: number;

  @Column({ length: 100, nullable: false })
  @Unique(["email"])
  email: string;

  @ManyToOne((type) => Grade, (grade) => grade.students)
  @JoinTable()
  grade: Grade

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
