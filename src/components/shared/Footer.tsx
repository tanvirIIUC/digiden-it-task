const Footer = () => {
    return (
      <footer className="bg-gray-100 text-center py-4 mt-10 border-t-emerald-50 text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} WeatherHUNT. All rights reserved.
        </p>
        <p>
          Built with ❤️ by <a href="https://github.com/yourusername" className="text-blue-600 hover:underline">Tanvir Hasan Sohan</a>
        </p>
      </footer>
    );
  };
  
  export default Footer;
  