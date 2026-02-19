import DashboardClientLayout from './client-layout'

export const metadata = {
    title: 'Dashboard',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <DashboardClientLayout>{children}</DashboardClientLayout>
}