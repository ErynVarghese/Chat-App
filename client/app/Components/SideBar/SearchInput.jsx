import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useUserContext } from "@/context/UserContext.js";


const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSearchQuery } = useUserContext();

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleChange = (e) => {
		const value = e.target.value;
		setSearch(value);
		setSearchQuery(value);
	};

	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2 p-2'>
			<input
				type='text'
				placeholder='Search users by name or email...'
				className='w-full rounded-full border border-slate-600 bg-white px-4 py-2 text-black placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500'
				value={search}
				onChange={handleChange}
			/>
			<button type='submit' className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white hover:bg-sky-600 transition'>
				<IoSearchSharp className='w-5 h-5' />
			</button>
		</form>
	);
};
export default SearchInput;