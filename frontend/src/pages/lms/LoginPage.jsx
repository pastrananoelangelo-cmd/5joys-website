import { useState } from "react";
import { useLms } from "../../context/LmsContext";

function LoginPage({ setPage }) {
  const { login } = useLms();

  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await login(
        employeeNumber,
        password
      );

      if (user.role === "HR") {
        setPage("hr-leave-requests");
      } else {
        setPage("dashboard");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="lms-shell"
      style={{
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        className="fj-card p-8"
        style={{
          maxWidth: 420,
          width: "100%"
        }}
      >
        <div className="flex items-center gap-2.5 mb-1">
          <span
            aria-hidden="true"
            className="inline-flex h-9 px-2.5 items-center justify-center fj-display font-semibold text-base"
            style={{
              background: "var(--red)",
              color: "var(--gold)",
              borderRadius: "10px",
            }}
          >
            5<span style={{ color: "var(--cyan)" }}>JOYS</span>
          </span>
        </div>

        <p
          className="text-sm mb-6"
          style={{
            color: "var(--ink-soft)"
          }}
        >
          Sign in using your 5JOYS account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          <div>
            <label className="block text-sm font-semibold mb-1">
              Employee ID
            </label>

            <input
              type="text"
              value={employeeNumber}
              onChange={(event) =>
                setEmployeeNumber(event.target.value)
              }
              className="w-full"
              placeholder="Enter your employee ID"
              required
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              className="w-full"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p
              className="text-sm"
              style={{
                color: "var(--red)"
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="fj-btn-primary justify-center text-sm"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default LoginPage;