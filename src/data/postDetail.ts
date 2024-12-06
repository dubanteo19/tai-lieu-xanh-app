import { DetailProps } from "../Components/PostDetail/Detail";

export const postDetail: DetailProps = {
    id: 1,
    title: "Understanding Machine Learning Basics",
    author: {
        fullName: "Jane Doe",
        avatar: "https://example.com/avatar/jane-doe.jpg",
    },
    date: "2024-10-15",
    content: "This document provides a comprehensive introduction to the basics of machine learning, covering core concepts, algorithms, and their applications.",
    documents: [
        "https://picsum.photos/seed/dss/600",
        "https://picsum.photos/seed/dssd/600",
    ],
    comments: [
        {
            id: 101,
            author: {
                fullName: "John Smith",
                avatar: "https://example.com/avatar/john-smith.jpg",
            },
            date: "2024-10-16",
            content: "Great introduction! This really helped me understand the fundamentals."
        },
        {
            id: 102,
            author: {
                fullName: "Alice Johnson",
                avatar: "https://example.com/avatar/alice-johnson.jpg",
            },
            date: "2024-10-17",
            content: "Very helpful document! Could you also cover some advanced topics?"
        }
    ]
};
