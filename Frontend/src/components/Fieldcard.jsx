function Field({ label, placeholder, value, onChange }) {
    return (
        <label className="grid grid-cols-[140px_1fr] items-center gap-4 mb-4">
            <span className="text-primary">{label}</span>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="input"
            />
        </label>
    );
}

export default Field;
