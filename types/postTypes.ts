// COMMENT
export interface PostComment {
    id: string|number;
    body: string;
    username: string;
    createdAt: string;
}

// LIKE
export interface PostLike {
    id: string|number;
    username: string;
    createdAt: string;
}