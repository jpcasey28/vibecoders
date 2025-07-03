import '../styles/global.css';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-800 text-text-primary min-h-screen">
        <Navbar />
        <main className="max-w-3xl mx-auto mt-8">{children}</main>
      </body>
    </html>
  );
}
