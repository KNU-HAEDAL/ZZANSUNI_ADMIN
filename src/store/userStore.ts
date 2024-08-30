import {UserInfoModel} from "@/api/user/user.response.ts";
import {create} from "zustand";

interface UserStore {
  user?: UserInfoModel;
  setUser: (user: UserInfoModel) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: function (user: UserInfoModel) {
    set({user: user});
  },
  resetUser: function () {
    set({user: undefined});
  }
}));