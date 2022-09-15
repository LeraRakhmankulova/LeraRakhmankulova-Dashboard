import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Layout from '@/components/ui/Layout/Layout'

import { IMovie } from '@/interfaces/IMovie.interface'

import { MovieService } from '@/services/movie.service'

import style from './Movie.module.sass'
import Reviews from '../reviews/Reviews'

const Movie = () => {
	const { query } = useRouter()
	const movieMock: IMovie = {
		id: 1,
		name: 'Little princes',
		rating: 2.7,
		poster: '/poster2.jpg',
		views: 400,
		fees: 457568
	}

	const movieId = Number(query?.id)

	const { refetch, data: movie, isLoading } = useQuery( 
		['get movie', query?.id],
		() => MovieService.getMovieById(movieId),
		{
			select: ({ data }) => data
		}
	)
	return (
		<Layout title={`${movieMock?.name}`}>
			<div className={style.movie_page}>
				<div className={style.movie_page__poster}>
					<Image
						src={movieMock.poster}
						alt={movieMock.name}
						width={280}
						height={405}
					/>
				</div>
				<div className={style.movie_page__info}>
					<h1>{movieMock.name}</h1>
					<h3>{movieMock?.rating}</h3>
					<h2>About movie:</h2>
					<ul>
						<li>
							<span>Fees: </span>
							<span>$ {movieMock?.fees}</span>
						</li>
						<li>
							<span>Views: </span>
							<span>{movieMock?.views}</span>
						</li>
					</ul>
				</div>
			</div>
            <Reviews movieId={movieMock.id} reviews={movieMock?.reviews || []} isLoading={isLoading}/>
		</Layout>
	)
}

export default Movie
