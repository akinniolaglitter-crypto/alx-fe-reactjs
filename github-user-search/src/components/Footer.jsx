import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 py-8 bg-white">
      <div className="flex justify-center items-center gap-6 mb-4">
        <a className="text-xs text-slate-500 hover:text-primary uppercase tracking-widest font-bold" href="#">
          Documentation
        </a>
        <a className="text-xs text-slate-500 hover:text-primary uppercase tracking-widest font-bold" href="#">
          Privacy Policy
        </a>
        <a className="text-xs text-slate-500 hover:text-primary uppercase tracking-widest font-bold" href="#">
          Terms of Service
        </a>
      </div>
      <p className="text-xs text-slate-400 text-center">
        © 2026 GitHub User Search App. Built by Freeman in collaboration with 9ineStarx.
      </p>
    </footer>
  );
};

export default Footer;