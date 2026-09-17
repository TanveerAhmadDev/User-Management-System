import React, { useEffect, useMemo, useState } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminStats from "@/components/admin/AdminStats";
import AddUserDialog from "@/components/admin/AddUserDialog";
import UsersTable from "@/components/admin/UsersTable";
import UserDetails from "@/components/admin/UserDetails";
import DeleteUserDialog from "@/components/admin/DeleteUserDialog";
import EditUserDialog from "@/components/admin/EditUserDialog";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import axios from "axios";
import api from "@/utils/api";

const AdminDashboard = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [deleteUser, setDeleteUser] = useState(null);

  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "User",
    status: "Active",
  });

  // ================= SEARCH =================

  const handleSearch = async (value) => {
    setSearch(value);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users?search=${encodeURIComponent(value)}`,
        {
          withCredentials: true,
        },
      );

      setUsers(response.data.data);
    } catch (error) {
      console.error(
        "Search users error:",
        error.response?.data || error.message,
      );
    }
  };

  // ================= STATISTICS =================

  const totalUsers = users.length;

  const activeUsers = users.filter((user) => user.status === "Active").length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive",
  ).length;

  // ================= ADD USER =================

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (
      !newUser.name ||
      !newUser.username ||
      !newUser.email ||
      !newUser.password
    ) {
      toast.error("Please fill all required fields.");
      return false;
    }

    try {
      const createUserPromise = api.post(`/admin/addUser`, newUser, {
        withCredentials: true,
      });

      toast.promise(createUserPromise, {
        loading: "Creating user...",
        success: "User created successfully.",
        error: "Failed to create user.",
      });

      const response = await createUserPromise;

      console.log("Create user response:", response);

      const createdUser = response.data.data;

      setUsers((previousUsers) => [...previousUsers, createdUser]);

      setNewUser({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        role: "User",
        status: "Active",
      });

      return true;
    } catch (error) {
      console.error(
        "Create user error:",
        error.response?.data || error.message,
      );

      return false;
    }
  };

  const handleEditUser = async (formData) => {
    if (!editUser) {
      return false;
    }

    if (!formData.name || !formData.username || !formData.email) {
      toast.error("Name, username and email are required.");
      return false;
    }

    const updateData = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      status: formData.status,
    };

    if (formData.password) {
      updateData.password = formData.password;
    }

    try {
      const updateUserPromise = api.patch(
        `/admin/users/${editUser._id}`,
        updateData,
        {
          withCredentials: true,
        },
      );

      toast.promise(updateUserPromise, {
        loading: "Updating user...",
        success: "User updated successfully.",
        error: "Failed to update user.",
      });

      const response = await updateUserPromise;

      const updatedUser = response.data.data;

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user,
        ),
      );

      if (selectedUser?._id === updatedUser._id) {
        setSelectedUser(updatedUser);
      }

      return true;
    } catch (error) {
      console.error(
        "Update user error:",
        error.response?.data || error.message,
      );

      return false;
    }
  };

  // ================= DELETE USER =================

  const handleDelete = (user) => {
    setDeleteUser(user);
  };

  const confirmDelete = async () => {
    if (!deleteUser) return;

    try {
      const deleteUserPromise = api.delete(`/admin/users/${deleteUser._id}`, {
        withCredentials: true,
      });

      toast.promise(deleteUserPromise, {
        loading: "Deleting user...",
        success: "User deleted successfully.",
        error: "Failed to delete user.",
      });

      await deleteUserPromise;

      setUsers((previousUsers) =>
        previousUsers.filter((user) => user._id !== deleteUser._id),
      );

      if (selectedUser?._id === deleteUser._id) {
        setSelectedUser(null);
      }

      setDeleteUser(null);
    } catch (error) {
      console.error(
        "Delete user error:",
        error.response?.data || error.message,
      );
    }
  };

  const handleLogout = async () => {
    try {
      await api.post(
        `/admin/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      localStorage.removeItem("user");

      toast.success("Logged out successfully.");

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);

      localStorage.removeItem("user");

      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await api.get(
          `/admin/users?search=${encodeURIComponent(search)}`,
          {
            withCredentials: true,
          },
        );

        setUsers(response.data.data);
      } catch (error) {
        console.error(
          "Search users error:",
          error.response?.data || error.message,
        );
      }
    }, 300);

    // Cancel previous timer when user types again
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const usersFetch = async () => {
      try {
        const result = await api.get(`/admin/users`, { withCredentials: true });
        setUsers(result?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    usersFetch();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <AdminHeader onLogout={handleLogout} user={user} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Welcome */}
        <div className="mb-7">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Welcome, {user?.name}
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage users and their records from here.
          </p>
        </div>

        {/* Statistics */}
        <AdminStats
          totalUsers={totalUsers}
          activeUsers={activeUsers}
          inactiveUsers={inactiveUsers}
        />

        {/* Users */}
        <UsersTable
          users={users}
          search={search}
          setSearch={setSearch}
          onAddUser={handleAddUser}
          newUser={newUser}
          setNewUser={setNewUser}
          onViewUser={setSelectedUser}
          onDeleteUser={handleDelete}
          onEditUser={setEditUser}
        />

        {/* Selected User */}
        {selectedUser && (
          <UserDetails
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </main>

      {/* Delete Confirmation */}
      <DeleteUserDialog
        user={deleteUser}
        open={!!deleteUser}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteUser(null);
          }
        }}
        onConfirm={confirmDelete}
      />

      <EditUserDialog
        user={editUser}
        open={!!editUser}
        onOpenChange={(open) => {
          if (!open) {
            setEditUser(null);
          }
        }}
        onSubmit={handleEditUser}
      />
    </div>
  );
};

export default AdminDashboard;
