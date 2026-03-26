import { Outlet } from "react-router-dom"
import Modal from "./Modal"

function AppLayout() {
    return (
        <div>
            <Modal>
                <Outlet />
            </Modal>
        </div>
    )
}

export default AppLayout
