import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
	fragment UserFragment on User {
		id
		name
		headline
		username
		profileImage
		coverImage
		url
	}
`;

export const COMMENT_FRAGMENT = gql`
	fragment CommentFragment on Comment {
		id
		body
		isVoted
		votesCount
		replies {
			nodes {
				id
				body
				isVoted
				votesCount
			}
			totalCount
		}
	}
`;

export const POST_FRAGMENT = gql`
	fragment PostFragment on Post {
		id
		name
		tagline
		description
		createdAt
		commentsCount
		reviewsCount
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
`;
