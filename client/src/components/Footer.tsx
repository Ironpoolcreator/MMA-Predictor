import { Link } from 'wouter';
import { Dumbbell } from 'lucide-react';
import { FaTwitter, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-secondary-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Dumbbell className="text-primary h-6 w-6 mr-2" />
              <span className="font-bold text-xl text-white">MMA Predict</span>
            </div>
            <p className="text-gray-400 text-sm">
              Advanced AI-powered MMA fight prediction and analytics platform for fighters, fans, and analysts.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaYoutube />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link href="/prediction" className="text-gray-400 hover:text-white text-sm">Fight Predictions</Link></li>
              <li><Link href="/fighters" className="text-gray-400 hover:text-white text-sm">Fighter Profiles</Link></li>
              <li><Link href="/analysis" className="text-gray-400 hover:text-white text-sm">Historical Analysis</Link></li>
              <li><Link href="/matchups" className="text-gray-400 hover:text-white text-sm">Custom Matchups</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-white text-sm">Event Coverage</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/api-docs" className="text-gray-400 hover:text-white text-sm">API Documentation</Link></li>
              <li><Link href="/developers" className="text-gray-400 hover:text-white text-sm">Developer Tools</Link></li>
              <li><Link href="/accuracy" className="text-gray-400 hover:text-white text-sm">Prediction Accuracy</Link></li>
              <li><Link href="/database" className="text-gray-400 hover:text-white text-sm">Fighter Database</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm">Technical Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="/team" className="text-gray-400 hover:text-white text-sm">Our Team</Link></li>
              <li><Link href="/methodology" className="text-gray-400 hover:text-white text-sm">Prediction Methodology</Link></li>
              <li><Link href="/data-sources" className="text-gray-400 hover:text-white text-sm">Data Sources</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-secondary-700 text-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} MMA Predict. All rights reserved. Not affiliated with UFC or any MMA promotion.</p>
        </div>
      </div>
    </footer>
  );
}
