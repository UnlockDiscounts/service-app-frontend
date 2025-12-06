import Success from './success'
import Hero from './hero';
import { Route, Routes } from 'react-router-dom';
import Login from './login';
import CustomerLogin from './customerlogin';
import ServiceLogin from './serviceproviderlogin';
import AllServices from './allservices';
import Payments from './payments';
import Role from './role';
import SignUp from './userSignUp';
import About from './about';
import Contact from './contact';
import ProviderDashboard from './providerDashboard';
import IndividualListing from './individualListing';
import Profile from './customerDashboard';
// import BookNow from './bookNow';


export default function AppRoutes() {
    return (
        <Routes>
            {/* Default route */}
            <Route index element={<Hero />} />

            {/* Explicit routes */}
            <Route path="/home" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customerlogin" element={<CustomerLogin />} />
            <Route path="/serviceproviderlogin" element={<ServiceLogin />} />
            <Route path="/success" element={<Success />} />
            <Route path="/allservices" element={<AllServices />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/role" element={<Role />} />
            <Route path="/usersignup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact setheading={"Contact us"} />} />
            <Route path="/providerDashboard" element={<ProviderDashboard />} />
            <Route path="/individualListing/:id" element={<IndividualListing />} />
            <Route path="/customerDashboard" element={<Profile />} />
            {/* <Route path="/bookNow" element={<BookNow />} /> */}
           
        



        </Routes>

    );
};