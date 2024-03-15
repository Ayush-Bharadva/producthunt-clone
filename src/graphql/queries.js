import { gql } from "@apollo/client";

export const GET_FEATURED_POSTS = gql`
	query GetPosts($first: Int, $featured: Boolean, $order: PostsOrder, $after: String) {
		posts(first: $first, featured: $featured, order: $order, after: $after) {
			nodes {
				id
				name
				tagline
				# createdAt
				# featuredAt
				commentsCount
				votesCount
				# website
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
			}
			pageInfo {
				endCursor
				hasNextPage
				hasPreviousPage
				startCursor
			}
			totalCount
		}
	}
`;

/*-----------------------------------------------------------------*/
