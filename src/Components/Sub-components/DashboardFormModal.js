import React , { useContext } from 'react'
import { DashboardContext } from '../Dashboard'

const DashboardFormModal = () => {

  const { dashboardModal } = useContext(DashboardContext)

  return (
    < div className={`dashboard-form-modal ${dashboardModal.status}`}>
        {
          dashboardModal.content
        }
    </div>
  )
}

export default DashboardFormModal