interface TitleProps {
  children: React.ReactNode,
}

export const Subtitle: React.FC<TitleProps> = ({ children }) => {
    return (
         <h2 className="text-[16px] uppercase mb-3">
            {children}
        </h2>
    );
};