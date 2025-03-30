import { colors } from '@/styles/colors'
import ContentLoader, { Rect } from 'react-content-loader/native'

export const SkeletonTasks = () => {
	return (
		<>
			{[...Array(2)].map((_, index) => (
				<ContentLoader
					key={index}
					width={400}
					height={50}
					viewBox='0 0 400 50'
					backgroundColor={colors.gray[500]}
					foregroundColor='#ecebeb'
				>
					<Rect x='0' y='8' rx='3' ry='3' width='200' height='8' />
					<Rect x='0' y='26' rx='3' ry='3' width='300' height='8' />
				</ContentLoader>
			))}
		</>
	)
}
