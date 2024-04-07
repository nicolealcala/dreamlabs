import PostTable from "@/components/adminControls/PostsTable";
import UserTable from "@/components/adminControls/UsersTable";
import { auth } from "@/lib/auth";
import { getUsers, getBlogs } from "@/lib/data";

export const metadata = {
  title: "Admin",
  description: "DreamLabs admin page",
};

const Admin = async () => {
  const users = await getUsers();
  const blogs = await getBlogs();
  const session = await auth();
  return (
    <div className="row mx-0 h-100 flex-grow-1 py-5">
      <div className="col-12 col-lg-6 h-100">
        <UserTable users={users} session={session} />
      </div>
      <div className="col-12 col-lg-6 h-100">
        <PostTable blogs={blogs} />
      </div>
    </div>
  );
};

export default Admin;
