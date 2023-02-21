import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MovieEntity} from "../../movie/entities/movie.entity";
import {UserEntity} from "../../user/entities/user.entity";
import {JoinColumn} from "typeorm/browser";

@Entity()
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, {nullable: false})
    @JoinColumn({name: 'userId'})
    user: UserEntity

    @ManyToOne(() => MovieEntity, {nullable: false})
    @JoinColumn({name: 'movieId'})
    movie: MovieEntity

    @Column({nullable: false})
    description: string

    @Column()
    createdAt: string
}
