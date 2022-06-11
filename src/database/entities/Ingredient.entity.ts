import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Recipe } from './Recipe.entity';

@Entity({ name: 'ingredients' })
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  quantity: string;
  @Column()
  type: string;
  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  @JoinColumn({ referencedColumnName: 'id', name: 'recipeId' })
  recipe: Recipe;
}
