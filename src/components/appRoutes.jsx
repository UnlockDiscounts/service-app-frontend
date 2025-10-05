import Success from './success'
import Hero from './hero';
import { Route, Routes } from 'react-router-dom';
import Login from './login';
import CustomerLogin from './customerlogin';
import ServiceLogin from './serviceproviderlogin';
import AllServices from './allservices';
import Payments from './payments';

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
        

        </Routes>

    );
};