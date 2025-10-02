import { type ReactElement } from 'react'

const HomePage = (): ReactElement => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome to CivicOps Admin
      </h2>
      <p className="text-gray-600">
        This is your administrative dashboard for managing civic operations.
      </p>
    </div>
  )
}

export default HomePage
