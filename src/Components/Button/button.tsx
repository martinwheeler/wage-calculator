export const Button = ({ children }: { children: React.ReactNode }) => (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-1 rounded">
        {children}
    </button>
);