import { useState } from "react";

function GovernmentIdForm({
  employee,
  sensitiveEmployee,
  onCancel,
  onSubmit,
}) {
  const [sssNumber, setSssNumber] = useState(
    sensitiveEmployee?.sssNumber || ""
  );

  const [pagibigNumber, setPagibigNumber] = useState(
    sensitiveEmployee?.pagibigNumber || ""
  );

  const [philhealthNumber, setPhilhealthNumber] = useState(
    sensitiveEmployee?.philhealthNumber || ""
  );

  const [tinNumber, setTinNumber] = useState(
    sensitiveEmployee?.tinNumber || ""
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      sssNumber,
      pagibigNumber,
      philhealthNumber,
      tinNumber,
    });
  };

  return (
    <div
      className="lms-modal-backdrop"
      onClick={onCancel}
    >
      <div
        className="lms-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="fj-display text-xl font-semibold mb-1">
          Government Identification
        </h2>

        <p
          className="text-sm mb-6"
          style={{ color: "var(--ink-soft)" }}
        >
          {employee.employeeName}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="lms-field-label">
              SSS Number
            </label>

            <input
              className="lms-field-input"
              value={sssNumber}
              onChange={(event) =>
                setSssNumber(event.target.value)
              }
            />
          </div>

          <div>
            <label className="lms-field-label">
              Pag-IBIG Number
            </label>

            <input
              className="lms-field-input"
              value={pagibigNumber}
              onChange={(event) =>
                setPagibigNumber(event.target.value)
              }
            />
          </div>

          <div>
            <label className="lms-field-label">
              PhilHealth Number
            </label>

            <input
              className="lms-field-input"
              value={philhealthNumber}
              onChange={(event) =>
                setPhilhealthNumber(event.target.value)
              }
            />
          </div>

          <div>
            <label className="lms-field-label">
              TIN
            </label>

            <input
              className="lms-field-input"
              value={tinNumber}
              onChange={(event) =>
                setTinNumber(event.target.value)
              }
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GovernmentIdForm;