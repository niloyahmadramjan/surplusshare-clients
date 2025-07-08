
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  LinkedinIcon as LinkedIn,
} from "lucide-react";
import { Link } from "react-router";
import Logo from "./Logo";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "For Restaurants", href: "/restaurants" },
    { name: "For Charities", href: "/charities" },
    { name: "Impact Report", href: "/impact" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Data Protection", href: "/data-protection" },
  ];

  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo></Logo>
            </div>
            <p className="text-sm text-neutral-content/80">
              Connecting surplus food with communities in need. Together, we're building a sustainable future and reducing food waste one meal at a time.
            </p>
            <div className="space-y-2 text-sm text-neutral-content/80">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Green Street, Eco City, EC 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-FOOD</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@surplusshare.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="hover:text-white text-neutral-content/80 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="hover:text-white text-neutral-content/80 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-sm text-neutral-content/80">
              Get weekly updates on our impact and new partnerships in your area.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-base-400 text-neutral-content w-full"
              />
              <button className="bg-secondary py-2 px-5 rounded-lg text-white hover:bg-secondary/90">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-neutral-content/60">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="border-t border-neutral-content/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-content/80">Follow us:</span>
            <div className="flex gap-2">
              <a href="#" className="p-2 bg-accent rounded-full hover:bg-accent">
                <Facebook className="h-4 w-4 text-black" />
              </a>
              <a href="#" className="p-2 bg-accent rounded-full hover:bg-base-200">
                <Instagram className="h-4 w-4 text-black" />
              </a>
              <a href="#" className="p-2 bg-accent rounded-full hover:bg-base-200">
                <LinkedIn className="h-4 w-4 text-black" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right text-sm text-neutral-content/70">
            <p>© 2024 SurplusShare. All rights reserved.</p>
            <p className="text-xs mt-1">Made with ❤️ for a sustainable future</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
