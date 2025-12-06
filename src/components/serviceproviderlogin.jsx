import img from '../assets/img.png';
import Form from './serviceForm';


const ServiceLogin=()=>{
    return(
        <>
        <div className='p-4 flex flex-col items-center justify-center space-y-4 mt-8'>
            <img src={img} alt="imgicon" className='h-10 w-10'></img>
            <h1 className='text-3xl font-bold'>Service Provider Registration</h1>
            <p className='text-md text-gray-600'>Join our platform and start growing your business today</p>
            <br />
            <div className='w-full max-w-5xl border flex flex-col items-center justify-center p-6 rounded-lg shadow-lg'>
             <Form className="bg-inherit"/>
             </div>
        </div>

       
        </>
    )
}
export default ServiceLogin;