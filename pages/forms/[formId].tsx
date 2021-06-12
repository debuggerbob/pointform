import { useAuth } from '@/context/AuthContext'
import { Sidebar } from '@/components/dashboard/common/sidebar'

export default function Form() {
    const { currentUser } = useAuth()
    console.log(currentUser)
    return (
        <>
            <Sidebar creatorName={'ruyas'} />

            <section></section>
        </>
    )
}
