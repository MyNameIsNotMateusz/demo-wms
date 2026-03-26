import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_API_URL, DEFAULT_HEADERS } from "../../../api/config";

export const fetchUsers = createAsyncThunk(
  "userManagementFormSlice/fetchUsers",
  async (token) => {
    try {
      const response = await fetch(`${BASE_API_URL}common/users/`, {
        headers: DEFAULT_HEADERS(token),
      });

      if (!response.ok) {
        console.error("Error loading users:", response.status);
        throw new Error("Failed to load users.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
);

const initialState = {
  userRows: [],
  userSortConfig: {},
  userFilters: {},
  isLoading: false,
  isError: false,
};

const userManagementFormSlice = createSlice({
  name: "userManagementForm",
  initialState,
  reducers: {
    setUserSortConfig: (state, action) => {
      const index = action.payload;

      if (state.userSortConfig[index] == null) {
        state.userSortConfig = {
          [index]: "asc",
        };
      } else {
        const order = state.userSortConfig[index];

        switch (order) {
          case "asc":
            state.userSortConfig = {
              [index]: "desc",
            };
            break;
          case "desc":
            state.userSortConfig = {
              [index]: "original",
            };
            break;
          case "original":
            state.userSortConfig = {
              [index]: "asc",
            };
            break;
        }
      }
    },
    setUserFilters: (state, action) => {
      const { index, value } = action.payload;
      const newFilters = {
        ...state.userFilters,
        [index]: value,
      };

      if (Object.values(newFilters).every((val) => val === "")) {
        state.userFilters = {};
      } else {
        state.userFilters = newFilters;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.userRows = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userManagementFormSlice.reducer;

export const { setUserSortConfig, setUserFilters } =
  userManagementFormSlice.actions;
