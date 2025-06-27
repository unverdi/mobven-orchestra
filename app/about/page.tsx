import { Header } from "@/components/header"

export default function About() {
  return (
    <main>
      <Header variant="landing" />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p className="text-gray-700">
            This is the about page. You can add information about your company, team, or project here.
          </p>
        </div>
      </section>
    </main>
  )
}
