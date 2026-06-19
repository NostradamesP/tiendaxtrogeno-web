export default function SizeSelector({ sizes, selected, onChange }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-2">Talla</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={`px-4 py-2 text-sm font-medium border transition-all ${
              selected === size
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-200 text-gray-600 hover:border-gray-400'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
