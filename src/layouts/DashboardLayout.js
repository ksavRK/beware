import {Link, Outlet} from 'react-router-dom';
import { Icon } from '../assets';
import { Navbar } from '../components/Navbar';

export const DashboardLayout = ({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}) => {
    return(
        <>
            <Outlet/>
        </>
    )
}