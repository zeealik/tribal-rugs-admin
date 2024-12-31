import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Package, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-8">
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 hover:bg-gray-800 ${
                isActive ? 'bg-gray-800' : ''
              }`
            }
          >
            <Users className="mr-2" size={20} />
            Users
          </NavLink>
          <NavLink
            to="/dashboard/products"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 hover:bg-gray-800 ${
                isActive ? 'bg-gray-800' : ''
              }`
            }
          >
            <Package className="mr-2" size={20} />
            Products
          </NavLink>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Button
            variant="ghost"
            className="w-full text-white hover:bg-gray-800"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" size={20} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;