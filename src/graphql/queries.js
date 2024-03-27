import { gql } from "@apollo/client";

export const GET_USER = gql`
	query GetUser{}
`;

export const GET_POSTS = gql`
	query GetPosts(
		$first: Int
		$featured: Boolean
		$order: PostsOrder
		$after: String
		$postedBefore: DateTime
		$postedAfter: DateTime
	) {
		posts(
			first: $first
			featured: $featured
			order: $order
			after: $after
			postedBefore: $postedBefore
			postedAfter: $postedAfter
		) {
			nodes {
				id
				name
				tagline
				description
				commentsCount
				votesCount
				media {
					url
					videoUrl
				}
				website
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
				startCursor
			}
			totalCount
		}
	}
`;

export const GET_ALL_POSTS_BY_DATE = gql`
	query GetAllPostsByDate(
		$first: Int
		$after: String
		$postedBefore: DateTime
		$postedAfter: DateTime
	) {
		posts(first: $first, after: $after, postedBefore: $DateTime, postedAfter: $DateTime) {
			nodes {
				id
				name
				tagline
				description
				commentsCount
				votesCount
				media {
					url
					videoUrl
				}
				website
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
				startCursor
			}
			totalCount
		}
	}
`;
