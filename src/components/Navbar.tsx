import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { getCurrentUser, logout } from '@/lib/auth';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/upload', label: 'Upload' },
    { path: '/uploads', label: 'My Uploads' },
    { path: '/about', label: 'About' },
    { path: '/privacy', label: 'Privacy' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Sidebar Toggle */}
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-foreground hover:text-primary transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="glass border-border w-64 p-0">
                <nav className="flex flex-col gap-2 p-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-all hover:bg-muted ${
                        isActive(link.path) ? 'bg-muted text-primary' : 'text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            
            <Link to="/home" className="flex items-center gap-2 group">
              <Shield className="w-8 h-8 text-primary group-hover:drop-shadow-glow-red transition-all" />
              <span className="text-xl font-bold text-gradient">DataGuard</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all hover:text-primary ${
                  isActive(link.path)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Hello, <span className="text-foreground font-medium">{user.name}</span>
                  </span>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-4 text-sm font-medium transition-colors hover:text-primary hover:bg-muted rounded ${
                  isActive(link.path) ? 'text-primary bg-muted' : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <div className="border-t border-border mt-2 pt-2 px-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Hello, <span className="text-foreground font-medium">{user.name}</span>
                </p>
                <Button onClick={handleLogout} variant="outline" size="sm" className="w-full">
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
