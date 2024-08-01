import { Type } from "class-transformer"
import { GradeEnum } from "../enums/grade.enum"
import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, JoinTable, OneToMany } from "typeorm"
import { Student } from "./student.entity"

@Entity('grade', { orderBy: { id: 'DESC' } })
export class Grade {
    
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @Column({ nullable: false })
    @Unique(['label'])
    label: string

    

    @Column({ default: false })
    isDeleted: boolean

    @OneToMany((type) => Student, (student) => student.grade)
  @JoinTable()
  
  students: Student[];

    
}