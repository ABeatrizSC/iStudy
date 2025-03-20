interface ContainerProps {
  children: React.ReactNode;
  style?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return (
    <div className={`w-full flex flex-col flex-grow bg-white py-3 px-4 rounded-lg shadow-[0_0_0.6rem_0.2rem_rgba(0,0,0,0.1)] ${style}`}>
      {children}
    </div>
  );
};