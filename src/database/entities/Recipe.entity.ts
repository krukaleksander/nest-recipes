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
  @Column('text', { array: true })
  steps: string[];
  @Column('int', { array: true })
  timers: number[];
  @Column({ nullable: true })
  originalURL?: string;
  @ManyToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredients: Ingredient[];
}
