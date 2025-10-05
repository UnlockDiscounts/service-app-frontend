import unlockdiscounts from '../assets/unlockdiscounts.logo.jpg';
import '../index.css';

const Navbar = () => {
    return (
        <div className=' bg-white  w-full h-[100px] flex justify-between p-2 border-2 border-b-[#FF8900]' >
            <div className=' flex items-center gap-2 '>
                <img src={unlockdiscounts} alt="logo" className='h-10 w-10'></img>
                <h1 className='text-2xl font-bold'>Unlock Discounts</h1>

            </div>
            <div className='hidden md:flex justify-between items-center gap-10  mr-16'>
                <nav className='w-full'>
                    <ul className='flex justify-around gap-9 text-lg font-medium w-full p-4'>
                        <a href="/">Home</a>
                        <a href="/about">About Us</a>
                        <a href="/contact">Contact</a>
                        <span><a className="border-2 border-[#FF9800] px-6 py-1.5 rounded-full font-semibold" href="/login">Login</a></span>

                    </ul>
                </nav>

            </div>
        </div>
    );
}

export default Navbar;