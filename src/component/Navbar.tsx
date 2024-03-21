import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <div className='px-20 py-4 flex gap-9 bg-black'>
                <Link to='/' className='text-xl cursor-pointer' >Home</Link>
                <Link to='/list' className='text-xl cursor-pointer' >List</Link>
            </div>
        </>
    )
}

export default Navbar