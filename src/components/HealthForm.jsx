import { useState, useEffect } from 'react';

const emptyForm = {
  date: '',
  caloriesIntake: '',
  caloriesBurned: '',
  description: '',
};

const HealthForm = ({ isOpen, onClose, onSubmit, editRecord }) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(editRecord);

  useEffect(() => {
    if (editRecord) {
      setForm({
        date: editRecord.date,
        caloriesIntake: editRecord.caloriesIntake,
        caloriesBurned: editRecord.caloriesBurned,
        description: editRecord.description,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [editRecord, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!form.date) newErrors.date = 'Date is required.';
    if (!form.caloriesIntake || Number(form.caloriesIntake) < 0)
      newErrors.caloriesIntake = 'Enter a valid calorie intake.';
    if (!form.caloriesBurned || Number(form.caloriesBurned) < 0)
      newErrors.caloriesBurned = 'Enter valid calories burned.';
    if (!form.description.trim()) newErrors.description = 'Description is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      ...form,
      caloriesIntake: Number(form.caloriesIntake),
      caloriesBurned: Number(form.caloriesBurned),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h2>
          {isEditMode
            ? "Let's see what you want to change!"
            : 'Add Data'}
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <p className="error-msg">{errors.date}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="caloriesIntake">Calories Intake</label>
            <input
              id="caloriesIntake"
              name="caloriesIntake"
              type="number"
              placeholder="Enter Today's Calorie Intake"
              value={form.caloriesIntake}
              onChange={handleChange}
              className={errors.caloriesIntake ? 'error' : ''}
              min="0"
            />
            {errors.caloriesIntake && <p className="error-msg">{errors.caloriesIntake}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="caloriesBurned">Calories Burned</label>
            <input
              id="caloriesBurned"
              name="caloriesBurned"
              type="number"
              placeholder="Enter Today's Calorie Burned"
              value={form.caloriesBurned}
              onChange={handleChange}
              className={errors.caloriesBurned ? 'error' : ''}
              min="0"
            />
            {errors.caloriesBurned && <p className="error-msg">{errors.caloriesBurned}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Short Description</label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Enter a short description"
              value={form.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <p className="error-msg">{errors.description}</p>}
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-submit">Submit</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthForm;
