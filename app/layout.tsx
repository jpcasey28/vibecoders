import '../styles/global.css';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-100 min-h-screen">
        <Navbar />
        <main className="max-w-3xl mx-auto mt-8">{children}</main>
      </body>
    </html>
  );
}
