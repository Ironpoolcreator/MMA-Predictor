import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Dumbbell, Zap, BarChart2, Scale, Calendar, ArrowLeftRight, Shield } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="bg-secondary-800 border-b border-secondary-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <Dumbbell className="text-primary h-6 w-6 mr-2" />
                  <span className="font-bold text-xl text-white">MMA Predict</span>
                </div>
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-6">
              <Link href="/" className={`${isActive('/') ? 'text-white border-b-2 border-primary' : 'text-gray-300 hover:text-white'} px-2 pt-5 pb-4 text-sm font-medium`}>
                Home
              </Link>
              <Link href="/rankings" className={`${isActive('/rankings') ? 'text-white border-b-2 border-primary' : 'text-gray-300 hover:text-white'} px-2 pt-5 pb-4 text-sm font-medium`}>
                Rankings
              </Link>
              <Link href="/fights" className={`${isActive('/fights') ? 'text-white border-b-2 border-primary' : 'text-gray-300 hover:text-white'} px-2 pt-5 pb-4 text-sm font-medium`}>
                Fights
              </Link>
              <Link href="/compare" className={`${isActive('/compare') ? 'text-white border-b-2 border-primary' : 'text-gray-300 hover:text-white'} px-2 pt-5 pb-4 text-sm font-medium flex items-center`}>
                <ArrowLeftRight className="h-4 w-4 mr-1" /> Compare
              </Link>
              <Link href="/betting-odds" className={`${isActive('/betting-odds') ? 'text-white border-b-2 border-primary' : 'text-gray-300 hover:text-white'} px-2 pt-5 pb-4 text-sm font-medium flex items-center`}>
                <Scale className="h-4 w-4 mr-1" /> Odds
              </Link>
              <Link href="/events" className={`${isActive('/events') ? 'text-white border-b-2 border-primary' : 'text-gray-300 hover:text-white'} px-2 pt-5 pb-4 text-sm font-medium flex items-center`}>
                <Calendar className="h-4 w-4 mr-1" /> Events
              </Link>
              <Link href="/analytics" className={`${isActive('/analytics') ? 'text-white border-b-2 border-primary' : 'text-gray-300 hover:text-white'} px-2 pt-5 pb-4 text-sm font-medium flex items-center`}>
                <BarChart2 className="h-4 w-4 mr-1" /> Analytics
              </Link>
              <Link href="/fight-preparation" className={`${isActive('/fight-preparation') ? 'text-white border-b-2 border-primary' : 'text-gray-300 hover:text-white'} px-2 pt-5 pb-4 text-sm font-medium flex items-center`}>
                <Shield className="h-4 w-4 mr-1" /> Fight Prep
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Button
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Zap className="h-4 w-4 mr-2" />
                Live Events
              </Button>
            </div>
            <div className="md:hidden ml-4">
              <button
                onClick={toggleMenu}
                className="bg-secondary-800 p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/" className={`${isActive('/') ? 'bg-secondary-700 text-white' : 'text-gray-300 hover:bg-secondary-700 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium`}>
            Home
          </Link>
          <Link href="/rankings" className={`${isActive('/rankings') ? 'bg-secondary-700 text-white' : 'text-gray-300 hover:bg-secondary-700 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium`}>
            Rankings
          </Link>
          <Link href="/fights" className={`${isActive('/fights') ? 'bg-secondary-700 text-white' : 'text-gray-300 hover:bg-secondary-700 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium`}>
            Fights
          </Link>
          <Link href="/compare" className={`${isActive('/compare') ? 'bg-secondary-700 text-white' : 'text-gray-300 hover:bg-secondary-700 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium flex items-center`}>
            <ArrowLeftRight className="h-4 w-4 mr-2" /> Compare Fighters
          </Link>
          <Link href="/betting-odds" className={`${isActive('/betting-odds') ? 'bg-secondary-700 text-white' : 'text-gray-300 hover:bg-secondary-700 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium flex items-center`}>
            <Scale className="h-4 w-4 mr-2" /> Betting Odds
          </Link>
          <Link href="/events" className={`${isActive('/events') ? 'bg-secondary-700 text-white' : 'text-gray-300 hover:bg-secondary-700 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium flex items-center`}>
            <Calendar className="h-4 w-4 mr-2" /> Historical Events
          </Link>
          <Link href="/analytics" className={`${isActive('/analytics') ? 'bg-secondary-700 text-white' : 'text-gray-300 hover:bg-secondary-700 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium flex items-center`}>
            <BarChart2 className="h-4 w-4 mr-2" /> Analytics
          </Link>
          <Link href="/fight-preparation" className={`${isActive('/fight-preparation') ? 'bg-secondary-700 text-white' : 'text-gray-300 hover:bg-secondary-700 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium flex items-center`}>
            <Shield className="h-4 w-4 mr-2" /> Fight Preparation
          </Link>
        </div>
      </div>
    </nav>
  );
}
