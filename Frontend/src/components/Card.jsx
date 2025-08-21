function Card({ title, children }) {
    return (
        <section className="mx-auto max-w-xl w-full">
            <h1 className="text-center text-2xl font-semibold mb-6"
                style={{ color: "#B9375D" }}>
                {title}
            </h1>

            <div className="rounded-2xl bg-white p-6 shadow-sm border"
                style={{ borderColor: "#E7D3D3" }}>
                {children}
            </div>
        </section>
    );
}

export default Card;