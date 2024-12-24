import { IComment } from "../../type/IComment";

export const comments: IComment[] = [
  {
    id: 1,
    postTitle: "Understanding React Hooks",
    comment: "This was really helpful! Thank you.",
    parentComment: "",
    author: {
      fullName: "John Doe",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
    status: "approved",
    createdAt: "2024-07-01T10:00:00Z",
  },
  {
    id: 2,
    postTitle: "Understanding React Hooks",
    comment: "Can you explain useEffect in more detail?",
    parentComment: "1",
    author: {
      fullName: "Jane Smith",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
    },
    status: "pending",
    createdAt: "2024-07-01T11:00:00Z",
  },
  {
    id: 3,
    postTitle: "Mastering TypeScript",
    comment: "I finally understand interfaces now.",
    parentComment: "",
    author: {
      fullName: "Michael Brown",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
    },
    status: "approved",
    createdAt: "2024-07-02T12:15:00Z",
  },
  {
    id: 4,
    postTitle: "Mastering TypeScript",
    comment: "Could you cover generics next?",
    parentComment: "3",
    author: {
      fullName: "Emily Johnson",
      avatarUrl: "https://i.pravatar.cc/150?img=4",
    },
    status: "approved",
    createdAt: "2024-07-02T14:30:00Z",
  },
  {
    id: 5,
    postTitle: "Why Tailwind CSS is Amazing",
    comment: "Tailwind made my workflow so much faster!",
    parentComment: "",
    author: {
      fullName: "William Taylor",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
    },
    status: "approved",
    createdAt: "2024-07-03T08:45:00Z",
  },
  {
    id: 6,
    postTitle: "Why Tailwind CSS is Amazing",
    comment: "Do you recommend any Tailwind plugins?",
    parentComment: "5",
    author: {
      fullName: "Sophia Wilson",
      avatarUrl: "https://i.pravatar.cc/150?img=6",
    },
    status: "pending",
    createdAt: "2024-07-03T10:00:00Z",
  },
  {
    id: 7,
    postTitle: "JavaScript Closures Explained",
    comment: "Best explanation of closures I’ve seen so far!",
    parentComment: "",
    author: {
      fullName: "Daniel Martinez",
      avatarUrl: "https://i.pravatar.cc/150?img=7",
    },
    status: "approved",
    createdAt: "2024-07-04T09:00:00Z",
  },
  {
    id: 8,
    postTitle: "JavaScript Closures Explained",
    comment: "Still a bit confused about lexical scoping.",
    parentComment: "7",
    author: {
      fullName: "Olivia Garcia",
      avatarUrl: "https://i.pravatar.cc/150?img=8",
    },
    status: "rejected",
    createdAt: "2024-07-04T10:30:00Z",
  },
  {
    id: 9,
    postTitle: "A Deep Dive into Redux Toolkit",
    comment: "What’s the difference between Redux and Redux Toolkit?",
    parentComment: "",
    author: {
      fullName: "Liam Robinson",
      avatarUrl: "https://i.pravatar.cc/150?img=9",
    },
    status: "approved",
    createdAt: "2024-07-05T13:00:00Z",
  },
  {
    id: 10,
    postTitle: "A Deep Dive into Redux Toolkit",
    comment: "Redux Toolkit saved me so much time!",
    parentComment: "",
    author: {
      fullName: "Isabella Moore",
      avatarUrl: "https://i.pravatar.cc/150?img=10",
    },
    status: "approved",
    createdAt: "2024-07-05T14:00:00Z",
  },
];
