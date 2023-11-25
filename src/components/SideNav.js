import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';

const SideNav = () => {
  return (
    <div className='flex items-end gap-y-8 pt-8 flex-col font-bold text-xl h-[30rem]'>
      <button className='uppercase flex items-center gap-3'><DashboardIcon/>Dashboard</button>
      <button className='uppercase flex items-center gap-3'><DirectionsCarFilledIcon/>Parking Space</button>
    </div>
  )
}

export default SideNav;