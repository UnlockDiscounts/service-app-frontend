export default function MendoraFooter() {

    return (
        <>
            <div className="pb-15">
                {/* your main page content here */}
            </div>
            <footer className="bottom-0 left-0 w-full p-6 text-gray-500 flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 bg-[#F2E7E7] text-sm sm:text-base shadow-inner z-50">
                <a className="hover:cursor-pointer hover:text-blue-700" href="/tc.pdf">Terms of Service</a>
                <a className="hover:cursor-pointer hover:text-blue-700" href="/pp.pdf">Privacy Policy</a>
                <a className="hover:cursor-pointer hover:text-blue-700" href="/contact">Contact Us</a>
            </footer>

        </>);
}