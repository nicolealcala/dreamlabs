"use client";
import { register } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const RegisterForm = () => {
  const [registrationState, setRegistrationState] = useFormState(
    register,
    undefined
  );

  const router = useRouter();

  useEffect(() => {
    registrationState?.success && router.push("/login");
  }, [registrationState?.success, router]);

  return (
    <form
      action={setRegistrationState}
      data-bs-theme="dark"
      className="pt-5 pb-4 px-4 rounded-4 align-self-center inputForm"
      style={{ maxWidth: "450px" }}
    >
      <h2 className="text-center txt-weight-mid mb-3">Register</h2>

      <div className="row mx-0" style={{ rowGap: "12px" }}>
        <div className="col-12">
          <label htmlFor="username" className="text-muted required">
            Username
          </label>
          <input
            type="text"
            className="form-control border border-secondary"
            name="username"
            required
          />
          {registrationState?.unError && (
            <p className="mt-2 mb-0 txt-size-sm text-danger">
              {registrationState?.unError}
            </p>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="email" className="text-muted required">
            Email
          </label>
          <input
            type="email"
            className="form-control border border-secondary"
            name="email"
            required
          />
        </div>

        <div className="col-12">
          <label htmlFor="password" className="text-muted required">
            Password
          </label>
          <input
            type="password"
            className="form-control border border-secondary"
            name="password"
            pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,}$"
            title="Must be at least 8 characters, including at least one number, one uppercase and lowercase letters, and one special character."
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="cpassword" className="text-muted required">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control border border-secondary"
            name="cpassword"
            required
          />
          {registrationState?.pwError && (
            <p className="mt-2 mb-0 txt-size-sm text-danger">
              {registrationState?.pwError}
            </p>
          )}
        </div>
        {/* <div className="col-12">
    <label htmlFor="img" className="text-muted">
    Profile picture
    </label>
    <input
    type="file"
    accept="image/png, image/jpeg"
    className="form-control border border-secondary"
    name="img"
    />
   </div> */}
        <div className="col-12">
          <button
            type="submit"
            className="btn primary-btn w-100 txt-weight-mid py-2"
          >
            Register
          </button>
        </div>
        <p className="text-center mt-3 text-muted mt-4">
          Already have an account?{" "}
          <Link href="/login" className="txt-weight-mid link">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
