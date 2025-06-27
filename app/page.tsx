import Header from "../components/header"

export default function Page() {
  return (
    <div>
      <Header />
      <main className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-4">Welcome to Orchestra</h1>
        <p className="text-gray-700">Your AI-Powered Productivity Platform.</p>
      </main>
    </div>
  )
}
