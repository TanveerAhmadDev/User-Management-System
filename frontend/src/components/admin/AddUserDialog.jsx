// import React, { useState } from "react";
// import { Plus } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   SelectGroup,
// } from "@/components/ui/select";

// const AddUserDialog = ({ newUser, setNewUser, onSubmit }) => {
//   const [open, setOpen] = useState(false);

//   const roles = ["User", "Admin"];
//   const statuses = ["Active", "Inactive"];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const success = await onSubmit(e);

//     if (success) {
//       setOpen(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger
//         render={
//           <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto">
//             <Plus className="mr-2 size-4" />
//             Add User
//           </Button>
//         }
//       />

//       <DialogContent className="border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 sm:max-w-125">
//         <DialogHeader>
//           <DialogTitle>Add New User</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name */}
//           <div className="space-y-2">
//             <Label>Full Name</Label>

//             <Input
//               value={newUser.name}
//               onChange={(e) =>
//                 setNewUser({
//                   ...newUser,
//                   name: e.target.value,
//                 })
//               }
//               placeholder="Ali Khan"
//               className="h-10 rounded-xl"
//             />
//           </div>

//           {/* Username */}
//           <div className="space-y-2">
//             <Label>Username</Label>

//             <Input
//               value={newUser.username}
//               onChange={(e) =>
//                 setNewUser({
//                   ...newUser,
//                   username: e.target.value,
//                 })
//               }
//               placeholder="ali123"
//               className="h-10 rounded-xl"
//             />
//           </div>

//           {/* Email */}
//           <div className="space-y-2">
//             <Label>Email</Label>

//             <Input
//               type="email"
//               value={newUser.email}
//               onChange={(e) =>
//                 setNewUser({
//                   ...newUser,
//                   email: e.target.value,
//                 })
//               }
//               placeholder="ali@example.com"
//               className="h-10 rounded-xl"
//             />
//           </div>

//           {/* Phone */}
//           <div className="space-y-2">
//             <Label>Phone</Label>

//             <Input
//               value={newUser.phone}
//               onChange={(e) =>
//                 setNewUser({
//                   ...newUser,
//                   phone: e.target.value,
//                 })
//               }
//               placeholder="+92 300 1234567"
//               className="h-10 rounded-xl"
//             />
//           </div>

//           {/* Password */}
//           <div className="space-y-2">
//             <Label>Password</Label>

//             <Input
//               type="password"
//               value={newUser.password}
//               onChange={(e) =>
//                 setNewUser({
//                   ...newUser,
//                   password: e.target.value,
//                 })
//               }
//               placeholder="Enter password"
//               className="h-10 rounded-xl"
//             />
//           </div>

//           {/* Role */}
//           <div className="space-y-2">
//             <Label>Role</Label>

//             <Select
//               value={newUser.role}
//               onValueChange={(value) =>
//                 setNewUser({
//                   ...newUser,
//                   role: value,
//                 })
//               }
//             >
//               <SelectTrigger className="h-10 w-full rounded-xl">
//                 <SelectValue placeholder="Select role" />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectGroup>
//                   {roles.map((role) => (
//                     <SelectItem key={role} value={role}>
//                       {role}
//                     </SelectItem>
//                   ))}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Status */}
//           <div className="space-y-2">
//             <Label>Status</Label>

//             <Select
//               value={newUser.status}
//               onValueChange={(value) =>
//                 setNewUser({
//                   ...newUser,
//                   status: value,
//                 })
//               }
//             >
//               <SelectTrigger className="h-10 w-full rounded-xl">
//                 <SelectValue placeholder="Select status" />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectGroup>
//                   {statuses.map((status) => (
//                     <SelectItem key={status} value={status}>
//                       {status}
//                     </SelectItem>
//                   ))}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>

//           <Button
//             type="submit"
//             className="h-10 w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
//           >
//             Create User
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddUserDialog;

import React, { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

const AddUserDialog = ({ newUser, setNewUser, onSubmit }) => {
  const [open, setOpen] = useState(false);

  const roles = ["User", "Admin"];
  const statuses = ["Active", "Inactive"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await onSubmit(e);

    if (success) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto">
            <Plus className="mr-2 size-4" />
            Add User
          </Button>
        }
      />

      <DialogContent
        className="
          w-[calc(100%-1.5rem)]
          max-w-[calc(100%-1.5rem)]
          gap-0
          overflow-hidden
          border-zinc-200
          bg-white
          p-0
          text-zinc-900
          dark:border-zinc-800
          dark:bg-zinc-900
          dark:text-zinc-100
          sm:max-w-125
        "
      >
        {/* Header */}
        <DialogHeader className="border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
          <DialogTitle className="text-lg">Add New User</DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="custom-scrollbar max-h-[calc(100dvh-7rem)] overflow-y-auto px-5 py-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>

              <Input
                id="name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    name: e.target.value,
                  })
                }
                placeholder="Ali Khan"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>

              <Input
                id="username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    username: e.target.value,
                  })
                }
                placeholder="ali123"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    email: e.target.value,
                  })
                }
                placeholder="ali@example.com"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>

              <Input
                id="phone"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    phone: e.target.value,
                  })
                }
                placeholder="+92 300 1234567"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    password: e.target.value,
                  })
                }
                placeholder="Enter password"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label>Role</Label>

              <Select
                value={newUser.role}
                onValueChange={(value) =>
                  setNewUser({
                    ...newUser,
                    role: value,
                  })
                }
              >
                <SelectTrigger className="h-10 w-full rounded-xl">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>

              <Select
                value={newUser.status}
                onValueChange={(value) =>
                  setNewUser({
                    ...newUser,
                    status: value,
                  })
                }
              >
                <SelectTrigger className="h-10 w-full rounded-xl">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="h-10 w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Create User
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
