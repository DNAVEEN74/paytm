import { atom, selector } from 'recoil';
import axios from 'axios';

export const userAtom = atom({
  key: 'userAtom',
  default: {
    firstname: '',
    lastname: '',
    userId: '',
  }
})

export const recepientAtom = atom({
  key: 'receipientAtom',
  default: {
    firstname: '',
    lastname: '',
    recipientId: ''
  }
})

export const userListSelector = selector({
  key: 'userListSelector',
  get: async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:3000/api/v1/user/bulk", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.user;
    } catch (err) {
      console.error("Error fetching users:", err);
      return [];
    }
  },
});