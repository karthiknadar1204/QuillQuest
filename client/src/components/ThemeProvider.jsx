import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className='bg-[#0f1628] text-white dark:text-gray-200 dark:bg-[hsl(224,45%,11%)] min-h-screen'>
        {children}
      </div>
    </div>
  );
}