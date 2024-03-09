import React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function ButtonRow( {children}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className={"mt-5 flex flex-col md:flex-row gap-x-5 gap-y-5"}>
      { children }
    </div>
  );
}
