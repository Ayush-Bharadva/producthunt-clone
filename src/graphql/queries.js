import { gql } from "@apollo/client";

export const GET_POSTS = gql`
	query GetPosts($first: Int, $featured: Boolean, $order: PostsOrder) {
		posts(first: $first, featured: $featured, order: $order) {
			nodes {
				id
				name
				tagline
				createdAt
				featuredAt
				commentsCount
				votesCount
				thumbnail {
					type
					url
					videoUrl
				}
				topics {
					edges {
						node {
							name
						}
					}
				}
				website
			}
			# pageInfo {
			# 	endCursor
			# 	hasNextPage
			# 	hasPreviousPage
			# 	startCursor
			# }
			totalCount
		}
	}
`;
