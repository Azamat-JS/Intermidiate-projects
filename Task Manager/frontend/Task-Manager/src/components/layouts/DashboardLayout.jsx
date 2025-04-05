import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Navbar from './Navbar';
import SideMenu from './SideMenu';

export default function DashboardLayout({children, activeMenu}) {
    const {user, loading} = useContext(UserContext);

    if (loading) return <div>Loading...</div>;

    if (!user) return <div>Not authorized</div>;

    return (
      <div className=''>
          <Navbar activeMenu={activeMenu} />
          <div className='flex'>
              <div className='max-[1000px]:hidden'>
                  <SideMenu activeMenu={activeMenu} />
              </div>
              <div className='grow mx-5'>{children}</div>
          </div>
      </div>
    )
}
