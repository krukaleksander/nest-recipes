import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IRecipe } from '../../interfaces';
import { Ingredient } from './Ingredient.entity';

@Entity({ name: 'recipes' })
export class Recipe implements IRecipe {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  imageURL: string;
  @Column({ unique: true })
  name: string;
  @Column()
  steps: string[];
  @Column()
  timers: number[];
  @Column()
  originalURL?: string;
  @ManyToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredients: Ingredient[];
}
