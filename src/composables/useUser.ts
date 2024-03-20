import { ref } from "vue";

import { IUserResponseData, IUser } from "../interfaces/user";

export default function useUser() {
  const loadingUsers = ref(false);
  const users = ref<IUser[]>([]);
  const loadUsersError = ref("");
  const loadUsers = async () => {
    try {
      const url = "https://raw.githubusercontent.com/klausapp/frontend-engineer-test-task/master/users.json";
      loadingUsers.value = true;
      loadUsersError.value = "";
      const response = await fetch(encodeURI(url));

      if (response.status !== 200) throw new Error("Failed to fetch data");

      const data: IUserResponseData = await response.json();

      users.value = data.users.map((user) => ({ ...user, checked: false }));
    } catch (err) {
      console.error("Error when fetching data: ", err);
      loadUsersError.value = "Failed to fetch data. Try again later.";
    } finally {
      loadingUsers.value = false;
    }
  };

  return {
    loadingUsers,
    users,
    loadUsersError,
    loadUsers,
  };
}
