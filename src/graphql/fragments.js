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
