import React from 'react'
import logo from "../assets/logo.png"
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faXTwitter, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToTop = () => {
    // if (location.pathname === "/") {
    //   window.scrollTo({ top: 0, behavior: "smooth" });
    // } else if (location.pathname === "/categories") {
    //   window.scrollTo({ top: 0, behavior: "smooth" });
    // }
    // else if (location.pathname === "/contact") {
    //   window.scrollTo({ top: 0, behavior: "smooth" });
    // } else if (/^\/Detail\/\d+$/.test(location.pathname)) {
    //   window.scrollTo({ top: 0, behavior: "smooth" });
    // }
    // else {

    //   navigate("/");
    // }
    window.scrollTo({ top: 0, behavior: "smooth" });


  };
  const socialLinks = [
    { href: "#", label: "Facebook", icon: faFacebookF },
    { href: "#", label: "X", icon: faXTwitter },
    { href: "#", label: "GitHub", icon: faGithub },
    { href: "#", label: "YouTube", icon: faYoutube },
  ];

  const handleHover=(i)=>{
    return i===0?"text-gray-400 hover:text-[#1DA1F2]":i===1?"text-gray-400 hover:text-[#1877F2]":i===2?"text-gray-400 hover:text-black":"text-gray-400 hover:text-[#FF0000]"
  }
  return (
    <footer className=" bg-[#101828] rounded-t-4xl  shadow-lg " aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-5">
            <button onClick={() => { setTimeout(() => scrollToTop(), 100) }} className='cursor-pointer'>
              <img
                className="h-20"
                src={logo}
                alt="Company name"
                loading="lazy"
              />
            </button>
            <p className="text-sm leading-6 text-gray-400">
              Making Newsmter look better to the world .
            </p>
            <div className="flex space-x-4 justify-center items-center text-5xl gap-4">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} className={handleHover(index)}>
                  <FontAwesomeIcon icon={social.icon} className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          {/* <div className="mt-16 grid grid-cols-4 gap-8 xl:col-span-2 xl:mt-0">
            {[
              { title: "Solutions", links: ["Marketing", "Analytics", "Commerce", "Insights"] },
              { title: "Support", links: ["Pricing", "Documentation", "Guides", "API Status"] },
              { title: "Company", links: ["About", "Blog", "Jobs", "Press", "Partners"] },
              { title: "Legal", links: ["Claim", "Privacy", "Terms"] },
            ].map((section, index) => (
              <div key={index} className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">{section.title}</h3>
                  <ul className="mt-6 space-y-4">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href="#" className="text-sm leading-6 !text-gray-400 hover:!text-white !no-underline">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div> */}
        </div>
        <div className="mt-8 border-t border-gray-700 pt-3 sm:mt-10 lg:mt-12 flex justify-center items-center">
          <p className="text-xs leading-5 text-gray-500">&copy; 2025 NewsMaster, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
