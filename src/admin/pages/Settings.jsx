import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { getConfig, saveConfig } from '../utils/storage';

export default function Settings() {
  const [form, setForm] = useState(getConfig);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(getConfig());
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleHourChange = (day, value) => {
    setForm((prev) => ({
      ...prev,
      hours: { ...prev.hours, [day]: value },
    }));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveConfig(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Configuración</h1>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Información de la Tienda
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <input
                type="text"
                value={form.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Horario</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-24">Lun - Vie</span>
                <input
                  type="text"
                  value={form.hours.weekdays}
                  onChange={(e) => handleHourChange('weekdays', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-24">Sábado</span>
                <input
                  type="text"
                  value={form.hours.saturday}
                  onChange={(e) => handleHourChange('saturday', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-24">Domingo</span>
                <input
                  type="text"
                  value={form.hours.sunday}
                  onChange={(e) => handleHourChange('sunday', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          <Save className="w-4 h-4" />
          {saved ? '¡Guardado!' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}
