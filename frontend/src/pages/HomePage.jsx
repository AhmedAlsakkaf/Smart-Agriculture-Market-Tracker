import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-primary-green text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Smart Agriculture Market Tracker
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Empowering Pakistani farmers with real-time market rates, weather
            insights, and community knowledge - all in one place
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-primary-yellow text-primary-green px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              Get Started
            </button>
            <button className="bg-white text-primary-green px-8 py-3 rounded-lg font-semibold hover:bg-light-green transition">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-light-green">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary-green text-center mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-green rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-green mb-3">
                Real-Time Market Rates
              </h3>
              <p className="text-gray-700">
                Access up-to-date prices of vegetables and fruits across
                different regions of Pakistan. Make informed selling decisions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-green rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-green mb-3">
                Weather Insights
              </h3>
              <p className="text-gray-700">
                Get live weather updates for multiple Pakistani cities with
                visual representations to plan your farming activities.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-green rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-green mb-3">
                Price Trend Analysis
              </h3>
              <p className="text-gray-700">
                View 7-day price trends with interactive charts. Compare
                multiple vegetables to optimize your harvest timing.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-green rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-green mb-3">
                Smart Farming Advice
              </h3>
              <p className="text-gray-700">
                Receive AI-powered recommendations based on weather conditions
                and market trends to maximize your profits.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-green rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-green mb-3">
                Community Forum
              </h3>
              <p className="text-gray-700">
                Connect with fellow farmers, share experiences, ask questions,
                and learn from the farming community.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-green rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-green mb-3">
                Secure & Reliable
              </h3>
              <p className="text-gray-700">
                Your data is safe with us. Easy authentication system for
                farmers and admins with secure access control.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary-green text-center mb-12">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start mb-8">
              <div className="bg-primary-yellow text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold text-primary-green mb-2">
                  Sign Up / Login
                </h3>
                <p className="text-gray-700">
                  Create your farmer account or login if you're already
                  registered. Admins can manage market data through their
                  dashboard.
                </p>
              </div>
            </div>

            <div className="flex items-start mb-8">
              <div className="bg-primary-yellow text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold text-primary-green mb-2">
                  Access Your Dashboard
                </h3>
                <p className="text-gray-700">
                  View real-time market rates, weather updates, and price
                  trends. Get personalized smart farming advice based on current
                  conditions.
                </p>
              </div>
            </div>

            <div className="flex items-start mb-8">
              <div className="bg-primary-yellow text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold text-primary-green mb-2">
                  Make Informed Decisions
                </h3>
                <p className="text-gray-700">
                  Use data insights and community knowledge to decide when to
                  sell, what to plant, and how to manage your crops effectively.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary-yellow text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                4
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold text-primary-green mb-2">
                  Connect with Community
                </h3>
                <p className="text-gray-700">
                  Share your experiences, ask questions, and help fellow
                  farmers. Together we grow stronger!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-primary-green text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-xl">Active Farmers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-xl">Vegetables & Fruits</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">20+</div>
              <div className="text-xl">Cities Covered</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-xl">Real-Time Updates</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-light-green">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-green mb-6">
            Ready to Transform Your Farming Business?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already making smarter decisions
            with our platform.
          </p>
          <button className="bg-primary-green text-white px-12 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition">
            Join Now - It's Free!
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
