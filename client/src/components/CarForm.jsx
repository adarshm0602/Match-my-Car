import { useState } from 'react';
import './CarForm.css';

const BODY_TYPES = ['Hatchback', 'Sedan', 'SUV', 'MUV', 'Coupe'];
const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
const TRANSMISSIONS = ['Manual', 'Automatic', 'iMT', 'CVT', 'AMT'];

const emptyVariant = { name: '', price: '', fuelType: 'Petrol', transmission: 'Manual', mileage: '' };

const buildInitialState = (data) => {
  if (!data) {
    return {
      brand: '',
      model: '',
      bodyType: 'SUV',
      seatingCapacity: 5,
      launchYear: new Date().getFullYear(),
      images: '',
      engine: { engineCapacity: '', cylinders: '', maxPower: '', maxTorque: '' },
      safety: { airbags: 2, abs: true, esc: false, rearCamera: true, globalNCAPRating: 0 },
      variants: [{ ...emptyVariant }],
    };
  }
  return {
    brand: data.brand || '',
    model: data.model || '',
    bodyType: data.bodyType || 'SUV',
    seatingCapacity: data.seatingCapacity || 5,
    launchYear: data.launchYear || new Date().getFullYear(),
    images: (data.images || []).join(', '),
    engine: {
      engineCapacity: data.engine?.engineCapacity ?? '',
      cylinders: data.engine?.cylinders ?? '',
      maxPower: data.engine?.maxPower ?? '',
      maxTorque: data.engine?.maxTorque ?? '',
    },
    safety: {
      airbags: data.safety?.airbags ?? 2,
      abs: data.safety?.abs ?? false,
      esc: data.safety?.esc ?? false,
      rearCamera: data.safety?.rearCamera ?? false,
      globalNCAPRating: data.safety?.globalNCAPRating ?? 0,
    },
    variants: data.variants?.length
      ? data.variants.map((v) => ({
          name: v.name || '',
          price: v.price || '',
          fuelType: v.fuelType || 'Petrol',
          transmission: v.transmission || 'Manual',
          mileage: v.mileage ?? '',
        }))
      : [{ ...emptyVariant }],
  };
};

const CarForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState(() => buildInitialState(initialData));
  const [submitting, setSubmitting] = useState(false);
  const isEdit = !!initialData;

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const setEngine = (field, value) =>
    setForm((prev) => ({ ...prev, engine: { ...prev.engine, [field]: value } }));
  const setSafety = (field, value) =>
    setForm((prev) => ({ ...prev, safety: { ...prev.safety, [field]: value } }));

  const setVariant = (idx, field, value) =>
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) => (i === idx ? { ...v, [field]: value } : v)),
    }));

  const addVariant = () => setForm((prev) => ({ ...prev, variants: [...prev.variants, { ...emptyVariant }] }));
  const removeVariant = (idx) =>
    setForm((prev) => ({ ...prev, variants: prev.variants.filter((_, i) => i !== idx) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        brand: form.brand.trim(),
        model: form.model.trim(),
        bodyType: form.bodyType,
        seatingCapacity: Number(form.seatingCapacity),
        launchYear: Number(form.launchYear),
        images: form.images
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        engine: {
          engineCapacity: form.engine.engineCapacity ? Number(form.engine.engineCapacity) : undefined,
          cylinders: form.engine.cylinders ? Number(form.engine.cylinders) : undefined,
          maxPower: form.engine.maxPower || undefined,
          maxTorque: form.engine.maxTorque || undefined,
        },
        safety: {
          airbags: Number(form.safety.airbags),
          abs: form.safety.abs,
          esc: form.safety.esc,
          rearCamera: form.safety.rearCamera,
          globalNCAPRating: Number(form.safety.globalNCAPRating),
        },
        variants: form.variants.map((v) => ({
          name: v.name.trim(),
          price: Number(v.price),
          fuelType: v.fuelType,
          transmission: v.transmission,
          mileage: v.mileage ? Number(v.mileage) : undefined,
        })),
      };
      await onSubmit(payload);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Edit Car' : 'Add New Car'}</h2>

      {/* Basic Info */}
      <fieldset>
        <legend>Basic Info</legend>
        <div className="form-grid">
          <label>
            Brand *
            <input required value={form.brand} onChange={(e) => set('brand', e.target.value)} />
          </label>
          <label>
            Model *
            <input required value={form.model} onChange={(e) => set('model', e.target.value)} />
          </label>
          <label>
            Body Type
            <select value={form.bodyType} onChange={(e) => set('bodyType', e.target.value)}>
              {BODY_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label>
            Seating Capacity
            <input type="number" min="2" max="12" value={form.seatingCapacity} onChange={(e) => set('seatingCapacity', e.target.value)} />
          </label>
          <label>
            Launch Year
            <input type="number" min="1990" max="2030" value={form.launchYear} onChange={(e) => set('launchYear', e.target.value)} />
          </label>
          <label className="full-width">
            Image URLs (comma-separated)
            <input value={form.images} onChange={(e) => set('images', e.target.value)} placeholder="https://..." />
          </label>
        </div>
      </fieldset>

      {/* Engine */}
      <fieldset>
        <legend>Engine</legend>
        <div className="form-grid">
          <label>
            Capacity (cc)
            <input type="number" min="0" value={form.engine.engineCapacity} onChange={(e) => setEngine('engineCapacity', e.target.value)} />
          </label>
          <label>
            Cylinders
            <input type="number" min="1" max="16" value={form.engine.cylinders} onChange={(e) => setEngine('cylinders', e.target.value)} />
          </label>
          <label>
            Max Power
            <input value={form.engine.maxPower} onChange={(e) => setEngine('maxPower', e.target.value)} placeholder="115 bhp" />
          </label>
          <label>
            Max Torque
            <input value={form.engine.maxTorque} onChange={(e) => setEngine('maxTorque', e.target.value)} placeholder="250 Nm" />
          </label>
        </div>
      </fieldset>

      {/* Safety */}
      <fieldset>
        <legend>Safety</legend>
        <div className="form-grid">
          <label>
            Airbags
            <input type="number" min="0" value={form.safety.airbags} onChange={(e) => setSafety('airbags', e.target.value)} />
          </label>
          <label>
            NCAP Rating
            <select value={form.safety.globalNCAPRating} onChange={(e) => setSafety('globalNCAPRating', e.target.value)}>
              {[0, 1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" checked={form.safety.abs} onChange={(e) => setSafety('abs', e.target.checked)} /> ABS
            </label>
            <label className="checkbox-label">
              <input type="checkbox" checked={form.safety.esc} onChange={(e) => setSafety('esc', e.target.checked)} /> ESC
            </label>
            <label className="checkbox-label">
              <input type="checkbox" checked={form.safety.rearCamera} onChange={(e) => setSafety('rearCamera', e.target.checked)} /> Rear Camera
            </label>
          </div>
        </div>
      </fieldset>

      {/* Variants */}
      <fieldset>
        <legend>Variants</legend>
        {form.variants.map((v, idx) => (
          <div key={idx} className="variant-row">
            <div className="variant-header">
              <span>Variant {idx + 1}</span>
              {form.variants.length > 1 && (
                <button type="button" className="btn-remove" onClick={() => removeVariant(idx)}>Remove</button>
              )}
            </div>
            <div className="form-grid">
              <label>
                Name *
                <input required value={v.name} onChange={(e) => setVariant(idx, 'name', e.target.value)} />
              </label>
              <label>
                Price (₹) *
                <input required type="number" min="0" value={v.price} onChange={(e) => setVariant(idx, 'price', e.target.value)} />
              </label>
              <label>
                Fuel Type
                <select value={v.fuelType} onChange={(e) => setVariant(idx, 'fuelType', e.target.value)}>
                  {FUEL_TYPES.map((f) => <option key={f}>{f}</option>)}
                </select>
              </label>
              <label>
                Transmission
                <select value={v.transmission} onChange={(e) => setVariant(idx, 'transmission', e.target.value)}>
                  {TRANSMISSIONS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label>
                Mileage (km/l)
                <input type="number" min="0" value={v.mileage} onChange={(e) => setVariant(idx, 'mileage', e.target.value)} />
              </label>
            </div>
          </div>
        ))}
        <button type="button" className="btn-add-variant" onClick={addVariant}>+ Add Variant</button>
      </fieldset>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-submit" disabled={submitting}>
          {submitting ? 'Saving...' : isEdit ? 'Update Car' : 'Add Car'}
        </button>
      </div>
    </form>
  );
};

export default CarForm;
