import { Header } from "@/components/header"

export default function SupportPage() {
  return (
    <main>
      <Header variant="landing" />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Support</h1>
          <p className="mb-4">
            Welcome to the support page. If you need assistance, please find
            helpful resources below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">FAQ</h2>
              <p>Find answers to frequently asked questions.</p>
              <a href="/faq" className="text-blue-500 hover:underline">
                View FAQ
              </a>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
              <p>Get in touch with our support team.</p>
              <a href="/contact" className="text-blue-500 hover:underline">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
