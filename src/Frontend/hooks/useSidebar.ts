import { useState, useEffect } from 'react';

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return { isOpen, toggle, isCollapsed, toggleCollapse };
};