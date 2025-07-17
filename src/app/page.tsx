import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to my site
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        This is a simple blog built with Next.js and SWR for data fetching.
      </p>
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Explore the Blog
        </h2>
        <p className="text-gray-600">
          Check out our latest posts and articles by visiting the{' '}
          <a href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
            Blog
          </a>{' '}
          section.
        </p>
      </div>
    </div>
  )
}
