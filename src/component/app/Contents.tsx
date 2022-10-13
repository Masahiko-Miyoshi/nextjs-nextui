import React from 'react';
import styles from '@/styles/Home.module.css'

type Props = {
  children: React.ReactNode;
//   className?: string;
};

export const Contents: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.contents}>
        {children}
    </div>
  );
};
