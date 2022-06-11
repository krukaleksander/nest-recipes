import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Recipe } from './Recipe.entity';

@Entity({ name: 'ingredients' })
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  quantity: string;
  @Column()
  type: string;
  @ManyToMany(() => Recipe, (recipe) => recipe.ingredients, {
    cascade: true,
  })
  @JoinTable()
  recipe: Recipe[];
}
