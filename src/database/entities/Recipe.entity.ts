import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  @OneToMany(() => Ingredient, (inverseSide) => inverseSide.recipe, {
    cascade: true,
  })
  ingredients: Ingredient[];
}
