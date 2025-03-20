import Link from 'next/link';
import { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  color?: string; 
}

export const CustomLink: React.FC<CustomLinkProps> = ({ href, children, className, color }) => {
  const theme = useTheme(); 

  const defaultColor = color || theme.palette.primary.main;     
  const combinedClassName = `${className} text-[${defaultColor}] hover:text-${defaultColor}-dark`;

  return (
    <Link href={href} className={combinedClassName}>
      {children}
    </Link>
  );
};
