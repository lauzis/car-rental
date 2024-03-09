import React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function Section({title, children, disabled = false, completed = false}: Readonly<{
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
  completed?:boolean;
}>) {

  return (
    <section className={disabled ? 'opacity-20' : ''}>
      <div className={'flex'}>
        <div className={ 'flex items-center mr-2' }>
          { !completed ? <CheckBoxOutlineBlankIcon fontSize={ 'large' }/> : <CheckBoxIcon fontSize={ 'large' }/> }
        </div>
        <h2>{ title }</h2>
      </div>

      { children }
    </section>
  );
}
