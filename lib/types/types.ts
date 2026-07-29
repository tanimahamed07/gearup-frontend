export type IUser = {
  success: boolean;
  message: string;
  data: {
    profile: {
      name: string;
      id: string;
      email: string;
      role: "USER" | "PROVIDER" | "ADMIN";
      status: string;
      phone: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  };
};
