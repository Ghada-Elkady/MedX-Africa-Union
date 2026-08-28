import { Link } from "react-router-dom";

const Footer = () => {
    // Footer links
    const quickLinks = [
        { to: "/", label: "Home" },
        { to: "#about", label: "About" },
        { to: "#services", label: "Services" },
        { to: "#contact", label: "Contact" },
    ];

    const otherLinks = [
        { to: "#blog", label: "Blog" },
        { to: "#portfolio", label: "Portfolio" },
        { to: "#team", label: "Team" },
        { to: "#faq", label: "FAQ" },
        { to: "#pricing", label: "Pricing" },
    ];

    const moreLinks = [
        { to: "#testimonials", label: "Testimonials" },
        { to: "#careers", label: "Careers" },
        { to: "#privacy", label: "Privacy Policy" },
        { to: "#terms", label: "Terms of Service" },
        { to: "#support", label: "Support" },
    ];

    const developerLinks = [
        { to: "#developers", label: "Developers" },
        { to: "#partners", label: "Partners" },
        { to: "#investors", label: "Investors" },
        { to: "#media", label: "Media" },
        { to: "#events", label: "Events" },
    ];

    const legalLinks = [
        { to: "#legal", label: "Legal" },
        { to: "#sitemap", label: "Sitemap" },
        { to: "#accessibility", label: "Accessibility" },
    ];
    return (
        <footer className="main-bg py-4">
            <div className="container mx-auto text-start px-5 py-20 mb-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ul className="quick-links">
                    <h2 className="text-xl font-bold pb-2">Quick Links</h2>
                    {/* map quick links */}
                    {quickLinks.map((link, index) => (
                        <li key={index}>
                            <Link to={link.to} className="mx-4 block text-gray-500 hover:underline">{link.label}</Link>
                        </li>
                    ))}
                </ul>
                {/* map other links */}
                <ul className="quick-links">
                    <h2 className="text-xl font-bold pb-2">Other Links</h2>
                    {otherLinks.map((link, index) => (
                        <li key={index}>
                            <Link to={link.to} className="mx-4 block text-gray-500 hover:underline">{link.label}</Link>
                        </li>
                    ))}
                </ul>
                {/* map more links */}
                <ul className="quick-links">
                    <h2 className="text-xl font-bold pb-2">More Links</h2>
                    {moreLinks.map((link, index) => (
                        <li key={index}>
                            <Link to={link.to} className="mx-4 block text-gray-500 hover:underline">{link.label}</Link>
                        </li>
                    ))}
                </ul>
                {/* map legal links */}
                <ul className="quick-links">
                    <h2 className="text-xl font-bold pb-2">Legal</h2>
                    {legalLinks.map((link, index) => (
                        <li key={index}>
                            <Link to={link.to} className="mx-4 block text-gray-500 hover:underline">{link.label}</Link>
                        </li>
                    ))}
                </ul>
                {/* map developer links */}
                <ul className="quick-links">
                    <h2 className="text-xl font-bold pb-2">Developers</h2>
                    {developerLinks.map((link, index) => (
                        <li key={index}>
                            <Link to={link.to} className="mx-4 block text-gray-500 hover:underline">{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <p className="text-center text-gray-500 mb-2 pt-6 border-t-2 border-gray-400">&copy; © 2025 Your Company Name. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
