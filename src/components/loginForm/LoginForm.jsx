"use client";
import { githubLogin, login } from "@/lib/actions";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [loginState, setLoginState] = useFormState(login, undefined);

  const router = useRouter();

  useEffect(() => {
    loginState?.success && router.push("/");
  }, [loginState?.success, router]);
  return (
    <div
      className="pt-5 pb-4 px-4 rounded-4 align-self-center inputForm"
      data-bs-theme="dark"
      style={{ maxWidth: "450px" }}
    >
      <form action={setLoginState}>
        <h2 className="text-center txt-weight-mid mb-3">Sign in</h2>

        <div className="row mx-0" style={{ rowGap: "12px" }}>
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
            <div className="d-flex justify-content-between align-items-center">
              <label htmlFor="password" className="text-muted required">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="txt-color-mid txt-size-md txt-weight-mid text-decoration-none"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              className="form-control border border-secondary"
              name="password"
              required
            />
          </div>

          {loginState?.error && (
            <div className="col-12">
              <p className="border border-danger rounded-3 bg-danger-subtle my-0 p-2">
                {loginState.error}
              </p>
            </div>
          )}
          <div className="col-12 mb-3">
            <button
              type="submit"
              className="btn primary-btn w-100 txt-weight-mid py-2"
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
      <div className="d-flex align-items-center w-100 px-5">
        <hr className="w-100" />
        <span className="text-muted mx-3">or</span>
        <hr className="w-100" />
      </div>
      <form action={githubLogin} style={{ padding: "10px" }}>
        <button
          className="btn d-flex justify-content-center align-items-center py-2"
          id="githubBtn"
        >
          <Image
            src="/github.png"
            alt="Github icon"
            width={25}
            height={25}
            style={{ marginRight: "12px" }}
          />
          Sign in with Github
        </button>
      </form>
      <div className="col-12 d-flex justify-content-center mt-4">
        New user? &nbsp;
        <Link href="/register" className="txt-weight-mid link">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
