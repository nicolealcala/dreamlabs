import AdminForm from "@/components/adminControls/AdminForm";
import { addBlog } from "@/lib/actions";

export const metadata = {
  title: "Admin",
  description: "DreamLabs admin page",
};

const Admin = () => {
  return (
    <div className="row mx-0">
      <div className="col-12 col-lg-6"></div>
      <div className="col-12 col-lg-6">
        <AdminForm />
      </div>
    </div>
  );
};

export default Admin;
