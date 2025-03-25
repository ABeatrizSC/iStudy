import theme from '@/resources/assets/styles/Theme';

interface TitleProps {
  children: React.ReactNode,
  style?:string
}

export const Title: React.FC<TitleProps> = ({ children, style }) => {
    return (
        <h1 className={`${style}`} style={{ color: theme.palette.text.secondary}} >
            {children}
        </h1>
    );
};
        
           
