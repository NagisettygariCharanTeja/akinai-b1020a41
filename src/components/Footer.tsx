
import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-bold text-xl text-akin-purple mb-3">AkinAI</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              The next generation of AI assistants designed to understand and assist humans with emotional intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-akin-purple">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-akin-purple">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-akin-purple">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-akin-purple">About</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-akin-purple">Contact</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-akin-purple">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-akin-purple">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-akin-purple">Documentation</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-akin-purple">API</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-akin-purple">FAQ</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-akin-purple">Community</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2025 AkinAI. All rights reserved.</p>
          <p className="text-sm text-gray-500 mt-2 sm:mt-0">Built with ❤️ by the AkinAI Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
