import { gql } from "@apollo/client";
import { USER_FRAGMENT, POST_FRAGMENT } from "./fragments";

export const GET_USER = gql`
	query GetUser($username: String) {
		user(username: $username) {
			...UserFragment
		}
	}
	${USER_FRAGMENT}
`;

export const GET_USER_DETAILS = gql`
	query GetUserDetails($username: String) {
		user(username: $username) {
			...UserFragment
			votedPosts {
				nodes {
					...PostFragment
				}
				totalCount
				pageInfo {
					endCursor
					hasNextPage
				}
			}
		}
	}
	${USER_FRAGMENT}
	${POST_FRAGMENT}
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
				...PostFragment
			}
			pageInfo {
				endCursor
				hasNextPage
			}
			totalCount
		}
	}
	${POST_FRAGMENT}
`;
