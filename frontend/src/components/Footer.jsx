export default function Footer() {
  return (
    <>
      {/* Glow line ABOVE footer */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-20"></div>

      <footer className="mt-10 px-10 py-10 text-gray-400">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-lime-400 font-semibold text-lg">
              CourseMate AI 🚀
            </h2>
            <p className="mt-2 text-sm">
              AI-powered study assistant to help you learn smarter, not harder.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Features</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
              <li className="hover:text-white cursor-pointer">Docs</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-3">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">GitHub</li>
              <li className="hover:text-white cursor-pointer">LinkedIn</li>
              <li className="hover:text-white cursor-pointer">Twitter</li>
            </ul>
          </div>

        </div>

        {/* Bottom line */}
        <div className="mt-10 text-center text-sm border-t border-gray-900 pt-6">
          © {new Date().getFullYear()} CourseMate AI. All rights reserved.
        </div>

      </footer>
    </>
  );
}