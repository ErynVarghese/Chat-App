import React from 'react';
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';

const Sidebar: React.FC = () => {
  return (
    <aside className='flex h-full w-full max-w-xs flex-col border-r border-slate-700 bg-slate-950 p-4'>
      <SearchInput />
      <div className='divider px-3' />
      <div className='flex-1 overflow-auto'>
        <Conversations />
      </div>
      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
