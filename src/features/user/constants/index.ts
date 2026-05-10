export const USER_COMPONENTS = {
  UserProfile: "UserProfile",
  UserProfileUpdate: "UserProfileUpdate",
  MyPosts: "MyPosts",
  ChangePassword: "ChangePassword",
  MyFriends: "MyFriends",
  MyComments: "MyComments",
} as const;
export type UserComponent =
  (typeof USER_COMPONENTS)[keyof typeof USER_COMPONENTS];
