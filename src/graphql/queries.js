import { gql } from "@apollo/client";

export const GET_USERNAME = gql`
	query {
		viewer {
			user {
				username
			}
		}
	}
`;

export const GET_USER = gql`
	query GetUser($username: String) {
		user(username: $username) {
			coverImage
			createdAt
			headline
			id
			name
			profileImage
			username
		}
	}
`;

export const GET_USER_DETAILS = gql`
	query GetUserDetails($username: String) {
		user(username: $username) {
			id
			createdAt
			name
			profileImage
			headline
			url
			coverImage
			votedPosts {
				nodes {
					id
					name
					tagline
					description
					reviewsCount
					commentsCount
					votesCount
					isVoted
					media {
						url
						videoUrl
					}
					thumbnail {
						url
						type
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
				totalCount
				pageInfo {
					endCursor
					hasNextPage
				}
			}
		}
	}
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
				createdAt
				description
				commentsCount
				votesCount
				isVoted
				website
				media {
					url
					videoUrl
				}
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
