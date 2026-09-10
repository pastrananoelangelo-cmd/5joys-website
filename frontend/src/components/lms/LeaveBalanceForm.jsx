import { useState } from "react";

function LeaveBalanceForm({
  employee,
  leaveBalance,
  onCancel,
  onSubmit,
}) {
  const [vacationCredit, setVacationCredit] = useState(
    leaveBalance?.vacationCredit ?? 0
  );

  const [sickCredit, setSickCredit] = useState(
    leaveBalance?.sickCredit ?? 0
  );

  const [soloParentCredit, setSoloParentCredit] = useState(
    leaveBalance?.soloParentCredit ?? 0
  );

  const [maternalPaternalCredit, setMaternalPaternalCredit] =
    useState(
      leaveBalance?.maternalPaternalCredit ?? 0
    );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      vacationCredit: Number(vacationCredit),
      sickCredit: Number(sickCredit),
      soloParentCredit: Number(soloParentCredit),
      maternalPaternalCredit: Number(
        maternalPaternalCredit
      ),
    });
  };

  return (
    <div
      className="lms-modal-backdrop"
      onClick={onCancel}
    >
      <div
        className="lms-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="fj-display text-xl font-semibold mb-2">
          Edit Leave Balance
        </h2>

        <p
          className="text-sm mb-5"
          style={{ color: "var(--ink-soft)" }}
        >
          {employee?.employeeName} (
          {employee?.employeeNumber})
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="lms-field-label">
              Vacation Credit
            </label>

            <input
              type="number"
              min="0"
              step="0.5"
              className="lms-field-input"
              value={vacationCredit}
              onChange={(e) =>
                setVacationCredit(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label className="lms-field-label">
              Sick Credit
            </label>

            <input
              type="number"
              min="0"
              step="0.5"
              className="lms-field-input"
              value={sickCredit}
              onChange={(e) =>
                setSickCredit(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label className="lms-field-label">
              Solo Parent Credit
            </label>

            <input
              type="number"
              min="0"
              step="0.5"
              className="lms-field-input"
              value={soloParentCredit}
              onChange={(e) =>
                setSoloParentCredit(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label className="lms-field-label">
              Maternal / Paternal Credit
            </label>

            <input
              type="number"
              min="0"
              step="0.5"
              className="lms-field-input"
              value={maternalPaternalCredit}
              onChange={(e) =>
                setMaternalPaternalCredit(e.target.value)
              }
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="fj-btn-secondary text-sm py-2 px-4"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="fj-btn-primary text-sm py-2 px-4"
            >
              Save Leave Balance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeaveBalanceForm;