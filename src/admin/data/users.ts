export interface User {
  id: number;
  email: string;
  fullName: string;
  totalPosts: number;
  totalComments: number;
  totalDownloads: number;
  createdAt: string;
  status: string; // I assume you meant "status", check if it's a typo.
}

// Sample list of users
export const users: User[] = [
  {
    id: 1,
    email: "john.doe@example.com",
    fullName: "John Doe",
    totalPosts: 15,
    totalComments: 25,
    totalDownloads: 50,
    createdAt: "2024-07-01T10:00:00Z",
    status: "active", // Replace with correct property if typo
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    fullName: "Jane Smith",
    totalPosts: 30,
    totalComments: 45,
    totalDownloads: 75,
    createdAt: "2024-07-02T11:30:00Z",
    status: "inactive",
  },
  {
    id: 3,
    email: "michael.brown@example.com",
    fullName: "Michael Brown",
    totalPosts: 10,
    totalComments: 12,
    totalDownloads: 20,
    createdAt: "2024-07-03T09:15:00Z",
    status: "banned",
  },
  {
    id: 4,
    email: "emily.jones@example.com",
    fullName: "Emily Jones",
    totalPosts: 20,
    totalComments: 30,
    totalDownloads: 40,
    createdAt: "2024-07-04T14:45:00Z",
    status: "active",
  },
  {
    id: 5,
    email: "william.taylor@example.com",
    fullName: "William Taylor",
    totalPosts: 5,
    totalComments: 8,
    totalDownloads: 12,
    createdAt: "2024-07-05T16:00:00Z",
    status: "inactive",
  },
];
