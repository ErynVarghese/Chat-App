import React from 'react';
import { HiSearch } from "react-icons/hi";

const SearchInput: React.FC = () => {
	return (
		<form className='flex items-center gap-2'>
			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
			<button type='submit' className='btn btn-circle text-blue-700'>
				<HiSearch className="w-6 h-6 outline-none" />
			</button>
		</form>
	);
};

export default SearchInput;
