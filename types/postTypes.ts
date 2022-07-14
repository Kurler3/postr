// COMMENT
export interface PostComment {
    id: string|number;
    body: string;
    username: string;
    createdAt: string;
    likes: PostLike[];
}

// LIKE
export interface PostLike {
    id: string|number;
    username: string;
    createdAt: string;
}

// POST
export interface PostType {
    id: string|number;
    body: string;
    createdAt: string;
    username: string;
    comments: [PostComment];
    likes: [PostLike];
    likesCount: number;
    commentsCount: number;
}