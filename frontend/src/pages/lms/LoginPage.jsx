import { useEffect, useState } from "react";
import { useLms } from "../../context/LmsContext";

function LoginPage({ setPage }) {
  const { login } = useLms();

  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState(null);
  const [lockoutSeconds, setLockoutSeconds] = useState(null);

  useEffect(() => {
    if (
      lockoutSeconds === null ||
      lockoutSeconds <= 0
    ) {
      return;
    }

    const timer = setInterval(() => {

      setLockoutSeconds((seconds) => {

        if (seconds <= 1) {
          clearInterval(timer);
          return null;
        }

        return seconds - 1;
      });

    }, 1000);

    return () => clearInterval(timer);

  }, [lockoutSeconds]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await login(
        employeeNumber,
        password
      );

      setAttemptsRemaining(null);
      setLockoutSeconds(null);

      if (user.role === "HR") {
        setPage("hr-leave-requests");
      } else {
        setPage("dashboard");
      }
    } catch (error) {

        setError(error.message);

        setAttemptsRemaining(
            error.attemptsRemaining ?? null
        );

        setLockoutSeconds(
            error.retryAfterSeconds ?? null
        );
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
            <div
              className="text-sm"
              style={{
                color: "var(--red)"
              }}
            >
              <p>{error}</p>

              {attemptsRemaining !== null &&
                attemptsRemaining > 0 && (
                  <p className="mt-1">
                    {attemptsRemaining}{" "}
                    {attemptsRemaining === 1
                      ? "attempt"
                      : "attempts"}{" "}
                    remaining.
                  </p>
                )}

              {lockoutSeconds !== null && (
                <p className="mt-1">
                  Try again in{" "}
                  <strong>{lockoutSeconds}</strong>{" "}
                  seconds.
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="fj-btn-primary justify-center text-sm"
            disabled={
              loading ||
              lockoutSeconds !== null
            }
          >
            {loading
              ? "Signing in..."
              : lockoutSeconds !== null
                ? `Try again in ${lockoutSeconds}s`
                : "Sign In"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default LoginPage;