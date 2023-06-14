export const Button = ({ children }: { children: React.ReactNode }) => (
    <button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-0.5 px-1 rounded">
        {children}
    </button>
);